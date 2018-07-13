import React from 'react';
import { 
  StyleSheet, 
  Text, 
  FlatList,
  View,
  Image,
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import { 
    Button, 
    Container, 
    Content,  
} from 'native-base'; 

class PaseoCard extends React.Component {
    constructor (){
        super()
        this.state = {
            dataSource:[],
        }
    }
    renderItem = ({item}) => {
        const {navigation} = this.props;
        const email = navigation.getParam('email','NO-EMAIL');
        const password = navigation.getParam('password','NO-PASSWORD');
        return (
            <View style={styles.flatItem}>  
                <View style={styles.flatContent}> 
                    <Text style={styles.itemHorario}>
                        {item.horario}
                    </Text>

                    <Text style={styles.itemComentario}>
                        {item.dia}
                    </Text> 
                </View>
                <TouchableOpacity onPress={()=> this.assignPaseos(email,password,item.id)}>
                    <Text>
                        Tomar Paseo
                    </Text>
                </TouchableOpacity>
                {/* <Button  onPress={()=> this.assignPaseos(correo,contrasena,item.id)}
                        title= 'Tomar Paseo'
                    >
                </Button> */}

            </View>  
        ) 
    }

    renderSeparator = () => {
        return ( 
            <View
                style={{ height:2, width:'100%', backgroundColor:'white' }}
            >
            </View>
        )
    }
    componentWillMount (){
        const url = 'http://192.168.0.13:3001/paseo/all/' 
        fetch(url) 
        .then((response) => response.json() )
        .then( ( responseJson)=> {
            this.setState({
                dataSource: responseJson.data});
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    componentDidMount (){

    } 

    assignPaseos (correo,contrasena,idPaseo){
        let collection = {}
        collection.email=correo,
        collection.password=contrasena,
        collection.idpaseo=idPaseo
        console.warn(collection);
     
        const url = 'http://192.168.1.159:3001/paseador/tomarpaseo'
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(collection),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }) 
        .then((response) => response.json() )
        .catch((error) => { console.log(error) })
    }

    render() {
        return (
            <View style={styles.container}>
  
                <FlatList  
                    data = {this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                {/* <TouchableOpacity onPress={()=> this.assignPaseos(correo,contrasena,item.id)}>
                    <Text>
                        Tomar Paseo
                    </Text>
                </TouchableOpacity> */}
                {/* <Button  onPress={()=> this.assignPaseos(correo,contrasena,item.id)}
                        title= 'Tomar Paseo'
                    >
                </Button> */}
            </View> 

        );
    }
}

export default PaseoCard;

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#F7F8E0'
    },  
    // flatItem: {
    //     flex: 1,
    //     flexDirection:'row',
    // },  
    // flatContent:{
    //     flex:1,
    //     justifyContent:'center',
    //     marginLeft:5
    // },
    // itemHorario:{
    //     fontSize:19
    // },
    // itemComentario:{
    //     fontSize:17
    // }
});
