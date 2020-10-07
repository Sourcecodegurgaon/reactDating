import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';
import Navigationbar from '../Navigationbar';
import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';



const Moreinfo = props => {
    useEffect(() => {
        async function getKind() {
            font.loadAsync({
                'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
            });
        }
        getKind()
    }, [])
    return (


        <View style={styles.mainContainer}>
            <Navigationbar />
            <SafeAreaView style={styles.secondMainCotainer}>
                <ScrollView >
                    <View style={{justifyContent:"center"}}>
                    <View style={styles.topImage}>
                        <Image style={styles.LeftImage} source={require('../../assets/Images/p1.jpg')} />
                        <Text style={styles.rightText}>RitinN</Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <View>
                            <Text style={styles.upperHeading}>FullName</Text>
                            <Text style={styles.upperHeadingOutput}>Ritin Nijhawan</Text>
                        </View>

                        <View>
                            <Text style={styles.upperHeading}>Email</Text>
                            <Text style={styles.upperHeadingOutput}>Ritin.Nijhawan@gmail.com</Text>
                        </View>
                        <View>
                            <Text style={styles.upperHeading}>Activities:</Text>
                            <Text style={styles.upperHeadingOutput}>Yoda,dance</Text>
                        </View>






                        <Button containerStyle={{ marginHorizontal: 20, marginVertical: 15 }}
                            onPress ={() => props.navigation.navigate('Editprofile')}
                            title="Add More Info"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>
                    </View>

                </ScrollView>
            </SafeAreaView>



        </View>
    )



}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885"
    },
    secondMainCotainer:
    {
        backgroundColor: "white",
        marginHorizontal: 30,
        marginVertical: 30,
        paddingVertical: 20,
        justifyContent:"center"
     
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
    upperHeadingOutput: {
        fontFamily: 'Montserrat-ExtraLight',
        marginHorizontal: 15
    },
    topImage: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    LeftImage: {
        height: 100,
        width: 100,
        marginHorizontal: 20

    },
    rightText: {
        justifyContent: "center",

    }



})


export default Moreinfo