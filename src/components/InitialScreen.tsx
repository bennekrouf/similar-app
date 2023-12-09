import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { signInFirebase } from 'mayo-firestore-write';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { RootStackParamList } from '../models/RootStackParamList';
import { handleLogout } from '../storage/handleLogout';
import conf from '../../fireBaseConfig';

type ScreenNames = keyof RootStackParamList;
const MenuScreen: ScreenNames = 'Menu';
const SignInScreenName: ScreenNames = 'SignIn';

const initFirebase = async(googleCredentials:any) => {
  return signInFirebase(googleCredentials, conf.firebaseConfig);
}

const InitialScreen = () => {
  const { user, setUser, authEvents, userContextLoading } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      navigation.navigate(MenuScreen);
    } else {
      navigation.navigate(SignInScreenName, { config: conf.firebaseConfig });
    }
  }, [user, userContextLoading]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      try {
        if (!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await initFirebase(googleCredentials);
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

  return null;
};

export default InitialScreen;
