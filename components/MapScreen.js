import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import pak from '@exponent/ex-navigation/package.json';
import { Components } from 'exponent';

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

  render() {
    return (
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
          latitude: 65.8442,
          longitude: 24.1443,
        }}
       />
       <Components.MapView.Marker
        coordinate={{
          latitude: 65.8440,
          longitude: 24.1430,
        }}
       />
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
