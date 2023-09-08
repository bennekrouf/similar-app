import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Text, Card, Provider, DefaultTheme} from 'react-native-paper';

import {checkDiscriminant} from '../../api/checkDiscriminant'; // import your API function
import {checkChapter} from '../../api/checkChapter'; // import your API function
import {radioButtonText} from './radioButtonText'; // import your API function
import CustomRadioButton from './CustomRadioButton';
import SourateBox from '../lesson/SourateBox';

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
  const [statement, setStatement] = useState(null);
  const [alternatives, setAternatives] = useState<[]>([]); // if answers is an array of strings
  const [selectedValue, setSelectedValue] = useState<number>(); // Changed from string to number
  const {kalima, currentChapterName, currentChapterNo, exercises} = route.params; // Get the kalima from the route parameters
  const [isValid, setIsValid] = useState<string>('neutral');
  const [otherSourate, setOtherSourate] = useState<string>('');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseType, setExerciseType] = useState('');

  const navigation = useNavigation();

  const handleCheck = async (index: React.SetStateAction<number>) => {
    setSelectedValue(index);
    try {
      const alternative = alternatives[index]?.verse;
      const result =
        exerciseType === 'B'
          ? await checkChapter(
              kalima,
              alternative.verse_no,
              alternative.chapter_no,
              statement?.ungrouped_text.discriminant,
            )
          : await checkDiscriminant(
              kalima,
              statement?.verse?.verse_no,
              statement?.verse?.chapter_no,
              alternative.ungrouped_text?.discriminant?.replace(/[\[\]]/g, ""),
            );
      setIsValid(result[0] === true ? 'right' : 'wrong');
      setOtherSourate(result[0] ? '' : result[1]);
      // console.log(
      //   alternative.chapter_no,
      //   alternative.verse_no,
      //   '   discriminant :',
      //   statement?.ungrouped_text.discriminant,
      //   'result :',
      //   result[0],
      // );
      // console.log(`handleCheck RESULT ${result}`); // Do something with the result here
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = useCallback(() => {
    try {
      console.log('Inside loadData : ', exercises);
      if (exercises && exercises[exerciseIndex]) {
        const data = exercises[exerciseIndex];
        // console.log('Inside setStatement : ', data[0]);
        // console.log('Inside setAternatives : ', data[1]);
        // console.log('Inside type : ', data[2]);

        setStatement(data.statement);
        setAternatives(data.alternatives);
        setSelectedValue(undefined); // Reset the selected value
        setIsValid('neutral'); // Reset the validation flag
        setExerciseType(data.exercise_type);

        // Set the back button title after updating the statement
        // navigation.setOptions({
        //   headerBackTitle: currentChapterName,
        // });

        navigation.setOptions({
          headerBackTitle: props => <SourateBox chapterNo={currentChapterNo} />,
        });
      } else {
        // Handle the end of exercises if needed
        console.log('No more exercises!');
      }
    } catch (error) {
      console.error(error);
    }
  }, [exerciseIndex, exercises, currentChapterName, currentChapterNo, navigation]);

  useEffect(() => {
    loadData();
  }, [loadData, kalima]);

  return (
    <Provider theme={theme}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              {exerciseType !== 'B' && (
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
                      exerciseType === 'A'
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
                // Increment the exercise index and load the next one
                setExerciseIndex(prevIndex => prevIndex + 1);
                loadData();
              }}
              disabled={isValid !== 'right'}>
              {t('continue')}
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
    alignSelf: 'stretch', // make sure the container takes the full width
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
    marginBottom: 20, // Add some spacing between this line and the following text
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
