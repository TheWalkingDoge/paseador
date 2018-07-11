import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, RNFS } from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons'; 
 
const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';
import Photo from './Photo';
//import { TfImageRecognition } from 'react-native-tensorflow'; 


// import model from './android/app/src/main/assets/rounded_graph.pb';
// import labels from './android/app/src/main/assets/output_labels.txt';

 
export default class Gallery extends React.Component {
  static navigationOptions = ({navigation}) => {
    return { 
        title: "Gallery ",
        headerStyle: { backgroundColor: '#FFBF00'
        }
    }
  }
  state = { 
    images: {},
    photos: [],
    selected: [],
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  toggleSelection = (uri, isSelected) => {
    let selected = this.state.selected;
    if (isSelected) {
      selected.push(uri);
    } else {
      selected = selected.filter(item => item !== uri);
    }
    this.setState({ selected });
  };

  renderSeparator = () => {
    return ( 
        <View
            style={{ height:2, width:'100%', backgroundColor:'#F7F8E0' }}
        >
        </View>
    )
  }

  saveToGallery = async () => {
    const photos = this.state.selected;

    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        throw new Error('Denied CAMERA_ROLL permissions!');
      }

      const promises = photos.map(photoUri => {
        return MediaLibrary.createAssetAsync(photoUri);
      });

      await Promise.all(promises);
      alert('Successfully saved photos to user\'s gallery!');
    } else {
      alert('No photos to save!');
    }
  };
  postToBackend = async () => {
    const photos = this.state.selected;
    const obj = {
      uploadUrl: 'http://XXXX/user/avatar',
      method: 'POST',
      headers: {
        'Authorization': AuthStore.getUserTokenWithBearer()
      },
      files: [{
        filename: 'file', // this is what your server is looking for
        filepath: response.uri, // uri from response (local path of image on device)
        filetype: 'image/jpeg'
      }]
    };

    FileUpload.upload(obj, (err, result) => {
      this.setState({
        avatarUrl: result.data,
      });
    });
  
  };
  sendToBackend = async () => {
    const photos = this.state.selected;

    if (photos.length > 0) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        throw new Error('Denied CAMERA_ROLL permissions!');
      }

      const promises = photos.map(photoUri => {
        return MediaLibrary.createAssetAsync(photoUri);
      });

      await Promise.all(promises);
      alert('Consultando Receta, espere por favor ');
    } else {
      alert('No photos to save!');
    }
  };
 

  renderPhoto = fileName => 
    <Photo
      key={fileName}
      uri={`${PHOTOS_DIR}/${fileName}`}
      onSelectionToggle={this.toggleSelection}
    />;

  render() {
    return (
      <View style={styles.container}> 

 
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(this.renderPhoto)}
          </View>
        </ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Guardar fotos en Galería </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9FBD2',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#77A43B',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20
  },
  whiteText: {
    color: 'white',
  }
});