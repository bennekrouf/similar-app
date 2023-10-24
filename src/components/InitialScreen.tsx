import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'rn-auth-firebase';
import { signInFirebase } from 'rn-write-firestore';

import { firebaseConfig } from '../../firebaseConfig';
import { RootStackParamList } from '../models/interfaces';
import { Logger } from 'rn-logging';
import { handleLogout } from '../storage/handleLogout';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      try {
        if(!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(firebaseConfig, googleCredentials);
        if(!newUser) throw Error('InitialScreen - Firebase sign do not return any user !');
        setUser(newUser);
      } catch (error) {
        handleLogout();
      }
    };
    authEvents.on('signedIn', onSignedIn);

    return () => {
      authEvents.off('signedIn', onSignedIn);
    };
    
  }, []);

  useEffect(() => {
    navigation.navigate(user ? 'LessonPages' : 'SignIn');
  }, [user]);

  return null;
};

export default InitialScreen;
