import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView, TouchableOpacity, ListItem, SectionList } from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack';
import UserDetails from '../Details/UserDetails'

import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_700Bold_Italic, Montserrat_600SemiBold_Italic, Montserrat_500Medium_Italic, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

import { TouchableWithoutFeedback } from "react-native";
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-elements';
import { Overlay } from 'react-native-elements';

const SearchItems = props => {
    const [Loadingspinner, setLoadingspinner] = useState(false)
    const [matchLevel, setMatchLevel] = useState({ count: 0 });
    const [pageIndex, setPageIndex] = useState({ count: 0 });
    //console.log(props.navigation.state.params.MainData)

    //console.log(props.navigation.state.params.minage)
    //console.log(props.navigation.state.params.Maxage)
    var mObject
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_700Bold_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_500Medium,
        Montserrat_400Regular
    });

    const [blocking, setBlocking] = useState({ items: [] })
    const [verfified, setVerified] = useState()
    const [unverfified, setUnVerified] = useState(true)
    const [visible, setVisible] = useState(false);

    const [result, setResult] = useState(false)
    const array = []
    const deleteItemById = Uid => () => {
        const filteredData = props.searchResults.filter(item => item.Uid !== Uid);
        props.searchResults({ data: filteredData });
    }


    useEffect(() => {

        UserDetails()
        props.navigation.addListener('didFocus', () => {
            UserDetails()
        });
    }, []);
    const toggleOverlay = () => {
        setVisible(!visible);
    };



    const getAlluser = async () => {

        setLoadingspinner(true)

        const response = await Http.get('search-view', {
            params: {
                gender: props.navigation.state.params.gender,
                meet: props.navigation.state.params.meet,
                activity: props.navigation.state.params.activity[0].value,
                page: pageIndex.count

            }
        }

        );


        if (response.data.length == 0) {
            setLoadingspinner(false)
            setVisible(true)
            setResult(false)

        }
        else {

            setLoadingspinner(false)
            setResult(true)

            var tempCurrPage = Object.keys(response.data).map((i) => response.data[i]);

            var newTempCurrPage = tempCurrPage;
            if (tempCurrPage.length > 0) {

                AsyncStorage.getItem('Token', (err, result) => {
                    const LogoutToken = JSON.parse(result)
                    Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((responses) => {
                        if (responses.data.field_block_users.length == undefined) {
                            const User = JSON.parse(responses.data.field_block_users.und[0].value)
                            var results = [];
                            for (let userObj of User) {
                                // Blocked User Uid Coneverted into array
                                if (userObj != undefined) {
                                    //Converted Into Array
                                    results = results.concat(userObj.uid)
                                }
                            }
                            //Compairing Result Uid with Blocked User Uid
                            const newObject = tempCurrPage.filter(function (obj) { return !results.includes(obj.Uid); });
                            console.log(newObject)
                            setBlocking(state => ({ ...state, items: blocking.items.concat(newObject) }));


                        }

                        if (responses.data.field_block_users.length != undefined) {
                            setBlocking(state => ({ ...state, items: blocking.items.concat(newTempCurrPage) }));

                        }
                    })


                })






            }
            if (tempCurrPage.length < 10) {

                setMatchLevel(state => ({ ...state, count: state.count + 1 }));
                setPageIndex(state => ({ ...state, count: -1 }));
                setPageIndex(0);
                setLoadingspinner(false)
            }
            setLoadingspinner(false)
            setPageIndex(state => ({ ...state, count: state.count + 1 }));

        }












    }

    const showmoresearchResultEveryOne = async () => {
        setLoadingspinner(true)

        const response = await Http.get('search-view', {
            params: {
                meet: props.navigation.state.params.meet,
                activity: props.navigation.state.params.activity[0].value,
                page: pageIndex.count

            }
        }

        );


        if (response.data.length == 0) {
            setLoadingspinner(false)
            setVisible(true)
            setResult(false)

        }
        else {

            setLoadingspinner(false)
            setResult(true)

            var tempCurrPage = Object.keys(response.data).map((i) => response.data[i]);

            var newTempCurrPage = tempCurrPage;
            if (tempCurrPage.length > 0) {

                AsyncStorage.getItem('Token', (err, result) => {
                    const LogoutToken = JSON.parse(result)
                    Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((responses) => {
                        if (responses.data.field_block_users.length == undefined) {
                            const User = JSON.parse(responses.data.field_block_users.und[0].value)
                            var results = [];
                            for (let userObj of User) {
                                // Blocked User Uid Coneverted into array
                                if (userObj != undefined) {
                                    //Converted Into Array
                                    results = results.concat(userObj.uid)
                                }
                            }
                            //Compairing Result Uid with Blocked User Uid
                            const newObject = tempCurrPage.filter(function (obj) { return !results.includes(obj.Uid); });
                            console.log(newObject)
                            setBlocking(state => ({ ...state, items: blocking.items.concat(newObject) }));


                        }

                        if (responses.data.field_block_users.length != undefined) {
                            setBlocking(state => ({ ...state, items: blocking.items.concat(newTempCurrPage) }));

                        }
                    })


                })






            }
            if (tempCurrPage.length < 10) {

                setMatchLevel(state => ({ ...state, count: state.count + 1 }));
                setPageIndex(state => ({ ...state, count: -1 }));
                setPageIndex(0);
                setLoadingspinner(false)
            }
            setLoadingspinner(false)
            setPageIndex(state => ({ ...state, count: state.count + 1 }));

        }


    }




    const UserDetails = () =>{
        if(props.navigation.state.params.gender == "null")
        {
          showmoresearchResultEveryOne()
         
        }
        if(props.navigation.state.params.gender != "null")
        {
            getAlluser ()
        }
    }

    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else {

        return (

            <View style={{ flex: 1 }}>
                <Spinner
                    visible={Loadingspinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />


                <SafeAreaView style={styles.container}>


                    <FlatList
                        data={blocking.items}
                        renderItem={({ item }) => {



                            const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)

                            if (item.avatar == 0 && result >= props.navigation.state.params.minage && result <= props.navigation.state.params.Maxage && item.verfied.length == undefined) {

                                var active = item.Activities.join(', ')

                                const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)

                                const singleActivity = item.Activities[0].toString().split(' ').slice(0, 1).join(' ')
                                
                                if (item.kids.length == "No" || item.kids.length == "Yes") {
                                    var Parent = "Parent"
                                }
                                if (item.Pets.length > 0) {
                                    var Pets = 'Pet Owner'
                                }
                                if (item.kids.length == "No" || item.kids.length == "Yes" && item.Pets.length > 0) {
                                    var Com = ","
                                }



                                return (
                                    <View style={{ flex: 1, backgroundColor: "white", marginTop: 10 }} >
                                        <View style={styles.scrollView}>
                                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('FindUserDetails', {
                                                uid: item.Uid
                                            })}
                                            >
                                                <View>
                                                    <View style={styles.Verified}><Text style={{ color: "white", textAlign: "center", fontFamily: "Montserrat_600SemiBold_Italic", paddingTop: 1 }}>Verified</Text></View>
                                                    <View style={styles.VeifiedmainContainer} >

                                                        <View style={styles.Image}>
                                                            <Image
                                                                style={styles.tinyLogo}
                                                                source={{ uri: item.Picture[0] }}
                                                                PlaceholderContent={<ActivityIndicator />}
                                                            />
                                                        </View>
                                                        <View style={styles.textContainer}>
                                                            <View styles={styles.UpperText}>
                                                                <View>
                                                                    <Text style={styles.nameText}>{item.name}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.AgeText}>{result}, {item.Gender}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.parentText}>{Parent}{Com} {Pets}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={styles.LoweText}>
                                                                <View>
                                                                    <Text style={styles.activityText} numberOfLines={2}>Likes {active}</Text>

                                                                </View>

                                                                <View style={styles.InterestedContainer}>
                                                                    <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>

                                                                </View>
                                                            </View>
                                                        </View>




                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>


                                        </View>


                                    </View>


                                )
                            }


                            else if (item.avatar == 0 && result >= props.navigation.state.params.minage && result <= props.navigation.state.params.Maxage && item.verfied.length != undefined) {



                                var active = item.Activities.join(', ')

                                const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)

                                const singleActivity = item.Activities[0].toString().split(' ').slice(0, 1).join(' ')
                                console.log(item.kids)
                                if ( item.kids == "Yes") {
                                    var Parent = "Parent"
                                }
                                if (item.Pets.length > 0) {
                                    var Pets = 'Pet Owner'
                                }
                                if (item.kids == "Yes"  && item.Pets.length > 0) {
                                    var Com = ","
                                }
                                //.replace( /(<([^>]+)>)/ig, '')
                                return (
                                    <View style={{ flex: 1, backgroundColor: "white", marginTop: 10 }} >
                                        <View style={styles.scrollView}>
                                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('FindUserDetails', {
                                                uid: item.Uid
                                            })} activeOpacity="0.1">
                                                <View>
                                                    <View style={styles.notVerified}></View>
                                                    <View style={styles.mainContainer} >

                                                        <View style={styles.Image}>
                                                            <Image
                                                                style={styles.tinyLogo}
                                                                source={{ uri: item.Picture[0] }}
                                                                PlaceholderContent={<ActivityIndicator />}
                                                            />
                                                        </View>
                                                        <View style={styles.textContainer}>
                                                            <View styles={styles.UpperText}>
                                                                <View>
                                                                    <Text style={styles.nameText}>{item.name}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.AgeText}>{result}, {item.Gender}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.parentText}>{Parent}{Com} {Pets} </Text>
                                                                </View>
                                                            </View>

                                                            <View style={styles.LoweText}>
                                                                <View>
                                                                    <Text style={styles.activityText} numberOfLines={2}>Likes {active}</Text>

                                                                </View>

                                                                <View style={styles.InterestedContainer}>
                                                                    <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>

                                                                </View>
                                                            </View>
                                                        </View>




                                                    </View>
                                                </View>
                                            </ TouchableWithoutFeedback >


                                        </View>

                                    </View>


                                )
                            }

                            else {
                                <View style={{ flex: 2, backgroundColor: "white", justifyContent: "center" }}>
                                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: 'black', fontSize: 20 }}>No Result Found</Text>
                                </View>
                            }

                        }}
                        keyExtractor={(item, index) => index}
                    />


                    {result ? (
                        <View >
                            <Button title="Show more"
                                onPress={UserDetails}
                                containerStyle={{ marginVertical: 20 }}
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                containerStyle={{ width: "100%" }} />
                            <View style={{ height: 10 }}></View>
                            <Button title="Back"
                                onPress={() => props.navigation.goBack()}
                                containerStyle={{ marginVertical: 20 }}
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                containerStyle={{ width: "100%" }} />
                            <View style={{ height: 10 }}></View>
                        </View>
                    ) : null}
                </SafeAreaView >
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{ marginHorizontal: 20, paddingVertical: 20 }}>
                        <View>
                            <Text style={{
                                fontFamily: "Cairo_700Bold",
                                fontSize: 18, paddingVertical: 10, paddingHorizontal: 20
                            }}>No Result Found</Text>
                        </View>
                        <View style={{
                            fontFamily: "Cairo_700Bold",
                            fontSize: 18, paddingVertical: 10
                        }}>
                            <Button title="ok" onPress={toggleOverlay} containerStyle={{ marginHorizontal: 20 }} />
                        </View>
                    </View>
                </Overlay>

            </View>
        )












    }

}

