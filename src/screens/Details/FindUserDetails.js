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
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { Linking } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from "react-native";



const FindUserDetails = props => {
    const { navigation } = props;
    Dimensions.get("window");

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
    const [verfied, setverifed] = useState(false)
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
    const [alreadyFav ,setalreadyFav] = useState(false)
    const [notFav, setnotFav] = useState(true)
    
    const [alreadyFavVisisble, setalreadyFavVisisble] = useState(false)


    const[alreadyBlocked,setalreadyBlocked] = useState(false)
    const[notBlocked,setnotBlocked] = useState(true)
    const [message ,setMessage] = useState() 
    const [kids,setKids] = useState(false)
    const [Nokid,setNoKid] = useState(false)
    const [Yeskid,setYeskid] = useState(false)
    const [PetParent,setPetApent] = useState(false)
    const[children,setchildrenValue] = useState()
const [Pet,setPet] = useState(false)
const [petvalue,setPetvalue] = useState()


const[music,setMusic] = useState(false)
const[musicValue,setmusicValue] = useState()
const [iserUpdation ,setUderUpdation] = useState(false)
    const FavorateOverlay = () => {
        setFavVisible(!Favvisible);
    };
    const AlreadyFav = () => {
        setalreadyFavVisisble(!alreadyFavVisisble);
        setMessage("Already favorite! Want to Remove")
    };

    const AlreadyBlock = () => {
        setalreadyFavVisisble(!alreadyFavVisisble);
        setMessage("Already blocked")
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
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                        }
                        const ages = age
                        setAge(ages)
                     
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
                      
                                var ActivityArray = []
                                const ActivitUser = response.data.field_activities_interests.und
                                for(let userObj of ActivitUser)
                                {
                                    ActivityArray = ActivityArray.concat(userObj.value)
                                }
                                 var Active = ActivityArray.join(", ");
                                setactivityValue([Active ])
                            
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
                    if (response.data.field_favorite_music.length == undefined) {
                        setMusic(true)
                        setmusicValue(response.data.field_favorite_music.und[0].value)
                    }


                    if (response.data.field_smoke.length == undefined) {
                        setsmokeStatus(true)
                        if(response.data.field_smoke.und[0].value == "Weekends Only")
                        {
                            setsmokeValue("on Weekends Only")
                        }
                        else if(response.data.field_smoke.und[0].value == "Couple Times a Week")
                      {
                        setsmokeValue("a Couple Times a Week")
                      }
                      else
                      {
                        setsmokeValue(response.data.field_smoke.und[0].value)
                    }
                    }

                    if (response.data.field_alcohol.length == undefined) {
                        setalcoholStatus(true)
                        if(response.data.field_alcohol.und[0].value == "Weekends Only")
                        {
                            setalcoholValue("on Weekends Only")
                        }
                        else if(response.data.field_alcohol.und[0].value == "Couple Times a Week")
                      {
                        setalcoholValue("a Couple Times a Week")
                      }
                      else
                      {
                        setalcoholValue(response.data.field_alcohol.und[0].value)
                    }
                       
                    }

                    if (response.data.field_gender.length == undefined) {
                        setuserIamtName(response.data.field_gender.und[0].value)
                    }
                    //Verified User
                    if (response.data.field_verfied.length == undefined) {
                        setverifed(true)
                        setUnVerfied(false)
                    }

                    if(response.data.field_kids.length == undefined)
                    {
                        if(response.data.field_kids.und[0].value == "No")
                        {
                            setNoKid(true)
                        }
                        if(response.data.field_kids.und[0].value == "Yes")
                        {
                            setYeskid(true)
                        }
                    }

                   

                    if(response.data.field_any_pets.length == undefined )
                    {

                  
                      
                      
                                var PetArray = []
                                const ActivitUser = response.data.field_any_pets.und
                                for(let userObj of ActivitUser)
                                {
                                    PetArray = PetArray.concat(userObj.value)
                                }
                                 var PetActive = PetArray.join(", ");
                                 Pet,setPet(true)
                                 petvalue,setPetvalue(PetActive)
                             
                
                            
                        

                    }

                    if(response.data.field_any_pets.length == undefined && response.data.field_kids.length == undefined)
                    {
                        setPetApent(true)
                        if(response.data.field_kids.und[0].value == "No")
                        {
                            setNoKid(false)
                            setchildrenValue("I do not have")
                           
                        }
                        if(response.data.field_kids.und[0].value == "Yes")
                        {
                            setYeskid(false)
                            setchildrenValue("I have")
                         
                        }
                  
                                var PetArray = []
                                const ActivitUser = response.data.field_any_pets.und
                                for(let userObj of ActivitUser)
                                {
                                    PetArray = PetArray.concat(userObj.value)
                                }
                                 var PetActive = PetArray.join(", ");
                                 setPet(false)
                                 setPetvalue(PetActive)
                             
                
                            
                        

                    }

                    setconvert(response.data.login)
                    const converting = response.data.login
                    const unixTime = converting;
                    //const dates = new Date(unixTime * 1000);
              
                    var dates = Moment(new Date(response.data.login * 1000)).format('DD/MM/YY');
                    setconverted(dates )

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
                        uid: uid,
                        age:age,
                        gender:response.data.field_gender.und[0].value,
                        Pets:response.data.field_any_pets,
                        Kids:response.data.field_kids
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

                    //getLoggedInUser()
                    checUserFavorites()
                    checBlockUser()
             
                }).catch(function (error) {
                    console.log(error.response)
                  });
          
        })
    }, [])


    function checUserFavorites() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            var uid = navigation.getParam('uid')
            setspinner(true)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const loggedUser = response.data
                    if (loggedUser.field_favorite_users.length != 0) {
                       
                   
                        if (loggedUser.field_favorite_users.und) {
                            let parse = JSON.parse(loggedUser.field_favorite_users.und[0].value)
                            for (let userObject of parse) {
                                if (uid == userObject.uid) {
                                    console.log("This person is already a favorite");
                                    setnotFav(false)
                                    setalreadyFav(true)
                                    setspinner(false)
                                    return 3;
                                }  else
                                {
                                    setspinner(false)
                                }
                              
                            }
                           
                           

  

                        }
                        else
                        {
                            setspinner(false)
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
                        addFavorite(scope);
    

                    } else {
                        console.log("value doesnt exist");
                        let scope = []
                       scope.push(favInfo)
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
                    checUserFavorites()
                })

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

    function removeFavorite() {
        var uid = navigation.getParam('uid')
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    AsyncStorage.getItem('fav', (err, result) => {
                       
                    if (response.data.field_favorite_users.und) {
                        console.log("value exists");
                        let scope = JSON.parse(response.data.field_favorite_users["und"][0]["value"])
                        scope = scope.filter((obj) => {
                            return obj.uid !==  uid;
                        
                        });
                        const responseString = JSON.stringify(scope);
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
                                console.log(response)
                                setspinner(false)
                                //checUserFavorites()
                                setnotFav(true)
                                setalreadyFav(false)
                                AlreadyFav() 
                                setFavVisible(false)
                           
                            })
            
                    
                        

                    } 

                
                  

                    
                 
                  

                });
            })
        });
    
      }
    



    function checBlockUser() {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            var uid = navigation.getParam('uid')
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {
                    const loggedUser = response.data
                    if (loggedUser.field_block_users.length != 0) {
                        setspinner(true)
                        if (loggedUser.field_block_users.und) {
                            let parse = JSON.parse(loggedUser.field_block_users.und[0].value)
                            for (let userObject of parse) {
                                if (uid == userObject.uid) {
                                    console.log("This person is already a blocked");
                                    setalreadyBlocked(true)
                                    setnotBlocked(false)
                                    setspinner(false)
                                    return 3;
                                }
                                else
                                {
                                    setspinner(false)
                                }

                            }
                        }
                        else
                                {
                                    setspinner(false)
                                }
                    } else
                    {
                        setspinner(false)
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
                    if (response.data.field_block_users.und) {
                        let scope = JSON.parse(response.data.field_block_users["und"][0]["value"])
                        scope.push(favInfo)
                        block(scope)
                    } else {
                        console.log("value doesnt exist");
                        let scope = []
                       scope.push(favInfo)
                       block(scope)
                    }                    
                    setBlockVisible(false)
                }).catch(function (error) {
                    console.log(error)
                });
        });


    }



    function block(scope) {  
        setspinner(true) 
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const responseString = JSON.stringify(scope);
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
                    setspinner(false)
                    setUderUpdation(true)
                    checBlockUser()
                    navigation.navigate('SearchItems' , {user:"true"})
                }).catch((error)=> {
                    setspinner(false)
                    console.log(error.response)
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


    const report = () =>{
        Linking.openURL('mailto:contactus@not4dating.com?subject=Report&body=' + "Block Username : " + " " + name)
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
                                            <Text style={{ fontFamily: 'Cairo_700Bold', color: "#056AAD", fontSize: 22, textAlign: "center" }}>{name}</Text>
                                        ) : null}
                                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 15, textAlign: "center" }}>
                                            {age}, {IamName}
                                        </Text>

                                    </View>

                                    {unVerfied ? (
                                    <Image style={styles.ImageProfile} source={{ uri: Picture }} />
                                    ) : null}
                                     {verfied ? (
                                         <View style={{borderWidth:4,backgroundColor:"#056AAD",borderColor:"#056AAD"}}>
                                    <Image style={styles.ImageProfileVerified} source={{ uri: Picture }} />
                                    </View>
                                    ) : null}
                                </View>


                                <View style={styles.UserStatus}>

                                    <View style={styles.UserStatusVerified}>

                                    </View>
                                    <View style={styles.UserStatusLogin}>
                                        <Text style={styles.StatusText}>Last Login:</Text>
                                        <Text style={styles.StatusText}>{converted}</Text>
                                    </View>

                                </View>


                                <View style={styles.fourthIconContainer}>


                                <TouchableOpacity onPress={() => navigation.navigate('NewChat', {Name: name , Picture:Picture , uid:userId})}>
                                    <View style={styles.Iconview}>
                                            <Ionicons name="ios-chatbubbles" style={{ fontSize: 30 }} />
                                            <Text style={styles.TextBelowIcon}>Chat</Text>
                                    </View>
                                    </TouchableOpacity>

                                    {/* const [alreadyFav ,setalreadyFav] = useState(false) */}
                                  {alreadyFav ?(
                                       <TouchableOpacity onPress={AlreadyFav}>
                                    <View style={styles.Iconview}>
                                            <Ionicons name="ios-star" style={{ fontSize: 30 }} color="grey"/>
                                        <Text style={styles.TextBelowIcon}>Favorite</Text>
                                    </View>
                                    </TouchableOpacity>
                                    ):null}

                                    {notFav ?(
                                        <TouchableOpacity onPress={FavorateOverlay}>
                                    <View style={styles.Iconview}>
                                            <Ionicons name="ios-star" style={{ fontSize: 30 }} />
                                        <Text style={styles.TextBelowIcon}>Favorite</Text>
                                    </View>
                                    </TouchableOpacity>
                                      ):null}


                                  {notBlocked ?(
                                       <TouchableOpacity onPress={BlockOverlay}>
                                    <View style={styles.Iconview}>
                                            <Entypo name="emoji-sad" size={24} color="black" />
                                        <Text style={styles.TextBelowIcon}>Never see {"\n"} again</Text>
                                    </View>
                                    </TouchableOpacity>
                                    ):null}

                                  {alreadyBlocked ?(
                                         <TouchableOpacity onPress={AlreadyBlock}>
                                    <View style={styles.Iconview}>
                                            <Entypo name="emoji-sad" size={24} color="grey" />
                                        <Text style={styles.TextBelowIcon}>Never see {"\n"} again</Text>
                                    </View>
                                    </TouchableOpacity>
                                    ):null}



                                     <TouchableOpacity  onPress={report}>
                                        <View style={styles.IconLastview} onPress={report}>
                                            <SimpleLineIcons name="ban" size={24} color="black" />
                                            <Text style={styles.TextBelowIcon}>Report to{"\n"} admin</Text>
                                        </View>
                                    </TouchableOpacity>
                            
                                </View>
                               



                                <View style={styles.fourthMainContainer}>

                                    <View style={styles.fourthContentContainer}>


                                        <Text style={styles.fourConatinerText}>
                                            {considerStatus ? (
                                                <Text> I consider myself<Text style={styles.fourConatinerTextOuput}></Text><Text style={styles.Outputfont}> {consider}</Text> and </Text>
                                            ) : null}
                                            I want to meet <Text style={styles.Outputfont}>{meetValue} </Text></Text>

                                        <Text style={styles.fourConatinerText}>My hobbies and interests are: <Text style={styles.Outputfont}>{activityValue} .</Text></Text>
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
                                    <Text style={styles.fifthConatinerText}>I think a good friend is someone who <Text style={styles.Outputfont}>{FriendValue}.</Text></Text>
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

                               {Nokid ?(
                               <Text style={styles.fifthConatinerText}><Text style={styles.Outputfont}>I do not</Text> have children.</Text>  
                                ):null}
                                 {Yeskid ?(
                               <Text style={styles.fifthConatinerText}><Text style={styles.Outputfont}>I have</Text> children.</Text>  
                                ):null}


                              {Pet ?(
                               <Text style={styles.fifthConatinerText}>I have<Text style={styles.Outputfont}> one {petvalue}</Text></Text>  
                                ):null}

                          {PetParent ?(
                              
                         <Text style={styles.fifthConatinerText}><Text style={styles.Outputfont}>{children}</Text> children and have <Text style={styles.Outputfont}> One {petvalue}</Text></Text>  

                          ):null}



                                { AnythingelseStatus ? (
                                    <Text style={styles.fifthConatinerText}>Anything else <Text style={styles.Outputfont}>{anyThingvalue}</Text></Text>
                                ) : null}


                                  {smokeStatus ? (
                                        <Text style={styles.fifthConatinerText}>I smoke <Text style={styles.Outputfont}>{smokeValue}</Text></Text>
                                    ) : null}

                                   {alcoholStatus ? (
                                        <Text> <Text style={styles.fifthConatinerText}>and drink alcohol <Text style={styles.Outputfont}> {alcoholValue} </Text>.</Text> </Text>
                                    ) : null}
                        </View>







                        <View style={styles.fourthMainCotainer}>
                            {Moviesstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favourite Movies:
                                        <Text style={styles.fifthConatinerOutputText}> {Moviesvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}

                            {Booksstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favourite Books:
                                        <Text style={styles.fifthConatinerOutputText}> {Booksvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}
                            {Tvstatus ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favourite TV Shows:
                                        <Text style={styles.fifthConatinerOutputText}> {TVvalue}</Text>
                                    </Text>
                                </View>
                            ) : null}

{music ? (
                                <View style={styles.mainContainerTwoLiner}>
                                    <Text style={styles.fourthContentContainerBold}>Favourite Music:
                                        <Text style={styles.fifthConatinerOutputText}> {musicValue}</Text>
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


                <Overlay isVisible={alreadyFavVisisble} onBackdropPress={AlreadyFav}>
                    <>
                        <Text style={styles.overLayText}>Remove user from favorites?</Text>

                     
                        <View style={styles.overLayButton}>
                            <Button title="Confirm" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={removeFavorite} />
                            <Button title="Cancel" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.redButton} titleStyle={styles.tittleText} onPress={AlreadyFav} />

                        </View>
                        
                            
                    
                    </>
                </Overlay>


                <Overlay isVisible={Blockvisible} onBackdropPress={BlockOverlay}>
                    <>
                        <Text style={styles.overLayText}>Remove from future search results?</Text>

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
        paddingVertical:10,
     
    },
    ImageProfile: {
        height: 80, width: 80,
    },
    ImageProfileVerified: {
        height: 80, width: 80,
        borderWidth:1
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
        zIndex:4,
        marginBottom:2
    },
    fourthMainContainer: {
        flexDirection: "row",
        marginTop: 50

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
        fontSize: 16,
        paddingTop:5

    },
    fifthConatinerOutputText:{
        fontFamily: "Cairo_700Bold",
        fontSize: 16,
        paddingTop:5

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
        paddingBottom:5
    },
    mainContainerTwoLiner: {
       paddingTop:2
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
        fontSize: 14,
        width:"100%"
    },
    IconLastview: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 5,
        width: "100%"
    },
    Iconview: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomColor: "#B2AFAF",
        borderBottomWidth: 2,
        width: "100%"

    },
    




})


export default FindUserDetails