import { flushFromAsyncStorage, syncAsyncStorageToFirestore } from 'rn-write-firestore';
import { useLogout } from 'rn-auth-firebase';
import { Logger } from 'rn-logging';

export const handleLogout = async () => {
    const { performLogout } = useLogout();

    try {
      Logger.info('Initiating logout sequence...', null, { tag: 'HomeScreen:handleLogout' });
  
      Logger.info('Synchronizing AsyncStorage to Firestore...', null, { tag: 'HomeScreen:handleLogout' });
      await syncAsyncStorageToFirestore();
  
      Logger.info('Flushing data from AsyncStorage...', null, { tag: 'HomeScreen:handleLogout' });
      await flushFromAsyncStorage();
  
      Logger.info('Performing logout...', null, { tag: 'HomeScreen:handleLogout' });
      performLogout();
    } catch (error) {
      Logger.error('Error during logout.', error, { tag: 'HomeScreen:handleLogout' });
    }
  }