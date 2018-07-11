import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Plataform,

} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './screens/Login/Login';
import Splash from './screens/Splash/Splash';
import LoginForm from './screens/Login/LoginForm';
import DrawerNavigator from './screens/DrawerNavigator';


export default class App extends React.Component {
  render() {
    return (
      <RootStack />
      //<Splash/>
    );
  }
}
const RootStack = createStackNavigator({
  // Splash : {
  //   screen : Splash
  // },
  Login : {
    screen : Login
  },
  LoginForm : {
    screen : LoginForm
  },
  DrawerNavigator :{
    screen : DrawerNavigator,
    navigationOptions: {
      header: null 
    }
  }
}, { 
  navigationOptions:{
    gesturesEnable: false
  }
})
