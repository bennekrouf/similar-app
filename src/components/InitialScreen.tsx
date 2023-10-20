import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'rn-auth-firebase';
import { signInFirebase } from 'rn-write-firestore';

import { firebaseConfig } from '../../firebaseConfig';
import { RootStackParamList } from '../models/interfaces';
import { Logger } from 'rn-logging'; // Assuming Logger is available from this path

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.navigate(user ? 'LessonPages' : 'SignIn');
  }, [user]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      Logger.info('Attempting Firebase signIn with provided credentials.', 
                  { googleCredentials },
                  { tag: 'InitialScreen' }
      );

      try {
        if(!googleCredentials || !firebaseConfig) {
          throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        }

        const newUser = await signInFirebase(firebaseConfig, googleCredentials);
        if(!newUser) {
          throw Error('InitialScreen - Firebase sign do not return any user !');
        }

        setUser(newUser);
        Logger.info('Firebase signIn successful.', 
                    { newUser },
                    { tag: 'InitialScreen' }
        );
      } catch (error) {
        Logger.error('Error occurred during Firebase signIn.', 
                     error,
                     { tag: 'InitialScreen' }
        );
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
