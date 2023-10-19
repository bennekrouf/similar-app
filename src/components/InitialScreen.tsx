import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'rn-auth-firebase';
import { signInFirebase } from 'rn-write-firestore';

import { firebaseConf } from '../../firebaseConfig';
import { RootStackParamList } from '../models/interfaces';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
      navigation.navigate(user ? 'LessonPages' : 'SignIn');
  }, [user]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      // console.log(`BEFORE signInFirebase with credentials: ${JSON.stringify(googleCredentials)}`);
      try {
        if(!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(firebaseConf, googleCredentials);
        if(!newUser) throw Error('InitialScreen - Firebase sign do not return any user !');
        setUser(newUser);
      } catch (error) {
        console.log('OH ERROR in firebase signin', error);
        return error;   
      }
    };
    authEvents.on('signedIn', onSignedIn);

    return () => {
      authEvents.off('signedIn', onSignedIn);
    };
  }, []);

  return null;
};

export default InitialScreen;
