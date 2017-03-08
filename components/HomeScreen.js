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
import ListItem from './ListItem';
import { Router } from '../main';
import { Icon } from 'react-native-elements';
const APIKEY = '72b1147fa88e38fbbaae0586c19823d5';


export default class HomeScreen extends Component {
  
  static route = {
    navigationBar: {
      title: 'Examples',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

 constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      humidity: null,
      windSpeed: null,
      icon: null,
      summary: '',
      loading: true
    }
   
 }

   componentWillMount() {
    fetch('https://api.forecast.io/forecast/' + APIKEY + '/65.8444,24.1449?units=si')
      .then(res => res.json())
      //this.setState is our method of telling react that we changed something and it needs to re-render our application and figure out what changed
      .then(resJson => this.setState({
        temperature: resJson.currently.temperature,
        humidity: resJson.currently.humidity,
        windSpeed: resJson.currently.windSpeed,
        icon: resJson.currently.icon,
        summary: resJson.currently.summary,
        //We are officially loaded so now we set our loading flag to false
        loading: false
      }))
  }

  
  render() {
    return (
      <View>
        <Image source={require('../assets/Tower.jpg')} 
        resizeMode={Image.resizeMode.fill} style={styles.header}>
       	 <View style={styles.center}>
            <Text style={styles.lowerText}> Temperature: {Math.round(this.state.temperature) + "°C"} </Text>
            <Text style={styles.lowerText}> Humidity: {this.state.humidity} </Text>
  				  <Text style={styles.lowerText}> Wind Speed: {this.state.windSpeed} </Text>
  				</View>

        </Image>
        <ScrollView horizontal>
          <TouchableOpacity onPress={this._goToScreen('map')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="restaurant" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Restaurants</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="hotel" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Hotels</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="local-activity" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Activity</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="store" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Malls</Text>                 
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToScreen('map')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="wifi" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Wifi</Text>                 
            </View>
            </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  center: {
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  placeIcon: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
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
  },
  //weather
  lowerText: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 25,
  }
  
});


