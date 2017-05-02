import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { Icon } from 'react-native-elements';
import { Router } from '../../main';
import main from '../../main';
import { withNavigation } from '@exponent/ex-navigation';


@withNavigation
class Icons extends Component {

    constructor(props) {
    super(props);
    this._goToScreen=this._goToScreen.bind(this);
   }
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
      <ScrollView horizontal style={styles.iconsContainer} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={this._goToScreen('map', "restaurant")}>
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
            <TouchableOpacity onPress={this._goToScreen('map', 'hotel')}>
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
            <TouchableOpacity onPress={this._goToScreen('map', 'activity')}>
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
            <TouchableOpacity onPress={this._goToScreen('map', 'store')}>
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
            <TouchableOpacity onPress={this._goToScreen('map', 'wi-fi-zone')}>
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
            <TouchableOpacity onPress={this._goToScreen('map', 'route')}>
            <View>
              <View style={styles.placeIcon}>
                  <Icon name="directions-walk" 
                        size={60}
                        color="#00BAF7"
                        />
              </View>
                <Text style={styles.iconText} >Wifi</Text>                 
            </View>
            </TouchableOpacity>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconsContainer: {
    marginTop: -280,
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
    },
    
  },
  iconText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  
  
});

export default Icons;