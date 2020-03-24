import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";

export default class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  componentDidMount() {
    //1.
    // const value=AsyncStorage.gettItem("key");
    //if (value !== null){}
    //2.
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user != null) {
    //     console.log("We are authenticated now!");
    //   }
    // });
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Login via OTP"
          onPress={() => this.props.navigation.navigate("Otp")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
