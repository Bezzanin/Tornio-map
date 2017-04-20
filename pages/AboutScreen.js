import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  WebView,
  Linking
} from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { List, ListItem, PricingCard } from 'react-native-elements';
import SininenLinja from '../data/kaupunkilinja';


export default class HomeScreen extends Component {

componentDidMount() {
  this.interval = setInterval(() => this.timeToDecimal(this.state.currentTime), 5000);
}
componentWillUnmount() {
  clearInterval(this.interval);
}

  static route = {
    navigationBar: {
      title: 'Timetable',
    },
  }

  constructor(props){
    super(props);
    this.state = {
      currentDay: moment().format('dddd'),
      currentTime: moment().format('h:mm'),
      timeinNumber: moment().format('h:mm'),
    }
    this.timeToDecimal = this.timeToDecimal.bind(this);
  }

timeToDecimal(currentTime) {
    var arr = currentTime.split(':');
    var dec = parseInt((arr[1])*10, 10);
    this.setState({
        timeinNumber: parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec),
      });
}

showOnMap = () => {
  const url = "http://v3.kiho.fi/public/mymap?map=953744"
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
   <ScrollView>
                <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'background', duration: 300, highlightColor: 'white'}}
                    style={{paddingTop: 20, paddingBottom: 20}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#00BAF7'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    iconLeft={require('../assets/left-arrow.png')}
                    iconRight={require('../assets/right-arrow.png')}
                    iconContainer={{flex: 0.1}}
                    onDateSelected={(i) => this.setState({ currentDay: i.format('dddd') })}
                    
                />
                <PricingCard
                  color='#00BAF7'
                  title='Kaupunkilinja'
                  price={this.state.currentTime}
                  info={['Linja: Sininen', 'Last Stop: Matkakeskus']}
                  button={{ title: 'SHOW ON MAP', icon: 'directions-bus' }}
                  onButtonPress={this.showOnMap}
                  />  
                <List>
                {
                SininenLinja.map((item, i) => {
                  if (this.state.currentTime != item.time) {
                    return (
                  <ListItem
                      hideChevron={true}
                      key={i}
                      title={item.name}
                      subtitle={item.time}
                  />);}
                  else {
                  return (
                  <ListItem
                      rightIcon={{name: "directions-bus", color: '#00BAF7'}}
                      key={i}
                      title={item.name}
                      subtitle={item.time}
                  />);}
                  })
                }   
              </List>

              <Text style={styles.testDay} 
              onTimeFormat={this.timeToDecimal}>{this.state.currentDay} {this.state.currentTime}</Text>
            </ScrollView>
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
  btn: {
    backgroundColor: "red",
    marginTop: 100,
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
  testDay: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});