const styles = StyleSheet.create({

    mainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: "center",
        borderTopLeftRadius: 0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 150,
        borderColor: "#8B8E8F",



    },

    VeifiedmainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: "center",
        borderTopLeftRadius: 0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 150,
        borderColor: "#056AAD",
    },

    oneLineActivity: {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20,
    },

    textContainer: {
        justifyContent: "space-between",
        marginLeft: 10,
        flexDirection: "column",
    },

    container: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: "white",
        flexDirection: "column"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold',
        alignItems: "center",
        textAlign: "center"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: "Montserrat_200ExtraLight",
        fontSize: 15,
        textAlign: "center"
    },
    ImageCheck: {
        height: 20,
        width: 20
    },
    popupTopMessage: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 20,

    },
    popupTopHeading: {
        fontFamily: "Cairo_700Bold",
        fontSize: 24,
        marginHorizontal: 20

    },
    activityText:
    {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20, width: 200
    },
    tinyLogo:
    {
        width: 90, height: 90,
        borderRadius: 90,



    },
    AgeText: {
        fontFamily: "Montserrat_600SemiBold_Italic",
        fontSize: 15,
        marginTop: -4
    },
    nameText:
    {
        fontFamily: "Montserrat_700Bold_Italic",
        fontSize: 20,
        marginTop: -10,
        textShadowColor: '#00000029',
        textShadowOffset: { width: 5, height: 2 },
        textShadowRadius: 10,
        elevation: 2
    },
    parentText: {
        fontFamily: 'Montserrat_500Medium_Italic',
        color: '#676464',
        marginTop: -2,
        marginBottom: 10,
        fontSize: 13


    },
    notVerified:
    {
        backgroundColor: "#8B8D8F",
        height: 20,
        width: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -10,
        marginLeft: 10,
    },
    Verified: {
        backgroundColor: "#056AAD",
        height: 20,
        width: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -10,
        marginLeft: 10,
        color: "white"
    },

    Image:
    {
        shadowColor: '#00000080',
        shadowOffset: { width: 100, height: 100 },
        shadowRadius: 5,
        elevation: 6,
        borderRadius: 37
    },
    ImageContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    ImageProfile: {
        height: 15,
        width: 15
    },
    InterestedContainer: {
        marginTop: 5,
    },
    OverLayColor: {
        position: "absolute",
        top: 0,

        alignItems: "center",
        height: "100%",
        backgroundColor: "#000000c7",
        zIndex: 10,
        width: "100%",
        justifyContent: "center"
    },
    ImageStyle: {
        height: 320,
        width: 280,
        zIndex: 2
    },
    spinnerTextStyle: {
        color: "white"
    }


});

export default SearchItems