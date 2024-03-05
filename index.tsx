import "react-native-devsettings";
import './languageImports';

import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { name } from './app.json';
import { MainApp } from './src/navigation/AppNavigator';
import { UserProvider } from 'mayo-firebase-auth';
import { MayoSettingsProvider } from 'mayo-settings';
import { SourateProvider } from './src/hooks/useFetchSourates';
import { getSizeOfAsyncStorage } from "./src/utils/iasSize";
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

crashlytics().setCrashlyticsCollectionEnabled(true);

const AppRoot: React.FC = () => {
  // I18nManager.forceRTL(true);
  getSizeOfAsyncStorage().then(size => {
    AsyncStorage.clear();
    console.log('AsyncStorage size:', size);
  });
  crashlytics().setCrashlyticsCollectionEnabled(true);
  
  return (
    // <View><Text>BENNEKROUF</Text></View>
    <SafeAreaProvider>
      <UserProvider>
        <SourateProvider>
          <MayoSettingsProvider>
            <MainApp />
          </MayoSettingsProvider>
        </SourateProvider>
      </UserProvider>
    </SafeAreaProvider>
    );
};
    
AppRegistry.registerComponent(name, () => AppRoot);
    //       
    //         
    //       </MayoSettingsProvider>
