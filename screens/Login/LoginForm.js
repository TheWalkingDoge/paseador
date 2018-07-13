import React from 'react';
import { 
    StyleSheet, 
    TextInput, 
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    KeyboardAvoidingView,
    Button
} from 'react-native';
import createStackNavigator from 'react-navigation';
import Login from './Login';
import * as firebase from 'firebase'; 
import { stringify } from 'querystring';  

class LoginForm extends React.Component {
    static navigationOptions = {
        header : null 
    }
    constructor(props){
        super(props)
        this.state = { 
            email: '',
            password: '',
            response: ''
        }
        this.login = this.login.bind(this)
    }

    componentWillMount (){
        var config = {
            apiKey: "AIzaSyBfR7sFJkHu19WjzIkcR6FKL98M_fvyYn0",
            authDomain: "walkingdodge.firebaseapp.com",
            databaseURL: "https://walkingdodge.firebaseio.com",
            projectId: "walkingdodge",
            storageBucket: "walkingdodge.appspot.com",
            messagingSenderId: "700345645357"
        };
        firebase.initializeApp(config);
    }
 

    async login(){
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            this.setState({
            response: 'usario conectado'
            })
            setTimeout(()=>{
                this.props.navigation.navigate('DrawerNavigator')
            }, 100)
        } catch(error){
            this.setState({
                response: error.toString()
            })
        }
    }


    render() {
        return (
            <View style={styles.container}> 
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TextInput 
                        placeholderTextColor="grey"
                        placeholder="Email"
                        style={styles.input} 
                        onChangeText={(email)=> this.setState({email})}/>
                    <TextInput 
                        placeholderTextColor="grey"
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry={true}
                        password={true}
                        onChangeText={(password)=> this.setState({password})}/>    
                    <TouchableOpacity 
                        onPress={this.login}
                        style={  styles.buttonContainer}>

                        {/* style={[styles.loginButton, styles.buttonContainer]}> */}
                    <Text
                        style={[styles.buttonText]}>Login</Text>
                    </TouchableOpacity> 
                </KeyboardAvoidingView>
          </View>
            );
        }
}
 
export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        position:'absolute',
        left: 0,
        right:0,
        bottom:2
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        //backgroundColor: '#EFFBFB',
        height:40,
        marginBottom:10, 
        paddingHorizontal: 10
    },
    buttonContainer: {
        padding: 15,
        backgroundColor:'#77A43B',
    },
    buttonText: {
        color:'#000000',
        textAlign:'center',
        fontSize: 18
    }, 
});