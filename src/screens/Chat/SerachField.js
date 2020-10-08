import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';



const SearchField = props => {
    const [user, setUser] = useState('')
    const [liveValue, setliveValue] = useState("");
    const [meetValue, setmeetValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [activityValue, setactivityValue] = useState("");
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
                    <Text style={styles.upperText}> Search User</Text>

                    <Text style={styles.upperTextHeading}>Location</Text>

                    <View style={styles.mainContainerPicker}>
                    <Text style={styles.labelText}>Postcode</Text>

                        <View style={styles.postocdeField}>
                            <View style={{flex:5}}>
                            <Input placeholder='Enter Postcode' value={user} onChangeText={newValue => setUser(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4}} />
                            </View>
                            <View style={{flex:1,justifyContent:"space-between"}}>
                            <Image style={styles.tinyLogo}    source={require('../../../assets/Images/locate.png')}/>
                         </View>
                        </View>
                        <Text style={styles.labelText}>Country</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="Australia" value="au" />
                                <Picker.Item label="Canada" value="ca" />
                                <Picker.Item label="India" value="in" />
                                <Picker.Item label="New Zealand" value="nz" />
                                <Picker.Item label="Singapore" value="sg" />
                                <Picker.Item label="United Kingdom" value="uk" />
                                <Picker.Item label="United States" value="us" />
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.upperTextHeading}>Criteria</Text>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Looking For</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={meetValue}
                                style={{ height: 35, width: "100%" }}
                                value={meetValue}
                                onValueChange={itemValue => setmeetValue(itemValue)}
                                label="I am">
                                <Picker.Item label="No Prefrence" value="No Prefrence" />
                                <Picker.Item label="a few goods friends" value="1" />
                                <Picker.Item label="a lot of accquaintances" value="2" />
                                <Picker.Item label="no preference" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Gender</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 35, width: "100%" }}
                                value={selectedValue}
                                onValueChange={itemValue => setSelectedValue(itemValue)}
                                label="I am">
                                <Picker.Item label="No Prefrence" value="No Prefrence" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Gender Diverse" value="Gender Diverse" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Activities</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={activityValue}
                                style={{ height: 35, width: "100%" }}
                                value={activityValue}
                                onValueChange={itemValue => setactivityValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="No Prefrence" value="No Prefrence" />
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />
                                {/* <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" /> */}
                            </Picker>
                        </View>
                    </View>





                </View>
                <View>
                    <View style={{ marginVertical: 20 }} >
                        <Button title="Find Friends"
                        onPress ={() => props.navigation.navigate('UserDetail')}
                            containerStyle={{ marginVertical: 10 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }} />
                    </View>
                </View>
                <View>


                    <Text style={styles.endText} >Reset Filter</Text>
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
        fontFamily: "Cairo-Bold",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal: 20,

    },
    endText:{
        fontFamily: "Cairo-Bold",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal: 20,color:"red"
    },
    secondContainer: {
        justifyContent: "center",
        flex: 2
    },
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat-ExtraLight',
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
    upperTextHeading: {
        fontFamily: "Cairo-Bold",
        fontSize: 20,
        textAlign: "left",
         
        marginHorizontal: 10
    },
    tinyLogo:{
        height:20,
        width:20,
        marginTop:-20,
   marginLeft:20
    },
    postocdeField:{
        flexDirection:"row",
alignItems:"center",

    }



})

export default SearchField