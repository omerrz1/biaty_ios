import AsyncStorage from "@react-native-async-storage/async-storage";
import { use } from "i18next";

// getting user details object
function set_details(user) {
  console.log("user fetched: ", user);
  AsyncStorage.setItem("user_email", user.email);
  AsyncStorage.setItem("user_id", user.id.toString());
  AsyncStorage.setItem("user_phone", user.phone.toString());
  AsyncStorage.setItem("user_username", user.username);
}
export function get_user(token) {
  const end_point = "https://www.baity.uk/owners/profile/";
  fetch(end_point, {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => set_details(data[0]))
    .catch((e) => console.log(e));
}
