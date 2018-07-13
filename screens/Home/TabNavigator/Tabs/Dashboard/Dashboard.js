import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AppRegistry,
  TouchableHighlight
} from 'react-native';
import PaseoCard from './PaseoCard';
import PasearCard from './PasearCard';


export default class Dasboard extends React.Component {
    state = {
        newPhotos: false,
        permissionsGranted: false,
        showGallery: false,
    };
    // toggleView = () => this.setState({ showGallery: !this.state.showGallery, newPhotos: false });
    renderGallery() {
        return <Gallery navigation={this.props.navigation} />;
    }
    render() {
        return (
            <View >  
                <View> 
                    <Text style={styles.titulo} > Paseos disponibles </Text> 

                    < PaseoCard  navigation={this.props.navigation}/>
 
                </View> 
                <View> 
                    <Text  > Paseo a realizar  </Text> 

                    < PasearCard  navigation={this.props.navigation}/>
 
                </View> 

            </View>
            
        );
    }
}

const styles = StyleSheet.create({ 
    titulo:{
        textAlign: 'center',
        fontSize: 21,
        marginTop: 5,
        opacity:0.9,
        backgroundColor: '#8CC540'
    },


    addButton: {
        backgroundColor: '#81601A',
        borderColor: '#81601A',
        borderWidth: 1,
        height: 100,
        width: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 120,
        right:20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
      }
});
AppRegistry.registerComponent('App', () => App);

