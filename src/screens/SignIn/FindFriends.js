import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TouchableHighlight, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_400Regular} from '@expo-google-fonts/montserrat';
import Spinner from 'react-native-loading-spinner-overlay';
const FindFriends = props => {

    const [totalPercentage, setTotalPercentage] = useState()
    const [spinner,setspinner] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular
      });

    useEffect(() => {
        props.navigation.addListener('didFocus', () => {        
            getPercent()               
        });
   
      
       
        









    }, [])



    const getPercent = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
      
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                setspinner(true)
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                    
                        if (response.data.field_alcohol.length != undefined) {
                            if (response.data.field_alcohol.length == 0) {
                                var alcohol = 0
                            }
                        }
                        if (response.data.field_alcohol.length == undefined) {

                            var alcohol = 1
                        }
                        if (response.data.field_do_for_fun.length != undefined) {
                            if (response.data.field_do_for_fun.length == 0) {

                                var doforfun = 0
                            }
                        }
                        if (response.data.field_do_for_fun.length == undefined) {

                            var doforfun = 1

                        }

                        if (response.data.field_favorite_books.length != undefined) {
                            if (response.data.field_favorite_books.length == 0) {

                                var books = 0

                            }
                        }
                        if (response.data.field_favorite_books.length == undefined) {

                            var books = 1

                        }

                        if (response.data.field_favorite_movies.length != undefined) {
                            if (response.data.field_favorite_movies.length == 0) {

                                var movies = 0
                            }
                        }
                        if (response.data.field_favorite_movies.length == undefined) {

                            var movies = 1
                        }

                        if (response.data.field_favorite_music.length != undefined) {
                            if (response.data.field_favorite_music.length == 0) {
                                1
                                var musics = 0
                            }
                        }
                        if (response.data.field_favorite_music.length == undefined) {

                            var musics = 1
                        }
                        if (response.data.field_favorite_tv_shows.length != undefined) {
                            if (response.data.field_favorite_tv_shows.length == 0) {

                                var tvshows = 0
                            }
                        }
                        if (response.data.field_favorite_tv_shows.length == undefined) {

                            var tvshows = 1
                        }
                        if (response.data.field_any_pets.length != undefined) {
                            if (response.data.field_any_pets.length == 0) {

                                var tends = 0
                            }
                        }
                        if (response.data.field_any_pets.length == undefined) {

                            var tends = 1
                        }
                      
                        
                        if (response.data.field_good_friend.length != undefined) {
                            if (response.data.field_good_friend.length == 0) {

                                var goodFriend = 0
                            }
                        }
                        if (response.data.field_good_friend.length == undefined) {

                            var goodFriend = 1
                        }

                        if (response.data.field_languages.length != undefined) {
                            if (response.data.field_languages.length == 0) {

                                var languages = 0
                            }
                        }
                        if (response.data.field_languages.length == undefined) {

                            var languages = 1
                        }
                        if (response.data.field_plans_get_cancelled.length != undefined) {
                            if (response.data.field_plans_get_cancelled.length == 0) {

                                var cancelled = 0
                            }
                        }
                        if (response.data.field_plans_get_cancelled.length == undefined) {

                            var cancelled = 1
                        }

                        if (response.data.field_spend_your_days.length != undefined) {
                            if (response.data.field_spend_your_days.length == 0) {

                                var spenddays = 0
                            }
                        }
                        if (response.data.field_spend_your_days.length == undefined) {

                            var spenddays = 1
                        }
                        if (response.data.field_talk_about.length != undefined) {
                            if (response.data.field_talk_about.length == 0) {

                                var talkAbout = 0
                            }
                        }
                        if (response.data.field_talk_about.length == undefined) {

                            var talkAbout = 1
                        }
                        if (response.data.field_you_say.length != undefined) {
                            if (response.data.field_you_say.length == 0) {

                                var yousay = 0
                            }
                        }

                        if (response.data.field_you_say.length == undefined) {

                            var yousay = 1
                        }
                        if (response.data.field_relationship_status.length != undefined) {
                            if (response.data.field_relationship_status.length == 0) {

                                var relationship = 0
                            }
                        }

                        if (response.data.field_relationship_status.length == undefined) {

                            var relationship = 1
                        }

                        if (response.data.field_kids.length != undefined) {
                            if (response.data.field_kids.length == 0) {

                                var field = 0
                            }
                        }

                        if (response.data.field_kids.length == undefined) {

                            var field = 1
                        }

                        if (response.data.field_smoke.length != undefined) {
                            if (response.data.field_smoke.length == 0) {

                                var smoke = 0
                            }
                        }

                        if (response.data.field_smoke.length == undefined) {

                            var smoke = 1
                        }

                        
                        if (response.data.field_long_in_city.length != undefined) {
                            if (response.data.field_long_in_city.length == 0) {

                                var long = 0
                            }
                        }

                        if (response.data.field_long_in_city.length == undefined) {

                            var long = 1
                        }
                        
             

                        var total = 13 + alcohol + doforfun + books + movies + musics + tvshows +  goodFriend + languages + cancelled + spenddays + talkAbout + yousay + tends + relationship + field + smoke + long


                        var percentage = total / 30 * 100
                        setTotalPercentage(percentage.toFixed(1))
         
                    
                        if (totalPercentage == 100) {
                            //props.navigation.navigate('Tabs')

                        }

                    
                    }


                    setspinner(false)
                })
            }
           
        })
    }

    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (
        
        <View style={styles.mainContainer}>
              <Spinner
                        visible={spinner}
                        textContent={'Updating...'}
                        textStyle={styles.spinnerTextStyle}
                        overlayColor={"#000000c4"}
                    />
            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}>Hello! What would you like to do first?</Text>
                    <View >
                        <Button title="Find Friends"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                            containerStyle={{ width: "100%" }}
                            onPress={() => props.navigation.navigate('Tabs')} />
                    </View>
                </View>
                <View>
                    <Text style={styles.upperText}>Or</Text>
                    <View >
                        <Button title="Finish My Profile"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                            containerStyle={{ width: "100%" }} 
                            onPress={() => props.navigation.navigate('Optionaldetail')} />
                    </View>
                </View>
                <View>
                    <Text style={styles.upperText}>Your Profile is currently {totalPercentage} % complete. Our members who share more information in
      their profile get better results. But, if you don’t want to finish now you can add to your profile later at
      any time.</Text>
                  
                </View>





            </View>

        </View>




    )

}
}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor:"white"
    },
    secondMainCotainer:
    {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    upperText:
    {
        fontFamily: "Montserrat_400Regular",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal: 20

    },
    secondContainer: {
        justifyContent: "center",
        flex: 2,
        paddingHorizontal:20
    },
    spinnerTextStyle:{
        color:"white"
    }



})

export default FindFriends