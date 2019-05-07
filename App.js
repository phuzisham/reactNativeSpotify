import React, {Component} from 'react';
import {View} from 'react-native';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';

export default class App extends Component {
  render() {
    return (
      <View style={styles.windowStyle}>
        <Header headerText={'Spotify'} />
        <SearchBar onChange={text => handleSearchChange(text)} />
    </View>
    );
  }
}

const styles = {
  windowStyle: {
      backgroundColor: '#DBDBDB',
      flex: 1
  }
};
