import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';

import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';



const UserDetails = props => {
    useEffect(() => {

            font.loadAsync({
                'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
            });





            
    }, [])
    return (
        <View style={styles.mainContainer}>
   
            <SafeAreaView style={styles.secondMainCotainer}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.Image} source={require('../../../assets/Images/cross.png')} />
                </TouchableOpacity>
                <ScrollView>

                    <View style={styles.thirdContainer}>


                        <View style={styles.thirdPhotoContainer}>
                            <Text style={{fontFamily: 'Cairo-Bold'}}>RitinN{"\n"}
                                76 ,Male
                            </Text>
                            <Image style={styles.ImageProfile} source={require('../../../assets/Images/p2.jpg')} />

                        </View>

                        <View style={styles.fourthMainContainer}>


                            <View style={styles.fourthIconContainer}>
                            <Ionicons name="ios-chatbubbles"  style={{fontSize:30}}   />
                            <Text>Chat</Text>
                            <Ionicons name="ios-star"  style={{fontSize:30}}   />
                            <Text>Favorite</Text>
                            <Ionicons name="ios-close"  style={{fontSize:40}}   />
                      
                            <Image style={styles.saidImage} source={require('../../../assets/Images/more.png')} />
                            <Text>Report to{"\n"} admin</Text>
                            </View>
                            <View style={styles.fourthContentContainer}>
                            
                            <Text style={styles.fourConatinerText}> I consider myself and I want to meet A lot of acquaintances</Text>
                            
                            <Text style={styles.fourConatinerText}> I consider myself and I want to meet A lot of acquaintances</Text>

                            <Text style={styles.fourConatinerText}> I consider myself and I want to meet A lot of acquaintances</Text>

                            <Text style={styles.fourConatinerText}> I consider myself and I want to meet A lot of acquaintances</Text>

                            <Text style={styles.fourConatinerText}> I consider myself and I want to meet A lot of acquaintances</Text>

                            </View>

                        </View>













                    
                    </View>


                </ScrollView>
            </SafeAreaView>



        </View>
    )



}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",

    },
    secondMainCotainer:
    {
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    thirdContainer: {
        marginHorizontal: 20
    },
    upperHeading: {
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 10,
        fontFamily: 'Cairo-Bold'
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo-Bold',
        color: "red",
        fontSize: 16
    },
    Image:
    {
        width: 20,
        height: 20,
    },
    imageContainer:
    {

        alignItems: "flex-end",
        marginHorizontal: 10, marginVertical: 10
    },
    ImageProfile: {
        height: 100, width: 100, marginRight: 20,
    },
    thirdPhotoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    saidImage:{
        height:30,width:30
    },
    fourthIconContainer:{
        justifyContent:"space-between"
    },
    fourthMainContainer:{
        flexDirection:"row",
        marginTop:20
   
    },
    fourthContentContainer:{
        marginRight:10,
        marginLeft:10
      
    },
    fourConatinerText:{
        fontFamily:"Montserrat-ExtraLight",
        marginVertical:10

    },
    fourthIconContainer:{
      
    }




})


export default UserDetails