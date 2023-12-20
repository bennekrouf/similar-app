import "react-native-devsettings";

import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager, Text } from 'react-native';
import './languageImports';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary, Logger} from 'mayo-logger';
import { UserProvider } from 'mayo-firebase-auth';
import { MayoSettingsProvider } from 'mayo-settings';
import { ChapterProvider } from './src/hooks/useFetchChapters';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// (async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage has been cleared!');
//   } catch (e) {
//     console.error('Failed to clear the AsyncStorage.');
//   }
// })();

const AppRoot: React.FC = () => {
  I18nManager.forceRTL(true);
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <UserProvider>
          <MayoSettingsProvider>
            <MainApp />
          </MayoSettingsProvider>
        </UserProvider>
        {/* <UserProvider>
          <ChapterProvider>
          </ChapterProvider>
        </UserProvider> */}
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
