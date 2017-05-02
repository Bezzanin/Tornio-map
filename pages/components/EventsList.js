import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, WebView, Linking, ListView, ScrollView, Keyboard } from "react-native";
import { Card, ListItem, Button } from 'react-native-elements'
import { Router } from '../../main';
import moment from 'moment';

var _ = require('lodash');

class EventsList extends Component {

  constructor(props) {
    super(props);
    this._goToScreen = this._goToScreen.bind(this);
    this.state = {
      events: [],
       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
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


  componentWillMount() {
    fetch('http://www.json.pub/kegs/1f947ee5ad3b/tap.json')
      .then((response) => response.json())
      .then((responseData) => {
        var results = _.uniqBy(responseData.events, 'id');
        this.setState({
          events: results,
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.events),
        });
      })
      .done();
      };


    
  



  render() {
    return (
        <ScrollView>
           <ListView
        
        horizontal={false}
        enableEmptySections 
        dataSource={this.state.dataSource}
        onScroll={() => Keyboard.dismiss()}
        renderRow={(event) => {
            handleClick = () => {
            const url = "https://www.facebook.com/events/"+event.id+"/"
            Linking.canOpenURL(url).then(supported => {
             if (supported) {
            Linking.openURL(url);
            } else {
          console.log('Don\'t know how to open URI: ' + url);
           }
          });
          };

            return (
            <Card
                image={{uri: event.coverPicture}}
                title={event.name}>
              <Text 
                numberOfLines={15}
                style={{marginBottom: 10}}
                >{event.description}</Text>
              <Text
                style={{marginBottom: 10}}
                >Date: {moment(event.startTime).format('LLL')}</Text>
              <Text
                style={{marginBottom: 10}}
                >Place: {event.venue.name}</Text>
              <Button
                onPress={handleClick}
                icon={{name: 'code'}}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Read More' />
              </Card>
            )
        }}
        />


      </ScrollView>
    );
  }
}

export default EventsList;

