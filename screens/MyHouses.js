import {
  View,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyHouseCard } from "../components/houseCard";
import {
  AntDesign,
  Ionicons,
  Foundation,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { StackActions } from "@react-navigation/native";
import { useState } from "react";

export function MyHouses(props) {
  // states

  const [houses, setHouses] = useState(props.route.params.houses);
  const [Showpopup, setShowPopup] = useState(false);
  const [showEditHouseModal, setshowEditHouseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [HouseID, setHouseID] = useState();
  const [HouseToEdit, setHouseToEdit] = useState();

  const [HouseAddress, setHouseAddress] = useState();
  const [HousePrice, setHousePrice] = useState();
  const [HouseArea, setHouseArea] = useState();
  const [HouseDescription, setHouseDescription] = useState();
  const [Bathrooms, setBathrooms] = useState();
  const [Bedrooms, setBedrooms] = useState();
  const [Public, setPublic] = useState();
  const [Livingrooms, setLivingrooms] = useState();

  // functions
  function Delete_house(id) {
    console.log(id);
    setHouseID(id);
    setShowPopup(true);
  }

  function on_save(id) {
    const house = new FormData();
    house.append("address", HouseAddress);
    house.append("price", parseInt(HousePrice));
    house.append("area", parseInt(HouseArea));
    house.append("description", HouseDescription);
    house.append("living_rooms", Livingrooms);
    house.append("bath_rooms", Bathrooms);
    house.append("bed_rooms", Bedrooms);
    house.append("public", Public);

    console.log("house edited : ", house);
    const endPoint = `https://www.baity.uk/house/update/${id}/`;
    AsyncStorage.getItem("token")
      .then((token) => {
        fetch(endPoint, {
          method: "PUT",
          body: house,
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => console.log("data: ", data));
      })
      .catch((err) => console.log(err));

    setshowEditHouseModal(false);
    props.navigation.dispatch(StackActions.pop());
    props.navigation.dispatch(StackActions.replace("profileScreen"));
  }
  function editHouse(House) {
    setHouseToEdit(houses);
    // no i need to set all the properties indvidually
    setHouseAddress(House.address);
    setHouseDescription(House.description);
    setHousePrice(House.price.toString());
    setHouseArea(House.area.toString());
    setPublic(House.public);
    setBedrooms(House.bed_rooms);
    setBathrooms(House.bath_rooms);
    setLivingrooms(House.living_rooms);
    setHouseID(House.id);
    setshowEditHouseModal(true);
  }

  function onConfirm(id) {
    console.log("house will be deleted is house withe the ID: ", id);
    AsyncStorage.getItem("token").then((token) => {
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
            setHouses(houses.filter((house) => house.id != id));
            console.log("house ", id, " was deleted succefully and confiermd");
          } else {
            console.log("404 not found");
          }
        });
    });
    console.log(id, " was deleted");
    setShowPopup(false);
  }
  function back_to_Profile() {
    props.navigation.dispatch(StackActions.pop());
    props.navigation.dispatch(StackActions.replace("profileScreen"));
  }

  return (
    <ImageBackground
      style={styles.backgruond}
      source={require("../assets/homeBG.png")}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={back_to_Profile}
          style={styles.backbuttoncontainer}
        >
          <Ionicons
            style={{}}
            name="arrow-back-circle"
            size={30}
            color="skyblue"
          />
          <Text style={{ color: "skyblue", fontWeight: "bold" }}>profile</Text>
        </TouchableOpacity>
        <FlatList
          style={{ padding: "3%", alignSelf: "center" }}
          data={houses}
          // keyExtractor={
          //     (item)=>item.id.toString()
          // }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MyHouseCard
              OnEdit={editHouse}
              Delete_house={Delete_house}
              house={item}
            />
          )}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={Showpopup}>
        <View style={styles.modalcontainer}>
          <Text style={styles.ModalLabel}>
            are you sure you want to delete this house?
          </Text>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={() => setShowPopup(false)}
              style={styles.NoButton}
            >
              <Text>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.YesButton}
              onPress={() => onConfirm(HouseID)}
            >
              <Text>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showEditHouseModal}
        animationType="slide"
        transparent={true}
      >
        <ImageBackground
          style={styles.EditModalContainer}
          resizeMode="cover"
          source={require("../assets/homeBG.png")}
        >
          <View style={styles.modalStyle}>
            <View style={styles.input_container}>
              <Entypo style={{ marginTop: 10 }} size={25} name="location" />
              <TextInput
                value={HouseAddress}
                onChangeText={setHouseAddress}
                style={styles.input}
                textAlign="center"
              />
            </View>
            <View style={styles.input_container}>
              <FontAwesome5
                style={{ marginTop: 10 }}
                size={25}
                name="comment-dollar"
              />
              <TextInput
                value={HousePrice}
                onChangeText={setHousePrice}
                keyboardType="numeric"
                style={styles.small_input}
              />

              <Entypo
                style={{ marginTop: 10, marginLeft: 15 }}
                size={30}
                name="ruler"
              />
              <TextInput
                value={HouseArea}
                onChangeText={setHouseArea}
                keyboardType="numeric"
                style={styles.small_input}
              />
            </View>
            <View style={styles.input_container}>
              <Foundation name="comment-quotes" size={30} />
              <TextInput
                value={HouseDescription}
                onChangeText={setHouseDescription}
                style={styles.input}
              />
            </View>
            <View style={styles.numbers}>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 style={styles.iconStyle} name="bath" size={30} />
                <View style={styles.NumericInputStyle}>
                  <NumericInput
                    style={styles.NumericInputStyle}
                    totalHeight={40}
                    totalWidth={80}
                    value={Bathrooms}
                    onChange={setBathrooms}
                    rightButtonBackgroundColor="black"
                    leftButtonBackgroundColor="black"
                    iconStyle={{ color: "white" }}
                    rounded={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <FontAwesome5 style={styles.iconStyle} name="bed" size={30} />
                <View style={styles.NumericInputStyle}>
                  <NumericInput
                    style={styles.NumericInputStyle}
                    totalHeight={40}
                    totalWidth={80}
                    value={Bedrooms}
                    onChange={setBedrooms}
                    rightButtonBackgroundColor="black"
                    leftButtonBackgroundColor="black"
                    iconStyle={{ color: "white" }}
                    rounded={true}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  style={styles.iconStyle}
                  name="sofa"
                  size={30}
                />
                <View style={styles.NumericInputStyle}>
                  <NumericInput
                    style={styles.NumericInputStyle}
                    totalHeight={40}
                    totalWidth={80}
                    value={Livingrooms}
                    onChange={setLivingrooms}
                    rightButtonBackgroundColor="black"
                    leftButtonBackgroundColor="black"
                    iconStyle={{ color: "white" }}
                    rounded={true}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: "10%",
                width: "60%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>PUBLIC?</Text>

              <BouncyCheckbox
                size={35}
                isChecked={Public}
                fillColor="skyblue"
                value={true}
                iconStyle={{ borderColor: "skyblue" }}
                innerIconStyle={{ borderWidth: 4 }}
                onPress={setPublic}
              />
            </View>
            <TouchableOpacity
              onPress={() => on_save(HouseID)}
              style={styles.editButton}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgruond: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingTop: "27%",
    width: "100%",
    paddingBottom: "20%",
  },
  backbuttoncontainer: {
    position: "absolute",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-around",
    top: "8%",
    alignItems: "center",
  },
  modalcontainer: {
    backgroundColor: "white",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "skyblue",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.7,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  YesButton: {
    borderWidth: 1,
    borderRadius: "10%",
    width: "30%",
    height: "50%",
    right: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "deeppink",
    borderColor: "deeppink",
  },
  NoButton: {
    borderWidth: 1,
    padding: "2%",
    borderRadius: "10%",
    justifyContent: "center",
    height: "50%",
    left: "15%",
    width: "30%",
    alignItems: "center",
    backgroundColor: "cornflowerblue",
    borderColor: "cornflowerblue",
  },
  EditModalContainer: {
    marginLeft: "5%",
    marginRight: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: "15%",
    borderColor: "skyblue",
    shadowOffset: { height: 0, width: 0 },
    shadowColor: "cornflowerblue",
    shadowRadius: 10,
    shadowOpacity: 1,
    borderWidth: 3,
  },
  modalStyle: {
    flex: 1,
    width: "100%",
    top: "13%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input_container: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "7%",
  },
  input: {
    borderBottomWidth: 1,
    width: "80%",
    marginLeft: "5%",
  },
  small_input: {
    borderBottomWidth: 1,
    width: "25%",
  },
  numbers: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  NumericInputStyle: {
    left: "90%",
  },
  iconStyle: {
    right: "70%",
    color: "skyblue",
  },
  editButton: {
    borderRadius: "10%",
    justifyContent: "center",
    height: "5%",
    width: "40%",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
});
