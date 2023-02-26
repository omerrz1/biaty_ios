import react, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import "../translations/i18nconfig";
import { useTranslation } from "react-i18next";
import { get_user } from "../functions/functions";
export function Auth(props) {
  const { t } = useTranslation();

  function continue_as_guest() {
    props.navigation.dispatch(StackActions.replace("guest-navigation"));
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) =>
      console.log("token is :", token)
    );
  }, []);

  function create_account() {
    props.navigation.navigate("create-user");
  }

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setmessage] = useState();
  const [visisbilty, setVisibilty] = useState("none");

  function handle_response(response) {
    if (response.non_field_errors) {
      //if we get error message
      // we display it in read
      console.log(response);
      setmessage(t("failed_login_message"));
      setVisibilty("visible");
    } else if (response.token) {
      setVisibilty("none");
      console.log(response.token);
      get_user(response.token);
      AsyncStorage.setItem("token", response.token);
      //home screen
      props.navigation.dispatch(StackActions.replace("user-navigation"));
    } else {
      console.log(response);
    }
  }

  function get_Token() {
    const payload = new FormData();
    payload.append("username", username);
    payload.append("password", password);

    const ep = "https://www.baity.uk/auth/";
    fetch(ep, {
      method: "POST",
      body: payload,
    })
      .then((Response) => Response.json())
      .then((data) => handle_response(data));
  }

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require("../assets/authBG.png")}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={90}
        bounces={false}
        style={{ flex: 1 }}
      >
        <StatusBar hidden={true} />

        <View style={styles.container}>
          <Text>{t("login_title")}</Text>
          <Text style={{ color: "red", display: visisbilty }}>{message}</Text>

          <View style={styles.input_container}>
            <AntDesign name="user" size={20} />
            <TextInput
              autoCorrect={false}
              onChangeText={setUsername}
              style={styles.input}
              textAlign="center"
              placeholder={t("username_place_holder")}
            />
          </View>

          <View style={styles.input_container}>
            <AntDesign name="lock" size={20} />
            <TextInput
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
              textAlign="center"
              placeholder={t("password_place_holder")}
            />
          </View>

          <TouchableOpacity onPress={get_Token} style={styles.login_button}>
            <Text style={styles.text}>{t("login_button_text")}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={create_account} style={styles.options}>
            <Text style={styles.optionsText}>{t("create_account_text")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={continue_as_guest} style={styles.options}>
            {/**make sure we take the user to a guest home page */}
            <Text style={styles.optionsText}>
              {t("continue_as_guest_text")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    width: "80%",
    borderRadius: 9,
    marginLeft: 7,
    padding: 7,
    margin: 10,
    marginTop: 40,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 1,
    top: "70%",
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 18,
    borderColor: "skyblue",
    backgroundColor: "white",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  login_button: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 3,
    borderColor: "skyblue",
    padding: 2,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
    backgroundColor: "skyblue",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  text: {
    fontSize: 20,
    color: "white",
    padding: 2,
  },
  options: {
    padding: 3,
    marginTop: 4,
  },
  optionsText: {
    color: "skyblue",
    fontSize: 18,
  },
});
