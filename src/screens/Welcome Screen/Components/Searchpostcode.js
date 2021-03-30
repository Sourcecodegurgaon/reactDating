
import { Text, StyleSheet, View, Picker, FlatList, TextInput ,Image,TouchableOpacity} from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import { AppLoading } from 'expo';

import * as font from 'expo-font';
import { Linking } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';

const Searchpostcode = props => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationPostocde, setlocationPostocde] = useState(null)
    const [loactioncountry, setLocationCountry] = useState(null)
    const [spinner, setspinner] = useState(false)
    //OverLay 
    const [visible, setVisible] = useState(true);
    const [term, setTerm] = useState('')
    const [selectedValue, setSelectedValue] = useState();

    const [noUsers,setNoUser] = useState(false)
    const [android, setAndroid] = useState(false)
    const [ios, setIos] = useState(false)
    const [locationOff, setLocationoff] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });

    const toggleOverlay = () => {
        setVisible(visible);
    };
    useEffect(() => {

        Platform.select({
            ios: () => setIos(true),
            android: () => setAndroid(true)
        })();
    }, [])
    useEffect(() => {
        async function getKind() {
            setTerm(null)
                setSelectedValue(null)
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setspinner(false)
                setTerm(null)
                setSelectedValue(null)
            }

            let location = await Location.getCurrentPositionAsync({});
            setspinner(true)
            setLocationoff(false)
            setTerm(null)
            setSelectedValue(null)
            const lat = location.coords.latitude
            const lng = location.coords.longitude
            setLongitude(lng)
            setLatitude(lat)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + "&types;=postal_code" + '&key=AIzaSyBru6wNx3CwcvRbACg2G4-Cq7o6Lt4wOvI')
                .then(res => res.json())
                .then(json => {
                    const addressData = json
                    const address = addressData.results[0].address_components;
                    for (var i = 0; i < address.length; i++) {
                        if (address[i].types.includes("postal_code")) {
                            const postcode = address[i].long_name;
                            AsyncStorage.setItem('Postcode',JSON.stringify(postcode))
                            setTerm(postcode)
                        }
                        if (address[i].types.includes("country")) {
                            const country = address[i].long_name;
                            setLocationCountry(address[i].long_name)
                            if (country == "Australia") {
                                setLocationCountry('au')
                            }
                            if (country == "Canada") {
                                setLocationCountry('ca')
                            }
                            if (country == "India") {
                                setLocationCountry('in')
                            }
                            if (country == "New Zealand") {
                                setLocationCountry('nz')
                            }
                            if (country == "Singapore") {
                                setLocationCountry('sg')
                            }
                            if (country == "United Kingdom") {
                                setLocationCountry('uk')
                            }
                            if (country == "United States") {
                                setLocationCountry('us')
                            }
                            AsyncStorage.setItem('country',JSON.stringify(country))
                        }
                    }
                    postcountryCode();
                        setspinner(false);
                        //props.navigation.navigate('WelcomeResult', { term, selectedValue })
                })();
                 }

        getKind();

       
    }, [])

    const nousertoggleOverlay = () => {
        setNoUser(!noUsers);
        //navigation.goBack()
        
    };
    const postcountryCode = () =>{
        AsyncStorage.getItem('Postcode', (err, result) => {
            const postcode = JSON.parse(result)
            AsyncStorage.getItem('country', (err, results) => {
                const country= JSON.parse(results)
            if (country == "Australia") {
                   const countrys ='au'
                   props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "Canada") {
                 const countrys='ca'
                 props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "India") {
                   const countrys ='in'
                   props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "New Zealand") {
                    const countrys ='nz'
                    props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })


            }
            if (country == "Singapore") {
                    const countrys ='sg'

                    props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "United Kingdom") {
                  const countrys='uk'

                  props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "United States") {
                const countrys ='us'
            
              props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })
            }



            })
        })
 
    }

    const UserPostcode = async () =>{
        // const countryUser = await Http.get('countrylisting', {
        //     params: {
        //         country: selectedValue,
        //     }
            
        // })
    
        const PostalUser = await Http.get('PostalListing', {
            params: {
                postal_code: term,
                Country:selectedValue
            }
            
        })

        if( PostalUser.data.length == 0)
        {
            setNoUser(true)
     
    }
        else
        {
            props.navigation.navigate('WelcomeResult', {
                term, selectedValue
            })
        }
    
    }

    // Geetting SearchResult
    const [searchPostcode, setserachPostocde] = useState([])


    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{


    return (
        //Html
        <View style={styles.MainBackground}>
            <Spinner
                visible={spinner}
                textContent={'Fetching...'}
                textStyle={styles.spinnerTextStyle}
                overlayColor={"#000000c4"}
            />
          
            <View style={styles.SecondMainBackground}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
            <View style={styles.ImageContainer} >
                        <Image style={styles.ImageProfile} source={require('../../../../assets/Images/crosspop.png')} />
                    </View>
                    </TouchableOpacity>
                <Text style={styles.upperText}>Oops! Looks like location targeting is turned off on your device. Either turn it on or input your postal code and country to see members in your area.
      </Text>



                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    <TextInput placeholder='Postcode' value={term} onChangeText={newValue => setTerm(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, height: 40, borderRadius: 5 }} />
                </View>

                {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label= 'Select Country'  />
                                        <Picker.Item label= 'Australia' value= 'au' />
                                        <Picker.Item label='Canada' value= 'ca' />
                                        <Picker.Item label = 'India' value ='in'/>
                                        <Picker.Item label = 'Singapore' value= 'sg'/>
                                        <Picker.Item label = 'New Zealand' value = 'nz'/>
                                        <Picker.Item label = 'United Kingdom' value = 'uk'/>
                                        <Picker.Item label = 'United States' value = 'us'/>

                                    </Picker>
                                </View>
                            ) : null}

{ios ? (          
                <View style={styles.FieldContainer}>

                    <DropDownPicker
                        items={[
                            { label: 'Australia', value: 'au' },
                            { label: 'Canada', value: 'ca' },
                            { label: 'India', value: 'in' },
                            { label: 'New Zealand', value: 'nz' },
                            { label: 'Singapore', value: 'sg' },
                            { label: 'United Kingdom', value: 'uk' },
                            { label: 'United States', value: 'us' },
                        ]}
                        defaultIndex={0}
                        containerStyle={styles.DropDown}
                        labelStyle={styles.dropDownActive}
                        activeItemStyle={styles.dropDownActive}
                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                        onChangeItem={items => setSelectedValue(items.value)}
                        value={selectedValue}


                    />

                </View>
 ) : null}
                <Text style={styles.upperText}>Don’t see your country?<Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com')}> Click here</Text> to tell us where to expand next.</Text>

                <Button containerStyle={{ marginHorizontal: 30, marginVertical: 10 }}
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 19 }}
                    underlineColor="transparent"
                    inputContainerStyle={{ borderWidth: "none" }}
                    buttonStyle={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}
                    title="Search"
                    onPress={UserPostcode} />

            </View>
            <Overlay isVisible={noUsers} onBackdropPress={nousertoggleOverlay} >
            <View>
           
                <View>
              
                <View style={{paddingVertical:10,justifyContent:"center",alignItems:"center"}}>
                <Text style={styles.upperText}>No users in your pincode</Text>
                <Button
                                onPress={nousertoggleOverlay}
                                    buttonStyle={{ backgroundColor: "#056AAD", textAlign: "center", borderRadius: 10, }}
                                    containerStyle={{ marginHorizontal: 20, marginVertical: 15, width: 100, justifyContent: "center" }}
                                    titleStyle={{ fontSize: 18, fontFamily: 'Cairo_700Bold' }}
                                    title="Back"
                                />
                </View>
                </View>
            </View>
        </Overlay> 




        </View>





    );

};
}




const styles = StyleSheet.create({
    MainBackground: {
        backgroundColor: "#08080885",
        flex: 1,
        justifyContent: "center"
    },
    SecondMainBackground: {
        backgroundColor: "white",
        marginHorizontal: 20,
        justifyContent: "center"
    },
    upperText: {
        paddingVertical: 10,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 19,
        fontFamily: 'Cairo_700Bold',
        lineHeight: 30

    },
    lowerText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 19,
        fontFamily: 'Cairo_700Bold',
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
     
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
    ImageContainer: {
        alignItems: "flex-end",
        paddingHorizontal:20,
        paddingTop:20
    },
    androidDropDown: { borderWidth: 1, marginHorizontal: 15, borderRadius: 5 },
    androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 },
    spinnerTextStyle:{
        color:"white"
    },
    notFoundText: {
        paddingVertical: 25,
        textAlign: "center",
        fontFamily: "Montserrat_200ExtraLight",
        fontSize: 17,
        marginTop: 10
    },

});

export default Searchpostcode