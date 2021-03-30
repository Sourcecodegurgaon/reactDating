
import { Text, StyleSheet, View, Picker, FlatList, TextInput, Image, SafeAreaView, ScrollView,TouchableOpacity  } from "react-native";
import Textarea from 'react-native-textarea';

import { Button } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import Http from '../../../Api/Http'
import { AppLoading } from 'expo';

import * as font from 'expo-font';
import { Linking } from 'react-native'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat';
import { Keyboard } from 'react-native'

const NotFoundUser = (props) => {
    console.log(props.navigation.navigate)
    const [anyThingvalue, setanyThing] = useState("");
    let [fontsLoaded] = useFonts({
        Cairo_700Bold
    });


    if (!fontsLoaded) {
        return (<AppLoading />)
    }

    else {

        return (
            //Html
            <View style={styles.MainBackground}>

                <SafeAreaView>
                    <ScrollView>


                        <View style={styles.SecondMainBackground} onPress={Keyboard.dismiss} >
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                            <View style={styles.ImageContainer}>
                                <Image style={styles.ImageProfile} source={require('../../../../assets/Images/crosspop.png')} />
                            </View>
                            </TouchableOpacity>
                            <Text style={styles.upperText}>
                                Oops! Looks like we have not yet expanded to your area.
              </Text>

                            <Text style={styles.upperText}>
                                Fill out below to suggest that we come to you next.
         </Text>
                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setanyThing(text)}
                                        maxLength={120}
                                        value={anyThingvalue}
                                        placeholder={'We would love to hear from you..'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <Button
                                onPress={() => Linking.openURL('mailto:contactus@not4dating.com?subject=Country Not Found&body='+ anyThingvalue)}
                                    buttonStyle={{ backgroundColor: "#056AAD", textAlign: "center", borderRadius: 10, }}
                                    containerStyle={{ marginHorizontal: 20, marginVertical: 15, width: 100, justifyContent: "center" }}
                                    titleStyle={{ fontSize: 18, fontFamily: 'Cairo_700Bold' }}
                                    title="Submit"
                                />
                            </View>


                        </View>



                    </ScrollView>
                </SafeAreaView>


            </View>





        );
    }
};










const styles = StyleSheet.create({
    MainBackground: {
        backgroundColor: "#08080885",
        flex: 1,
        justifyContent: "center"
    },
    SecondMainBackground: {
        backgroundColor: "white",
        marginVertical: 20,
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: "center"
    },
    upperText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 23,
        fontFamily: 'Cairo_700Bold',
        lineHeight: 30

    },
    lowerText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'Cairo_700Bold',
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 20
    },
    FieldContainer: {
        marginVertical: 10,
        zIndex: 200,
        borderRadius: 6
    },
    DropDown: {
        height: 40,
        zIndex: 2,
        borderWidth: 1,
        marginHorizontal: 15,
        borderRadius: 6

    },

    TextAreaContainer: {
        marginHorizontal: 20,

    },
    FieldContainer: {
        marginVertical: 10,

    },
    labelTextTextarea: {
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
        fontSize: 16
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_200ExtraLight'
    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        fontFamily: 'Montserrat_200ExtraLight'
    },
    buttonContainer:
    {
        justifyContent: "center",
        alignItems: "center"
    },
    ImageContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 15

    }

});

export default NotFoundUser