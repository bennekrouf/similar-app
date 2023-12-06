import { useEffect, useContext } from 'react';
import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { signInFirebase } from 'mayo-firestore-write';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../models/interfaces';
import { handleLogout } from '../storage/handleLogout';

const firebaseConfig = {
  apiKey: 'AIzaSyAfvcfClkm9KKLG7f3pm5IdJi4skpGsXRQ',
  authDomain: 'tafseel-7f242.firebaseapp.com',
  projectId: 'tafseel-7f242',
  storageBucket: 'tafseel-7f242.appspot.com',
  messagingSenderId: '581865288762',
  appId: '1:581865288762:android:fca352231f244f19253103',
  databaseURL: '',
  measurementId: '',
};

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignIn', { config: firebaseConfig });
    }
  }, [user]);

  return null;
};

export default InitialScreen;
