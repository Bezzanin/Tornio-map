import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';




export default class HomeScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'About',
      tintColor: "#000",
    },
  }

  constructor(props){
    super(props);
    this.state = {
      news: []
    }
  }

  componentWillMount(){
    api.getNews().then((res) => {
      this.setState({
        news: res.news
      })
    });
  }

  render() {
    console.log("News: ", this.state.news);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>News Rss will be here</Text>
        <Text style={styles.version}>fetch api needed</Text>

        <StatusBar barStyle="default" />
      </View>
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
