import React from "react";
import {
  StyleSheet,
  Iconoi,
  Button,
  TextInput,
  Text,
  View
} from "react-native";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeieScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setCount(count => count + 1);
            alert(count);
          }}
          title="Update count"
        />
      )
    });
  }, [navigation, setCount]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Hi {count} {route.params?.email}
      </Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", { id: "1", data: "WOWOie" })
        }
      />
      <Button
        title="Home post"
        onPress={() => navigation.navigate("Home_Post")}
      />
      <Button title="Tab" onPress={() => navigation.navigate("Tab")} />
      <Button title="Drawer" onPress={() => navigation.navigate("Drawer")} />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  // GET PARAMS
  const { id } = route.params;
  const { data } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Details Screen {id} : {data}
      </Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details", { id: "1", data: "WOWOie" })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("Create_Post")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home_Post", { post: postText });
        }}
      />
    </>
  );
}
// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require("@expo/snack-static/react-native-logo.png")}
//     />
//   );
// }

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // return <Ionicons name={iconName} size={size} color={color} />;
          return (
            <IconWithBadge
              badgeCount={3}
              name={iconName}
              size={size}
              color={color}
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Home" component={CreatePostScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}
function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Homie" component={HomeieScreen} />
    </Drawer.Navigator>
  );
}
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
      // <Text>Hi {currentUser && currentUser.email}!</Text>
      // <Button title="Logout" onPress={this.logoutUser} />
      <NavigationContainer>
        <Stack.Navigator
        // mode="modal"
        >
          <Stack.Screen
            name="Home"
            component={HomeieScreen}
            options={{
              title: "Homeie",
              headerStyle: {
                backgroundColor: "#f4511e"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              },
              headerRight: () => (
                <Button
                  onPress={() => alert("This is a button!")}
                  title="Info"
                  color="#fff"
                />
              )
            }}
            // options={{ headerTitle: props => <LogoTitle {...props} /> }}
            initialParams={currentUser}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />

          <Stack.Screen name="Create_Post" component={CreatePostScreen} />
          <Stack.Screen name="Home_Post" component={HomeScreen} />
          <Stack.Screen name="Tab" component={TabScreen} />
          <Stack.Screen name="Drawer" component={DrawerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
