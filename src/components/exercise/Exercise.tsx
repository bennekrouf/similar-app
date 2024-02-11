import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Text, Card, Provider, DefaultTheme} from 'react-native-paper';

import { Logger } from 'mayo-logger';

import { syncStorage } from '../../storage/syncStorage';
import CustomRadioButton from './CustomRadioButton';
import useCurrentScreen from '../../hooks/useCurrentScreen';
import { Alternative } from '../../models/Alternative';
import { AnswerStat } from '../../models/AnswerStat';
import {radioButtonText} from '../../utils/radioButtonText';
import { updateAnswerStats } from '../../utils/updateStats';
import { Statement } from '../../models/Statement';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
  },
};

const NEXT_QUESTION_TIME = 2000;

const Exercise = ({exercises, isLoading, error }) => {
  useCurrentScreen('Exercise');
  
  const {t} = useTranslation();
  const [statement, setStatement] = useState<Statement>(null);
  const [alternatives, setAternatives] = useState<Alternative[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>();
  // const {kalima, currentChapterName } = route?.params;
  const [isValid, setIsValid] = useState<string>('neutral');
  const [otherSourate, setOtherSourate] = useState<string>('');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseType, setExerciseType] = useState('');
  const [answerStats, setAnswerStats] = useState<AnswerStat[]>([]);
  const [tId, setTId] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if(answerStats?.length === 0) return; 
    syncStorage(answerStats);
  }, [answerStats]);

  useEffect(() => {
    return () => {
        if (tId) {
            clearTimeout(tId);
        }
    };
}, [tId]);

  const handleCheck = async (index: number, statement: Statement) => {
    Logger.info('Starting handleCheck...');
    setSelectedValue(index);
    console.log(statement);
    try {
      const alternative = alternatives[index]?.verse;
      const validationOutcome = statement.verse.chapter_no === alternative.chapter_no && statement.verse.verse_no === alternative.verse_no ? 'right':'wrong'; 
      setIsValid(validationOutcome);
      let id: string;
      if (validationOutcome === 'right') {
        id = `${statement.verse.chapter_no}:${statement.verse.verse_no}`;
        updateAnswerStats({ id, valid: true}, setAnswerStats);
        // Set a timeout to load the next question after 2 seconds
        const tId = setTimeout(() => {
          setExerciseIndex(prevIndex => prevIndex + 1);
          updateExerciseContent();
        }, NEXT_QUESTION_TIME);
        setTId(tId);
      } else { // decrease the right and the wrong selected answer
        id = `${statement.verse.chapter_no}:${statement.verse.verse_no}`;
        updateAnswerStats({ id, valid: false}, setAnswerStats);
        id = `${alternative.chapter_no}:${alternative.verse_no}`;
        updateAnswerStats({ id, valid: false}, setAnswerStats);
      }
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
        setSelectedValue(undefined);
        setIsValid('neutral');
        setExerciseType(data.exercise_type);
        // navigation.setOptions({
        //   headerBackTitle: currentChapterName,
        // });
      } else {
        Logger.warn('No more exercises available!');
      }
    } catch (error) {
      Logger.error('Error updating exercise content', error);
    }
  }, [exerciseIndex, exercises, navigation]);

  useEffect(() => {
    updateExerciseContent();
  }, [updateExerciseContent]);

  return (
    <Provider theme={theme}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              {exerciseType !== 'FindSourate' && (
                <View style={styles.headerLine}>
                  <Text style={styles.rightText}>
                    {statement?.verse.sourate || ''}
                  </Text>
                  <Text style={styles.leftText}>
                    {statement
                      ? `${statement?.verse.chapter_no}:${statement?.verse.verse_no}`
                      : ''}
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
                onPress={() => handleCheck(index, statement)}
                serviceFailed={isValid === 'wrong' && selectedValue === index}
                serviceValid={isValid === 'right' && selectedValue === index}
              />
            ))}
          </View>
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
});

export default Exercise;
