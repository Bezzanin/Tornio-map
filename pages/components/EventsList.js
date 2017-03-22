import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, WebView, Linking } from "react-native";
import FBSDK from 'react-native-fbsdk';
import { Card, ListItem, Button } from 'react-native-elements'
import { Router } from '../../main';

class EventsList extends Component {

  constructor(props) {
    super(props);
    this._goToScreen = this._goToScreen.bind(this);
   
  }

   static route = {
    navigationBar: {
      title: 'Events', 
    },
  }

  static propTypes = {
    url: React.PropTypes.string,
  };

    _goToScreen = (name, option) => () => {
    this.props.navigator.push(Router.getRoute(name, { option }));
  }


    
  
handleClick = () => {
  const url = "https://www.suurpilkit.fi/"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

handleClick2 = () => {
  const url = "http://www.torandaonice.com/info/in-english.html"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  render() {
    return (
        <View>
           <Card
  title='Tornio Ice fishing competition'
  image={require('../../assets/pict2.jpg')}>
  <Text style={{marginBottom: 10}}>
   Tornion Suurpilkit is an ice fishing event for the entire family. The competition is arranged every year on the Tornio river ice, at the center of the city.
  </Text>
  <Button
    onPress={this.handleClick}
    icon={{name: 'code'}}
    backgroundColor='#03A9F4'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>

  <Card
  title='Toranda on Ice 2'
  image={require('../../assets/pict3.png')}>
  <Text style={{marginBottom: 10}}>
    Toranda on Ice is a regular event with a lot of activities and concerts.
  </Text>
  <Button
    onPress={this.handleClick2}
    icon={{name: 'code'}}
    backgroundColor='#03A9F4'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>
      </View>
    );
  }
}

export default EventsList;

