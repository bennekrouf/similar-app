import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { UserProvider } from 'rn-auth-firebase';

const Main = () => {
    return (
      <UserProvider>
        <App />
      </UserProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Main);
