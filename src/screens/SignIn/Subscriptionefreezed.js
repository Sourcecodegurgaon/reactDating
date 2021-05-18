import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TextInput, FlatList } from "react-native";
import { Picker } from 'react-native'
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { AppLoading } from 'expo';
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Http from "../../Api/Http"
import * as InAppPurchases from 'expo-in-app-purchases';
//import { connectAsync, IAPRespoinseCode } from 'expo-in-app-purchases';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import Moment from 'moment';


const Subscriptionefreezed = props => {
    const [liveValue, setliveValue] = useState();
    const [spinner, setspinner] = useState(false)
    const [value, setValue] = useState();

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_400Regular
    });
    useEffect(() => {

        setspinner(false)


    }, []);


    const unFreeze = async () => {

        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid

            setspinner(true)

            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
            Http.put('user/' + userId, {
                field_freezeaccount: { und:[{  value:"false"}] },
                field_renewaloption:{und:[{value:"Manual"}]},
                field_subscriptionenddate:{und:[{  value: Moment().add(response.data.field_freezeaccountdays.und[0].value, 'days')}]},


            },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
         
                setspinner(false)
                props.navigation.navigate('FindFriends')
        
            }).catch(function (error) {
                console.log(error.response.data)
            })
    
    
        })
    
    
    
        
        
    
    
    
        })
        //field_freezeaccountdays
      
    }

  



const LogOut = () => {
    setspinner(true)
    AsyncStorage.getItem('Token', (err, result) => {
        const LogoutToken = JSON.parse(result)
  
       
    //Logout
    axios.post('http://gowebtutorial.com/api/json/user/logout', {}, {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token }
    }).then((response) => {
        AsyncStorage.clear();
         props.navigation.navigate('Home')
         setspinner(false) 
    }).catch(function (error) {
      AsyncStorage.clear();
        setspinner(false)
      
    
    });
  
  })
  }
  

    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else {
        return (


            <View style={{ flex: 1, backgroundColor: "white", paddingLeft: 2, paddingRight: 2 }}>
                <Spinner
                    visible={spinner}
                    textContent={'Updating...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />


                <View style={{justifyContent:"center",alignItems:"center",marginTop:90}}>
                           <Text style={styles.labelText}>Your subscription is frozen,
                            </Text>
                            <Text style={styles.labelText}>Click below to unfreeze
                            </Text>
                            
                </View>
                <View style={{height:50}}></View>
                <View style={styles.mainContainerSubs}>
            
      
{/*       
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>$4.99 USD - monthly</Text>
                            <RadioButton value="Monthly" color="#056AAD"/>
                        </View>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>$19.99 USD - yearly</Text>
                            <RadioButton value="Yearly" color="#056AAD" />
                        </View>
                    </RadioButton.Group> */}
                    <View style={{height:50}}></View>
                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={unFreeze}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                        />
                           <Button
                            onPress={LogOut}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD", marginVertical: 8 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD", borderRadius: 10 }}
                            title="Cancel"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                        />
                    </View>
                </View>

                {/* <View style={styles.seconddropDownStyle}>
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
                            </View> */}

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
        marginVertical: 8,
        flex:3,
        justifyContent:"center"
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
    spinnerTextStyle: {
        color: "white"
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

    },
    spinnerTextStyle: {
        color: "white"
    },
    RadioStyling: {
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    mainContainerSubs:{
        marginLeft:20,
        marginRight:20,

        flex:2
        
    }

});

export default Subscriptionefreezed