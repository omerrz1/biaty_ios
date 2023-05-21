import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { HouseCard } from "../components/houseCard";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from "i18next";
import { HouseDetails } from "./houseDetails";
export function HouseSearch(props) {
  const [houses, setHouses] = useState([]);
  const [query, setQuery] = useState("@");
  const [house, set_house] = useState()
  const [show_house, set_show_house] = useState(false)
  function getResults() {
    fetch(`https://www.baity.uk/house/search/?q=${query}`)
      .then((Response) => Response.json())
      .then((data) => {
        setHouses(data);
      }); 
  }

function show_house_modal(item) {
  set_house(item)
  set_show_house(true)
}

  function AutoCorrect(text) {
    if (text === "" || text === " ") {
      setQuery("@");
    } else {
      setQuery(text);
    }
  }

  useEffect(getResults, [query]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require("../assets/homeBG.png")}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.search_container}>
            <TextInput
              textAlign="center"
              style={styles.search_box}
              onChangeText={AutoCorrect}
              placeholder={t("search_place_holder")}
            />
            <MaterialCommunityIcons
              name="home-search-outline"
              size={50}
              color="black"
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 5, width: "100%" }}>
          <FlatList
            style={{ padding: "3%",width:'100%',alignSelf: "center" }}
            data={houses}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <HouseCard pressed={()=>show_house_modal(item)} house={item} />}
          />
        </View>
        <Modal animationType="slide" transparent={false} visible={show_house}>
          <HouseDetails back={()=>set_show_house(false)} house={house} />
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 155,
    top: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  search_container: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: "2%",
  },
  search_box: {
    borderWidth: 2,
    width: "80%",
    height: "50%",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
    marginLeft: "10%",
  },
});
