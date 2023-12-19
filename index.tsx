import "react-native-devsettings";

import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import './languageImports';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary, Logger} from 'mayo-logger';
import { UserProvider } from 'mayo-firebase-auth';
import { MayoSettingsProvider } from 'mayo-settings';
import { ChapterProvider } from './src/hooks/useFetchChapters';

const AppRoot: React.FC = () => {
  I18nManager.forceRTL(true);
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
      <UserProvider>
        <ChapterProvider>
          <MayoSettingsProvider>
            <MainApp />
          </MayoSettingsProvider>
          </ChapterProvider>
        </UserProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
