/**
 * @format
 */
//navigatison
import 'react-native-gesture-handler';
//
import {AppRegistry} from 'react-native';
import App from './src/Navigation/MainNavigatison';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
