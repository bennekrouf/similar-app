import "react-native-devsettings";

import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import './languageImports';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary, Logger} from 'mayo-logger';

const AppRoot: React.FC = () => {
  I18nManager.forceRTL(true);
  // Logger.configure({ 
  //   appName: "Tafseel",
  //   timestamp: true 
  // });
  debugger
  return (
    <SafeAreaProvider>
      {/* <ErrorBoundary> */}
        {/* <NavigationContainer> */}
          <MainApp />
        {/* </NavigationContainer> */}
      {/* </ErrorBoundary> */}
    </SafeAreaProvider>
  );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
