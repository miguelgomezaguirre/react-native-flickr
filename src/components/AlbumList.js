import React, {Component} from 'react';
import {ScrollView, FlatList, Text, View} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { useState } from 'react';
import { useEffect } from 'react';

const AlbumList = (props) => {

    const [photoset, setPhotoset] = useState(null);

    useEffect(() => {
      axios.get(

        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      
        ).then(({data}) => {

        setPhotoset(data.photosets.photoset);

      }).catch((error) => {

        console.log(error);

      })
    }, [])

    const renderAlbum = ({item}) => (
      <AlbumDetail
          navigation={props.navigation}
          key={item.id}
          title={item.title._content}
          albumId={item.id}
      />
    );

    if (!photoset) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={photoset}
          renderItem={renderAlbum}
        />
      </View>
    );
}

/*
class AlbumList extends Component {
  state = {photoset: null};

  componentWillMount() {
    axios
      .get(
        'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
      )
      .then((response) =>
        this.setState({photoset: response.data.photosets.photoset}),
      );
  }

  renderAlbums() {
    return this.state.photoset.map((album) => (
      <AlbumDetail
        navigation={this.props.navigation}
        key={album.id}
        title={album.title._content}
        albumId={album.id}
      />
    ));
  }

  render() {

    if (!this.state.photoset) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView>{this.renderAlbums()}</ScrollView>
      </View>
    );
  }
}
*/
export default AlbumList;
