import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { t } from "i18next";
import { StackActions } from "@react-navigation/native";

export function Verify_otp(props) {
  const [OTP_label, Set_OTP_label] = useState(t("start_message"));
  const [button_visibility, setButton_visibility] = useState("none");
  const [response_color, setResponse_Color] = useState("black");
  function handle_data(data) {
    if (data.account === "verfied") {
      setResponse_Color("lightgreen");
      Set_OTP_label(t("success_message"));
      setButton_visibility("visible");
      //ask the user to use his details to login
    } else {
      setResponse_Color("red");
      Set_OTP_label(t("failure_message"));
    }
  }
  function verfiy(OTP, email) {
    let payload = {
      email: email,
      OTP: parseInt(OTP),
    };
    let options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(payload);
    fetch(end_point, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handle_data(data);
      });
  }
  function triger_check(OTP) {
    if (OTP.length === 4) {
      setResponse_Color("skyblue");
      Keyboard.dismiss();
      user_email = props.route.params.email;
      verfiy(`${OTP}`, user_email);
    } else {
      setResponse_Color("black");
    }
  }
  function go_to_login() {
    props.navigation.dispatch(StackActions.replace("login"));
  }

  let end_point = "https://www.baity.uk/owners/verify/";
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/authBG.png")}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1, width: "100%" }}
      >
        <View style={styles.container}>
          <Text
            style={{
              top: "35%",
              fontWeight: "bold",
              textAlign: "center",
              paddingLeft: "10%",
              paddingRight: "10%",
              color: response_color,
            }}
          >
            {OTP_label}
          </Text>
          <View style={styles.input_container}>
            <MaterialCommunityIcons
              color={response_color}
              name="email-send"
              size={45}
              style={{ left: "10%" }}
            />
            <TextInput
              onChangeText={triger_check}
              maxLength={4}
              keyboardType="numeric"
              inputMode="numeric"
              placeholderTextColor={response_color}
              textAlign="center"
              placeholder="XXXX"
              style={{ borderColor: response_color, ...styles.OTP_input }}
            />
          </View>
          <TouchableOpacity
            onPress={go_to_login}
            style={{ display: button_visibility, ...styles.button }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {t("login_button_text")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  input_container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  OTP_input: {
    marginLeft: "35%",
    borderBottomWidth: 4,
    alignSelf: "center",
    width: "20%",
    fontSize: 30,
  },
  button: {
    bottom: "35%",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 3,
    borderColor: "skyblue",
    padding: 2,
    marginTop: 10,
    width: "30%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
});
