import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  WebView,
  Linking,
  ListView
} from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { List, ListItem, PricingCard } from 'react-native-elements';
import SininenLinja from '../data/kaupunkilinja';
import Filters from './components/Filters';

var _ = require('lodash');

const filterItems = (filter, SininenLinja) => {
    return SininenLinja.filter((item) => {
        if (filter == "ALL") return true;
        if (filter == "Vihrea") return item.linja === "Vihrea";
        if (filter == "Sininen") return item.linja === "Sininen";
        if (filter == "Punainen") return item.linja === "Punainen";
    })
}

export default class TimetableScreen extends Component {


componentDidMount() {
  this.setState({
          dataSource: this.state.dataSource.cloneWithRows(SininenLinja),
        });
  this.timeToDecimal(this.state.currentTime);
  this.timeout = setTimeout(() => this.findNearest(this.state.timeinNumber), 100) ;
  this.interval = setInterval(() => this.timeToDecimal(this.state.currentTime) &
  this.setState({
         currentTime: moment().format('HH:mm'),
        }), 5000);
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: 'ALL',
      currentDay: moment().format('dddd'),
      currentTime: moment().format('HH:mm'),
      timeinNumber: '',
      lastStop: '',
      dataSource: ds.cloneWithRows([]),
    }
    this.timeToDecimal = this.timeToDecimal.bind(this);
    this.findNearest = this.findNearest.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.setSource = this.setSource.bind(this);
  }

timeToDecimal(currentTime) {
    var arr = currentTime.split(':');
    var dec = parseInt((arr[1])*10, 10);
    this.setState({
        timeinNumber: parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec),
      });
    var timeNow = this.state.timeinNumber;
}

handleFilter(filter) {
  this.setSource(SininenLinja, filterItems(filter, SininenLinja), { filter });
}

setSource(SininenLinja, itemsDatasource, otherState = {}){
    this.setState({
      SininenLinja,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    })
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


findNearest = (timeinNumber) => {
  var compareTimes = SininenLinja.filter((stop) => {
    return (stop.time <= timeinNumber)
  });
  let displayStop = _.last(compareTimes)
  this.setState({
        lastStopName: displayStop.name,
        lastStopLinja: displayStop.linja,
      });
  console.log(displayStop.time);
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
                  info={['Linja: ' + this.state.lastStopLinja, 'Last Stop: ' + this.state.lastStopName]}
                  button={{ title: 'SHOW ON MAP', icon: 'directions-bus' }}
                  onButtonPress={this.showOnMap}
                  />
                  <Filters
                    onFilter={this.handleFilter}
                    filter={this.state.filter}/>  
                <List>
                  <ListView
                  enableEmptySections={true}
                  dataSource={this.state.dataSource}
                  renderRow={(item, i) => {
                    var stoptime = item.time.toFixed(2);
              if (item.linja == "Vihrea") {
                return (
              <ListItem
                      key={i}
                      title={item.name}
                      subtitle={stoptime.toString().replace('.', ':')}
                      rightIcon={{name: "directions-bus", color: 'green'}}
                  />);}
                  else if (item.linja == "Sininen") {
                  return (
                  <ListItem
                      rightIcon={{name: "directions-bus", color: 'blue'}}
                      key={i}
                      title={item.name}
                      subtitle={stoptime.toString().replace('.', ':')}
                />);}
                else if (item.linja == "Punainen") {
                  return (
                  <ListItem
                      rightIcon={{name: "directions-bus", color: 'red'}}
                      key={i}
                      title={item.name}
                      subtitle={stoptime.toString().replace('.', ':')}
                />);}
              }}
                  />
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
