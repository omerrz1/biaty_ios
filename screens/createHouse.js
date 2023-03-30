import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation, Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Loading } from "../components/loading";

export function HouseIMages(props) {
  const { t } = useTranslation();

  const [selectedImages, SetSelectedImages] = useState([]);
  function chooseImages() {
    imagePicker
      .launchImageLibraryAsync({ allowsMultipleSelection: true })
      .then((result) => SetSelectedImages(result.assets));
  }

  function back_to_house_form() {
    props.navigation.dispatch(StackActions.replace("form"));
    const id = props.route.params.house_id;
    AsyncStorage.getItem("token")
      .then((token) => {
        const ep = `https://www.baity.uk/house/delete/${id}/`;
        fetch(ep, {
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then((resp) => resp.status)
          .then((data) => {
            if (data === 204) {
              // remove the house from the list
              console.log(
                "house ",
                id,
                " was deleted succefully and confiermd"
              );
            } else {
              console.log("404 not found");
            }
          });
      })
      .catch((e) => console.error(e));
  }

  function postImages() {
    const id = props.route.params.house_id;
    console.log("recieved house id :", id);
    const photoData = new FormData();
    console.log(selectedImages);
    for (const photo of selectedImages) {
      console.log(photo);
      photoData.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "image.JPEG",
      });
      photoData.append("house", id);
      fetch("https://www.baity.uk/house/photos/", {
        method: "POST",
        body: photoData,
      })
        .then((response) => response.json())
        .then((data) => console.log("successfully uloaded image ", data));
    }
    props.navigation.dispatch(StackActions.pop());
    props.navigation.dispatch(StackActions.replace("form"));
    props.navigation.navigate("home");
  }

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../assets/authBG.png")}
    >
      <TouchableOpacity
        onPress={back_to_house_form}
        style={{ flexDirection: "row", width: "100%" }}
      >
        <Ionicons
          style={styles.header_icon}
          name="arrow-back-circle"
          size={30}
          color="skyblue"
        />
        <Text style={styles.header}>BACK</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.images_list}>
          <FlatList
            data={selectedImages}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}
            renderItem={(image) => (
              <Image source={{ uri: image.item.uri }} style={styles.image} />
            )}
          />
        </View>
        <TouchableOpacity onPress={() => chooseImages()}>
          <View style={styles.image_button_box}>
            <Text>add photos</Text>
            <MaterialCommunityIcons
              color={"black"}
              size={40}
              name="image-plus"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={postImages}
          style={{
            alignItems: "center",
            borderWidth: 8,
            backgroundColor: "skyblue",
            borderColor: "skyblue",
            borderRadius: 8,
            width: "50%",
            top: 3,
          }}
        >
          <Text style={{ color: "white" }}>post house</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

/**
 * the house creation form
 */

