import React, {Component} from 'react';
import {View, ActivityIndicator } from 'react-native';
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';
import Listing from './src/components/Listing';
import token from './src/api/token';
import search from './src/api/search';

const PAGE = 20;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      offset: 0,
      query: 'Shpongle',
      isFetching: false,
      isEmpty: false,
      token: null,
      isTokenFetching: false,
    };
  }

  async loadNextPage() {
    const { songs, offset, query, token, isFetching, isEmpty } = this.state;
    if (isFetching || isEmpty) {
      return;
    }

    this.setState({ isFetching: true });

    const newSongs = await search({
      offset: offset,
      limit: PAGE,
      q: query,
      token,
    });

    if (newSongs.length === 0) {
      console.log('no songs found. there may be an error');
      this.setState({ isEmpty: true });
    }
  
    this.setState({
      isFetching: false,
      songs: [...songs, ...newSongs],
      offset: offset + PAGE,
    });
  }

  async refreshToken() {
    this.setState({
      isTokenFetching: true,
    });

    const newToken = await token();

    this.setState({
      token: newToken,
      isTokenFetching: false,
    });
  }

  async componentDidMount() {
    await this.refreshToken();
    await this.loadNextPage();
  }

  handleSearchChange(text) {
    this.setState({
      isEmpty: false,
      query: text,
      offset: 0,
      songs: [],
    }, () => {
      this.loadNextPage();
    });

    console.log('search text is', text);
  }

  async handleEndReached() {
    await this.loadNextPage();    
  }

  render() {
    const { songs, query, isFetching } = this.state;

    return (
      <View style={styles.windowStyle}>
        <Header headerText={'Spotify'} />
        <SearchBar onChange={text => this.handleSearchChange(text)} text={query} />
        {
          (isFetching && songs.length === 0)
            ? <ActivityIndicator />
            : <Listing
              items={songs}
              onEndReached={() => this.handleEndReached()}
            />
        }
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
