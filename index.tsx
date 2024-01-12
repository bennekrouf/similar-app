import "react-native-devsettings";

import { AppRegistry, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager, Text, Button } from 'react-native';
import './languageImports';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary, Logger} from 'mayo-logger';
import { UserProvider } from 'mayo-firebase-auth';
import { MayoSettingsProvider } from 'mayo-settings';
import { SourateProvider } from './src/hooks/useFetchSourates';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSizeOfAsyncStorage } from "./src/utils/iasSize";
import crashlytics from '@react-native-firebase/crashlytics';
// import { View } from "react-native-reanimated/lib/typescript/Animated";

// // Enable Crashlytics collection
crashlytics().setCrashlyticsCollectionEnabled(true);

// (async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage has been cleared!');
//   } catch (e) {
//     console.error('Failed to clear the AsyncStorage.');
//   }
// })();

const testCrash = () => {
  console.log('Simulate crash');

  crashlytics().setCrashlyticsCollectionEnabled(true);
  crashlytics().crash(); // This will cause a test crash
};

const AppRoot: React.FC = () => {
  // I18nManager.forceRTL(true);
  getSizeOfAsyncStorage().then(size => {
    console.log('AsyncStorage size:', size);
  });
  crashlytics().setCrashlyticsCollectionEnabled(true);
  
  return 
          (
          <SafeAreaProvider>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Test Crash" onPress={testCrash} />
              </View>
          </SafeAreaProvider>
          );
    //   <ErrorBoundary>
    //     <UserProvider>
    //       <SourateProvider>
    //         <MayoSettingsProvider>
              {/* <MainApp /> */}
              
    //         </MayoSettingsProvider>
    //       </SourateProvider>
    //     </UserProvider>
    //   </ErrorBoundary>;
};
    
AppRegistry.registerComponent(name, () => AppRoot);
