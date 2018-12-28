import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createAppContainer } from "react-navigation";
import Routes from './src/Routes';

const App = createAppContainer(Routes);
AppRegistry.registerComponent(appName, () => App);