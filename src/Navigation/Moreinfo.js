import React, { useState, useEffect } from "react";
import { Text, StyleSheet,  View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_400Regular  } from '@expo-google-fonts/montserrat';
import Http from '../Api/Http'
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

const Moreinfo = props => {

    //const [userName, setuserName] = useState();
    //const [userLastName, setuserLastName] = useState();
    // const [userMail, setuserMail] = useState();
    //const [userActivity, setuserActivity] = useState();
    //const [userActivityShow, setuserActivityShow] = useState();
    //const [Picture, setuserPicture] = useState();
    //const [name, setName] = useState();



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
    const [spinner ,setspinner] = useState(true)



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


    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular 
    });
    useEffect(() => {
        setspinner(true)


        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)

            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } })
                .then((response) => {

                    setuserName(response.data.name)
                    setuserPicture(response.data.picture.url)




                    if (response.data.field_consider_myself_.length == undefined) {
                        setconsiderStatus(true)
                        setconsider(response.data.field_consider_myself_.und[0].value)
                    }

                    if (response.data.field_birth_date.length == undefined) {
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
                        setverifed(true)
                        setUnVerfied(false)
                    }


                    setconvert(response.data.login)
                    const converting = response.data.login
                    const unixTime = converting;
                    const dates = new Date(unixTime * 1000);
                    setconverted(dates.toLocaleDateString("en-US"))



                    setspinner(false)



                })


        })

    }, [])
    if (!fontsLoaded) {
        return (
            <AppLoading />)
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
        <TouchableOpacity style={styles.imageContainer} onPress={() => props.navigation.goBack()}>
            <Image style={styles.Image} source={require('../../assets/Images/cross.png')} />
        </TouchableOpacity>
        <View style={styles.thirdContainer}>


            <View style={styles.thirdPhotoContainer}>

                <View style={{ flexDirection: "column", paddingRight: 5 }}>
                    {unVerfied ? (
                        <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 19, textAlign: "center" }}>{name}</Text>
                    ) : null}
                    {verfied ? (
                        <Text style={{ fontFamily: 'Cairo_700Bold', color: "blue", fontSize: 19, textAlign: "center" }}>{name}</Text>
                    ) : null}
                    <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 15, textAlign: "center" }}>
                        {age}, {IamName}
                    </Text>

                </View>

                
                    <View>
                <Image style={styles.ImageProfile} source={{ uri: Picture }} containerStyle={{ shadowOffset: { width: 10, height: 10 },
             shadowColor: 'black',
             shadowOpacity: 1,
             elevation: 20,
             // background color must be set
             backgroundColor : "#0000"}} />
                </View>
          
            </View>


            <View style={styles.UserStatus}>

                <View style={styles.UserStatusVerified}>

                </View>
                <View style={styles.UserStatusLogin}>
                    <Text style={styles.StatusText}>LastLogin:</Text>
                    <Text style={styles.StatusText}>{converted}</Text>
                </View>

            </View>


           




        

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

          

                <Button containerStyle={{ marginHorizontal: 20, marginVertical: 15 }}
                        onPress={() => props.navigation.navigate('Optionaldetail')}
                        title="Add More Info"
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }} />




        </View>
    </View>


   







    
</ScrollView>




</SafeAreaView>

            </View>
        )

    }

}

const styles = StyleSheet.create({


    secondMainCotainer:
    {

        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent: "center",

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
        marginHorizontal: 10, marginVertical: 10
    },
    upperHeadingOutput: {
        fontFamily: 'Montserrat_400Regular ',
        marginHorizontal: 15
    },
    topImage: {
        flexDirection: "row",
        alignItems: "center"
    },
    LeftImage: {
        height: 100,
        width: 100,
        marginHorizontal: 20

    },
    rightText: {
        justifyContent: "center",
        fontFamily: 'Montserrat_400Regular ',
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
        marginHorizontal: 10, marginVertical: 10
    },
  
    thirdPhotoContainer: {
 

    },
    saidImage: {
        height: 30, width: 30
    },
    fourthIconContainer: {
        justifyContent: "space-between"
    },
    fourthMainContainer: {
        flexDirection: "row",
        marginTop: 20

    },
    fourthContentContainer: {
        marginRight: 10,
        marginLeft: 10,
        flex:1
    },
    fourConatinerText: {
        fontFamily: "Montserrat_400Regular ",
        marginVertical: 10,
        marginRight: 45,
        fontSize: 16

    },
    fourthIconContainer: {

    },
    fourConatinerTextOuput: {
        color: "#0C0D0E",
        fontWeight: '500',
        fontFamily: "Cairo_700Bold",

    },
    fourthContentContainerBold: {
        fontFamily: "Cairo_700Bold",
        marginRight: 40
    },
    Outputfont:
        { fontFamily: "Cairo_700Bold" },
    UserStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    StatusText: {
        fontFamily: "Montserrat_400Regular ",
        fontSize: 16
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
    CrossImage:{
        height:20,
        width:20
    },

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",

    },
    secondMainCotainer:
    {
        justifyContent: "center",
        backgroundColor: "white",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30,
        marginBottom:10,
       paddingBottom:20,



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
        justifyContent: "space-between",
        paddingRight: 12,
        paddingLeft:10

    },
    saidImage: {
        height: 30
    },
 
    fourthMainContainer: {
        flexDirection: "row",
        marginTop: 20

    },
    fourthContentContainer: {
        marginLeft: 10,
    },
    fourConatinerText: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16, 
        paddingRight: 4

    },
    fifthConatinerText: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16,
        paddingTop:10

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


export default Moreinfo