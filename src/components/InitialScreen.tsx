import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'rn-auth-firebase';
import { signInFirebase } from 'rn-write-firestore';

import { firebaseConf } from '../../firebaseConfig';
import { RootStackParamList } from './NavigationTypes';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
      navigation.navigate(user ? 'LessonPages' : 'SignIn');
  }, [user]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      const newUser = await signInFirebase(firebaseConf, googleCredentials);
      setUser(newUser);
    };
    authEvents.on('signedIn', onSignedIn);

    return () => {
      authEvents.off('signedIn', onSignedIn);
    };
  }, []);

  return null;
};

export default InitialScreen;
