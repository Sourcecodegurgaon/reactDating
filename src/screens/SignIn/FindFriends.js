import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';



const FindFriends = () => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])


    return (
        <View style={styles.mainContainer}>
            <Navigationbar />
            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}>Hello! What would you like to do first?</Text>
                    <View >
                        <Button title="Find Friends"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }} />
                    </View>
                </View>
                <View>
                <Text style={styles.upperText}>Or</Text>
                    <View >
                        <Button title="Finish My Profile"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }} />
                    </View>
                </View>
                <View>
                    <Text style={styles.upperText}>Your Profile is currently 0% complete. Our members who share more information in
      their profile get better results. But, if you don’t want to finish now you can add to your profile later at
      any time.</Text>

      <Text style={styles.upperText}>Update Profile Later</Text>
                </View>





            </View>

        </View>




    )

}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
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
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal:20

    },
    secondContainer:{
        justifyContent:"center",
        flex:2
    }



})

export default FindFriends