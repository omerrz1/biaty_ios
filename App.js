import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Splash } from "./screens/splash";
import { Auth } from "./screens/authenticate";
import { Createuser } from "./screens/createAccount";
import { HouseIMages, HouseForm } from "./screens/createHouse";
import { HouseCard } from "./components/houseCard";
import { HouseSearch } from "./screens/search";
import {
  CreateHouseNavigation,
  GuestNavigation,
} from "./screens/NavigationScreens";
import { AuthNavigation } from "./screens/NavigationScreens";
import { MustLogin } from "./screens/mustLogin";
import { HomePage } from "./screens/home";
import { Verify_otp } from "./screens/OTP";
import { Profile } from "./screens/profile";
import { MyHouses } from "./screens/MyHouses";
import { UserDetails } from "./screens/userDetails";
import { Loading } from "./components/loading";
import { ChangePassword } from "./screens/changePasswod";

export default function App() {
  return (
    <View style={styles.container}>
      <AuthNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
