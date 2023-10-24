import React, {useCallback, useEffect, useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Text, Card, Provider, DefaultTheme} from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import {checkDiscriminant} from '../../api/checkDiscriminant';
import {checkChapter} from '../../api/checkChapter';
import {radioButtonText} from './radioButtonText';
import CustomRadioButton from './CustomRadioButton';

import { Alternative, Statement } from '../../models/interfaces';
import { Logger } from 'rn-logging';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange', // The primary color represents button color in `contained` mode.
  },
};

const DiscriminantExercise = ({route, _}) => {

  const {t} = useTranslation();
  const [statement, setStatement] = useState<Statement>(null);
  const [alternatives, setAternatives] = useState<Alternative[]>([]); // if answers is an array of strings
  const [selectedValue, setSelectedValue] = useState<number>(); // Changed from string to number
  const {kalima, currentChapterName, exercises} = route.params; // Get the kalima from the route parameters
  const [isValid, setIsValid] = useState<string>('neutral');
  const [otherSourate, setOtherSourate] = useState<string>('');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseType, setExerciseType] = useState('');

  const navigation = useNavigation();

  const handleCheck = async (index: number) => {
    Logger.info('Starting handleCheck...');
    setSelectedValue(index);
    try {
      const alternative = alternatives[index]?.verse;
      const result = exerciseType === 'FindSourate'
          ? await checkChapter(kalima, alternative.verse_no, alternative.chapter_no, statement?.verse.ungrouped_text.discriminant)
          : await checkDiscriminant(kalima, statement?.verse.verse_no, statement?.verse.chapter_no, alternative.ungrouped_text.discriminant);
      
      const validationOutcome = result[0] === true ? 'right' : 'wrong';
      setIsValid(validationOutcome);
      Logger.info(`Validation outcome: ${validationOutcome}`);
    } catch (error) {
      Logger.error('Error during handleCheck', error);
    }
  };

  const updateExerciseContent = useCallback(() => {
    Logger.info('Updating exercise content...');
    try {
      if (exercises && exercises[exerciseIndex]) {
        const data = exercises[exerciseIndex];
        setStatement(data.statement);
        setAternatives(data.alternatives);
        setSelectedValue(undefined); // Reset the selected value
        setIsValid('neutral'); // Reset the validation flag
        setExerciseType(data.exercise_type);
        navigation.setOptions({
          headerBackTitle: currentChapterName,
        });
      } else {
        Logger.warn('No more exercises available!');
      }
    } catch (error) {
      Logger.error('Error updating exercise content', error);
    }
  }, [exerciseIndex, exercises, currentChapterName, navigation]);

  useEffect(() => {
    updateExerciseContent();
  }, [updateExerciseContent, kalima]);

  return (
    <Provider theme={theme}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              {exerciseType !== 'FindSourate' && (
                <View style={styles.headerLine}>
                  <Text style={styles.leftText}>
                    {statement
                      ? `${statement?.verse.chapter_no}:${statement?.verse.verse_no}`
                      : ''}
                  </Text>
                  <Text style={styles.rightText}>
                    {statement?.verse.sourate || ''}
                  </Text>
                </View>
              )}

              <Text style={styles.rightAlignedText}>
                {statement
                  ? `${statement.verse?.ungrouped_text?.pre} ${
                      exerciseType === 'FindDiscriminant'
                        ? '...'
                        : statement.verse?.ungrouped_text?.discriminant
                    } ${statement.verse?.ungrouped_text?.post}`
                  : ''}
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.radioContainer}>
            {alternatives.map((option, index) => (
              <CustomRadioButton
                key={index}
                text={radioButtonText(
                  option,
                  index,
                  exerciseType,
                  isValid,
                  selectedValue,
                )}
                selected={selectedValue === index}
                onPress={() => handleCheck(index)}
                serviceFailed={isValid === 'wrong' && selectedValue === index}
                serviceValid={isValid === 'right' && selectedValue === index}
              />
            ))}
          </View>

          <Card style={styles.newExerciseButtonCard}>
            <Button
              mode="contained"
              onPress={() => {
                setExerciseIndex(prevIndex => prevIndex + 1);
                updateExerciseContent();
              }}
              disabled={isValid !== 'right'}>
              {t('continue')}
              <FontAwesomeIcon icon={faVolumeUp } size={60}/>
            </Button>
          </Card>
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  newExerciseButtonCard: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  radioContainer: {
    margin: 20,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  radioButton: {
    alignSelf: 'flex-end',
  },
  radioLabel: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftText: {
    textAlign: 'left',
    writingDirection: 'ltr',
    fontWeight: 'bold',
  },
  rightText: {
    fontFamily: 'ScheherazadeNew-Regular',
    fontSize: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center', // Align items to the center
    justifyContent: 'flex-start',
    padding: 10, // Add some padding to prevent the card from touching the screen edges
  },
  rightAlignedText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontSize: 20,
    fontFamily: 'ScheherazadeNew-Regular',
  },
  card: {
    width: '95%', // Set the card width to almost full screen width
    alignSelf: 'center', // Center the card
  },
  radioButtonContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

export default DiscriminantExercise;
