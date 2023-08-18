import { react, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import "../translations/i18nconfig";
import { useTranslation } from "react-i18next";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "../components/loading";
export function Createuser(props) {
  const { t } = useTranslation();

  //values
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false)
  //messages
  const [username_message, setUsername_message] = useState('');
  const [display_form,set_display_form] = useState('none')
  const [email_message, setEmailMessage] = useState('');
  const [phone_message, setPhone_message] = useState('');
  const [password_message, setPassword_message] = useState('');

  //visibility

  const [login_message_visible, setlogin_message_visible] = useState("flex");
  const [username_message_visibility, setUsername_message_visibility] =
    useState("none");
  const [email_message_visibility, set_EmailMessage_visibility] =
    useState("none");
  const [phone_message_visibility, setPhone_message_visibility] =
    useState("none");
  const [password_message_visibility, setPassword_message_visibility] =
    useState("none");

  let status;
  async function handle_data(data) {
    console.log(status);
    console.log(data);
    if (status == 400) {
      if (data.username) {
        setUsername_message(data.username);
        setUsername_message_visibility("flex");
      }
      if (data.email) {
        setEmailMessage(data.email);
        set_EmailMessage_visibility("flex");
      }
      if (data.phone) {
        setPhone_message(data.phone);
        setPhone_message_visibility("flex");
      }
    setloading(false)
    } else if (status == 201) {
      setlogin_message_visible("none");
      setloading(false)
      //remove other messages
      setUsername_message_visibility("none");
      set_EmailMessage_visibility("none");
      setPhone_message_visibility("none");

      //navigate to verify the account
      props.navigation.dispatch(
        StackActions.replace("OTP", { email: data.email })
      );
      console.log("sent email: ", data.email);
    }
  }

  //validate password
  function isStrongPassword(password) {
    if (password == null) {
      return false;
    }
    // Minimum 8 characters
    if (password.length < 8) return false;

    // Must contain at least one lowercase letter, one uppercase letter, and one digit
    let hasLower = false,
      hasUpper = false,
      hasDigit = false;
    for (let char of password) {
      if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "0" && char <= "9") hasDigit = true;
    }
    if (!hasLower || !hasUpper || !hasDigit) return false;

    return true;
  }

  async function validate_password(password) {
    if (isStrongPassword(password)) {
      setPassword_message_visibility("none");
      const payload = new FormData();
      if (username) {
        payload.append("username", username.toLowerCase());
      }
      if (email) {
        payload.append("email", email.toLowerCase());
      }
      payload.append("phone", parseInt(phone));
      payload.append("password", password);
      const ep = "https://www.baity.uk/owners/create/";
      fetch(ep, {
        method: "POST",
        body: payload,
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then(handle_data);
    } else {
      setloading(false)
      setPassword_message(t("stronger_password"));
      setPassword_message_visibility("felex");
    }
  }
  //data validation
  function create_owner() {
    setloading(true)
    if (email!=''){
      set_display_form('none')
    setPhone_message_visibility("none");
    setUsername_message_visibility("none");
    set_EmailMessage_visibility("none");
    validate_password(password);
    }

    else{
      setloading(false)
      set_display_form('flex')
    }
    
  }

  function go_to_login() {
    props.navigation.dispatch(StackActions.replace("login"));
  }

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../assets/authBG.png")}
    >
      <KeyboardAwareScrollView extraScrollHeight={160} bounces={false}>
        <StatusBar barStyle={"dark-content"} hidden={false} />

        <TouchableOpacity
          onPress={go_to_login}
          style={{ flexDirection: "row" }}
        >
          <Ionicons
            style={styles.header_icon}
            name="arrow-back-circle"
            size={30}
            color="skyblue"
          />
          <Text style={styles.header}>{t("back_to_login")}</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text>{t("create_account_title")}</Text>
          
          <Text style ={{color:'red',display:display_form}}>{t("please_complete_form")}</Text>

          <View style={styles.input_container}>
            <AntDesign size={20} name="user" />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder={t("username_place_holder")}
              textAlign="center"
            />
          </View>
          <Text style={{ display: username_message_visibility, color: "red" }}>
            {username_message}
          </Text>

          <View style={styles.input_container}>
            <AntDesign size={20} name="mail" />
            <TextInput
              onChangeText={setemail}
              style={styles.input}
              placeholder={t("email_place_holder")}
              textAlign="center"
            />
          </View>
          <Text style={{ display: email_message_visibility, color: "red" }}>
            {email_message}
          </Text>

          <View style={styles.input_container}>
            <Feather size={20} name="phone" />
            <TextInput
              onChangeText={setphone}
              keyboardType="numeric"
              style={styles.input}
              placeholder={t("phone_place_holder")}
              textAlign="center"
            />
          </View>
          <Text style={{ display: phone_message_visibility, color: "red" }}>
            {phone_message}
          </Text>

          <View style={styles.input_container}>
            <AntDesign size={20} name="lock" />
            <TextInput
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
              placeholder={t("password_place_holder")}
              textAlign="center"
            />
          </View>
          <Text style={{ display: password_message_visibility, color: "red" }}>
            {password_message}
          </Text>
          <View style={{display:loading?'flex':'none',height:'10%'}}><Loading height={20} /></View>
          <TouchableOpacity
            onPress={create_owner}
            style={{ display: login_message_visible, ...styles.button,display: loading? 'none':'flex'}}
          >
            <Text style={styles.text}>{t("join_button_text")}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 1,
    top: "52%",
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
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input_container: {
    flexDirection: "row",
    alignItems: "flex-end",
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
  header: {
    position: "absolute",
    marginTop: "15%",
    color: "skyblue",
    fontWeight: 800,
    marginLeft: "8%",
    left:'3%',
  },
  header_icon: {
    position: "absolute",
    marginTop: "13%",
    fontWeight: 800,
  },
  text: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  options: {
    color: "skyblue",
    marginTop: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 9,
    marginTop: 10,
    width: "60%",
  },

});
