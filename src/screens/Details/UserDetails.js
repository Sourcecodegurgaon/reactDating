import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import * as font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Moment from 'moment';
import { Button, Overlay } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Linking } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from "react-native";


const UserDetails = props => {
    const { navigation } = props;


    const [name, setuserName] = useState("")
    const [Picture, setuserPicture] = useState();
    const [consider, setconsider] = useState()
    const [meet, setMeet] = useState()
    const [meetValue, setmeetValue] = useState()
    const [activityValue, setactivityValue] = useState("");
    const [liveValue, setliveValue] = useState("");
    const [talkValue, settalkValue] = useState("");
    const [FriendValue, setFriendValue] = useState("");
    const [CancelValue, setCancelValue] = useState("")
    const [StatusValue, setStatusValue] = useState("")
    const [spaekvalue, setspeak] = useState("")
    const [daysvalue, setdays] = useState("")
    const [anyThingvalue, setanyThing] = useState("");
    const [Booksvalue, setBooks] = useState("");
    const [TVvalue, setTV] = useState("");
    const [smokeValue, setsmokeValue] = useState("");
    const [alcoholValue, setalcoholValue] = useState("");
    const [date, setdatelValue] = useState("");
    const [IamName, setuserIamtName] = useState();
    const [age, setAge] = useState()
    const [verfied, setverifed] = useState(true)
    const [convert, setconvert] = useState("")
    const [converted, setconverted] = useState("")
    const [Moviesvalue, setMovies] = useState("");

    //Favorate User 
    const [userId, setUserId] = useState("")
    const [loggedUser, setloggedUser] = useState("")
    const [parsedFavorites, setparsedFavorites] = useState("")
    const [favorites_status, setfavorites_status] = useState("")
    const [favInfo, setfavInfo] = useState()
    const [FavorateActivity, setFavorateActivity] = useState("")
    const [uniqueScope, setuniqueScope] = useState("")
    const [scoped, getscoped] = useState("")
    const [blocked, setblocked] = useState("")



    //Block User
    const [Block_status, setBlock_status] = useState("")

    //Report to admin
    const [Report, setReport] = useState("")

    //Show Hide Output
    const [Friendstatus, setFriendstatus] = useState(false)
    const [GoodFriendstatus, setGoodFriendstatus] = useState(false)
    const [SomeoneCancelStaus, setSomeoneCancelStaus] = useState(false)
    const [realyionshipstatus, setrealyionshipstatus] = useState(false)
    const [speakstatus, setspeakstatus] = useState(false)
    const [DaysStatus, setDaysStatus] = useState(false)
    const [AnythingelseStatus, setAnythingelseStatus] = useState(false)
    const [Booksstatus, setBooksstatus] = useState(false)
    const [Moviesstatus, setMoviesstatus] = useState(false)
    const [Tvstatus, setTvstatus] = useState(false)
    const [smokeStatus, setsmokeStatus] = useState(false)
    const [alcoholStatus, setalcoholStatus] = useState(false)
    const [considerStatus, setconsiderStatus] = useState(false)
    const [unVerfied, setUnVerfied] = useState(true)
    const [living, setliving] = useState(false)
    //OverLay
    const [Favvisible, setFavVisible] = useState(false);
    const [Blockvisible, setBlockVisible] = useState(false);
    const [Reportvisible, setReportVisible] = useState(false)

    const [spinner, setspinner] = useState(false)

    const FavorateOverlay = () => {
        setFavVisible(!Favvisible);
    };

    const BlockOverlay = () => {
        setBlockVisible(!Blockvisible);
    };
    const ReportOverlay = () => {
        setReportVisible(!Reportvisible);
    };
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular
    });

    useEffect(() => {

        var uid = navigation.getParam('uid')


        setUserId(uid)
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            console.log(UserDetail.data.user.uid)
            Http.get('user/' + uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const Username = response.data.name
                    const PictureUrl = response.data.picture.url
                    setuserName(response.data.name)
                    setuserPicture(PictureUrl)



                    if (response.data.field_consider_myself_.length == undefined) {
                        setconsiderStatus(true)
                        setconsider(response.data.field_consider_myself_.und[0].value)
                    }

                    if(response.data.field_birth_date.length == undefined){
                        const dateDMY = Moment(response.data.field_birth_date.und[0].value).format('yyyy/MM/DD')
                        setdatelValue(dateDMY)
                        var today = new Date();
                        var birthDate = new Date(dateDMY);
                        var age = today.getFullYear() - birthDate.getFullYear();
                        var m = today.getMonth() - birthDate.getMonth();
                        const ages = age
                        setAge(ages)
                        // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        //     age--;
                        // }
                    }

                    

                    //Meet If Satement
                    if (response.data.field_look_meet.length == undefined) {

                        if (response.data.field_look_meet.und[0].value == 2) {
                            setmeetValue("A lot of acquaintances")
                        }
                        if (response.data.field_look_meet.und[0].value == 1) {
                            setmeetValue("A few good friends")
                        }
                        if (response.data.field_look_meet.und[0].value == 3) {
                            setmeetValue("Does not Matter")
                        }
                    }


                    if (response.data.field_activities_interests.length == undefined) {

                        const activityLength = response.data.field_activities_interests.und.length
                        for (let i = 0; i <= activityLength; i++) {
                            if (response.data.field_activities_interests.und[i] != undefined) {
                                setactivityValue(response.data.field_activities_interests.und[i].value)
                            }
                        }

                    }

                    if (response.data.field_long_in_city.length == undefined) {
                        setliving(true)
                        if (response.data.field_long_in_city.und[0].value == 0) {
                            setliveValue("2 years.")

                        }
                        if (response.data.field_long_in_city.und[0].value == 1) {
                            setliveValue("2-5 years.")

                        }
                        if (response.data.field_long_in_city.und[0].value == 2) {
                            setliveValue("5 years.")

                        }

                        if (response.data.field_talk_about.length == undefined) {
                            setFriendstatus(true)
                            settalkValue(response.data.field_talk_about.und[0].value)
                        }
                    }
                    if (response.data.field_good_friend.length == undefined) {
                        setGoodFriendstatus(true)
                        setFriendValue(response.data.field_good_friend.und[0].value)
                    }


                    if (response.data.field_plans_get_cancelled.length == undefined) {
                        setSomeoneCancelStaus(true)
                        setCancelValue(response.data.field_plans_get_cancelled.und[0].value)
                    }


                    if (response.data.field_relationship_status.length == undefined) {
                        setrealyionshipstatus(true)
                        if (response.data.field_relationship_status.und[0].value == 'No') {

                            setStatusValue("not in")
                        }
                        else {
                            setStatusValue("in")
                        }
                    }

                    if (response.data.field_languages.length == undefined) {
                        setspeakstatus(true)
                        setspeak(response.data.field_languages.und[0].value)
                    }

                    if (response.data.field_spend_your_days.length == undefined) {
                        setDaysStatus(true)
                        setdays(response.data.field_spend_your_days.und[0].value)
                    }

                    if (response.data.field_you_say.length == undefined) {
                        setAnythingelseStatus(true)
                        setanyThing(response.data.field_you_say.und[0].value)

                    }

                    if (response.data.field_favorite_books.length == undefined) {
                        setBooksstatus(true)
                        setBooks(response.data.field_favorite_books.und[0].value)
                    }

                    if (response.data.field_favorite_movies.length == undefined) {
                        setMoviesstatus(true)
                        setMovies(response.data.field_favorite_movies.und[0].value)
                    }
                    if (response.data.field_favorite_tv_shows.length == undefined) {
                        setTvstatus(true)
                        setTV(response.data.field_favorite_tv_shows.und[0].value)
                    }


                    if (response.data.field_smoke.length == undefined) {
                        setsmokeStatus(true)
                        setsmokeValue(response.data.field_smoke.und[0].value)
                    }

                    if (response.data.field_alcohol.length == undefined) {
                        setalcoholStatus(true)
                        setalcoholValue(response.data.field_alcohol.und[0].value)
                    }

                    if (response.data.field_gender.length == undefined) {
                        setuserIamtName(response.data.field_gender.und[0].value)
                    }
                    //Verified User
                    if (response.data.field_verfied.length == undefined) {
                        // setverifed(true)
                        // setUnVerfied(false)
                    }


                    setconvert(response.data.login)
                    const converting = response.data.login
                    const unixTime = converting;
                    const dates = new Date(unixTime * 1000);
                    setconverted(dates.toLocaleDateString("en-US"))

                    setspinner(false)

                    setfavInfo({
                        name: Username,
                        picture: response.data.picture.url,
                        activities: response.data.field_activities_interests.und,
                        uid: uid,
                        age:age,
                        gender:response.data.field_gender.und[0].value,
                        Pets:response.data.field_any_pets,
                        Kids:response.data.field_kids
                    })

                    setblocked([
                        {
                            name: Username,
                            picture: response.data.picture.url,
                            activities: response.data.field_activities_interests.und,
                            uid: userId
                        },
                    ])
                    setReport([
                        {
                            name: Username,
                            picture: response.data.picture.url,
                            activities: response.data.field_activities_interests.und,
                            uid: userId
                        },
                    ])

                    getLoggedInUser()
                    getBlockedLoggedInUser()
                })
        })
    }, [])

    function getLoggedInUser() {
        // Get favorite fields for logged in user
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    setloggedUser(response.data);
                    setfavorites_status(checUserFavorites())
                });
        });
    }


    function checUserFavorites() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const loggedUser = response.data
                    if (loggedUser.field_favorite_users.length != 0) {
                        console.log(loggedUser.field_favorite_users.und)
                        if (loggedUser.field_favorite_users.und) {
                            const parse = JSON.parse(loggedUser.field_favorite_users.und[0].value)

                            // Check if user is already a favorite
                            if (parse.some((person) => person.uid == userId)) {
                                console.log("This person is already a favorite");
                                return 3;
                            } else {

                                console.log("This person is not yet a favorite");
                                return 2; 
                            }
                        }
                    }
                });
        });
    }


    function getFavorite() {
    
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    AsyncStorage.getItem('fav', (err, result) => {
                       
                    if (response.data.field_favorite_users.und) {
                        console.log("value exists");
                        
                        let scope = JSON.parse(response.data.field_favorite_users["und"][0]["value"])
                        scope.push(favInfo)
                        // const uniqueScopes = removeDuplicatesBy(
                        //     (x) => x[0].uid,
                        //     scope
                        // );
                        addFavorite(scope);
    

                    } else {
                        console.log("value doesnt exist");
                        let scope = []
                       scope.push(favInfo)
                       console.log( scope)
                       addFavorite(scope);
                    }

                    //console.log(scope)
                    //Make scope unique
                  

                    
                    setFavVisible(false)
                  

                });
            })
        });
    }

    function addFavorite(scope) {
        // Add entry into favorites
       
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const responseString = JSON.stringify(scope);
            console.log(responseString)

            Http.put('user/' + UserDetail.data.user.uid, {
                field_favorite_users: {
                    und: [
                        {
                            value: responseString,
                        },
                    ],
                },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    //getLoggedInUser();
                }).catch(function (error) {
                    console.log(error.response)
                });

        });
    }

    function removeDuplicatesBy(keyFn, array) {
        var mySet = new Set();
        return array.filter(function (x) {
            var key = keyFn(x),
                isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });
    }



    function getBlockedLoggedInUser() {
        // Get Block fields for logged in user
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    setloggedUser(response.data);
                    setBlock_status(checBlockUser())
                });
        });
    }

    function checBlockUser() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const loggedUser = response.data
                    if (loggedUser.field_block_users.length != 0) {
                        if (loggedUser.field_block_users.und) {
                            const parseBlock = JSON.parse(loggedUser.field_block_users.und[0].value)
                            // Check if user is already a favorite
                            if (parseBlock.some((person) => person[0].uid === userId)) {
                                console.log("This person is already a favorite");
                                return 3;
                            } else {

                                console.log("This person is not yet a favorite");
                                return 2;
                            }
                        }
                    }
                });
        });
    }



    //Block User
    function Blockuser() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    var scope = [JSON.parse(response.data.field_block_users["und"][0]["value"])]
                    if (response.data.field_block_users.und) {
                        console.log("value exists");
                        scope.push(blocked)
                    } else {
                        console.log("value doesnt exist");
                        scope.push(blocked)
                    }
                    //Make scope unique
                    setuniqueScope(scope)
                    setFavVisible(false)
                    block();

                });
        });


    }



    function block() {
        console.log(uniqueScope)
        // Add entry into favorites
        const responseString = JSON.stringify(uniqueScope);
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.put('user/' + UserDetail.data.user.uid, {
                field_block_users: {
                    und: [
                        {
                            value: responseString,
                        },
                    ],
                },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    getBlockedLoggedInUser()
                })

        });
    }

    function checBlockUser() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const loggedUser = response.data
                    if (loggedUser.field_block_users.und) {
                        const parseBlock = JSON.parse(loggedUser.field_block_users.und[0].value)
                        // Check if user is already a favorite
                        if (parseBlock.some((person) => person[0].uid === userId)) {
                            console.log("This person is already a favorite");
                            return 3;
                        } else {

                            console.log("This person is not yet a favorite");
                            return 2;
                        }
                    }
                });
        });
    }



    //Block User
    function Blockuser() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    var scope = [JSON.parse(response.data.field_block_users["und"][0]["value"])]
                    if (response.data.field_block_users.und) {
                        console.log("value exists");
                        scope.push(blocked)
                    } else {
                        console.log("value doesnt exist");
                        scope.push(blocked)
                    }
                    //Make scope unique
                    setuniqueScope(scope)
                    setFavVisible(false)
                    block();

                });
        });


    }

    function block() {
        console.log(uniqueScope)
        // Add entry into favorites
        const responseString = JSON.stringify(uniqueScope);
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.put('user/' + UserDetail.data.user.uid, {
                field_block_users: {
                    und: [
                        {
                            value: responseString,
                        },
                    ],
                },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    getBlockedLoggedInUser()
                })

        });
    }




    //ReportAdmin
    function CheckReport() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    var scope = [JSON.parse(response.field_report_to_admin["und"][0]["value"])]
                    if (response.field_report_to_admin.und) {
                        console.log("value exists");
                        scope.push(Report)
                    } else {
                        console.log("value doesnt exist");
                        scope.push(Report)
                    }
                    //Make scope unique
                    setuniqueScope(scope)
                    setReportVisible(false)
                    ReportAdmin();

                });
        });


    }



    function ReportAdmin() {
        // Add entry into favorites
        const responseString = JSON.stringify(uniqueScope);
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.put('user/' + UserDetail.data.user.uid, {
                field_report_to_admin: {
                    und: [
                        {
                            value: responseString,
                        },
                    ],
                },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {

                })

        });
    }


    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else {

        return (
            <View style={styles.mainContainer}>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />
                <SafeAreaView >

                    <ScrollView >

                        <View style={styles.secondMainCotainer}>
                            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.goBack()}>
                                <Image style={styles.Image} source={require('../../../assets/Images/cross.png')} />
                            </TouchableOpacity>
                            <View style={styles.thirdContainer}>


                                <View style={styles.thirdPhotoContainer}>

                                    <View style={{ flexDirection: "column", paddingRight: 5 }}>
                                        {unVerfied ? (
                                            <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 19, textAlign: "center" }}>{name}</Text>
                                        ) : null}
                                        {verfied ? (
                                            <Text style={{ fontFamily: 'Cairo_700Bold', color: "#056AAD", fontSize: 19, textAlign: "center" }}>{name}</Text>
                                        ) : null}
                                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 15, textAlign: "center" }}>
                                            {age}, {IamName}
                                        </Text>

                                    </View>


                                    <Image style={styles.ImageProfile} source={{ uri: Picture }} />

                                </View>


                                <View style={styles.UserStatus}>

                                    <View style={styles.UserStatusVerified}>

                                    </View>
                                    <View style={styles.UserStatusLogin}>
                                        <Text style={styles.StatusText}>LastLogin:</Text>
                                        <Text style={styles.StatusText}>{converted}</Text>
                                    </View>

                                </View>


                                <View style={styles.fourthIconContainer}>
                                    <View style={styles.Iconview}>
                                        <TouchableOpacity onPress={() => navigation.navigate('NewChat', {
                                            Name: name
                                        })}>
                                            <Ionicons name="ios-chatbubbles" style={{ fontSize: 30 }} />
                                            <Text style={styles.TextBelowIcon}>Chat</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={styles.Iconview}>
                                        <TouchableOpacity onPress={FavorateOverlay}>
                                            <Ionicons name="ios-star" style={{ fontSize: 30 }} />
                                        </TouchableOpacity>
                                        <Text style={styles.TextBelowIcon}>Favorite</Text>
                                    </View>


                                    <View style={styles.Iconview}>
                                        <TouchableOpacity onPress={BlockOverlay}>
                                            <Entypo name="emoji-sad" size={24} color="black" />
                                        </TouchableOpacity>
                                        <Text style={styles.TextBelowIcon}>Never see {"\n"} again</Text>
                                    </View>

                                    <View style={styles.IconLastview}>
                                        <TouchableOpacity onPress={() => Linking.openURL('mailto:contactus@not4dating.com?subject=Report&body=' + "Block Username : " + " " + name)}>
                                            <SimpleLineIcons name="ban" size={24} color="black" />
                                        </TouchableOpacity>
                                        <Text style={styles.TextBelowIcon}>Report to{"\n"} admin</Text>
                                    </View>
                                </View>




                                <View style={styles.fourthMainContainer}>

                                    <View style={styles.fourthContentContainer}>


                                        <Text style={styles.fourConatinerText}>
                                            {considerStatus ? (
                                                <Text>
                                                    I consider myself <Text style={styles.fourConatinerTextOuput}> </Text>
                                                    <Text style={styles.Outputfont}>{consider} and </Text>
                                                </Text>
                                            ) : null}
                                            I want to meet <Text style={styles.Outputfont}>{meetValue} </Text></Text>

                                        <Text style={styles.fourConatinerText}>My hobbies and interests are: <Text style={styles.Outputfont}>{activityValue} </Text></Text>
                                    </View>

                                </View>






                            </View>
                        </View>


                        <View style={styles.thirdMaincontainer}>

                                {living ? (
                                    <Text style={styles.fifthConatinerText}>I have lived here for <Text style={styles.Outputfont}>{liveValue}</Text></Text>
                                ) : null}
                                {Friendstatus ? (
                                    <Text style={styles.fifthConatinerText}>My friends and I talk about <Text style={styles.Outputfont}>{talkValue}</Text></Text>
                                ) : null}
                                {GoodFriendstatus ? (
                                    <Text style={styles.fifthConatinerText}>I think a good friend is someone who <Text style={styles.Outputfont}>{FriendValue}</Text></Text>
                                ) : null}

                                {SomeoneCancelStaus ? (
                                    <Text style={styles.fifthConatinerText}>When someone cancels plans <Text style={styles.Outputfont}>{CancelValue}</Text></Text>
                                ) : null}

                                {realyionshipstatus ? (
                                    <Text style={styles.fifthConatinerText}>I am  <Text style={styles.Outputfont}>{StatusValue} </Text> a relationship.</Text>
                                ) : null}

                                {/* Pets */}

                                {speakstatus ? (
                                    <Text style={styles.fifthConatinerText}>In addition to English, I also speak <Text style={styles.Outputfont}>{spaekvalue}</Text></Text>
                                ) : null}

                                {DaysStatus ? (
                                    <Text style={styles.fifthConatinerText}>I spend my days <Text style={styles.Outputfont}>{daysvalue} </Text></Text>
                                ) : null}

                                {AnythingelseStatus ? (
                                    <Text style={styles.fifthConatinerText}>Anything else <Text style={styles.Outputfont}>{anyThingvalue}</Text></Text>
                                ) : null}


                                  {smokeStatus ? (
                                        <Text style={styles.fifthConatinerText}>I <Text style={styles.Outputfont}>{smokeValue}</Text> smoke </Text>
                                    ) : null}

                                   {alcoholStatus ? (
                                        <Text> <Text style={styles.fifthConatinerText}>and <Text style={styles.Outputfont}> {alcoholValue} </Text>drink alcohol.</Text> </Text>
                                    ) : null}
                        </View>







                        <View style={styles.fourthMainCotainer}>
                            {Moviesstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favorate Movies:
                                        <Text style={styles.fifthConatinerOutputText}> {Moviesvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}

                            {Booksstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favorate Books:
                                        <Text style={styles.fifthConatinerOutputText}> {Booksvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}
                            {Tvstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favorate TV Shows:
                                        <Text style={styles.fifthConatinerOutputText}> {TVvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </ScrollView>




                </SafeAreaView>





                <Overlay isVisible={Favvisible} onBackdropPress={FavorateOverlay}>
                    <>
                        <Text style={styles.overLayText}>Add user to favorites?</Text>

                        <View style={styles.overLayButton}>
                            <Button title="Confirm" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={getFavorite} />
                            <Button title="Cancel" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.redButton} titleStyle={styles.tittleText} onPress={FavorateOverlay} />

                        </View>
                    </>
                </Overlay>
                <Overlay isVisible={Blockvisible} onBackdropPress={BlockOverlay}>
                    <>
                        <Text style={styles.overLayText}>Block user?</Text>

                        <View style={styles.overLayButton}>
                            <Button title="Confirm" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={Blockuser} />
                            <Button title="Cancel" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.redButton} titleStyle={styles.tittleText} onPress={BlockOverlay} />

                        </View>
                    </>
                </Overlay>

                <Overlay isVisible={Reportvisible} onBackdropPress={ReportOverlay}>
                    <>
                        <Text style={styles.overLayText}>Report this user?</Text>

                        <View style={styles.overLayButton}>
                            <Button title="Confirm" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={CheckReport} />
                            <Button title="Cancel" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.redButton} titleStyle={styles.tittleText} onPress={ReportOverlay} />

                        </View>
                    </>
                </Overlay>

            </View>
        )



    }
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
        marginVertical: 30,
        marginBottom:0,
       paddingBottom:30,
       height:350

    },
    thirdMaincontainer:{
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30,
        marginBottom: 10,
        paddingHorizontal: 20,
        marginTop:-0.5,
        paddingBottom:5
    },
    fourthMainCotainer: {
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        paddingHorizontal: 20,
        marginBottom:10

    },
    forgotPass: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    upperHeading: {
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 10,
        fontFamily: 'Cairo_700Bold'
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo_700Bold',
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
        marginHorizontal: 10,
        marginVertical: 10
    },
    ImageProfile: {
        height: 80, width: 80,
    },
    thirdPhotoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 12

    },
    saidImage: {
        height: 30
    },
    fourthIconContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: -0,
        left: 0,
        backgroundColor: "#ECECEC",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,

    },
    fourthMainContainer: {
        flexDirection: "row",
        marginTop: 30

    },
    fourthContentContainer: {
        marginLeft: 10,
    },
    fourConatinerText: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16, paddingStart: 80,
        paddingRight: 4

    },
    fifthConatinerText: {
        fontFamily: "Montserrat_400Regular",
        marginVertical: 10,
        fontSize: 16

    },
    fifthConatinerOutputText:{
        fontFamily: "Cairo_700Bold",
        marginVertical: 10,
        fontSize: 16
    },
    fourConatinerTextOuput: {
        color: "#0C0D0E",
        fontWeight: '500',
        fontFamily: "Cairo_700Bold",

    },
    fourthContentContainerBold: {
        fontFamily: "Montserrat_400Regular",
        marginRight: 40
    },
    Outputfont:
        { fontFamily: "Cairo_700Bold" },
    UserStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingRight: 12

    },
    StatusText: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16,
    },
    mainContainerTwoLiner: {
        marginVertical: 10
    },
    overLayButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttoncontainerStyle: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    overLayText: {
        fontFamily: "Cairo_700Bold",
        textAlign: "center",
        paddingVertical: 20,
        paddingHorizontal: 30,
        fontSize: 16
    },
    redButton: {
        backgroundColor: "#DC3545"
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
    spinnerTextStyle:
    {
        color: "white"
    },
    TextBelowIcon: {
        textAlign: "center",
        fontSize: 14
    },
    IconLastview: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 5,
    },
    Iconview: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderBottomColor: "#B2AFAF",
        borderBottomWidth: 2,
        width: "100%"

    },
    




})


export default UserDetails