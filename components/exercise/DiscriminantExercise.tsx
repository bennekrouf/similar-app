import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Text, Card, Provider, DefaultTheme} from 'react-native-paper';

import {checkDiscriminant} from '../../api/checkDiscriminant'; // import your API function
import {checkChapter} from '../../api/checkChapter'; // import your API function
import CustomRadioButton from './CustomRadioButton';

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
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState<[]>([]); // if answers is an array of strings
  const [selectedValue, setSelectedValue] = useState<number>(); // Changed from string to number
  const {kalima, currentChapterName, exercises} = route.params; // Get the kalima from the route parameters
  const [isValid, setIsValid] = useState<string>('neutral');
  const [otherSourate, setOtherSourate] = useState<string>('');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseType, setExerciseType] = useState('');

  const navigation = useNavigation();

  const handleCheck = async (index: React.SetStateAction<number>) => {
    setSelectedValue(index);
    try {
      console.log('Calling checkDiscriminant with kalima:', kalima);
      console.log(
        'Calling checkDiscriminant with : question.ayah',
        question.verse.ayah,
      );
      console.log(
        'Calling checkDiscriminant with : question.chapter_no',
        question.verse.chapter_no,
      );
      console.log(
        'Calling checkDiscriminant with : options[index]',
        options[index].content,
      );

      const result =
        exerciseType === 'B'
          ? await checkChapter(
              kalima,
              question.verse.ayah,
              question.verse.chapter_no,
            )
          : await checkDiscriminant(
              kalima,
              question.verse.ayah,
              question.verse.chapter_no,
              options[index].content,
            );
      setIsValid(result[0] ? 'right' : 'wrong');
      setOtherSourate(result[0] ? '' : result[1]);
      console.log(`handleCheck RESULT ${result}`); // Do something with the result here
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = useCallback(() => {
    try {
      // console.log('Inside loadData : ', exercises);
      if (exercises && exercises[exerciseIndex]) {
        const data = exercises[exerciseIndex];
        // console.log('Inside setQuestion : ', data[0]);
        console.log('Inside setOptions : ', data[1]);
        // console.log('Inside type : ', data[2]);

        setQuestion(data[0]);
        setOptions(data[1]);
        setSelectedValue(undefined); // Reset the selected value
        setIsValid('neutral'); // Reset the validation flag
        setExerciseType(data[2]);

        // Set the back button title after updating the question
        navigation.setOptions({
          headerBackTitle: currentChapterName,
        });
      } else {
        // Handle the end of exercises if needed
        console.log('No more exercises!');
      }
    } catch (error) {
      console.error(error);
    }
  }, [exerciseIndex, exercises, currentChapterName, navigation]);

  useEffect(() => {
    loadData();
  }, [loadData, kalima]);

  const getRadioButtonText = (
    alternative: any,
    index: number,
    type: string,
  ) => {
    if (alternative.content && selectedValue === index) {
      return `${alternative.content}  ${type === 'A' ? alternative.ayah : ''}`;
    }
    return alternative.content;
  };
  console.log(`QUESTION : ${JSON.stringify(question)}`);
  return (
    <Provider theme={theme}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              {exerciseType !== 'B' && (
                <View style={styles.headerLine}>
                  <Text style={styles.leftText}>
                    {question
                      ? `${question.verse.chapter_no}:${question.verse.ayah}`
                      : ''}
                  </Text>
                  <Text style={styles.rightText}>
                    {question ? question.verse.sourate : ''}
                  </Text>
                </View>
              )}

              <Text style={styles.rightAlignedText}>
                {question
                  ? `${question.pre} ${
                      exerciseType === 'A' ? '...' : question.discriminant
                    } ${question.post}`
                  : ''}
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.radioContainer}>
            {options.map((option, index) => (
              <CustomRadioButton
                key={index}
                text={getRadioButtonText(option, index, exerciseType)}
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
