import React, {Component} from 'react';
import {View} from 'react-native';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';

export default class App extends Component {
  handleSearchChange = (text) => {
    console.log('search text is', text);
  };

  render() {
    return (
      <View style={styles.windowStyle}>
        <Header headerText={'Spotify'} />
        <SearchBar onChange={text => this.handleSearchChange(text)} />
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
