1. expo init <project_name>

2. Used Firebase for authentication - Email, Phone

3. Install React-navigation packages

4. Tab Navigation

5. Drawer navigation

# Some Learning (REACT-NATIVE)

https://docs.expo.io/versions/v36.0.0/react-native/tutorial/

## Style

1. flex: 1 - tells a component to fill all available space, shared evenly amongst other components with the same parent.

2. flexDirection

- row
- column (default value)
- row-reverse
- column-reverse

3. Layout Direction

- LTR (left to right)
- RTL (right to left)

4. Justify Content

- flex-start
- flex-end
- center
- space-around
- space-between
- space-evenly

5. Align Items/Align Self

- flex-start
- flex-end
- center
- strech
- baseline

6. Position

- relative
- absolute

7. Flex Basis/Grow/Shrink/ Align Content/ Width/ Height

## Handling Buttons

1. Button - onPress()={} , title
2. TOuchables - TouchableHighlight, TouchableOpacity, TouchableNativeFeedback(only Android), TouchableWithoutFeedback

## Props Example

```
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', top: 50 }}>
        <Greeting name="Rexxar" />
        <Greeting name="Jaina" />
        <Greeting name="Valeera" />
      </View>
    );
  }
}
```
