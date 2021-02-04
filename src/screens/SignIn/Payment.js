import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TextInput, FlatList } from "react-native";
import { Picker } from 'react-native'
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { AppLoading } from 'expo';
import { Button } from 'react-native-elements';
const Payment = props => {
    const [liveValue, setliveValue] = useState();
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_400Regular
    });
    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else{
    return(

        <View style={{flex:1,height:"100%",backgroundColor:"white",justifyContent:"center",paddingLeft:2,paddingRight:2}}>
       <View style={styles.seconddropDownStyle}>
                                <Text style={styles.labelText}>Choose Verified Membership Type</Text>

                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={liveValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setliveValue(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                             <Picker.Item label='Select Item' />
                                            <Picker.Item label='Annual : $19.99 USD - yearly' value='$19.99' />
                                            <Picker.Item label='Month to Month : $4.99 USD - monthly' value='$4.99' />
                           
    
                                        </Picker>
                                    </View>
                               </View>
                               <View style={styles.mainContainerPicker}>
                                <Button
                                    onPress={() => props.navigation.navigate('PayPalExpressCheckOut')}
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                />
                            </View>

        </View>
    )

    }

}
const styles = StyleSheet.create({
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat_400Regular'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Cairo_700Bold',
        fontSize: 20
    },
    labelTextTextarea: {
        marginVertical: 5,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16
    },
    mainContainerPicker:
    {
        marginVertical: 8
    },
    overflowContainer:
    {
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 80,
        overflow: "hidden"

    },
    overflowContainerText:
    {
        marginHorizontal: 5,
        textAlign: "justify",
        marginVertical: 10,
        fontFamily: 'Montserrat_400Regular'
    },
    lowerTextfield: {
        marginTop: -23,
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat_400Regular'

    },
    textArea:
    {
        borderWidth: 1,
        height: 100,
        marginHorizontal: 10,

    },
    inputText: {
        borderWidth: 1, paddingHorizontal: 8, marginTop: 4
    },
    TextInputStyleClass: {
        height: 50,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        height: 150, marginHorizontal: 10,

    },
    TextInput: {
        borderWidth: 1,
        height: 45,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat_400Regular',
        borderRadius: 5
    },
    FieldContainer: {
        marginVertical: 10,

    },
    DropDown: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        zIndex: 10,
        backgroundColor: '#fff'


    },
    dropDownActive: {
        fontFamily: 'Montserrat_400Regular'
    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat_400Regular'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_400Regular'
    },
    TextAreaContainer: {
        marginHorizontal: 10
    },
    dropDownStyle: {
        position: 'relative',
        zIndex: 40,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    seconddropDownStyle: {
        position: "relative",
        zIndex: 30,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    thirddropDownStyle: {
        position: "relative",
        zIndex: 20,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    fourthdropDownStyle: {
        position: "relative",
        zIndex: 10,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    fifthdropDownStyle: {
        position: "relative",
        zIndex: 9,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    sixdropDownStyle: {
        position: "relative",
        zIndex: 8,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    sevendropDownStyle: {
        position: "relative",
        zIndex: 7,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    eightdropDownStyle: {
        position: "relative",
        zIndex: 6,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    imagesShow: {
        flex: 1, flexDirection: 'row',

    },
    imageUploadButtonText: {
        fontSize: 17,
        fontFamily: 'Montserrat_400Regular',
        backgroundColor: "#DFF4F5",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"


    },
    imageUploadButton: {
        fontSize: 17,
        fontFamily: 'Montserrat_400Regular',
        backgroundColor: "#DFF4F5",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 40,
        marginVertical: 20
    },

    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat_400Regular',
        borderRadius: 5,
        paddingTop: 3
    },
    androidDropDown: { borderWidth: 1, marginHorizontal: 10, borderRadius: 5 },
    androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 },
    labelUnderText: {
        fontFamily: 'Montserrat_200ExtraLight',
        paddingLeft: 9,
        paddingBottom: 5

    },




    normalTextRelationship: {
        fontFamily: "Montserrat_200ExtraLight"
    },
    BoldTextRelationship: {
        fontFamily: 'Montserrat_700Bold'
    },
    relationshipContainer: {
        flexDirection: "row",
        paddingHorizontal: 10
    },
    spinnerTextStyle:{
        color:"white"
    },
    successButton: {
        backgroundColor: "#28A745"
    },
    tittleText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16
    },
    buttoncontainerStyle: {
        marginVertical: 10,
        marginHorizontal: 10
    
    }

});

export default Payment