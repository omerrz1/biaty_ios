import react, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { get_user } from "../functions/functions";
export function Splash(props) {
  function check_auth_token() {
    //get the token
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        //navigate to home tab
        props.navigation.dispatch(StackActions.replace("user-navigation"));
        get_user(token);
      } else {
        props.navigation.dispatch(StackActions.replace("login"));
      }
    });
  }

  //create a function that will update the user data in local storage and then call that function whenver we need it

  useEffect(check_auth_token);
  return (
    <ImageBackground
      style={styels.background}
      resizeMode="cover"
      source={require("../assets/splash.png")}
    />
  );
}

const styels = StyleSheet.create({
  background: {
    flex: 1,
  },
});
