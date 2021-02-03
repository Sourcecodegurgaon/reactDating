import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView, TouchableOpacity ,ListItem} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import Http from '../../Api/Http'
import { AsyncStorage } from 'react-native';
import { render } from "react-dom";
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_700Bold_Italic, Montserrat_600SemiBold_Italic, Montserrat_500Medium_Italic, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { TouchableWithoutFeedback} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
const Favorate = (props) => {

    const [search, setSearch] = useState("")
    const [activityValue, setactivity] = useState("")
    const [active, setactive] = useState("")
    const [spinner,setSpinner] = useState(false)
 
    
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_700Bold_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_500Medium,
        Montserrat_400Regular
      });

      useEffect(() => {  
        getFavorite()
        props.navigation.navigation.addListener('didFocus', () => {        
            getFavorite()            
        });
        }, [])


const getFavorite =() =>{

    AsyncStorage.getItem('Token', (err, result) => {
        
        const UserDetail = JSON.parse(result)
        if (UserDetail != null) {
            setSpinner(true)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                if (response.status == 200) {
                    if (response.data.field_favorite_users.length == undefined) {
                       
                        if (response.data.field_block_users.length == undefined) {
                            const User = JSON.parse(response.data.field_block_users.und[0].value)
                            console.log(User )
                           var results =[];
                            for (let userObj of User ) {
                                // Blocked User Uid Coneverted into array
                                if(userObj != undefined)
                                {
                                 //Converted Into Array
                                 results = results.concat(userObj.uid)
                                }
                            }
                              //Compairing Result Uid with Blocked User Uid
                              const listFavorate = response.data.field_favorite_users.und[0].value;
                        const ParseFavorate = JSON.parse(listFavorate);
                        const uniqueFavorite = ParseFavorate
                        
                    
                              var newObject = uniqueFavorite.filter(function (obj) { return !results.includes(obj.uid);});
                           

                              setSearch(newObject)
                              setSpinner(false)
                  
                              
        
                        }
                        else
                        {
                            const listFavorate = response.data.field_favorite_users.und[0].value;
                            const ParseFavorate = JSON.parse(listFavorate);
                            const uniqueFavorite = ParseFavorate
                            setSearch(uniqueFavorite )
                            setSpinner(false)
                        }
        
                        
                    }
                    else
                    {
                        setSpinner(false)
                    }

                }
            })
        }





})
}


    



 
     
    
    const removeDuplicatesBy = (keyFn, array) => {
        console.log(keyFn)
        var mySet = new Set();
        return array.filter(function (x) {
            var key = keyFn(x),
                isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });

    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{
   
    return (


        <SafeAreaView  style={styles.container}>

                     <Spinner
                        visible={spinner}
                        textContent={'Retrieving...'}
                        textStyle={styles.spinnerTextStyle}
                        overlayColor={"#000000c4"}
                    />
        <FlatList
            data={search}
            renderItem={({ item }) => {
                var active = item.activities
                const singleActivity = item.activities[0].value.toString().split(' ').slice(0, 1).join(' ')
                if (item.Kids.length != undefined) {
                    var Parent = "Parent"
                }
                if (item.Pets.length != undefined) {
                    var Pets = 'Pet Owner'
                }
                if (item.Kids.length != undefined && item.Pets.length != undefined) {
                    var Com = ","
                }
                //.replace( /(<([^>]+)>)/ig, '')
                return (
                    <View style={{ flex: 2, backgroundColor: "white", marginTop: 10 }} >
                        <View style={styles.scrollView}>
                            <TouchableWithoutFeedback onPress={()=> props.navigation.navigation.navigate('FindUserDetails',{uid:item.uid})}>

                            <View>
                                <View style={styles.notVerified}></View>
                                <View style={styles.mainContainer} >
                                    <View style={styles.Image}>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{ uri: item.picture }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <View styles={styles.UpperText}>
                                            <View>
                                                <Text style={styles.nameText}>{item.name}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.AgeText}>{item.age}, {item.gender}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.parentText}>{Parent}{Com} {Pets}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.LoweText}>
                                            <View>
                                                <Text style={styles.activityText} numberOfLines={2}>Likes {active[0].value}, {active[1].value}</Text>

                                            </View>

                                            <View style={styles.InterestedContainer}>
                                                <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>

                                            </View>
                                        </View>
                                    </View>




                                </View>

                                </View>
                            </TouchableWithoutFeedback>


                        </View>


                    </View>


                )
              
                        
            }}
            keyExtractor={(item, index) => item.uid}
            />


{/* <View style={styles.NoFavorate}>
    <Text style={styles.NoFaviritetext}>You have not marked any favorite</Text>
</View> */}

    </SafeAreaView >

     




    )

}
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor:"#8B8E8F",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: "center",
        borderTopLeftRadius: 0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 150,



    },
    oneLineActivity: {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20,
    },
    textContainer: {
        justifyContent: "space-between",
        marginLeft: 10,
        flexDirection: "column",

    },

    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
    
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold',
        alignItems: "center",
        textAlign: "center"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: "Montserrat_200ExtraLight",
        fontSize: 15,
        textAlign: "center"
    },
    ImageCheck: {
        height: 20,
        width: 20
    },
    popupTopMessage: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 20,

    },
    popupTopHeading: {
        fontFamily: "Cairo_700Bold",
        fontSize: 24,
        marginHorizontal: 20

    },
    activityText:
    {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20, width: 200
    },
    tinyLogo:
    {
        width: 90, height: 90,
        borderRadius: 90,



    },
    AgeText: {
        fontFamily: "Montserrat_600SemiBold_Italic",
        fontSize: 15,
        marginTop: -4
    },
    nameText:
    {
        fontFamily: "Montserrat_700Bold_Italic",
        fontSize: 20,
        marginTop: -10,
        textShadowColor: '#00000029',
        textShadowOffset: { width: 5, height: 2 },
        textShadowRadius: 10,
        elevation: 2
    },
    parentText: {
        fontFamily: 'Montserrat_500Medium_Italic',
        color: '#676464',
        marginTop: -2,
        marginBottom: 10,
        fontSize: 13


    },
    notVerified:
    {
        backgroundColor: "#8B8D8F",
        height: 20,
        width: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -10,
        marginLeft: 10
    },


    Image:
    {
        shadowColor: '#00000080',
        shadowOffset: { width: 100, height: 100 },
        shadowRadius: 5,
        elevation: 6,
        borderRadius: 37
    },
    ImageContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    ImageProfile: {
        height: 15,
        width: 15
    },
    InterestedContainer: {
        marginTop: 5,
    },
    spinnerTextStyle:{
        color:"white"
    }



});

export default Favorate