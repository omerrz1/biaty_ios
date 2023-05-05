import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  SimpleLineIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { update_langugae } from "../translations/i18nconfig";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";
import { StackActions, TabActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export function Profile(props) {
  const { t } = useTranslation();
  const [username, Setusername] = useState();
  const [phone, Setphone] = useState();
  const [email, Setemail] = useState();
  const [data, SetData] = useState();
  const [Housedata, SetHouseData] = useState();
  const [token, setToken] = useState();
  const [button_visible, setButton_visible] = useState("none");
  const [preview_list, set_preview_list] = useState([]);
  const languages = [
    { key: "ar", value: "اللغة العربية" },
    { key: "en", value: "english" },
  ];

  function log_out() {
    AsyncStorage.removeItem("token");
    props.navigation.dispatch(StackActions.replace("splash"));
  }

  function send_houses() {
    props.navigation.navigate("myhouses", { houses: Housedata });
  }

  function get_token() {
    AsyncStorage.getItem("token").then((token) => {
      setToken(token);
    });
  }
  function go_to_details() {
    console.log("data sent: ", data);
    props.navigation.navigate("details", { data: data });
  }
  function handle_data(data) {
    // here we will fetch the data from local storage
    SetData(data);
    data = data[0];
    console.log("data", data);
    Setusername(data.username);
    Setemail(data.email);
    Setphone(data.phone);
    // here we will then make the button visible
    setButton_visible("visible");
  }
  function get_profile(token) {
    // not needed
    const end_point = "https://www.baity.uk/owners/profile/";
    fetch(end_point, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then(handle_data)
      .catch((e) => console.log(e));
  }
  function set_language(language) {
    console.log(language);
    AsyncStorage.setItem("language", language);
    update_langugae();
  }
  function get_houses() {
    const mine_ep = "https://www.baity.uk/house/mine/";
    fetch(mine_ep, {
      method: "GEt",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        SetHouseData(data);
        set_preview_list(data);
      });
  }

  // for token
  useEffect(() => get_token(), []);

  // for user data
  useEffect(() => {
    get_profile(token);
  }, [token]);

  // for houses
  useEffect(get_houses, [token]);
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/homeBG.png")}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              get_houses();
              get_profile(token);
            }}
          />
        }
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={{ flex: 1, width: "100%" }}
      >
        {/* use details section */}
        <View style={styles.container}>
          <FontAwesome5
            style={{ paddingBottom: "1%" }}
            name="user-circle"
            size={54}
            color="black"
          />
          <View style={styles.section}>
            <AntDesign name="user" size={24} color="black" />
            <View style={styles.TextContainer}>
              <Text style={styles.Text}>{username}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <AntDesign name="mail" size={24} color="black" />
            <View style={styles.TextContainer}>
              <Text style={styles.Text}>{email}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <FontAwesome name="mobile" size={30} color="black" />
            <View style={styles.TextContainer}>
              <Text style={styles.Text}>{phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={go_to_details}
            style={{ ...styles.button, display: data ? "visible" : "none" }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {t("edit_profile")}
            </Text>
          </TouchableOpacity>

          {/* house section */}
          <View scrollEnabled={false} style={styles.houses_container}>
            <MaterialCommunityIcons name="home-group" size={54} color="black" />

            <View style={styles.try}>
              {preview_list.length > 0
                ? preview_list.map((img, index) => (
                    <Image
                      style={styles.image}
                      key={index}
                      source={{ uri: img.photos[0].photo }}
                    />
                  ))
                : null}
            </View>
            <TouchableOpacity onPress={send_houses} style={styles.button}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {t("edit_houses")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* language section */}

          <View style={styles.languages_container}>
            <FontAwesome
              style={styles.icon}
              name="language"
              size={54}
              color="black"
            />

            <SelectList
              data={languages}
              placeholder={t("language_select")}
              setSelected={set_language}
              dropdownStyles={styles.dropdown}
              dropdownItemStyles={styles.languages}
              dropdownTextStyles={{ color: "white", fontWeight: "bold" }}
              boxStyles={styles.selector}
            />
          </View>

          {/* logout section */}

          <View style={styles.logout_container}>
            <SimpleLineIcons
              name="logout"
              size={54}
              color="black"
              style={styles.icon}
            />

            <TouchableOpacity onPress={log_out} style={styles.logout_button}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {t("log_out")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    paddingTop: "25%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4%",
    paddingBottom: "35%",
  },
  section: {
    marginTop: "15%",
    flexDirection: "row",
    borderBottomWidth: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    paddingLeft: 10,
    paddingBottom: "3%",
  },
  icon: {
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  Text: {
    fontWeight: "bold",
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 3,
    borderColor: "skyblue",
    padding: 2,
    marginTop: "10%",
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "skyblue",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  TextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  selector: {
    width: "50%",
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
    borderRadius: 20,
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
  houses_container: {
    marginTop: "7%",
    paddingTop: "7%",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    width: "100%",
  },

  my_houses: {
    borderWidth: 1,
    borderColor: "skyblue",
    padding: 3,
    borderRadius: 20,
    flex: 1,
    height: 200,
    width: "95%",
    alignItems: "center",
    backgroundColor: "grey",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    top: "1%",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 5,
    margin: 5,
  },
  try: {
    flexDirection: "row",
    flex: 1,
    flexGrow: "grow",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  logout_container: {
    padding: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logout_button: {
    left: "2%",
    backgroundColor: "salmon",
    padding: "5%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "13%",
  },
});
