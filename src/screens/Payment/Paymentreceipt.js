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
import Moment from 'moment';
import { Constants } from 'expo-camera';
const Paymentreceipt = (props) => {
    const [spinner, setspinner] = useState(false)
   // const param = navigation.getParam('Type')
   const newDate = new Date()
   const [currDate ,setcurrDate] = useState()
   const [closeDate , setCloseDate]= useState()
const [orderId , setorderId ] = useState(Math.floor((Math.random() * 10) + 1))

const [monthlyMem, setmonthlyMem] = useState(false)
const [yearlyMem, setyearlyMem] = useState(false)

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_400Regular
    });
  

useEffect(() => {     



updateSubscription()
 
}, []);

    //field_subcriptiontype	
    //SubscriptionStartDate	
    //field_subscriptionenddate

  const updateSubscription = () =>{
    AsyncStorage.getItem('Token', (err, result) => {
        const UserDetail = JSON.parse(result)
        const userId = UserDetail.data.user.uid
        setcurrDate(Moment().format('DD/MM/yyyy'))
        setspinner(true)

        if(props.navigation.state.params.Type  == "Monthly")
        {

            setmonthlyMem(true)
        Http.put('user/' + userId, {
            field_subcriptiontype: { und:[{  value:props.navigation.state.params.Type}] },
            field_subscriptionstartdate: {und:[{  value: newDate}] },
            field_subscriptionenddate:{und:[{  value: Moment().add(1, 'months').add(-1, 'days')}]},
            field_renewaloption:{und:[{value:"Auto"}]},
            field_verfied:{ und: [{ value: "true" }]}

        },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
            setspinner(false)
    
        }).catch(function (error) {
            console.log(error.response)
        })
            setCloseDate(Moment().add(1, 'months').add(-1, 'days').format('DD/MM/yyyy'))    
        }



        if(props.navigation.state.params.Type  == "Yearly")
        {

            setyearlyMem(true)
            Http.put('user/' + userId, {
                field_subcriptiontype: { und:[{  value:props.navigation.state.params.Type}] },
                field_subscriptionstartdate: { und:[{  value:newDate }]},
                field_subscriptionenddate:{und:[{  value: Moment().add(12, 'months').add(-1, 'days') }]},
                field_renewaloption:{und:[{value:"Auto"}]},
                field_verfied:{ und: [{ value: "true" }]}

    
            },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
        
            }).catch(function (error) {
                console.log(error.response)
            })

            setCloseDate(Moment().add(12, 'months').add(-1, 'days').format('DD/MM/yyyy'))    

        }
    

        //setspinner(false)

    })


  }





    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else {
        return (



            <View style={{ flex: 1, backgroundColor: "white", paddingLeft: 10, paddingRight: 10 }}>
                <Spinner
                    visible={spinner}
                    textContent={'Updating...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />
                <View style={{ justifyContent: "center", width: "100%",alignItems:"center" ,marginTop:90}}>
                    <Text style={styles.labelText}>Thanks For Your Order</Text>
                </View>

                <View style={{height:50}}></View>
                <View>
                    <Text style={styles.labelText}>Your order details:</Text>
                </View>

                <View style={styles.OutputContainer}>

                    <Text style={styles.labelText}>Order Id: </Text><Text style={styles.labelOutPutText}>#{orderId}</Text>
                </View>

            {monthlyMem ?(
                <View style={styles.OutputContainer}>
                    <Text style={styles.labelText}>Price: </Text><Text style={styles.labelOutPutText}>$4.99 USD</Text>
                </View>
                ):null}
                      {yearlyMem ?(
                <View style={styles.OutputContainer}>
                    <Text style={styles.labelText}>Price: </Text><Text style={styles.labelOutPutText}>$19.99 USD</Text>
                </View>
                ):null}

                <View style={styles.OutputContainer}>

                    <Text style={styles.labelText}>Subscription Type: </Text><Text style={styles.labelOutPutText}>{props.navigation.state.params.Type}</Text>
                </View>

                <View style={styles.OutputContainer}>

                    <Text style={styles.labelText}>Subscription Start Date: </Text><Text style={styles.labelOutPutText}>{currDate}</Text>
                </View>
                <View style={styles.OutputContainer}>

                    <Text style={styles.labelText}>Subscription End Date: </Text><Text style={styles.labelOutPutText}>{closeDate}</Text>
                </View>

                <View style={{height:50}}></View>
                <View style={styles.mainContainerPicker}>
                        <Button
                          onPress={()=>    props.navigation.navigate('FindFriends')}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Find Friends"
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
    mainContainerSubs: {
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "flex-end",
    },
    labelOutPutText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 20
    },
    OutputContainer: {
        flexDirection: "row",
        alignItems: "center"
    }

});
export default Paymentreceipt



