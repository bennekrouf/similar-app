import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {loadExercise} from '../../api/loadExercises'; // import your API function
import {checkExercise} from '../../api/checkExercise'; // import your API function

const DiscriminantExercise = ({route, navigation}) => {
  const [exercise, setExercise] = useState(null);
  const {kalima} = route.params; // Get the kalima from the route parameters

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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{kalima}</Text>
      {/* Display some data from the exercise here */}
      {exercise && <Text>{exercise[0].kalima}</Text>}
      <Button title="Check" onPress={handleCheck} />
    </View>
  );
};

export default DiscriminantExercise;
