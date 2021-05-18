import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View ,TextInput} from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
import {Montserrat_400Regular} from '@expo-google-fonts/montserrat';
import { Linking } from 'react-native'
import { TouchableWithoutFeedback } from "react-native";


const Becomeverified = (props) => {
    const [spinner, setspinner] = useState(false)

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular,
        Montserrat_200ExtraLight,
      });
    useEffect(() => {
        becomeCerified()
    }, [])


    const becomeCerified = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
        const LogoutToken = JSON.parse(result)
        if(LogoutToken.data.user.field_trial_period_start_date.length == undefined) 
    {
        var msDiff =  new Date().getTime() - new Date(LogoutToken.data.user.field_trial_period_start_date.und[0].value).getTime();    //Future date - current date
    }
        var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      
        //  if(daysTill30June2035 > 8)
        //  {
        //     props.navigation.navigate('Tabs')
        // }
        //  else
        //  {
        //     props.navigation.navigate('FindFriends')
        //  }
        });
      }



      const sevenDaysTrail = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
            setspinner(true)
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            const newDate = new Date()
       

            Http.put('user/' + userId, {
                field_trial_period_start_date: {
                    und: [
                        {
                            value: newDate
                        }
                    ]
                },
                field_verfied:   { 
                    und: [
                    {
                      value: "true"
                    }
                  ]
                }
                
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
               
                props.navigation.navigate('FindFriends')
        
            })

            setspinner(false)
        })
        setspinner(false)

    
      }
      if(!fontsLoaded)
      {
        return(<AppLoading />)
      }
      else{

    return (

        <View style={{ flex: 1,backgroundColor:"white" }}>
       <Spinner
                visible={spinner}
                textContent={'Updating...'}
                textStyle={styles.spinnerTextStyle}
                overlayColor={"#000000c2"}
            />
            <View style={styles.secondContainer}>

                <Text style={styles.alignTextContainer}>
                    We are happy to see you again
                    and can’t wait to help you find
                    friends! I see this is the first time
                    you have logged in to the app.
               </Text>



                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10}}
                    title="Free 7 Days Trial"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                    onPress={sevenDaysTrail}
                />
                <Text style={styles.alignTextContainerButton}>(No card required)</Text>
                <View>
                    <Text style={styles.alignTextContainerTwo}>Become a verified member
                    now for ad-free app usage,
                    unlimited chat,
                    and enhanced search</Text>


                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: "green"}}
                        buttonStyle={{backgroundColor: "green", borderRadius: 10 }}
                        title="Become Verified"
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                        onPress={()=> props.navigation.navigate('Payment')}
                    
                    />

<TouchableWithoutFeedback  onPress={() => Linking.openURL('http://not4dating.com/')}>
                    <Text style={styles.alignTextContainerthree}>No Thanks! I am happy to
                    stay a basic member. Take
                    me to the free web version at
          www.not4dating.com.</Text>
          </TouchableWithoutFeedback>
         
                </View>




            </View>

        </View>







    )

}
}

const styles = StyleSheet.create({

    secondContainer: {
        flex: 2,
        justifyContent: "center",
        marginHorizontal: 15,
        textAlign: "center",
       paddingHorizontal:15
    },
    alignTextContainer:
    {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        paddingBottom:10
    },
    alignTextContainerButton: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Montserrat_200ExtraLight',
        paddingBottom:10,

    },
    alignTextContainerTwo: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        marginTop: 25,
        paddingBottom:10
    },
    alignTextContainerthree: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        marginTop: 40
    },
    spinnerTextStyle:{
        color:"white"
    }
})
export default Becomeverified