import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';

import {Text, Card} from 'react-native-paper';
// import RadioForm, {RadioButton} from 'react-native-simple-radio-button';

import {loadExercise} from '../../api/loadExercises'; // import your API function
import {checkExercise} from '../../api/checkExercise'; // import your API function
import CustomRadioButton from './CustomRadioButton';

const DiscriminantExercise = ({route, _}) => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState<string[]>([]); // if answers is an array of strings
  const [selectedValue, setSelectedValue] = useState<number>(0); // Changed from string to number
  const {kalima} = route.params; // Get the kalima from the route parameters
  const [isValid, setIsValid] = useState<boolean>(true);
  const [lastFailedSelection, setLastFailedSelection] = useState(null);

  const handleCheck = async () => {
    try {
      console.log(
        'Params :',
        kalima,
        question.ayah,
        question.chapter,
        options[selectedValue],
      );
      const result = await checkExercise(
        kalima,
        question.ayah,
        question.chapter,
        options[selectedValue],
      );
      setIsValid(result);

      if (result) {
        setLastFailedSelection(null); // Reset if the response is valid.
      } else {
        setLastFailedSelection(selectedValue);
      }

      console.log(result); // Do something with the result here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Options0 : ', options);
        const data = await loadExercise(kalima);
        setQuestion(data[0]);
        setOptions(data[1]);
        // console.log('Options1 : ', options);
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };

    fetchData();
  }, [kalima]); // Call the function when the component mounts and whenever kalima changes

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerLine}>
            <Text style={styles.leftText}>
              {question && `${question.chapter}:${question.ayah}`}
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
            text={option}
            selected={selectedValue === index}
            onPress={() => setSelectedValue(index)}
            serviceFailed={lastFailedSelection === index}
            serviceValid={isValid && selectedValue === index}
          />
        ))}
      </View>

      <Button title="Check" onPress={handleCheck} />
    </View>
  );
};

const styles = StyleSheet.create({
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
