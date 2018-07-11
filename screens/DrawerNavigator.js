import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import { 
    createStackNavigator,
    createDrawerNavigator,
    SafeAreaView
} from 'react-navigation';

import HomeScreenTabNavigator from './Home/HomeScreenTabNavigator';
import Dashboard from './Home/TabNavigator/Tabs/Dashboard/Dashboard';
 

const InnerStackNavigator = createStackNavigator({ // en HOME las tabs de abajo
    tabNavigator: { 
        screen: HomeScreenTabNavigator
    }
}); 
const AppDrawerNavigator = createDrawerNavigator({  // apunta a Home
    Camera: {
      screen: InnerStackNavigator,
    },
    Dashboard:{
        screen: Dashboard,
    }
        
});

export default AppDrawerNavigator;
