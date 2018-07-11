import React from 'react';
import { 
    StyleSheet,  
} from 'react-native';
import { 
    createBottomTabNavigator,
    createDrawerNavigator
} from 'react-navigation';
import { 
    Container,
    Text,
    Content,
    Icon
} from 'native-base';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons, Octicons } from '@expo/vector-icons';
 
import Camera from './TabNavigator/Tabs/Camera/Camera';
import Dashboard from './TabNavigator/Tabs/Dashboard/Dashboard';

export default class AppTabNavigator extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <Ionicons name='md-menu' size={24} 
                style={{paddingLeft:10}}
                onPress={()=> navigation.openDrawer() }
                />,
                title: "The Walking Doge",
                headerStyle: { backgroundColor: '#77A43B'}
        }
    }
    render() {
      return (
          <HomeScreenTabNavigator/> 
      );
    }
  }

const HomeScreenTabNavigator = createBottomTabNavigator ({
    Dashboard : {
        screen: Dashboard,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Dashboard') {
                  iconName = `note`;
                }
                return <Octicons name={iconName} size={25} color={tintColor} />;
              },

        }) 
    },
    Camera : {
        screen: Camera,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Camera') {
                  iconName = `ios-camera${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            }
        })
    }

});

const styles = StyleSheet.create({
    container: {
        padding:10, 
        flexDirection: 'row'
    }, 
    titulo:{
        textAlign: 'center',
        fontSize: 21,
        marginRight: 30,
        opacity:0.9
    }

})