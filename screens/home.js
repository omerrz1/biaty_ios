import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  RefreshControl,
  View,
  Modal,
} from "react-native";
import { HouseDetails } from "./houseDetails";
import { HouseCard, MyHouseCard } from "../components/houseCard";
export function HomePage(props) {
  const [houses, SetHouses] = useState([]);
  const ep = "https://www.baity.uk/house/";
  function get_houses() {
    fetch(ep)
      .then((repsonse) => repsonse.json())
      .then((data) => SetHouses(data));
  }

  function show_house_modal(item) {
    set_house(item)
    set_show_house(true)
    console.log(item)
  }

  useEffect(get_houses, []);
  const [show_house, set_show_house] = useState(false)
  const [house, set_house] = useState()
  return (
    <ImageBackground
      style={styles.backgrund}
      source={require("../assets/homeBG.png")}
    >
      <View style={styles.feed_container}>
        <FlatList

          style={{alignSelf:'center',padding:5, paddingTop:'30%',zIndex:30}}
          data={houses}
          // keyExtractor={
          //     (item)=>item.id.toString()
          // }
          showsVerticalScrollIndicator={false}

          refreshControl={<RefreshControl onRefresh={get_houses} />}
          renderItem={({ item }) => <HouseCard pressed={()=>show_house_modal(item)} house={item} />}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />

        <Modal animationType="slide" transparent={false} visible={show_house}>
          <HouseDetails back={()=>set_show_house(false)} house={house} />
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgrund: {
    flex: 1,
    width: "100%",
  },

  feed_container: {
    flex: 1,
    width: "100%",
  },
});
