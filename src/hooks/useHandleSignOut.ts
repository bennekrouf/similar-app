import { useEffect, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UserContext } from 'mayo-firebase-auth';
import { Logger } from 'mayo-logger';
import { RootStackParamList } from '../models/RootStackParamList';

const useHandleSignOut = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { authEvents } = useContext(UserContext);

  useEffect(() => {
    const onSignedOut = async () => {
      Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'useHandleSignOut' });
      navigation.navigate('SignIn');
    };

    authEvents.on('signedOut', onSignedOut);

    return () => {
      Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'useHandleSignOut' });
      authEvents.off('signedOut', onSignedOut);
    };
  }, [authEvents, navigation]);
};

export default useHandleSignOut;
