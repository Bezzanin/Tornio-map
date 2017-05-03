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
import MapDropDown from './components/MapDropDown';

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
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };
  this.findMarkers = this.findMarkers.bind(this);
  this.handleClick = this.handleClick.bind(this);
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
  
   this.timeout = setTimeout(() =>  {this.findMarkers(this.state.option)}, 1000);

   navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  
}
componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

findMarkers = (option) => {
  var newMarkers = this.state.AllMarkers.filter((marker) => {
    //console.log('This is slug' + marker.categories[0].slug)
    return (marker.categories[0].slug === option);
    
  });
  this.setState({
      CategoryMarkers: newMarkers,
    });
}

handleClick(idx, value) {
    this.setState({
           option: value,
        });
    this.timeout = setTimeout(() =>  {this.findMarkers(this.state.option)}, 100);
    console.log(this.state.initialPosition);
    console.log(this.state.lastPosition);
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
          followUserLocation={true}
          >
          {this.state.CategoryMarkers.map((marker, i) => (
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
         <MarkersList 
          markers={this.state.CategoryMarkers}
         />
         <MapDropDown 
         option={this.state.option}
         handleClick = {this.handleClick} />
          </View>
        );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
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
