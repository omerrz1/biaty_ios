import {useState} from 'react'
import {View,StyleSheet, TextInput,Text,ScrollView, FlatList,Image, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import '../translations/i18nconfig'
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';



export function HouseCard(props){

    const {t} = useTranslation()

    let photos = props.house.photos
    return(
        <View style={styles.card_container}>

            <ScrollView style={{height:'100%', flexDirection:'row',flex:1,width:"100%"}}  bounces={true} horizontal showsHorizontalScrollIndicator={false}>
               <View style={styles.photos_container}>
                {photos.map(
                    (photo,index)=>(<Image key={index} height={250} width={300} resizeMode='cover' style={styles.image} source={{uri: photo.photo}}/>)
                )}
                </View>
            </ScrollView>
            
            <TouchableOpacity>
            <View style={{top:5, padding:15,alignItems:'center', alignSelf:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                    <Entypo style={{marginTop:10}} size={25} name = 'location'/>
                    <Text style={styles.text} >{props.house.address}</Text>
                </View>

                <View style={{flexDirection:'row', top:'4%', alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome5 style={{}} size={30} name = 'comment-dollar'/>
                    <Text style={styles.text} >{props.house.price}</Text>
                </View>

                <View  style={{flexDirection:'row',top:'8%', alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome5 style={styles.icon}  name="bath" size={30}/>
                    <Text style={styles.text} >{props.house.bath_rooms}</Text>

                    <MaterialCommunityIcons style={styles.icon}  name="bed" size={30} />
                    <Text style={styles.text} >{props.house.bed_rooms}</Text>

                    <MaterialCommunityIcons style={styles.icon}   name="sofa" size={30} />
                    <Text style={styles.text} > {props.house.living_rooms}</Text>
                </View>
                <Text style={{top:'30%', fontWeight:'bold'}}>{t('view_more')}</Text>

            </View>
            </TouchableOpacity>
        </View>
    )
}






export function MyHouseCard(props){

    const {t} = useTranslation()

    let photos = props.house.photos
    return(
        <View style={styles.card_container}>


               <View style={styles.photos_container}>
                <ScrollView style={{height:'100%', flexDirection:'row',flex:2,width:"100%"}}  bounces={true} horizontal showsHorizontalScrollIndicator={false}>
                {photos.map(
                    (photo,index)=>(<Image height={250} width={300} key={index} resizeMode='cover' style={styles.image} source={{uri: photo.photo}}/>)
                )}
                </ScrollView>
                </View>

            
            <TouchableOpacity>
            <View style={{top:5, padding:15,alignItems:'center', alignSelf:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                    <Entypo style={{marginTop:10}} size={25} name = 'location'/>
                    <Text style={styles.text} >{props.house.address}</Text>
                </View>

                <View style={{flexDirection:'row', top:'4%', alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome5 style={{}} size={30} name = 'comment-dollar'/>
                    <Text style={styles.text} >{props.house.price}</Text>
                </View>

                <View  style={{flexDirection:'row',top:'8%', alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome5 style={styles.icon}  name="bath" size={30}/>
                    <Text style={styles.text} >{props.house.bath_rooms}</Text>

                    <MaterialCommunityIcons style={styles.icon}  name="bed" size={30} />
                    <Text style={styles.text} >{props.house.bed_rooms}</Text>

                    <MaterialCommunityIcons style={styles.icon}   name="sofa" size={30} />
                    <Text style={styles.text} > {props.house.living_rooms}</Text>
                </View>
            </View>
            </TouchableOpacity>

                    <View style={styles.options}>
                        <TouchableOpacity onPress={()=>props.OnEdit(props.house)} style={styles.editButton}>
                            <Text style={{color:'white', fontWeight:"bold"}}>
                                Edit
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>props.Delete_house(props.house.id)} style={styles.deleteButton}>
                            <Text style={{color:'white', fontWeight:'bold'}}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}








const styles = StyleSheet.create(
    {
        card_container:{
            paddingTop:'1.6%',
            marginBottom:'15%',
            width:326,
            borderWidth: 3,
            paddingLeft:3,
            flex:1,
            alignItems:'center',
            justifyContent:'flex-start',
            borderColor: 'skyblue',
            borderRadius: '25%',
            height:'100%',
            backgroundColor: 'white',
            shadowOffset:{height:1, width:1},
            shadowColor:'skyblue',
            paddingBottom:'15%',
            shadowOpacity: 1,
            shadowRadius: 7,
        },
        
        image:{
            height: 250,
            width:300,
            alignSelf:'center',
            flex:2,
            marginBottom:10,
            borderWidth:2,
            marginLeft:10,
            borderColor:'skyblue',
            borderRadius:'20%'
        },

        text:{
            marginLeft:'2%',
            fontSize:20,
        },
        icon:{
            marginLeft:30
        },
        photos_container:{
            alignSelf:'center',
            height:'100%',
            flex:2,
            width:'100%',
            flexDirection:'row',
            justifyContent:'center',
            alignItems: 'center',
        },
        options:{
            flexDirection:"row",
            alignItems:'center',
            justifyContent:'space-between',
            marginTop:'10%',
            width:'100%',
            paddingLeft:'15%',
            paddingRight:'15%'
        },
        deleteButton:{
            borderWidth:1,
            padding:'2%',
            borderRadius:'10%',
            width:'40%',
            height:'40%', 
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'deeppink',
            borderColor:'deeppink',
        },
        editButton:{
            borderWidth:1,
            padding:'2%',
            borderRadius:'10%',
            justifyContent:'center',
            height:'40%',
            width:'40%', 
            alignItems:'center',
            backgroundColor:'cornflowerblue',
            borderColor:'cornflowerblue',
        }

    }
)