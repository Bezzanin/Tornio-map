import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import NewsItem from './components/NewsItem';
import { Router } from '../main';
import Icons from './components/Icons';
import Weather from './components/Weather';
import NewsList from './components/NewsList';
import EventsList from './components/EventsList';


export default class HomeScreen extends Component {
  
  static route = {
    navigationBar: {
      title: 'Examples',
    },
  }

    _goToScreen = (name, option) => () => {
    this.props.navigator.push(Router.getRoute(name, { option }));
  }

 
  
  render() {
    
    return (
      <ScrollView>
        <Weather />
        <View style={styles.bgRectangular} />
        <Icons />
        <NewsList />
        <EventsList />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  bgRectangular: {
    height: 300,
    width: 400,
    alignSelf: 'stretch',
    backgroundColor: '#00BAF7',
    transform: [
      {skewY: '170deg'}
    ],
    zIndex: -1,
    marginTop: -40,
  },
 
  center: {
    marginTop: 20,
  },
  iconsContainer: {
    marginTop: -250,
  },
  placeIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOpacity: 0,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0
    }
    /* Rectangle 3 Copy 8: */
// background: #FFFFFF;
// box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
// border-radius: 6px;
  },
  iconText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  //weather
  lowerText: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 25,
  }
  
});


