import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput } from "react-native";
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
import { Linking } from 'react-native'

const TrialOver = props => {
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
  
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (
        <View style={styles.MainContainer}>
            <View style={styles.SecondMainContainer}>
                <Text style={styles.TopText}>We hope you enjoyed your free trial, please subscribe to continue using our app.</Text>
                <Button title="Become Verified "
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                    containerStyle={{ width: "100%" }} 
                    onPress={()=> props.navigation.navigate('PayPals')}/>
                <Text style={styles.BelowText} onPress={() => Linking.openURL('https://not4dating.com/')}>No Thanks! I am happy to
                stay a basic member. Take
                me to the free web version at
                www.not4dating.com.</Text>
            </View>




            <View style={styles.belowContainer}>
                <Text style={styles.belowText}>
                Got feedback on our app?{"\n"} We would love to hear from you.</Text>
                <Button title="Send Feedback"
                onPress={() => Linking.openURL('mailto:contactus@not4dating.com')}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                    containerStyle={{ width: "100%" }} />
            </View>

        </View>
    )

    }

}
const styles = StyleSheet.create({

    BelowText: {
        fontFamily: "Montserrat_200ExtraLight",
        fontSize: 15,
        textAlign: "center",
        marginVertical: 15,

    },
    TopText: {
        fontFamily: "Cairo_700Bold",
        textAlign: "center",
        textAlign: "center",
        fontSize: 18,
        marginVertical: 15
    },
    MainContainer: {
       flex:1,
        backgroundColor: "white",
        justifyContent:"space-evenly",
    },
    SecondMainContainer: {
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingHorizontal:15,
  
    },
    belowText:{
        fontFamily: 'Cairo_700Bold' ,
        fontSize:18,
        textAlign:"center",
    },
    belowContainer:
    {
        paddingHorizontal:30,
        justifyContent:"space-between" 
    }



})
export default TrialOver