import React from "react";
import { StyleSheet, Platform, Button, Image, Text, View } from "react-native";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";

export default class Main extends React.Component {
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // AsyncStorage.removeItem("key");
        this.props.navigation.navigate("Login");
      });
  };
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button title="Logout" onPress={this.logoutUser} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
