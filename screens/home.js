import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import { HouseCard, MyHouseCard } from "../components/houseCard";
export function HomePage(props) {
  const [houses, SetHouses] = useState([]);
  const ep = "https://www.baity.uk/house/";
  function get_houses() {
    fetch(ep)
      .then((repsonse) => repsonse.json())
      .then((data) => SetHouses(data));
  }

  useEffect(get_houses, []);

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
          renderItem={({ item }) => <HouseCard house={item} />}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
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
