import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import Layout from '../constants/Layout';


const DEMO_OPTIONS_2 = [
  'restaurants', 'hotels', 'Activities', 'Wi-Fi Zones'
];

class MapDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cell}>
            <ModalDropdown style={styles.dropdown_2}
                           textStyle={styles.dropdown_2_text}
                           dropdownStyle={styles.dropdown_2_dropdown}
                           options={DEMO_OPTIONS_2}
                           renderRow={this._dropdown_2_renderRow.bind(this)}
                           renderSeparator={(sectionID, rowID) => this._dropdown_2_renderSeparator(sectionID, rowID)}
                           onSelect={(idx, value) => this.handleClick(idx, value)}
            />
        </View>
      </View>
    );
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_2_row, {backgroundColor: 'white'}]}>
          <Text style={[styles.dropdown_2_row_text, highlighted && {color: 'mediumaquamarine'}]}>
            {this.capitalizeFirstLetter(rowData)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  capitalizeFirstLetter(rowData) {
    return rowData.charAt(0).toUpperCase() + rowData.slice(1);
}

  handleClick(idx, value) {
    console.log(idx, value);
  }
  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == DEMO_OPTIONS_1.length - 1) return;
    let key = `spr_${rowID}`;
    return (<View style={styles.dropdown_2_separator}
                  key={key}
    />);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    height: 500,
    paddingVertical: 100,
    paddingLeft: 20,
  },
  textButton: {
    color: 'deepskyblue',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deepskyblue',
    margin: 2,
  },
  dropdown_2: {
    width: Layout.window.width * 0.9,
    alignSelf: 'center',
    top: 600,
    bottom: 0,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_2_text: {
    alignSelf: 'stretch',
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: width * 0.9,
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  dropdown_2_row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdown_2_row_text: {
    width: width * 0.9,
    textAlign: 'center',
    marginHorizontal: 4,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
  },
  dropdown_2_separator: {
    height: 0,
    backgroundColor: '#dfe2e5',
  },
});

export default MapDropDown;
