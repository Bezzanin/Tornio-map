import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Components } from 'exponent';
import WalkRoutes from '../data/walkroutes';
import { restaurantMarkers, routeMarkers } from '../data/markers';
import Filters from './components/Filters';
import Layout from '../constants/Layout';
import Icons from './components/Icons';
import MarkersList from './components/MarkersList';
import ModalDropdown from 'react-native-modal-dropdown';
import MapDropDown from '.components/MapDropDown';

export default class MapScreen extends Component {

  

  static route = {
    navigationBar: {
      title: 'Map',
      tintColor: "#FFFFFF",
    },
  }

  constructor() {
  super();
  this.state = {
    AllMarkers: [],
    CategoryMarkers: [],
    option: '',
    slug: '',
  };
  this.findMarkers = this.findMarkers.bind(this);
}

  componentWillMount() {
    const { option } = this.props.route.params;
    this.setState({
           option
        });
    fetch('http://test.madeinyaba.com/api/get_posts/?post_type=markers')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
           AllMarkers: responseData.posts,
        });
      })
      .done();
      
      
    };
    
  componentDidMount() {
  this.findMarkers(this.state.option);
  console.log(this.state.option);
  console.log(this.state.slug);
  console.log(this.state.CategoryMarkers)
}

findMarkers = (option) => {
  let newMarkers = this.state.AllMarkers.filter((all) => {
    return (all.categories[0].slug == option)
    
  });
  this.setState({
      CategoryMarkers: newMarkers,
    });
}

  render() {
 
        return(
          <View style={styles.container}>
            
          <Components.MapView
          style={styles.map}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          showUserLocation={true}
          >
          {this.state.AllMarkers.map((marker, i) => (
          <Components.MapView.Marker
            key={i}
            coordinate = {{
              latitude: parseFloat(marker.taxonomy_latitude[0].title),
              longitude: parseFloat(marker.taxonomy_longitude[0].title)
            }}
            title={marker.title}
            description={marker.content.replace(/(<([^>]+)>)/ig,"")}
          />
          
          ))}
         </Components.MapView>
         <MarkersList />
         <MapDropDown />
          </View>
        );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Layout.window.width,
    height: Layout.window.height
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
});