export function HouseForm(props) {
  const { t } = useTranslation();
  const [address, SetAddress] = useState('');
  const [price, SetPrice] = useState(0);
  const [area, SetArea] = useState(0);
  const [description, SetDescription] = useState('');
  const [bath_rooms, SetBath_rooms] = useState(0);
  const [bed_rooms, SetBed_rooms] = useState(0);
  const [living_rooms, SetLiving_rooms] = useState(0);
  const [loading, set_loading] = useState('none')
  const [add_photos_Button, set_add_photos_Button] = useState('visible')
  const [place_holder_color, set_place_holder_color] = useState('grey')

  function postHouse() {
    const house = new FormData();

    house.append("address", address);
    house.append("price", parseInt(price));
    house.append("area", parseInt(area));
    house.append("description", description);
    house.append("living_rooms", living_rooms);
    house.append("bath_rooms", bath_rooms);
    house.append("bed_rooms", bed_rooms);
    house.append("public", true);

    const ep = "https://www.baity.uk/house/create/";
    AsyncStorage.getItem("token").then(create_houes);
    function create_houes(token) {
      if (address.trim() === '' || price === 0 || area === 0 || description.trim() === '') {
        set_place_holder_color('red')
      } 
      else {
        set_add_photos_Button('none')
        set_loading('visble')
        fetch(ep, {
          method: "POST",
          body: house,
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then((Response) => Response.json())
          .then((data) => {
            set_add_photos_Button('visible')
            set_loading('none')
            console.log(data);
            props.navigation.navigate("images", { house_id: data.id });
          });
      }
    
    }
  }

  return (
    <ImageBackground
      source={require("../assets/authBG.png")}
      style={styles.background}
    >
      <KeyboardAwareScrollView
        style={{ paddingTop: "55%" }}
        bounces={true}
        extraScrollHeight={200}
      >
        <View style={styles.container2}>
          <Text>POST HOUSE</Text>
          <StatusBar
            hidden={false}
            translucent={true}
            barStyle="dark-content"
          />
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Entypo style={{ marginTop: 10 }} size={25} name="location" />
            <TextInput
              placeholderTextColor={place_holder_color}
              style={styles.input}
              onChangeText={SetAddress}
              placeholder={t("house_address")}
            />
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <FontAwesome5
              style={{ marginTop: 10 }}
              size={25}
              name="comment-dollar"
            />
            <TextInput
              keyboardType="numeric"
              placeholderTextColor={place_holder_color}
              onChangeText={SetPrice}
              style={styles.small_input}
              placeholder={t("price")}
            />

            <Entypo
              style={{ marginTop: 10, marginLeft: 15 }}
              size={30}
              name="ruler"
            />
            <TextInput
              keyboardType="numeric"
              placeholderTextColor={place_holder_color}
              onChangeText={SetArea}
              style={styles.small_input}
              placeholder={t("house_area")}
            />
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <Foundation name="comment-quotes" size={30} />
            <TextInput
              placeholderTextColor={place_holder_color}
              style={styles.input}
              onChangeText={SetDescription}
              placeholder={t("house_description")}
            />
          </View>
          <View>
            <Text style={styles.iconText}>{t("bathrooms")}</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 style={styles.iconStyle} name="bath" size={30} />
              <View style={styles.NumericInputStyle}>
                <NumericInput
                  onChange={SetBath_rooms}
                  style={styles.NumericInputStyle}
                  totalHeight={40}
                  totalWidth={80}
                  minValue={0}
                  rightButtonBackgroundColor="black"
                  leftButtonBackgroundColor="black"
                  iconStyle={{ color: "white" }}
                  rounded={true}
                />
              </View>
            </View>

            <Text style={styles.iconText}>{t("bedrooms")}</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="bed"
                size={30}
              />
              <View style={styles.NumericInputStyle}>
                <NumericInput
                  onChange={SetBed_rooms}
                  totalHeight={40}
                  totalWidth={80}
                  minValue={0}
                  rightButtonBackgroundColor="black"
                  leftButtonBackgroundColor="black"
                  iconStyle={{ color: "white" }}
                  rounded={true}
                />
              </View>
            </View>

            <Text style={styles.iconText}>{t("livingrooms")}</Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name="sofa"
                size={30}
              />
              <View style={styles.NumericInputStyle}>
                <NumericInput
                  onChange={SetLiving_rooms}
                  style={styles.NumericInputStyle}
                  totalHeight={40}
                  totalWidth={80}
                  minValue={0}
                  rightButtonBackgroundColor="black"
                  leftButtonBackgroundColor="black"
                  iconStyle={{ color: "white" }}
                  rounded={true}
                />
              </View>
            </View>
            <View style={{display:loading,height:'20%'}}><Loading height={50}/></View>
            <TouchableOpacity onPress={postHouse} style={{...styles.Button, display:add_photos_Button}}>
              <Text style={{ color: "white" }}>{t('add_photos') }</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  container: {
    top: "25%",
    height: "50%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 2,
    padding: 15,
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: 20,
    borderColor: "skyblue",
    backgroundColor: "white",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 2,
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
  image_button_box: {
    width: "30%",
    bottom: "20%",
    alignItems: "center",
  },
  images_list: {
    flex: 3,
    bottom: 10,
    height: "70%",
    borderColor: "skyblue",
    borderRadius: "35%",
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "skyblue",
    shadowRadius: 10,
    borderRadius: "10%",
    shadowOpacity: 1,
  },
  image: {
    height: 230,
    width: 230,
    padding: 2,
    borderWidth: 2,
    borderColor: "skyblue",
    margin: "3%",
    shadowOffset: { height: 1, width: 1 },
    backgroundColor: "white",
    shadowRadius: 10,
    borderRadius: "10%",
    shadowOpacity: 1,
  },
  input: {
    marginLeft: 30,
    borderBottomWidth: 1,
    fontSize: 16,
    width: "75%",
  },
  small_input: {
    marginLeft: 30,
    borderBottomWidth: 1,
    fontSize: 13,
    width: "25%",
  },
  iconText: {
    left: "20%",
    color: "grey",
    marginTop: 10,
    marginBottom: 5,
  },
  iconStyle: {
    right: "70%",
    color: "skyblue",
  },
  NumericInputStyle: {
    left: "90%",
  },
  Button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "skyblue",
    borderColor: "skyblue",
    borderRadius: 8,
    width: "50%",
    top: 10,
    height: 40,
  },
  header: {
    position: "absolute",
    marginTop: "15%",
    color: "skyblue",
    fontWeight: "800",
    width: "100%",
    left: "5%",
    marginLeft: "8%",
  },
  header_icon: {
    position: "absolute",
    marginTop: "13%",
    left: "5%",
    fontWeight: "800",
  },
});
