import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, Text, Card, Provider, DefaultTheme} from 'react-native-paper';

import {loadExercise} from '../../api/loadExercises'; // import your API function
import {checkDiscriminant} from '../../api/checkDiscriminant'; // import your API function
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
  const [options, setOptions] = useState<string[]>([]); // if answers is an array of strings
  const [selectedValue, setSelectedValue] = useState<number>(); // Changed from string to number
  const {kalima, currentChapterName} = route.params; // Get the kalima from the route parameters
  const [isValid, setIsValid] = useState<string>('neutral');
  const [otherSourate, setOtherSourate] = useState<string>('');
  const navigation = useNavigation();

  const handleCheck = async index => {
    setSelectedValue(index);
    try {
      const result = await checkDiscriminant(
        kalima,
        question.ayah,
        question.chapter_no,
        options[index],
      );
      setIsValid(result[0] ? 'right' : 'wrong');
      setOtherSourate(result[0] ? '' : result[1]);
      // console.log(result); // Do something with the result here
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const data = await loadExercise(kalima);
      setQuestion(data[0]);

      // Set the back button title after updating the question
      // if (data[0] && data[0].chapter_name) {
      navigation.setOptions({
        headerBackTitle: currentChapterName,
      });
      // }

      setOptions(data[1]);
      setSelectedValue(undefined); // Reset the selected value
      setIsValid('neutral'); // Reset the validation flag
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [kalima]);

  const getRadioButtonText = (option, index, otherSourate) => {
    if (otherSourate && selectedValue === index) {
      return `${option}   [${otherSourate}]`;
    }
    return option;
  };

  return (
    <Provider theme={theme}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.headerLine}>
                <Text style={styles.leftText}>
                  {question && `${question.chapter_no}:${question.ayah}`}
                </Text>
                <Text style={styles.rightText}>
                  {question && question.chapter_name}
                </Text>
              </View>
              <Text style={styles.rightAlignedText}>
                {question && `${question.pre} ... ${question.post}`}
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.radioContainer}>
            {options.map((option, index) => (
              <CustomRadioButton
                key={index}
                text={getRadioButtonText(option, index, otherSourate)}
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
              onPress={loadData}
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
  },
  rightText: {
    textAlign: 'right',
    writingDirection: 'rtl',
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
