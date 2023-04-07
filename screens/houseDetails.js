import { View,StyleSheet,Text, ScrollView, ImageBackground, Tex, Image,FlatList } from "react-native";
import { Entypo,FontAwesome5,Foundation,MaterialCommunityIcons } from "@expo/vector-icons";



export function HouseDetails(props) {


    let house = {"address": "Final house", "area": 234432, "bath_rooms": 200, "bed_rooms": 1, "contact": 906608504, "description": "What is Lorem Ipsumwhen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "id": 49, "key": "49", "living_rooms": 1, "owner": "عمر", "photos": [{"house": 49, "key": "9", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"},{"house": 49, "key": "8", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"},{"house": 49, "key": "7", "photo": "https://www.baity.uk/media/media/image_LlI7PMK.JPEG"}], "price": 2423, "public": true, "rent": true, "sell": false}
    let photos = house.photos
    let new_photos_list = []
    for (let photo of photos) {
        new_photos_list.push(photo.photo)
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={require('../assets/homeBG.png')} >
                <ScrollView>
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
                        <Text style={styles.text}>
                            {house.address}
                        </Text>

                    </View>

                    <View style={styles.rooms}>
                        <View style={styles.room}>
                            <FontAwesome5 color='skyblue' name="bath" size={30} />
                            <Text style={styles.number}>{ house.bath_rooms}</Text>
                        </View>
                        <View style={styles.room}>
                            <MaterialCommunityIcons color='skyblue' name="bed" size={30} />
                            <Text style={styles.number}>{house.bed_rooms}</Text>
                        </View>

                        <View style={styles.room}>
                            <MaterialCommunityIcons color='skyblue' name="sofa" size={30} />
                            <Text style={styles.number}>{house.living_rooms}</Text>
                        </View>
                    </View>

                    <View style={styles.description}>
                        <Foundation color='skyblue' name="comment-quotes" size={45} />
                        <Text style={{marginTop:20,fontSize:20}}>{ house.description}</Text>
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
        shadowColor: 'grey',
        shadowRadius: 15,

    },
    Image:{
        height: 300,
        width: 300,
        borderRadius: '10%',
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
        alignSelf:'center'
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
    }

})