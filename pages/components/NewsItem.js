import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function NewsItem({ title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text adjustsFontSizeToFit={false} 
      style={styles.description}
      numberOfLines={5}
      >{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 14,
    width: 300,
    minHeight: 100,
    marginHorizontal: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    marginVertical: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    margin: 2,
  },

  description: {
    fontSize: 12,
    color: '#888',
    margin: 2,
  },
});
