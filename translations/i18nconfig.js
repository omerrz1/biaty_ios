import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./en";
import { arabic } from "./ar";
import AsyncStorage from "@react-native-async-storage/async-storage";




const resources ={
    en:english,
    ar:arabic
}



export function update_langugae(){


AsyncStorage.getItem('language')
.then(lan=>{
    let options={
        resources:resources,
        fallbacklang:'en',
        lng:lan,
        interpolation :{
            escapeValue : false,
        }
    }
    i18n.use(initReactI18next).init(options)

})


}

update_langugae()



export default i18n