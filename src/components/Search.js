import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

export default class Seacrh extends Component {
  constructor({ text }) {
    super();

    this.state = {
      text: text || '',
    };
  }

  handleChangeText(newText) {
    const { onChange } = this.props;

    this.setState({
      text: newText,
    }, () => {
      onChange && onChange(newText);
    });
  }

  render() {
    const { text } = this.state;

    return (
      <View>
        <Text style={styles.text}>Search for a song:</Text>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Search here..."
          onChangeText={newText => this.handleChangeText(newText)}
        />
      </View>
    );
  }
}

const styles = {
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
};
