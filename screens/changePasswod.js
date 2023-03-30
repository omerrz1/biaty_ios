import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
export function ChangePassword(props) {
  const { t } = useTranslation();
  // states
  const [current_password, set_curret_password] = useState();
  const [new_password, set_new_password] = useState();
  const [confirm_new_password, set_confrim_new_password] = useState();
  const [states_code, set_status_code] = useState();
  const [confirm_modal, set_confirm_modal] = useState(false);
  // messages labels
  const [wrong_password_messaeg, set_wrong_password_messaeg] = useState("none");
  const [password_not_match, set_password_not_match] = useState("none");
  const [use_stronger_password, set_use_stronger_password] = useState("none");
  // useEffects
  useEffect(main_check, [states_code]);
  // functions
  // pasword check
  function isStrongPassword(password) {
    if (password == null) {
      set_use_stronger_password("visible");
      console.log("password is null");
      return false;
    }
    // Minimum 8 characters
    if (password.length < 8) {
      set_use_stronger_password("visible");
      console.log("passwoed is short");
      return false;
    }

    // Must contain at least one lowercase letter, one uppercase letter, and one digit
    let hasLower = false,
      hasUpper = false,
      hasDigit = false;
    for (let char of password) {
      if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "0" && char <= "9") hasDigit = true;
    }
    if (!hasLower || !hasUpper || !hasDigit) {
      console.log("weak password");
      set_use_stronger_password("visible");
      return false;
    }
    set_use_stronger_password("none");
    return true;
  }
  function password_match() {
    if (new_password === confirm_new_password) {
      set_password_not_match("none");
      return true;
    }
    set_password_not_match("visible");
    console.log("not matchd");
    return false;
  }
  function authenticate() {
    console.log("function called");
    const payload = new FormData();
    payload.append("username", props.route.params.email);
    payload.append("password", current_password);

    const ep = "https://www.baity.uk/auth/";
    fetch(ep, {
      method: "POST",
      body: payload,
    })
      .then((Response) => {
        set_status_code(Response.status);
        if (Response.status != 200) {
          set_wrong_password_messaeg("visible");
        } else {
          set_wrong_password_messaeg("none");
        }
        console.log(states_code);
        return Response.json();
      })
      .then((data) => console.log(data));
  }
  function main_check() {
    if (states_code == 200) {
      // the problem is here
      set_status_code(0);
      let match = password_match();
      let strong = isStrongPassword(new_password);
      console.log("match is :", match, "strong is :", strong);
      if (states_code == 200 && match && strong) {
        const payload = new FormData();
        payload.append("password", new_password);
        const password_ep = "https://www.baity.uk/owners/update_password/";
        AsyncStorage.getItem("token").then((token) => {
          fetch(password_ep, {
            method: "PUT",
            body: payload,
            headers: {
              Authorization: `token ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              set_confirm_modal(true);
            });
        });
      }
    }
  }
  return (
    <ImageBackground
      source={require("../assets/authBG.png")}
      style={styles.bakcground}
    >
      <KeyboardAwareScrollView extraHeight={100}>
        <View style={styles.container}>
          {/* back button */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.dispatch(StackActions.pop());
              props.navigation.dispatch(StackActions.replace("profileScreen"));
            }}
            style={{
              position: "absolute",
              top: "15%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              left: "5%",
            }}
          >
            <Ionicons name="arrow-back-circle" size={30} color="skyblue" />
            <Text style={{ color: "skyblue", fontWeight: "bold" }}>
              profile
            </Text>
          </TouchableOpacity>
          {/* curent pasword section */}
          <Text style={{ color: "red", display: wrong_password_messaeg }}>
            {t("wrong_password")}
          </Text>
          <View
            style={{ ...styles.section, marginBottom: "15%", marginTop: "2%" }}
          >
            <MaterialCommunityIcons name="lock" size={24} color="black" />
            <TextInput
              secureTextEntry={true}
              onChangeText={set_curret_password}
              textAlign="center"
              style={styles.input}
              placeholder="current password"
            />
          </View>
          {/* new password section */}
          <Text style={{ color: "red", display: use_stronger_password }}>
            {t("stronger_password")}
          </Text>
          <View
            style={{ ...styles.section, marginBottom: "15%", marginTop: "2%" }}
          >
            <MaterialCommunityIcons name="lock-reset" size={24} color="black" />
            <TextInput
              secureTextEntry={true}
              onChangeText={set_new_password}
              textAlign="center"
              style={styles.input}
              placeholder="new password"
            />
          </View>
          {/* confirm new password section  */}
          <Text style={{ color: "red", display: password_not_match }}>
            {t("password_not_matched")}
          </Text>
          <View style={{ ...styles.section, marginTop: "3%" }}>
            <MaterialCommunityIcons name="lock-reset" size={24} color="black" />
            <TextInput
              secureTextEntry={true}
              onChangeText={set_confrim_new_password}
              textAlign="center"
              style={styles.input}
              placeholder="confirm new password"
            />
          </View>
          {/* change button */}
          <TouchableOpacity onPress={authenticate} style={styles.button}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Change</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={confirm_modal}
          >
            <View style={styles.Modal_confirm_container}>
              <AntDesign name="Safety" size={54} color="lightgreen" />
              <Text style={{ color: "green", fontWeight: "bold" }}>
                {t("password_changed")} !
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.dispatch(StackActions.pop());
                  props.navigation.dispatch(
                    StackActions.replace("profileScreen")
                  );
                  set_confirm_modal(false);
                }}
              >
                <AntDesign name="checkcircle" size={54} color="skyblue" />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bakcground: { flex: 1, width: "100%" },
  container: {
    paddingTop: "60%",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  Modal_confirm_container: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    height: "30%",
    marginLeft: "10%",
    marginRight: "10%",
    borderWidth: 1,
    borderColor: "skyblue",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "skyblue",
    shadowOpacity: 1,
    textShadowRadius: 40,
    top: "25%",
  },
  section: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
  },
  button: {
    width: "40%",
    backgroundColor: "skyblue",
    marginTop: "15%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

// steps
// 1-autenticate old password 1
// 2-check if the new password is strong 1
// 3-check if they match
// 4-update password
