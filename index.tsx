import { AppRegistry } from 'react-native';
import "react-native-devsettings";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nManager } from 'react-native';

import './assets/locales/i18n';
import 'intl';
import 'intl/locale-data/jsonp/ar';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/hi';
import 'intl/locale-data/jsonp/id';
import 'intl/locale-data/jsonp/ms';
import 'intl/locale-data/jsonp/sq';
import 'intl/locale-data/jsonp/tr';
import 'intl/locale-data/jsonp/ur';
import 'intl/locale-data/jsonp/zh';

import 'intl-pluralrules';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary, Logger} from 'mayo-logger';

const AppRoot: React.FC = () => {
  I18nManager.forceRTL(true);
  Logger.configure({ 
    appName: "Tafseel",
    timestamp: true 
  });

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <MainApp />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
