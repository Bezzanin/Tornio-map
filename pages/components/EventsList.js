import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FBSDK from 'react-native-fbsdk';
import { Card, ListItem, Button } from 'react-native-elements'


class EventsList extends Component {
    

  render() {
    return (
        <View>
           <Card
  title='Tornio Bridge'
  image={require('../../assets/pic2.jpg')}>
  <Text style={{marginBottom: 10}}>
    Tornio Bridge is the best bridge in the worlde, exepts for that long bridge somewhere in America.
  </Text>
  <Button
    icon={{name: 'code'}}
    backgroundColor='#03A9F4'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>

  <Card
  title='Amazing Snow'
  image={require('../../assets/pic3.jpg')}>
  <Text style={{marginBottom: 10}}>
    Look at this snow right here. It looks loke Canada, but no! It is Tornio!
  </Text>
  <Button
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

