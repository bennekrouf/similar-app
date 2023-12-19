import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';

import { signInFirebase } from 'mayo-firestore-write';
import { UserContext, UserContextType } from 'mayo-firebase-auth';

import { RootStackParamList } from '../models/RootStackParamList';
import { handleLogout } from '../storage/handleLogout';
import conf from '../../fireBaseConfig';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  debugger
  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignIn', { config: conf.firebaseConfig });
    }
  }, [user]);

  useEffect(() => {
    const onSignedIn = async (googleCredentials) => {
      try {
        if (!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
        const newUser = await signInFirebase(googleCredentials, conf.firebaseConfig);
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

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/mayologo.jpg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default InitialScreen;
