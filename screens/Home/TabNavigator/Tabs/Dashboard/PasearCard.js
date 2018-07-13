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

class PasearCard extends React.Component {
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
                <TouchableOpacity style={styles.subBtn}
                                onPress={()=> this.startPaseos(item.id)}>
                    <Text>
                        Finalizar Paseo
                    </Text>
                </TouchableOpacity> 

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
        
    }
    componentDidMount (){ 
        
    } 
    getPaseoId(correo,constrasena) {
        const url = 'http://192.168.1.99:3001/paseo/paseador/pendiente' 
        fetch(url, {
            method: 'GET',
            headers: {
              email: correo,
              password: contrasena,
            },
        })
        .then((response) => response.json() )
        .then( ( responseJson)=> {
            this.setState({
                dataSource: responseJson.data});
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    startPaseo (idPaseo){
        let collection = {} 
        collection.idpaseo=idPaseo
        console.warn(collection);
     
        const url = 'http://192.168.1.99:3001/paseo/terminar'
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
        const {navigation} = this.props;
        const email = navigation.getParam('email','NO-EMAIL');
        const password = navigation.getParam('password','NO-PASSWORD');

        return (
            <View style={styles.container}> 
                <FlatList  
                    data = {this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View> 

        );
    }
}

export default PasearCard;

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#F7F8E0'
    },  
    subBtn:{
        backgroundColor:'#6F8F37',
        justifyContent:'center',
        alignItems:'center',
        height:40
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
