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


export default class MapScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'Map',
      tintColor: "#000",
    },
  }

  constructor() {
  super();
  this.state = {
    
  };
}

  render() {
    switch(this.props.route.params.option) {
      case 'restaurants': 
        return( 
          <Components.MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          showUserLocation={true}
          >
          {restaurantMarkers.map((marker, i) => (
          <Components.MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            image={marker.image}
          />
          
          ))}
         </Components.MapView>
        );
      case 'hotels':
         return( 
          <Components.MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          >
            <Components.MapView.Marker
              coordinate={{
                latitude: 65.8438,
                longitude: 24.1426,
              }}
            />
          <Components.MapView.Marker
            coordinate={{
              latitude: 65.8450,
              longitude: 24.1453,
            }}
          />
       </Components.MapView>
        );
      case 'activities':
      case 'wi-fi zones':
        return(
           <Components.MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          >
          <Components.MapView.Circle
            center={{
              latitude: 65.8450,
              longitude: 24.1453,
            }}
            radius = {100}
            fillColor = {'#00BAF7'}
                      />
          </Components.MapView>
        );
      case 'routes':
        return(
          <Components.MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 65.8444,
            longitude: 24.1449,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          >
          {routeMarkers.map((marker, i) => (
          <Components.MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            image={marker.image}
          />
          
          ))}
           <Components.MapView.Polyline
              coordinates={WalkRoutes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
              
            />
          </Components.MapView>
        );
      default: return(
        <View></View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
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
