import React, {Component} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import { useState } from 'react';
import { useEffect } from 'react';

const PhotoList = (props) => {

    const [photos, setPhotos] = useState(null);

    useEffect(() => {
      axios.get(

        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
      
        ).then(({data}) => {

        setPhotos(data.photoset.photo)

      }).catch((error) => {

        console.log(error);

      })
    }, [])

    const renderPhoto = ({item}) => (
      <PhotoDetail
        key={item.title}
        title={item.title}
        imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
        />
    );

    if (!photos) {
      return (
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={photos}
          renderItem={renderPhoto}
        />
      </View>
    );
}

/*
class PhotoList extends Component {
  state = {photos: null};

  componentWillMount() {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
      )
      .then((response) =>
        this.setState({photos: response.data.photoset.photo}),
      );
  }

  renderAlbums() {
    return this.state.photos.map((photo) => (
      <PhotoDetail
        key={photo.title}
        title={photo.title}
        imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      />
    ));
  }

  render() {
    console.log(this.state);

    if (!this.state.photos) {
      return (
        <View style={{flex: 1}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>{this.renderAlbums()}</ScrollView>
      </View>
    );
  }
}
*/
export default PhotoList;
