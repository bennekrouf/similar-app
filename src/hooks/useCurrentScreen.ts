import { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CurrentScreenContext } from './CurrentScreenContext';

const useCurrentScreen = (screenName: string) => {
  const { setCurrentScreen } = useContext(CurrentScreenContext);

  useFocusEffect(
    useCallback(() => {
      setCurrentScreen(screenName);
      return () => {
        // Optionally reset the currentScreen when the component loses focus
        setCurrentScreen('');
      };
    }, [screenName, setCurrentScreen])
  );
};

export default useCurrentScreen;
