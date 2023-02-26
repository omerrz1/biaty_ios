import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { update_langugae } from "../translations/i18nconfig";
import { SelectList } from "react-native-dropdown-select-list";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function MustLogin(props) {
  const { t } = useTranslation();
  const languages = [
    { key: "ar", value: "اللغة العربية" },
    { key: "en", value: "english" },
  ];
  function set_language(language) {
    console.log(language);
    AsyncStorage.setItem("language", language);
    update_langugae();
  }
  function go_to_login() {
    props.navigation.dispatch(StackActions.replace("login"));
  }
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require("../assets/mustLoginBG.png")}
    >
      <View style={styles.container}>
        <View style={styles.message_box}>
          <Text style={styles.message}>{t("must_login_message")}</Text>
        </View>

        <View style={styles.options}>
          <SelectList
            data={languages}
            placeholder={t("language_select")}
            setSelected={set_language}
            dropdownStyles={styles.dropdown}
            dropdownItemStyles={styles.languages}
            dropdownTextStyles={{ color: "white", fontWeight: "bold" }}
            boxStyles={styles.selector}
          />
          {/**add the options to login or creat account */}
          <TouchableOpacity onPress={go_to_login} style={styles.button}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {t("login_button_text")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
  },
  message: {
    padding: "5%",
    color: "skyblue",
    fontWeight: "700",
    textAlign: "center",
  },
  message_box: {
    flex: 1,
    top: "25%",
    alignItems: "center",
  },
  options: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    top: "15%",
  },
  button: {
    top: "10%",
    backgroundColor: "skyblue",
    alignItems: "center",
    padding: 10,
    width: "45%",
    borderRadius: "20%",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.7,
    shadowRadius: 5,
    marginBottom: "10%",
  },
  selector: {
    width: "35%",
    alignSelf: "center",
    borderColor: "skyblue",
    borderWidth: 2,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  dropdown: {
    width: 190,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "skyblue",
    borderWidth: 3,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    backgroundColor: "white",
    shadowOpacity: 1,
  },
  languages: {
    borderWidth: 1,
    marginBottom: "3%",
    borderRadius: "20%",
    borderColor: "skyblue",
    backgroundColor: "skyblue",
    alignSelf: "center",
    justifyContent: "center",
  },
  languages_container: {
    marginTop: "7%",
    paddingTop: "7%",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
