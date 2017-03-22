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
    fetch('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=8dc245ee80ae4aeeb28415c4375ff641')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.articles),
        });
      })
      .done();
      };

    
  render() {
     
    return (
        <View>
        <ListView
        pagingEnabled={true}
        horizontal={true}
        enableEmptySections 
        dataSource={this.state.dataSource}
        onScroll={() => Keyboard.dismiss()}
        renderRow={(article) => {
            return (
                <NewsItem
                    title={article.title}
                    description={article.description}
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

