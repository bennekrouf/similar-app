import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { signInFirebase } from 'mayo-firestore-write';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { RootStackParamList } from '../models/RootStackParamList';
import { handleLogout } from '../storage/handleLogout';
import { Platform } from 'react-native';
const firebaseConfig = Platform.OS === 'android' ? {
  apiKey: 'AIzaSyAfvcfClkm9KKLG7f3pm5IdJi4skpGsXRQ',
  authDomain: 'tafseel-7f242.firebaseapp.com',
  projectId: 'tafseel-7f242',
  storageBucket: 'tafseel-7f242.appspot.com',
  messagingSenderId: '581865288762',
  appId: '1:581865288762:android:fca352231f244f19253103',
  databaseURL: '',
  measurementId: '',
}:undefined;

type ScreenNames = keyof RootStackParamList;
const MenuScreen: ScreenNames = 'Menu';
const SignInScreenName: ScreenNames = 'SignIn';

const InitialScreen = () => {
  const { user, setUser, authEvents, userContextLoading } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if(!userContextLoading) navigation.navigate(user ? MenuScreen : SignInScreenName);
  }, [user, userContextLoading]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      try {
        if (!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(googleCredentials, firebaseConfig);
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
      navigation.navigate('Menu');
    } else {
      navigation.navigate('SignIn', { config: firebaseConfig });
    }
  }, [user]);

  return null;
};

export default InitialScreen;
