import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBzQAvDa509HP6_MWGGhUkoHWLMqhk2SV0",
  authDomain: "expo-react-native0.firebaseapp.com",
  databaseURL: "https://expo-react-native0.firebaseio.com",
  projectId: "expo-react-native0",
  storageBucket: "expo-react-native0.appspot.com",
  messagingSenderId: "278508950004",
  appId: "1:278508950004:web:6577a5cdaec789b65129a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// import the different screens
import Loading from "./components/Loading";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import Otp from "./components/Phone/Otp";

// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Main: Main,
    Otp: Otp
  },
  {
    initialRouteName: "Loading"
  }
);

const App = createAppContainer(RootStack);
export default App;
