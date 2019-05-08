import React from 'react';
import { FlatList, Text } from 'react-native';
import ListItem from './ListItem';
import Spacer from './Spacer';

export default ({ items, onEndReached }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem item={item} />}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Spacer />}
    onEndReached={onEndReached}
    ListEmptyComponent={() => <Text>No songs.</Text>}
  />
);
