import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ListView, Keyboard } from "react-native";

import NewsItem from './NewsItem'



class NewsList extends Component {




    constructor(props) {
    super(props);
    this.state = {
       news: null,
       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
}

  componentWillMount() {
    fetch('http://www.json.pub/kegs/1f947ee5ad3b/tap.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.events),
        });
      })
      .done();
      };

    
  render() {
     
    return (
        <View>
        <ListView
        
        horizontal={true}
        enableEmptySections 
        dataSource={this.state.dataSource}
        onScroll={() => Keyboard.dismiss()}
        renderRow={(article) => {
            return (
                <NewsItem
                    title={article.name}
                    description={article.description}
                    image={article.coverPicture}
                />
            )
        }}
        />
        </View> 
    );
  }
}

const styles = StyleSheet.create({
   newsScroll: {
    backgroundColor: 'transparent',
  },
  });

export default NewsList;

