import React from 'react';
import { 
  StyleSheet, 
  Text, 
  FlatList,
  View,
  Image,
  AppRegistry,
  TouchableHighlight
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
        return (
            <View style={styles.flatItem}>
                <Text> Hola 3</Text>
                {/* <Image style={{ width: 100, height:100}}
                    source = {{uri: item.picture }} /> */}
                <View style={styles.flatContent}> 
                    <Text style={styles.itemHorario}>
                        {item.name}
                    </Text>

                    <Text style={styles.itemComentario}>
                        {item.about}
                    </Text> 
                </View> 

                <Button
                        title= 'Tomar Paseo'
                    >
                    </Button>
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
        const url = 'http://www.json-generator.com/api/json/get/cgiLPwERlu?indent=2'
        //const url = 'http://192.168.1.159:3001/paseo/all/' 
        fetch(url)
        // fetch(url, {
        //     method: 'GET',
        // })
        .then((response) => response.json() )
        .then( ( responseJson)=> {
            this.setState({
                dataSource: responseJson.receta_array});
        })
        .catch((error) => {
            console.log(error)
        })  
    } 

    // _setPaseo (){
    //     let collection = {}
    //     collection.email=email, 
    //     console.warn(collection);
     
    //     const url = 'http://192.168.1.159:3001/create/paseo/ '
    //     fetch(url, {
    //       method: 'POST',
    //       body: JSON.stringify(collection),
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     }) 
    //     .then((response) => response.json() )
    //     .catch((error) => { console.log(error) })
    // }

    render() {
        return (
            <View style={styles.container}>

                <Text> Hola 1</Text>
                <FlatList  
                    data = {this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                /> 

                <Text> Hola 2</Text>
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
