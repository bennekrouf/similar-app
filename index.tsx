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

const AppRoot: React.FC = () => {
  I18nManager.forceRTL(true);
  // Logger.configure({ 
  //   appName: "Tafseel",
  //   timestamp: true 
  // });

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <UserProvider>
            <MainApp />
          </UserProvider>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
