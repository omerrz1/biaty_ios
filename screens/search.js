import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { HouseCard } from "../components/houseCard";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from "i18next";
export function HouseSearch(props) {
  const [houses, setHouses] = useState([]);
  const [query, setQuery] = useState("@");
  function getResults() {
    fetch(`https://www.baity.uk/house/search/?q=${query}`)
      .then((Response) => Response.json())
      .then((data) => {
        setHouses(data);
      });
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
            style={{ padding: "3%", alignSelf: "center" }}
            data={houses}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <HouseCard house={item} />}
          />
        </View>
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
