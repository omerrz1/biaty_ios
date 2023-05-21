import { View,StyleSheet,Text, ScrollView, ImageBackground,TouchableOpacity ,Tex, Image,FlatList } from "react-native";
import { Entypo,FontAwesome5,FontAwesome,Foundation,Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export function HouseDetails(props) {
    // let house = {"address": "Final house", "area": 234432, "bath_rooms": 200, "bed_rooms": 1, "contact": 906608504, "description": "What is Lorem Ipsumwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "id": 49, "key": "49", "living_rooms": 1, "owner": "عمر", "photos": [{"house": 49, "key": "9", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"},{"house": 49, "key": "8", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"},{"house": 49, "key": "7", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"}], "price": 2423, "public": true, "rent": true, "sell": false}
    let house = props.house
    let photos = house.photos
    let new_photos_list = []
    const {t} = useTranslation()
    for (let photo of photos) {
        new_photos_list.push(photo.photo)
    }   

    const options = { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 };
    const house_area = house.area.toLocaleString('en-EN', options);
    const house_price = house.price.toLocaleString('en-EN', options);
    // Returns "12,34,567.89" (formatted in the Indian format)
    return (
        <View style={styles.container}>
       
            <ImageBackground  style={styles.background} source={require('../assets/homeBG.png')} >
                <ScrollView>
                    <TouchableOpacity onPress={props.back} style={styles.backbuttoncontainer}>
                    <Ionicons name="arrow-back-circle" size={30} color="skyblue" />
                    <Text style={{ color: "skyblue", fontWeight: "bold" }}>back</Text>
                </TouchableOpacity>
                    <View style={{paddingBottom:200}}>
                <View style={styles.images_container}>
                            <FlatList
                                data={house.photos}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item})=><Image source={{uri:item.photo}} style={styles.Image}/>}
                            />
                    </View>
                    <View style={styles.address}>
                        <Entypo color='skyblue' style={{ marginTop: 10 }} size={35} name="location" />
                        <Text style={{...styles.text,fontWeight:'bold'}}>
                                {house.address}
                        </Text>

                        </View>

                        <View style={styles.address}>
                        <FontAwesome5 name="ruler-combined" size={24} color="skyblue" />
                        <Text style={{...styles.text,fontWeight:'bold'}}>
                                {house_area}
                        </Text>
                        <Text style={styles.text}>
                                {t('square')}
                        </Text>
                        </View>

                        <View style={styles.rooms}>

                            <View style={styles.status_label}>
                            <Text style={{color:'white', fontWeight:'bold'}}>{t(house.status)}</Text>
                        </View>

                        <View style={{...styles.room, borderBottomWidth: 1,paddingBottom:10}}>
                            <FontAwesome5 color='skyblue' name="bath" size={30} />
                            <Text style={styles.number}>{ house.bath_rooms}</Text>
                        </View>
                        <View style={{...styles.room, borderBottomWidth: 1,paddingBottom:10}}>
                            <MaterialCommunityIcons color='skyblue' name="bed" size={30} />
                            <Text style={styles.number}>{house.bed_rooms}</Text>
                        </View>

                        <View style={styles.room}>
                            <MaterialCommunityIcons color='skyblue' name="sofa" size={30} />
                            <Text style={styles.number}>{house.living_rooms}</Text>
                        </View>
                        </View>
                    
                    <View style={styles.price_style}>
                        <View style={{backgroundColor:'skyblue',marginBottom:20,alignItems:'center',justifyContent:'center', borderRadius:250,width:30,height:30}}>
                        <Text style={{color:"white",fontSize:13,alignSelf:'center'}}>
                        SDG
                        </Text>
                            </View>
                            <Text style={{fontWeight:'bold'}}>
                            {house_price}
                         </Text>
                        </View>
                       

                    <View style={styles.description}>
                        <Foundation color='skyblue' name="comment-quotes" size={45}/>
                        <Text style={{marginTop:20,fontSize:20}}>{ house.description}</Text>
                        </View>
                        {/* oenr dtesil */}
                        <View style={styles.owner}>
                            <FontAwesome5 name="house-user" style={{ marginBottom: 20, marginTop: 10 }} size={40} color="skyblue"/>
                            <View style={{ flexDirection: 'row', paddingBottom:20,marginBottom: 10, width: 200, justifyContent: 'space-between', alignItems: 'center', borderBottomWidth:1}}>
                                <FontAwesome5 name="user-alt" size={20} color="skyblue"/>
                                <Text style={{fontSize:15, fontWeight:'bold'}}>{house.owner}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 30, width: 200,justifyContent :'space-between', alignItems:'center'}}>
                                <FontAwesome name="phone" size={24} color="skyblue" />
                                <Text style={{fontSize:15, fontWeight:'bold'}}>{house.contact}</Text>
                        </View>                    
                        </View>
                        </View>
                    </ScrollView>
            </ImageBackground>
        </View>
    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems:'center'
    },
    background: {
        height:'100%',
        width: '100%',
        flex:1
    },
    images_container: {
        flexDirection:'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: '40%',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowColor: 'skyblue',
        shadowRadius: 15,

    },
    Image:{
        height: 300,
        width: 300,
        borderRadius:20,
        marginRight: 20,
        marginLeft: 15,
    },
    address: {
        marginTop: 50,
        alignItems: 'center',
        paddingTop: 10,
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        borderColor: 'skyblue',
        padding: 10,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowColor: 'skyblue',
        backgroundColor:'white',
        shadowRadius: 15,
        borderRadius:20,
    },
    text: {
        fontSize: 20,
        marginTop:15,
    },
    room: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 35,
        width: 230,
        alignSelf: 'center',
    },
    rooms: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderColor: 'skyblue',
        borderWidth: 1,
        marginTop: 50,
        borderRadius: 20,
        shadowOffset: { height: 0, width: 0 },
        shadowColor: 'skyblue',
        shadowOpacity: 1,
        shadowRadius: 15,
        paddingBottom:35
    },
    price_style: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'white',
        width: '90%',
        borderWidth: 1,
        borderColor:'skyblue',
        borderRadius:20,
        shadowOffset: { height: 0, width: 0 },
        shadowColor: 'skyblue',
        shadowOpacity: 1,
        shadowRadius: 15,
        paddingBottom: 35,
        padding: 10,
    },
    backbuttoncontainer: {
        flexDirection: "row",
        width: "30%",
        justifyContent: "space-around",
        top:80,
        alignItems: "center",
        alignSelf: "flex-start",
        zIndex: "10%",
      },
    status_label: {
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        width: '50%',
        marginTop: '5%',
        padding: 10,
        borderRadius:20
    },
    description: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'white',
        width: '90%',
        borderWidth: 1,
        borderColor:'skyblue',
        borderRadius:20,
        shadowOffset: { height: 0, width: 0 },
        shadowColor: 'skyblue',
        shadowOpacity: 1,
        shadowRadius: 15,
        paddingBottom: 35,
        padding: 10,
    },
    number: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    owner: {
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        marginTop: 50,
        borderWidth: 1,
        borderColor: 'skyblue',
        backgroundColor: 'white',
        shadowColor:'skyblue',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius:15,
        borderRadius: 15,
        padding:10
    }

})