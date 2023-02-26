import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HouseSearch } from "./search";
import { HouseForm, HouseIMages } from "./createHouse";
import { Splash } from "./splash";
import { Createuser } from "./createAccount";
import { Auth } from "./authenticate";
import { MustLogin } from "./mustLogin";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./home";
import { Verify_otp } from "./OTP";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../screens/profile";
import { MyHouses } from "./MyHouses";
import { UserDetails } from "./userDetails";

function search_icon({ focused }) {
  return (
    <View style={{ ...styles.icons, borderColor: focused ? "black" : "white" }}>
      <MaterialCommunityIcons
        name="home-search"
        size={24}
        color={focused ? "black" : "white"}
      />
    </View>
  );
}

function add_houes_icon({ focused }) {
  return (
    <View style={{ ...styles.icons, borderColor: focused ? "black" : "white" }}>
      <MaterialCommunityIcons
        name="home-plus"
        size={24}
        color={focused ? "black" : "white"}
      />
    </View>
  );
}

function home_page_icon({ focused }) {
  return (
    <View style={{ ...styles.icons, borderColor: focused ? "black" : "white" }}>
      <MaterialCommunityIcons
        name="home"
        size={24}
        color={focused ? "black" : "white"}
      />
    </View>
  );
}

function profile_page_icon({ focused }) {
  return (
    <View style={{ ...styles.icons, borderColor: focused ? "black" : "white" }}>
      <Ionicons
        name="md-settings-sharp"
        size={24}
        color={focused ? "black" : "white"}
      />
    </View>
  );
}

function Create_house_icon({ focused }) {
  return (
    <View style={{ ...styles.icons, borderColor: focused ? "black" : "white" }}>
      <MaterialCommunityIcons
        name="home-plus"
        size={24}
        color={focused ? "black" : "white"}
      />
    </View>
  );
}

export function CreateHouseNavigation(props) {
  const { Navigator, Screen } = createStackNavigator();
  return (
    //add a delete houes on cancel

    <Navigator>
      <Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="form"
        component={HouseForm}
      />
      <Screen
        options={{ gesturesEnabled: false, headerShown: false }}
        name="images"
        component={HouseIMages}
      />
      {/**Main (not guest) home tap navigator  */}
      <Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="user-navigation"
        component={UserNavigation}
      />
    </Navigator>
  );
}

//Authentication navigation
export function AuthNavigation() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="splash"
          component={Splash}
          options={{ gestureEnabled: false, headerShown: false }}
        />
        <Screen
          name="login"
          component={Auth}
          options={{ gestureEnabled: false, headerShown: false }}
        />
        <Screen
          name="create-user"
          component={Createuser}
          options={{ headerShown: false }}
        />
        <Screen
          name="OTP"
          component={Verify_otp}
          options={{ headerShown: false }}
        />
        {/**home tab */}
        <Screen
          name="guest-navigation"
          component={GuestNavigation}
          options={{ headerShown: false, gesturesEnabled: false }}
        />
        <Screen
          name="user-navigation"
          component={UserNavigation}
          options={{ headerShown: false, gesturesEnabled: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

// guest tab navigation
export function GuestNavigation(props) {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: { ...styles.nav },
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="home"
        component={HomePage}
        options={{ headerShown: false, tabBarIcon: home_page_icon }}
      />
      <Screen
        name="searach"
        component={HouseSearch}
        options={{ headerShown: false, tabBarIcon: search_icon }}
      />
      <Screen
        name="must-login"
        component={MustLogin}
        options={{ headerShown: false, tabBarIcon: add_houes_icon }}
      />
    </Navigator>
  );
}

//user navigation
export function UserNavigation(props) {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: { ...styles.nav },
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="home"
        component={HomePage}
        options={{ headerShown: false, tabBarIcon: home_page_icon }}
      />
      <Screen
        name="searach"
        component={HouseSearch}
        options={{ headerShown: false, tabBarIcon: search_icon }}
      />
      <Screen
        name="create-house"
        component={CreateHouseNavigation}
        options={{ headerShown: false, tabBarIcon: Create_house_icon }}
      />
      <Screen
        name="profile"
        component={ProfileNavigation}
        options={{ headerShown: false, tabBarIcon: profile_page_icon }}
      />
    </Navigator>
  );
}

export function Re_set(props) {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen
        name="user-navigation"
        component={UserNavigation}
        options={{ headerShown: false, gesturesEnabled: false }}
      />
    </Navigator>
  );
}

//profile details navigationr
export function ProfileNavigation(props) {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen
        name="profileScreen"
        component={Profile}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Screen
        name="myhouses"
        component={MyHouses}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Screen
        name="splash"
        component={Splash}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Screen
        name="home"
        component={Re_set}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Screen
        name="details"
        component={UserDetails}
        options={{ gestureEnabled: false, headerShown: false }}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "skyblue",
    bottom: "5%",
    position: "absolute",
    right: "3%",
    left: "3%",
    borderRadius: "30%",
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "grey",
    shadowRadius: 9,
    shadowOpacity: 0.8,
  },
  icons: {
    alignSelf: "center",
    top: "25%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "5%",
    paddingBottom: "5%",
    borderRadius: "20%",
  },
});
