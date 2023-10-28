import React, { useEffect, useContext } from 'react';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { signInFirebase } from 'mayo-firestore-write';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/interfaces';
import { handleLogout } from '../storage/handleLogout';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      try {
        if (!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(googleCredentials);
        if (!newUser) throw Error('InitialScreen - Firebase sign do not return any user !');
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
    if (user) {
      // Navigate to MenuScreen once user is authenticated
      navigation.navigate('Menu');
    } else {
      navigation.navigate('SignIn');
    }
  }, [user]);

  return null;
};

export default InitialScreen;
