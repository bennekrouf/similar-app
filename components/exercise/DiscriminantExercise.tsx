import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';

import {RadioButton, Text, Card} from 'react-native-paper';

import {loadExercise} from '../../api/loadExercises'; // import your API function
import {checkExercise} from '../../api/checkExercise'; // import your API function

const DiscriminantExercise = ({route, navigation}) => {
  const [exercise, setExercise] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const {kalima} = route.params; // Get the kalima from the route parameters
  console.log("toto :", exercise);

  const handleCheck = async () => {
    try {
      const result = await checkExercise(
        kalima,
        exercise[0].ayah,
        exercise[0].chapter,
      );
      console.log(result); // Do something with the result here
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadExercise(kalima);
        setExercise(data);
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
              {exercise && `${exercise[0].chapter}:${exercise[0].ayah}`}
            </Text>
            <Text style={styles.rightText}>
              {exercise && exercise[0].chapter_name}
            </Text>
          </View>
          <Text style={styles.rightAlignedText}>
            {exercise && `${exercise[0].pre} ... ${exercise[0].post}`}
          </Text>
        </Card.Content>
      </Card>

      {/* <RadioButton.Group
        onValueChange={newValue => setSelectedValue(newValue)}
        value={selectedValue}>
        {exercise[1].map((response, index) => (
          <View key={index} style={styles.radioButtonContainer}>
            <Text>{response}</Text>
            <RadioButton value={response} />
          </View>
        ))}
      </RadioButton.Group> */}

      <Button title="Check" onPress={handleCheck} />
    </View>
  );
};

const styles = StyleSheet.create({
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
