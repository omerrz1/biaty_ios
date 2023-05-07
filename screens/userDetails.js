import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Keyboard,
} from "react-native";
import {
  AntDesign,
  SimpleLineIcons,
  Feather,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";

export function UserDetails(props) {
  // states
  const { t } = useTranslation();
  const [data, setdata] = useState(props.route.params.data[0]);
  const [email, setEmail] = useState();
  const [new_email, set_new_Email] = useState();
  const [delete_confrim, setdelete_confrim] = useState(false);
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [themecolor, setThemeColor] = useState("black");
  const [message, setMessage] = useState(t("start_message"));
  const [user_token, setToken] = useState();
  const [confirm_email_modal, set_confirm_email_modal] = useState(false);
  const [update_email_modal, set_update_email_modal] = useState(false);
  const [up_modal, setUp_modal] = useState(false);
  const [otp_modal, setOtpModal] = useState(false);
  const [email_message, set_email_message] = useState("none");
  const [email_label, set_email_label] = useState();
  
  // use effect
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => setToken(token));
  });
  useEffect(() => {

    setEmail(data.email);
    setPhone(data.phone.toString());
    setUsername(data.username);
    setId(data.id);
  }, [data]);


  // functions
  // ------------general -------------
  function log_out() {
    AsyncStorage.removeItem("token");
    props.navigation.dispatch(StackActions.replace("splash"));
  }
  function change_password() {
    props.navigation.navigate("change-password", { email: email });
  }

  //    -----OTP--------
  function triger_check(OTP) {
    if (OTP.length === 4) {
      setThemeColor("skyblue");
      Keyboard.dismiss();
      let user_email = email;
      verfiy(`${OTP}`, user_email);
    } else {
      setThemeColor("black");
    }
  }
  function handle_data(data) {
    if (data.account === "verfied") {
      setThemeColor("lightgreen");
      setMessage(t("email_verified"));
      update_email()
      setOtpModal(false);
      back_to_Profile()
      //ask the user to use his details to login
    } else {
      setThemeColor("red");
      setMessage(t("email_not_verified"));
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
    fetch("https://www.baity.uk/owners/verify/", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handle_data(data);
      });
  }
  // --------------------user and phone-----------
  function back_to_Profile() {
    props.navigation.dispatch(StackActions.pop());
    props.navigation.dispatch(StackActions.replace("profileScreen"));
  }
  function send_up_https_request(token) {
    const payload = new FormData();
    payload.append("username", username);
    payload.append("phone", phone);
    const up_ep = `https://www.baity.uk/owners/update/up/${id}/`;
    fetch(up_ep, {
      method: "PUT",
      body: payload,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((Response) => Response.json())
      .then((data) => console.log("data update: ", data));
    // here we call (get_user method using the token to update the user data)
    setUp_modal(false);
    props.navigation.dispatch(StackActions.pop());
    props.navigation.dispatch(StackActions.replace("profileScreen"));
  }
  function update_up() {
    console.log(id, "this is hat we sat");
    AsyncStorage.getItem("token").then(send_up_https_request);
  }
  // -----------email-----------------------




// verify new email 
  function verify_new_email() {
    const new_email_ep = `https://www.baity.uk/owners/new-email/`
    const payload = new FormData();
    payload.append("email", new_email );
    fetch(new_email_ep, {
      method: "POST",
      body: payload,
      headers: { Authorization: `token ${user_token}` },
    })
      .then((response) => {
        console.log("status code of the email request:", response.status);
        if (response.status == 400) {
          set_email_message("visible");
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.email)
        if (data.email == "Enter a valid email address.") {
          set_email_label(t("invald_email"));
        } else if (data.email == "owner with this email already exists.") {
          set_email_label(t("email_used"));
        } else if (data.email == "sent") {
          set_update_email_modal(false)
          setOtpModal(true)
        }
      })
      .catch((e) => console.log(e));
    // end
  }
  function update_email() {
    const email_ep = `https://www.baity.uk/owners/update/email/${id}/`;
    const payload = new FormData();
    payload.append("email", new_email);
    fetch(email_ep, {
      method: "PUT",
      body: payload,
      headers: { Authorization: `token ${user_token}` },
    })
      .then((response) => {
        console.log("status code of the email request:", response.status);
        if (response.status == 400) {
          set_email_message("visible");
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.email == "Enter a valid email address.") {
          set_email_label(t("invald_email"));
        } else if (data.email == "owner with this email already exists.") {
          set_email_label(t("email_used"));
        }else if (data.email == "sent") {
          setOtpModal(true)
        }
      })
      .catch((e) => console.log(e));
  }

  // -------------delete account--------------
  function delete_me() {
    fetch("https://www.baity.uk/owners/deleteme/", {
      method: "GET",
      headers: {
        Authorization: `token ${user_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    log_out();
  }
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/homeBG.png")}
    >
      <TouchableOpacity
        onPress={back_to_Profile}
        style={styles.backbuttoncontainer}
      >
        <Ionicons name="arrow-back-circle" size={30} color="skyblue" />
        <Text style={{ color: "skyblue", fontWeight: "bold" }}>profile</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setUp_modal(true)}>
            <View style={styles.section}>
              <Feather size={20} name="edit" />
              <AntDesign size={20} name="user" />
              <View style={{ ...styles.input, alignItems: "center" }}>
                <Text>{data.username}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Feather size={20} name="edit" />
              <SimpleLineIcons size={20} name="phone" />
              <View style={{ ...styles.input, alignItems: "center" }}>
                <Text>{data.phone}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20%",
              marginTop: "10%",
            }}
          >
            <MaterialCommunityIcons name="email" size={54} color="black" />
          </View>

          <TouchableOpacity
            onPress={() => set_confirm_email_modal(true)}
            style={styles.section}
          >
            <Feather size={20} name="edit" />
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <View style={{ ...styles.input, alignItems: "center" }}>
              <Text>{data.email}</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20%",
              marginTop: "10%",
            }}
          >
            <MaterialCommunityIcons name="lock" size={54} color="black" />
          </View>

          <TouchableOpacity
            onPress={change_password}
            style={{ ...styles.section, marginBottom: "35%" }}
          >
            <Feather size={20} name="edit" />
            <SimpleLineIcons name="lock" size={24} color="black" />
            <View style={{ ...styles.input, alignItems: "center" }}>
              <Text>****************</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* dlete account button */}
        <View style={styles.delete_section}>
          <TouchableOpacity
            onPress={() => setdelete_confrim(true)}
            style={styles.delete_button}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              DELETE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>

        {/* update usern and phone modal */}

        <Modal animationType="slide" visible={up_modal} transparent={true}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.u_p_container}>
              <AntDesign
                style={{ paddingBottom: "15%" }}
                name="edit"
                size={54}
                color="black"
              />
              <View style={styles.section}>
                <AntDesign size={30} name="user" />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  textAlign="center"
                  style={styles.input}
                />
              </View>
              <View style={styles.section}>
                <SimpleLineIcons size={20} name="phone" />
                <TextInput
                  textAlign="center"
                  onChangeText={setPhone}
                  value={phone}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                onPress={update_up}
                style={{
                  height: "12%",
                  width: "30%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "skyblue",
                  borderRadius: 20,
                  marginTop: "20%",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* OTP modal */}
        <Modal transparent={true} animationType="slide" visible={otp_modal}>
          <View style={styles.otpModalContainer}>
            <ImageBackground
              resizeMode="cover"
              style={styles.otpMOdaleBackground}
              source={require("../assets/mini.png")}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  marginLeft: "2%",
                  marginTop: "2%",
                  zIndex: 100,
                }}
                onPress={() => setOtpModal(false)}
              >
                <Entypo name="circle-with-cross" size={24} color="skyblue" />
              </TouchableOpacity>
              <View style={styles.otp_content}>
                <Text style={{ ...styles.otpLabel, color: themecolor }}>
                  {message}
                </Text>
                <View style={styles.input_container}>
                  <MaterialCommunityIcons
                    color={themecolor}
                    name="email-send"
                    size={45}
                    style={{ left: "5%" }}
                  />
                  <TextInput
                    onChangeText={triger_check}
                    maxLength={4}
                    color={themecolor}
                    keyboardType="numeric"
                    inputMode="numeric"
                    placeholderTextColor={themecolor}
                    textAlign="center"
                    placeholder="XXXX"
                    style={{ borderColor: themecolor, ...styles.OTP_input }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>
        {/* update email modal */}
        <Modal
          visible={update_email_modal}
          animationType="slide"
          transparent={true}>
          
          <View style={{ ...styles.u_p_container, top: "10%" }}>
            <ImageBackground
              style={{ flex: 1, width: "100%" }}
              resizeMode="cover"
              source={require("../assets/mini.png")}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather size={60} name="edit" />

                <Text
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginTop: "5%",
                    display: email_message,
                  }}
                >
                  {email_label}
                </Text>
                <View style={{ ...styles.section, marginTop: "20%" }}>
                  <AntDesign size={30} name="mail" />
                  <TextInput
                    placeholder=" new email@example.com"
                    placeholderTextColor='black'
                    onChangeText={set_new_Email}
                    textAlign="center"
                    style={styles.input}
                  />
                </View>
                <TouchableOpacity
                  onPress={verify_new_email}
                  style={{
                    backgroundColor: "skyblue",
                    padding: "2%",
                    width: "30%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> set_update_email_modal(false)}
                  style={{
                    backgroundColor: "hotpink",
                    padding: "2%",
                    width: "30%",
                    alignItems: "center",
                    marginTop:'5%',
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {t('cancel_message')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </Modal>
        {/* confirm modal */}
        <Modal
          animationType="slide"
          visible={confirm_email_modal}
          transparent={true}
        >
          <View style={styles.confirm_email}>
            <Text>{t("confrim_email_edit")}</Text>
            <View style={styles.email_options}>
              <TouchableOpacity
                onPress={() => {
                  set_confirm_email_modal(false)
                  set_update_email_modal(true)
                }} // open the email change and then confirm
                style={{ ...styles.button, backgroundColor: "skyblue" }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  {t("edit_message")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => set_confirm_email_modal(false)}
                style={{ ...styles.button, backgroundColor: "salmon" }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  {t("cancel_message")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* delete confirm modal */}
        <Modal
          animationType="slide"
          visible={delete_confrim}
          transparent={true}
        >
          <View style={styles.confirm_email}>
            <Entypo name="emoji-sad" size={44} color="hotpink" />
            <Text style={{ marginHorizontal: "5%", marginTop: "10%" }}>
              {t("delete_message")}
            </Text>
            <View style={styles.del_options}>
            <TouchableOpacity
                onPress={delete_me}
                style={{ ...styles.button, backgroundColor: "hotpink" }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  {t("confirm")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setdelete_confrim(false)}
                style={{ ...styles.button, backgroundColor: "skyblue" }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  {t("cancel_message")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  otp_content:{
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  otpMOdaleBackground: {
    width: "100%",
    flex: 1,
  },
  otpModalContainer: {
    flex: 1,
    marginTop: "45%",
    borderWidth: 6,
    borderColor: "skyblue",
    marginHorizontal: "5%",
    borderRadius: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowColor: "skyblue",
    marginBottom: "40%",
    shadowRadius: 30,
  },
  input_container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "40%",
  },
  OTP_input: {
    marginLeft: "35%",
    borderBottomWidth: 4,
    alignSelf: "center",
    width: "30%",
    fontSize: 30,
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "30%",
  },
  confirm_email: {
    flex: 0.3,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    top: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "skyblue",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "skyblue",
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  email_options: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: "30%",
  },
  button: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    borderRadius: 20,
  },
  section: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10%",
    borderBottomWidth: 1,
    paddingBottom: "2%",
  },
  input: {
    // borderBottomWidth: 1,
    width: "80%",
  },
  save_button: {
    backgroundColor: "skyblue",
    width: "35%",
    height: "20%",
    marginLeft: "15%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  u_p_container: {
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    borderColor: "skyblue",
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowColor: "skyblue",
    shadowRadius: 30,
  },
  backbuttoncontainer: {
    position: "absolute",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-around",
    top: "10%",
    alignItems: "center",
    alignSelf: "flex-start",
    zIndex: "10%",
  },
  delete_section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "20%",
    marginBottom: "25%",
  },
  delete_button: {
    backgroundColor: "hotpink",
    padding: "5%",
    borderColor: "hotpink",
    borderWidth: 2,
    borderRadius: 20,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "grey",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  del_options: {
    flexDirection: 'row',
    marginTop: 25,
    width: 200,
    justifyContent:'space-between'
  }
});
