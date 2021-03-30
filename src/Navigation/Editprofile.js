import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TextInput, FlatList } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from 'react-native-textarea';
import Http from '../Api/Http'
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Picker } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Overlay } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

const Editprofile = (props) => {
    const [EditfirstItem, setEditFirstItem] = useState(true)
    const [firstItem, setFirstItem] = useState(false)
    const [secondItem, setSecondItem] = useState(false)
    const [thirdItem, setThirdItem] = useState(false)
    const [fourthItem, setFourthItem] = useState(false)
    const [fifthItem, setFifthItem] = useState(false)


    const [firstItems, setFirstItems] = useState()
    const [secondsItems, setsecondsItems] = useState()
    const [thirdItems, setthirdItems] = useState()
    const [fourthItems, setfourthItems] = useState()
    const [fifthItems, setfifthItems] = useState()


    const [selected, setSelected] = useState([]);


    const FirstRouteEdit = () => {


        //Field Value
        const [userName, setuserName] = useState();
        const [userFirstName, setuserFirstName] = useState();
        const [userLastName, setuserLastName] = useState();
        const [IamName, setuserIamtName] = useState();
        const [contracted, setContracted] = useState()
        const [meet, setMeet] = useState()
        const [consider, setconsider] = useState()
        const [spinner, setspinner] = useState(false)
        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)
        const [CountryValue, setCountry] = useState("");
        const [Postalcode, setPostal] = useState("")
        const [active, setActive] = useState()
        const [visible, setVisible] = useState(false);
        const [Messages, setMessages] = useState()
        const [date, setDate] = useState();
        const toggleOverlay = () => {
            setVisible(!visible);

        };
        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight
        });
        useEffect(() => {
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
            setspinner(true)
            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                if (UserDetail != null) {
                    Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                        if (response.status == 200) {

                            setuserName(response.data.name)
                            setDate(response.data.field_birth_date.und[0].value)
                            setuserFirstName(response.data.field_first_name.und[0].value)
                            setuserLastName(response.data.field_last_name.und[0].value)
                            setuserIamtName(response.data.field_gender.und[0].value)
                            setContracted(response.data.field_want_contarct.und[0].value)
                            setMeet(response.data.field_look_meet.und[0].value)
                            setconsider(response.data.field_consider_myself_.und[0].value)
                            setCountry(response.data.field_zip_code.und[0].country)
                            setPostal(response.data.field_zip_code.und[0].postal_code)
                            var Array = []
                            const ActivityUser = response.data.field_activities_interests.und
                            for (let userObj of ActivityUser) {
                                Array = Array.concat(userObj.value)
                            }
                            setActive(Array)
                            setspinner(false)


                        }
                    })
                }
            })

        }, [])
        const item = [
            // this is the parent or 'item'
            {
                name: 'What do you like to do for fun?',
                id: 0,
                // these are the children or 'sub items'
                children: [
                    {
                        name: 'yoga',
                        id: 'yoga',
                    },
                    {
                        name: 'playdates (parents and children)',
                        id: 'playdates (parents and children)',
                    },
                    {
                        name: 'sightseeing',
                        id: 'sightseeing',
                    },
                    {
                        name: 'artsy stuff (making or looking at)',
                        id: 'artsy stuff (making or looking at)',
                    },
                    {
                        name: 'cooking',
                        id: 'cooking',
                    },
                    {
                        name: 'dancing',
                        id: 'dancing',
                    },
                    {
                        name: 'people watching',
                        id: 'people watching',
                    },
                    {
                        name: 'traveling/vacations',
                        id: 'traveling/vacations',
                    },
                    {
                        name: 'history buff',
                        id: 'history buff',
                    },
                    {
                        name: 'board games',
                        id: 'board games',
                    },
                    {
                        name: 'sports (playing)',
                        id: 'sports (playing)',
                    },
                    {
                        name: "mom's/dad's night out w/o kids",
                        id: "mom's/dad's night out w/o kids",
                    },
                    {
                        name: 'outdoor activities',
                        id: 'outdoor activities',
                    },
                    {
                        name: 'dining out',
                        id: 'dining out',
                    },
                    {
                        name: 'concerts/shows',
                        id: 'concerts/shows',
                    },
                    {
                        name: 'sports (watching)',
                        id: 'sports (watching)',
                    },

                    {
                        name: 'shopping',
                        id: 'shopping',
                    },

                    {
                        name: 'video games',
                        id: 'video games',
                    },

                    {
                        name: 'photography',
                        id: 'photography',
                    },
                    {
                        name: 'animal lover/pet owner',
                        id: 'animal lover/pet owner',
                    },
                    {
                        name: 'chess',
                        id: 'chess',
                    },


                ],
            },


        ];

        const onSelectedItemsChange = (active) => {

            // Set Selected Items

            setActive(active);


        };
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        };
        const submitDetail = () => {

            var d = new Date();
            var n = d.getTimezoneOffset();
            var a = new Date(date);
            var n = a.getFullYear();
            var OnlyDate = a.getDate()
            var fullmonth = a.getMonth()

            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                const userId = UserDetail.data.user.uid
                setspinner(true)

                Http.put('user/' + userId, {
                    name: userName,


                    field_consider_myself_: {
                        und: consider
                    },
                    field_first_name: {
                        und: [
                            {
                                value: userFirstName,
                            },
                        ],
                    },
                    field_last_name: {
                        und: [
                            {
                                value: userLastName
                            },
                        ],
                    },
                    field_zip_code: {
                        und: [
                            {
                                postal_code: Postalcode,
                                country: CountryValue,
                            },
                        ],
                    },


                    // field_birth_date:{und:[{value:{month:"12"}}]},
                    // field_birth_date:{und:[{value:{date:"4"}}]},
                    // field_birth_date:{und:[{value:{year:n}}]},


                    field_gender: {
                        und: IamName,
                    },

                    field_activities_interests: {
                        und: active,
                    },
                    field_look_meet: {
                        und: meet,
                    },
                    field_want_contarct: {
                        und: contracted,
                    },
                }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    setEditFirstItem(false)
                    setFirstItem(true)
                    setspinner(false)


                }).catch((error) => {

                    if (error.response.status) {


                        var json = error.response.data.form_errors;
                        var obj = json
                        var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
                        if (result[0][1] == "We are unable to validate your postal code. If this is in error, please contact us so we can correct the problem.") {
                            setMessages("We are unable to validate your postal code.")
                        }
                        else {


                            setMessages(result[0][1].toString().replace(/(<([^>]+)>)/ig, ''))
                        }

                        setspinner(false)
                        setVisible(true)
                    }


                })
            })





        }

        const showDatepicker = () => {
            showMode('date');
        };

        const showTimepicker = () => {
            showMode('time');
        };

        if (!fontsLoaded) {
            return (
                <AppLoading />)
        }
        else {
            return (
                <ScrollView>
                    <SafeAreaView style={{ backgroundColor: "white", paddingHorizontal: 20, height: "100%" }}>
                        <Spinner
                            visible={spinner}
                            textContent={'Retrieving...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />

                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                                <Progress.Bar progress={0.3} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                            </View>
                            {/*Field Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>Username</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserName(text)}
                                    value={userName}
                                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                />
                            </View>


                            {/*Field First Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>First name</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserFirstName(text)}
                                    value={userFirstName}
                                />
                            </View>


                            {/*Field Last Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>Last name</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserLastName(text)}
                                    value={userLastName}
                                />
                            </View>


                            {/*Field I am Container*/}

                            <View style={styles.dropDownStyle} >
                                <Text style={styles.labelText}>I am</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={IamName}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setuserIamtName(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='male' value='Male' />
                                            <Picker.Item label='female' value='Female' />
                                            <Picker.Item label='gender diverse' value='Gender Diverse' />

                                        </Picker>
                                    </View>
                                ) : null}

                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'male', value: 'Male' },
                                            { label: 'female', value: 'Female' },
                                            { label: 'gender diverse', value: 'Gender Diverse' },
                                        ]}
                                        defaultValue={IamName}
                                        value={IamName}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        onChangeItem={item => setuserIamtName(item.value)}
                                        dropDownStyle={{}}
                                        labelStyle={styles.dropDownActive}

                                    />
                                ) : null}

                            </View>
                            {/*                         
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText} >When is your birthday?</Text>
                                <DatePicker
                                    style={styles.datePickerStyle}
                                    date={date} // Initial date from state
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="Date of Birth"
                                    minDate="1900-05-01"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            //display: 'none',
                                            position: 'absolute',
                                            right: 0,
                                            top: 4,
                                            marginLeft: 0,
                                        },
    
                                    }}
    
                                    // minDate={Moment().subtract(100, "years")}
                                    maxDate={Moment().subtract(18, "years")}
    
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                                    disableScroll={true}
    
                                />
                            </View> */}

                            {/*Field Wanting to be contacted by Container*/}

                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>Wanting to be contacted by</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={contracted}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setContracted(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='men only' value='0' />
                                            <Picker.Item label='women only' value='1' />
                                            <Picker.Item label='gender diverse only' value='2' />
                                            <Picker.Item label='everyone' value='3' />

                                        </Picker>
                                    </View>
                                ) : null}

                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'men only', value: '0' },
                                            { label: 'women only', value: '1' },
                                            { label: 'gender diverse only', value: '2' },
                                            { label: 'everyone', value: '3' },
                                        ]}
                                        defaultValue={contracted}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        onChangeItem={contr => setContracted(contr.value)}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        labelStyle={styles.dropDownActive}
                                    />

                                ) : null}

                            </View>




                            {/*I consider myself Container*/}
                            <View style={styles.thirddropDownStyle}>
                                <Text style={styles.labelText}>I consider myself</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={consider}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setconsider(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='outgoing' value='Outgoing' />
                                            <Picker.Item label='on the quieter side' value='On the Quieter Side' />
                                            <Picker.Item label='a mix of both' value='A Mix of Both' />

                                        </Picker>
                                    </View>
                                ) : null}





                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'outgoing', value: 'Outgoing' },
                                            { label: 'on the quieter side', value: 'On the Quieter Side' },
                                            { label: 'a mix of both', value: 'A Mix of Both' },
                                        ]}
                                        defaultValue={consider}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        onChangeItem={cont => setconsider(cont.value)}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        labelStyle={styles.dropDownActive}
                                    />
                                ) : null}
                            </View>


                            {/*Field I want to meet by Container*/}
                            <View style={styles.fourthdropDownStyle}>
                                <Text style={styles.labelText}>I want to meet</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={meet}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setMeet(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='a few goods friends' value='1' />
                                            <Picker.Item label='a lot of accquaintances' value='2' />
                                            <Picker.Item label='no preference' value='3' />

                                        </Picker>
                                    </View>
                                ) : null}







                                {ios ? (

                                    <DropDownPicker
                                        items={[
                                            { label: 'a few goods friends', value: '1' },
                                            { label: 'a lot of accquaintances', value: '2' },
                                            { label: 'no preference', value: '3' },
                                        ]}
                                        defaultValue={meet}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        onChangeItem={item => setMeet(item.value)}

                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        labelStyle={styles.dropDownActive}
                                    />
                                ) : null}
                            </View>

                            <View style={styles.dropDownStyle}>
                                <Text style={styles.labelText}>I live in </Text>

                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={CountryValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='Australia' value='au' />
                                            <Picker.Item label='Canada' value='ca' />
                                            <Picker.Item label='India' value='in' />
                                            <Picker.Item label='Singapore' value='sg' />
                                            <Picker.Item label='New Zealand' value='nz' />
                                            <Picker.Item label='United Kingdom' value='uk' />
                                            <Picker.Item label='United States' value='us' />

                                        </Picker>
                                    </View>
                                ) : null}


                                {ios ? (
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
                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}


                                        onChangeItem={items => setCountry(items.value)}
                                        value={CountryValue}
                                        defaultValue={CountryValue}
                                        defaultIndex={0}

                                    />
                                ) : null}

                            </View>


                            {/*t this postal/Zip code Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>at this postal/Zip code</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setPostal(text)}
                                    value={Postalcode}
                                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                />
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.labelText}>What are your top  hobbies or interests?</Text>
                                <View style={{ marginHorizontal: 5, borderRadius: 5, borderWidth: 1, height: 50 }}>
                                    <SectionedMultiSelect
                                        items={item}
                                        IconRenderer={Icon}
                                        uniqueKey="id"
                                        subKey="children"
                                        //displayKey	= "name"
                                        showDropDowns={true}
                                        readOnlyHeadings={true}
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={active}
                                        hideSearch={false}
                                        expandDropDowns={true}


                                        showChips={false}



                                    />



                                </View>

                            </View>
                            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                                <>
                                    <Text style={styles.errorText}>{Messages}</Text>
                                    <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                                </>
                            </Overlay>

                            <View>
                                <Button containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
                                    onPress={submitDetail}
                                    title="Continue"
                                    buttonStyle={{ backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                />
                            </View>

                        </View>




                    </SafeAreaView>
                </ScrollView>
            )
        }
    };






    const FirstRoute = () => {


        const [CountryValue, setCountry] = useState("");
        const [Postalcode, setPostal] = useState()
        const [activityValue, setactivityValue] = useState();
        const [liveValue, setliveValue] = useState();
        const [talkValue, settalkValue] = useState();
        const [FriendValue, setFriendValue] = useState();
        const [CancelValue, setCancelValue] = useState()
        const [StatusValue, setStatusValue] = useState()
        const [KidsValue, setKidsValue] = useState("")
        const [PetValue, setPetValue] = useState()
        const [daysvalue, setdays] = useState("")
        const [spaekvalue, setspeak] = useState("")



        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)


        const [spinner, setspinner] = useState(false)

        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });



        useEffect(() => {
            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                CheckPhone()
                setspinner(true)
                if (UserDetail != null) {
                    Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                        if (response.status == 200) {
                            setCountry(response.data.field_zip_code.und[0].country)
                            setPostal(response.data.field_zip_code.und[0].postal_code)
                            if (response.data.field_do_for_fun.length == undefined) {
                                var Array = []
                                const ActivityUser = response.data.field_do_for_fun.und
                                for (let userObj of ActivityUser) {
                                    Array = Array.concat(userObj.value)
                                }
                                setactivityValue(Array)

                            }
                            if (response.data.field_long_in_city.length == undefined) {
                                setliveValue(response.data.field_long_in_city.und[0].value)
                            }
                            if (response.data.field_talk_about.length == undefined) {
                                settalkValue(response.data.field_talk_about.und[0].value)
                            }
                            if (response.data.field_good_friend.length == undefined) {
                                setFriendValue(response.data.field_good_friend.und[0].value)
                            }
                            if (response.data.field_plans_get_cancelled.length == undefined) {
                                setCancelValue(response.data.field_plans_get_cancelled.und[0].value)
                            }
                            if (response.data.field_relationship_status.length == undefined) {
                                setStatusValue(response.data.field_relationship_status.und[0].value)
                            }
                            if (response.data.field_kids.length == undefined) {
                                setKidsValue(response.data.field_kids.und[0].value)
                            }

                            if (response.data.field_any_pets.length == undefined) {
                                setPetValue(response.data.field_any_pets.und[0].value)
                            }
                            if (response.data.field_spend_your_days.length == undefined) {
                                setdays(response.data.field_spend_your_days.und[0].value)
                            }
                            if (response.data.field_languages.length == undefined) {
                                setspeak(response.data.field_languages.und[0].value)
                            }
                            setspinner(false)
                        }
                    })
                }

                if (firstItems != null) {


                    setactivityValue(firstItems.activityValue)
                    setliveValue(firstItems.liveValue)
                    settalkValue(firstItems.talkValue)
                    setFriendValue(firstItems.FriendValue)
                    setCancelValue(firstItems.CancelValue)

                }



            })

        }, [])



        const nextRoute = () => {
            const FirstRoute = { liveValue: liveValue, talkValue: talkValue, FriendValue: FriendValue, CancelValue: CancelValue, activityValue: activityValue }
            setFirstItems(FirstRoute)
            setFirstItem(false)
            setSecondItem(true)

        }

        const CheckPhone = () => {
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
        }


        const item = [
            // this is the parent or 'item'
            {
                name: 'What do you like to do for fun?',
                id: 0,
                // these are the children or 'sub items'
                children: [
                    {
                        name: 'yoga',
                        id: 'yoga',
                    },
                    {
                        name: 'playdates (parents and children)',
                        id: 'playdates (parents and children)',
                    },
                    {
                        name: 'sightseeing',
                        id: 'sightseeing',
                    },
                    {
                        name: 'artsy stuff (making or looking at)',
                        id: 'artsy stuff (making or looking at)',
                    },
                    {
                        name: 'cooking',
                        id: 'cooking',
                    },
                    {
                        name: 'dancing',
                        id: 'dancing',
                    },
                    {
                        name: 'people watching',
                        id: 'people watching',
                    },
                    {
                        name: 'traveling/vacations',
                        id: 'traveling/vacations',
                    },
                    {
                        name: 'history buff',
                        id: 'history buff',
                    },
                    {
                        name: 'board games',
                        id: 'board games',
                    },
                    {
                        name: 'sports (playing)',
                        id: 'sports (playing)',
                    },
                    {
                        name: "mom's/dad's night out w/o kids",
                        id: "mom's/dad's night out w/o kids",
                    },
                    {
                        name: 'outdoor activities',
                        id: 'outdoor activities',
                    },
                    {
                        name: 'dining out',
                        id: 'dining out',
                    },
                    {
                        name: 'concerts/shows',
                        id: 'concerts/shows',
                    },
                    {
                        name: 'sports (watching)',
                        id: 'sports (watching)',
                    },

                    {
                        name: 'shopping',
                        id: 'shopping',
                    },

                    {
                        name: 'video games',
                        id: 'video games',
                    },

                    {
                        name: 'photography',
                        id: 'photography',
                    },
                    {
                        name: 'animal lover/pet owner',
                        id: 'animal lover/pet owner',
                    },
                    {
                        name: 'chess',
                        id: 'chess',
                    },


                ],
            },


        ];
        const items = [
            // this is the parent or 'item'


            // these are the children or 'sub items'

            {
                name: 'yoga',
                id: 'yoga',
            },
            {
                name: 'playdates (parents and children)',
                id: 'playdates (parents and children)',
            },
            {
                name: 'sightseeing',
                id: 'sightseeing',
            },
            {
                name: 'artsy stuff (making or looking at)',
                id: 'artsy stuff (making or looking at)',
            },
            {
                name: 'cooking',
                id: 'cooking',
            },
            {
                name: 'dancing',
                id: 'dancing',
            },
            {
                name: 'people watching',
                id: 'people watching',
            },
            {
                name: 'traveling/vacations',
                id: 'traveling/vacations',
            },
            {
                name: 'history buff',
                id: 'history buff',
            },
            {
                name: 'board games',
                id: 'board games',
            },
            {
                name: 'sports (playing)',
                id: 'sports (playing)',
            },
            {
                name: "mom's/dad's night out w/o kids",
                id: "mom's/dad's night out w/o kids",
            },
            {
                name: 'outdoor activities',
                id: 'outdoor activities',
            },
            {
                name: 'dining out',
                id: 'dining out',
            },
            {
                name: 'concerts/shows',
                id: 'concerts/shows',
            },
            {
                name: 'sports (watching)',
                id: 'sports (watching)',
            },

            {
                name: 'shopping',
                id: 'shopping',
            },

            {
                name: 'video games',
                id: 'video games',
            },

            {
                name: 'photography',
                id: 'photography',
            },
            {
                name: 'animal lover/pet owner',
                id: 'animal lover/pet owner',
            },
            {
                name: 'chess',
                id: 'chess',
            },






        ];




        var state = {
            selectedItem: [],
        }


        const onSelectedItemsChange = (activityValue) => {

            // Set Selected Items
            setactivityValue(activityValue);


        };
        const nextValue = () => {
            console.log(activityValue)
        }
        const Back = () => {
            setEditFirstItem(true)
            setFirstItem(false)
        }

        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
            return (
                <ScrollView overScrollMode='always'>
                    <View style={{ backgroundColor: "white", paddingHorizontal: 20, height: "100%" }}>

                        <Spinner
                            visible={spinner}
                            textContent={'Retrieving...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />

                        <View>
                            <View style={{ borderWidth: 1, borderRadius: 20, marginVertical: 20 }}>
                                <Progress.Bar progress={0.2} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.labelText}>What do you like to do for fun?</Text>
                                <Text style={styles.labelUnderText}>(Other than Top 3)</Text>
                                <View style={{ marginHorizontal: 5, borderRadius: 5, borderWidth: 1, height: 50 }}>
                                    <SectionedMultiSelect
                                        items={item}
                                        IconRenderer={Icon}
                                        uniqueKey="id"
                                        subKey="children"
                                        //displayKey	= "name"
                                        showDropDowns={true}
                                        readOnlyHeadings={true}
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={activityValue}
                                        hideSearch={false}
                                        expandDropDowns={true}


                                        showChips={false}



                                    />



                                </View>




                            </View>


                            <View style={styles.seconddropDownStyle}>
                                <Text style={styles.labelText}>How long have you lived here?</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={liveValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setliveValue(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='Select Item' />
                                            <Picker.Item label='< 2 years' value='0' />
                                            <Picker.Item label='2-5 years' value='1' />
                                            <Picker.Item label='> 5 years' value='2' />

                                        </Picker>
                                    </View>
                                ) : null}

                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: '< 2 years', value: '0' },
                                            { label: '2-5 years', value: '1' },
                                            { label: '> 5 years', value: '2' },
                                        ]}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}
                                        activeItemStyle={styles.dropDownActive}

                                        onChangeItem={items => setliveValue(items.value)}
                                        defaultValue={liveValue}
                                        defaultIndex={0}
                                        value={liveValue}
                                    />
                                ) : null}

                            </View>





                            <View style={styles.thirddropDownStyle}>
                                <Text style={styles.labelText}>My friends and I usually talk about</Text>


                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={talkValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => settalkValue(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='Select Item' />
                                            <Picker.Item label='Work' value='Work' />
                                            <Picker.Item label='Family' value='Family' />
                                            <Picker.Item label='Relationships' value='Relationships' />
                                            <Picker.Item label='Gossip' value='Gossip' />
                                            <Picker.Item label='Fashion' value='Fashion' />
                                            <Picker.Item label='Sports' value='Sports' />
                                            <Picker.Item label='Other' value='Other' />
                                        </Picker>
                                    </View>
                                ) : null}



                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'Work', value: 'Work' },
                                            { label: 'Family', value: 'Family' },
                                            { label: 'Relationships', value: 'Relationships' },
                                            { label: 'Gossip', value: 'Gossip' },
                                            { label: 'Fashion', value: 'Fashion' },
                                            { label: 'Sports', value: 'Sports' },
                                            { label: 'Other', value: 'Other' },
                                        ]}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}
                                        activeItemStyle={styles.dropDownActive}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        onChangeItem={items => settalkValue(items.value)}
                                        value={talkValue}
                                        defaultValue={talkValue}

                                    />
                                ) : null}
                            </View>



                            <View style={styles.fourthdropDownStyle}>
                                <Text style={styles.labelText}>A good friend is someone who..</Text>

                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={FriendValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setFriendValue(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                            <Picker.Item label='Select Item' />
                                            <Picker.Item label='is always there for me' value='is always there for me' />
                                            <Picker.Item label='always sides with me no matter what' value='always sides with me no matter what' />


                                            <Picker.Item label='will be honest with me even if it hurts' value='will be honest with me even if it hurts' />
                                            <Picker.Item label='gives advice' value='gives advice' />
                                            <Picker.Item label='is an activity partner' value='is an activity partner' />
                                        </Picker>
                                    </View>
                                ) : null}








                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'is always there for me', value: 'is always there for me' },
                                            { label: 'always sides with me no matter what.', value: 'always sides with me no matter what' },
                                            { label: 'Relationships', value: 'Relationships' },
                                            { label: 'will be honest with me even if it hurts', value: 'will be honest with me even if it hurts' },
                                            { label: 'gives advice', value: 'gives advice' },
                                            { label: 'Fashion', value: 'Fashion' },
                                            { label: 'takes my advice', value: 'takes my advice' },
                                            { label: 'is an activity partner', value: 'is an activity partner' },
                                        ]}
                                        defaultIndex={0}
                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}
                                        activeItemStyle={styles.dropDownActive}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        onChangeItem={items => setFriendValue(items.value)}
                                        value={FriendValue}
                                        defaultValue={FriendValue}
                                    />
                                ) : null}
                            </View>



                            <View style={styles.fifthdropDownStyle}>
                                <Text style={styles.labelText}>When someone cancels plans we made</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={CancelValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setCancelValue(itemValue)}
                                            containerStyle={styles.DropDown}>
                                            <Picker.Item label='Select Item' />
                                            <Picker.Item label='It really bothers me and I am wary of the friendship.' value='It really bothers me and I am wary of the friendship.' />
                                            <Picker.Item label='My reaction depends on the reason why.' value='My reaction depends on the reason why.' />
                                            <Picker.Item label='I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' value='I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' />
                                            <Picker.Item label='Things happen – no big deal.' value='Things happen – no big deal.' />
                                        </Picker>
                                    </View>
                                ) : null}



                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            { label: 'It really bothers me and I am wary of the friendship.', value: 'It really bothers me and I am wary of the friendship.' },
                                            { label: 'My reaction depends on the reason why.', value: 'My reaction depends on the reason why.' },
                                            { label: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.', value: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' },
                                            { label: 'Things happen – no big deal.', value: 'Things happen – no big deal.' },
                                        ]}

                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}
                                        activeItemStyle={styles.dropDownActive}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        onChangeItem={items => setCancelValue(items.value)}
                                        value={CancelValue}
                                        defaultValue={CancelValue}
                                    />
                                ) : null}
                            </View>
                            {/* <View style={styles.fifthdropDownStyle}>
                                <Text style={styles.labelText}>Most Of My Friends Tend To Be</Text>
                                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={CancelValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setCancelValue(itemValue)}
                                            containerStyle={styles.DropDown}>
                                            <Picker.Item label='Select Item'  />
                                            <Picker.Item label='Only Child' value='Only Child' />
                                            <Picker.Item label='Eldest Child' value='Eldest Child' />
                                            <Picker.Item label='Youngest Child' value='Youngest Child' />
                                            <Picker.Item label='Middle Child' value='Middle Child' />
                                            <Picker.Item label="Don't Know/Don't Care" value="Don't Know/Don't Care" />
                                        </Picker>
                                    </View>
                                ) : null}
    
    
    
                                {ios ? (
                                    <DropDownPicker
                                        items={[
                                            {label:'Only Child' ,value:'Only Child' },
                                            { label:'Eldest Child' ,value:'Eldest Child' },
                                            { label:'Youngest Child' ,value='Youngest Child' },
                                            {label:'Middle Child' ,value='Middle Child' },
                                            {label:"Don't Know/Don't Care" ,value:"Don't Know/Don't Care" },
                                 
                                        ]}
    
                                        containerStyle={styles.DropDown}
                                        labelStyle={styles.dropDownActive}
                                        activeItemStyle={styles.dropDownActive}
                                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                        onChangeItem={items => setCancelValue(items.value)}
                                        value={CancelValue}
                                        defaultValue={CancelValue}
                                    />
                                ) : null}
                            </View> */}

                            <View style={styles.mainContainerPicker}>
                                <Button
                                    onPress={nextRoute}
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                />

                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: " #056AAD", marginVertical: 8, paddingBottom: 10 }}
                                    buttonStyle={{ backgroundColor: "#056AAD", borderRadius: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    onPress={Back}
                                />
                            </View>



                        </View>



                    </View>
                </ScrollView>
            )
        };
    }


    const SecondRoute = () => {

        const [CountryValue, setCountry] = useState("");
        const [Postalcode, setPostal] = useState("")
        //const [activityValue, setactivityValue] = useState();
        const [liveValue, setliveValue] = useState("");
        const [talkValue, settalkValue] = useState("");
        const [FriendValue, setFriendValue] = useState("");
        const [CancelValue, setCancelValue] = useState("")
        const [StatusValue, setStatusValue] = useState()
        const [KidsValue, setKidsValue] = useState("")
        const [PetValue, setPetValue] = useState()
        const [daysvalue, setdays] = useState("")
        const [spaekvalue, setspeak] = useState("")
        const [spinner, setspinner] = useState(false)





        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)
        const [single, setSingle] = useState(false)
        const [Married, setMarried] = useState(false)
        const [Habitating, setHabitating] = useState(false)
        const [Relationship, setRelationship] = useState(false)
        const [other, setOther] = useState(false)
        const [kidsYes, setKidsYes] = useState(false)
        const [kidsNo, setKidsNo] = useState(false)
        const [kidsOther, setKidsOther] = useState(false)
        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular,
            Montserrat_700Bold
        });



        useEffect(() => {
            CheckPhone()
            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                if (UserDetail != null) {
                    setspinner(true)
                    Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {

                        if (response.status == 200 && secondsItems == null) {

                            setCountry(response.data.field_zip_code.und[0].country)
                            setPostal(response.data.field_zip_code.und[0].postal_code)

                            // if (response.data.field_do_for_fun.length == undefined) {
                            //     setactivityValue(response.data.field_do_for_fun.und[0].value)
                            // }

                            if (response.data.field_long_in_city.length == undefined) {
                                setliveValue(response.data.field_long_in_city.und[0].value)
                            }


                            if (response.data.field_talk_about.length == undefined) {
                                settalkValue(response.data.field_talk_about.und[0].value)
                            }

                            if (response.data.field_good_friend.length == undefined) {
                                setFriendValue(response.data.field_good_friend.und[0].value)
                            }

                            if (response.data.field_plans_get_cancelled.length == undefined) {
                                setCancelValue(response.data.field_plans_get_cancelled.und[0].value)
                            }

                            if (response.data.field_relationship_status.length == undefined) {
                                if (response.data.field_relationship_status.und[0].value == "Married") {
                                    setMarried(true)
                                    setStatusValue("Married")
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Co-habitating") {
                                    setHabitating(true)
                                    setStatusValue("Co-habitating")
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Significant Other But Not Living Together") {
                                    setOther(true)
                                    setStatusValue()
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Divorced") {
                                    setOther(true)
                                    setStatusValue()
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Widowed") {
                                    setOther(true)
                                    setStatusValue()
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Engaged" || response.data.field_relationship_status.und[0].value == 'Yes' || response.data.field_relationship_status.und.length == 0 || response.data.field_relationship_status.und[0].value == 0) {
                                    setOther(true)
                                    setStatusValue()
                                }
                                else if (response.data.field_relationship_status.und[0].value == "Single") {
                                    setSingle(true)
                                    setStatusValue("Single")
                                }
                                else if (response.data.field_relationship_status.und[0].value == "In a Relationship") {
                                    setRelationship(true)
                                    setStatusValue("In a Relationship")
                                }
                            }
                            else {
                                setOther(true)
                                setStatusValue()
                            }

                            if (response.data.field_kids.length == undefined) {
                                if (response.data.field_kids.und[0].value == "Yes") {
                                    setKidsYes(true)
                                    setKidsValue("Yes")
                                }
                                else if (response.data.field_kids.und[0].value == "No") {
                                    setKidsNo(true)
                                    setKidsValue("No")
                                }
                            }
                            if (response.data.field_kids.length == 0) {
                                setKidsOther(true)
                                setKidsValue()
                            }

                            if (response.data.field_any_pets.length == undefined) {

                                var PetArray = []
                                const PetUser = response.data.field_any_pets.und
                                console.log(PetUser)
                                for (let userObj of PetUser) {
                                    PetArray = PetArray.concat(userObj.value)
                                }
                                setPetValue(PetArray)
                            }

                            if (response.data.field_spend_your_days.length == undefined) {
                                setdays(response.data.field_spend_your_days.und[0].value)
                            }
                            if (response.data.field_languages.length == undefined) {
                                setspeak(response.data.field_languages.und[0].value)
                            }
                        }
                        setspinner(false)
                    })
                }


                if (secondsItems != null) {
                    if (secondsItems.StatusValue == "Married") {

                        setMarried(true)
                        setStatusValue("Married")

                    }
                    else if (secondsItems.StatusValue == "Co-habitating") {

                        setHabitating(true)
                        setStatusValue("Co-habitating")
                    }
                    else if (secondsItems.StatusValue == "Significant Other But Not Living Together") {
                        setOther(true)
                        setStatusValue()
                    }
                    else if (secondsItems.StatusValue == "Divorced") {
                        setOther(true)
                        setStatusValue()
                    }
                    else if (secondsItems.StatusValue == "Widowed") {
                        setOther(true)
                        setStatusValue()
                    }
                    else if (secondsItems.StatusValue == "Engaged") {
                        setOther(true)
                        setStatusValue()
                    }
                    else if (secondsItems.StatusValue == "Single") {
                        setSingle(true)
                        setStatusValue("Single")
                    }
                    else if (secondsItems.StatusValue == "In a Relationship") {
                        setRelationship(true)
                        setStatusValue("In a Relationship")
                    }
                    else {
                        setOther(true)
                        setStatusValue()
                    }

                    if (secondsItems.KidsValue == "Yes") {
                        setKidsYes(true)
                        setKidsValue("Yes")
                    }
                    else if (secondsItems.KidsValue == "No") {
                        setKidsNo(true)
                        setKidsValue("No")
                    }
                    else {
                        setKidsOther(true)
                        setKidsValue()
                    }
                    setPetValue(secondsItems.PetValue)
                    setdays(secondsItems.daysvalue)
                    setspeak(secondsItems.spaekvalue)
                }
            })
        }, [])

        const Single = () => {
            setSingle(true)
            setMarried(false)
            setHabitating(false)
            setRelationship(false)
            setOther(false)
            setStatusValue("Single")
        }


        const Marriage = () => {
            setSingle(false)
            setMarried(true)
            setHabitating(false)
            setRelationship(false)
            setOther(false)
            setStatusValue("Married")
        }
        const Habitat = () => {
            setSingle(false)
            setMarried(false)
            setHabitating(true)
            setRelationship(false)
            setOther(false)
            setStatusValue("Co-habitating")
        }

        const InaRelationship = () => {
            setSingle(false)
            setMarried(false)
            setHabitating(false)
            setRelationship(true)
            setOther(false)
            setStatusValue("In a Relationship")

        }
        const kidYes = () => {
            setKidsYes(true)
            setKidsValue("Yes")
            setKidsOther(false)
            setKidsNo(false)

        }
        const kidNo = () => {
            setKidsYes(false)
            setKidsValue("No")
            setKidsOther(false)
            setKidsNo(true)

        }
        const nextRoute = () => {
            const Second = { StatusValue: StatusValue, KidsValue: KidsValue, PetValue: PetValue, daysvalue: daysvalue, spaekvalue: spaekvalue }
            setsecondsItems(Second)
            setFirstItem(false)
            setSecondItem(false)
            setThirdItem(true)
        }
        const prevRoute = () => {
            setFirstItem(true)
            setSecondItem(false)
        }

        const CheckPhone = () => {
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
        }

        // Dummy Data for the MutiSelect


        const items = [
            // this is the parent or 'item'
            {
                name: 'Do you have pets?',
                id: 0,
                // these are the children or 'sub items'
                children: [
                    {
                        name: 'Dog',
                        id: 'Dog',
                    },
                    {
                        name: 'Cat',
                        id: 'Cat',
                    },
                    {
                        name: 'Rabbit',
                        id: 'Rabbit',
                    },
                    {
                        name: 'Birds',
                        id: 'Birds',
                    },
                    {
                        name: 'Fish',
                        id: 'Fish',
                    },
                    {
                        name: 'Reptile',
                        id: 'Reptile',
                    },
                    {
                        name: 'Other',
                        id: 'Other',
                    },
                ],
            },


        ];


        const onSelectedItemsChange = (PetValue) => {
            // Set Selected Items
            setPetValue(PetValue);
        };

        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {

            return (
                <ScrollView>
                    <SafeAreaView style={{ backgroundColor: "white", paddingHorizontal: 25, height: "100%" }}>
                        <Spinner
                            visible={spinner}
                            textContent={'Retrieving...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />
                        <View>
                            <View style={{ borderWidth: 1, borderRadius: 20, marginVertical: 20 }}>
                                <Progress.Bar progress={0.5} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                            </View>

                            <View style={styles.sixdropDownStyle}>
                                <Text style={styles.labelText}>Are you in a realtionship?</Text>
                                {Married ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={Single}>Single/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={Marriage}>Married</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Habitat}>/Co-Habitating/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={InaRelationship}>In a {"\n"}Relationship</Text>
                                        </Text>
                                    </View>
                                ) : null}

                                {single ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text>
                                            <Text style={styles.BoldTextRelationship} onPress={Single}>Single</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Marriage}>/Married</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Habitat}>/Co-Habitating/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={InaRelationship}>In a {"\n"}Relationship</Text>
                                        </Text>
                                    </View>
                                ) : null}




                                {Habitating ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={Single}>Single</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Marriage}>/Married/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={Habitat}>Co-Habitating</Text>
                                            <Text style={styles.normalTextRelationship} onPress={InaRelationship}>/In a {"\n"}Relationship</Text>
                                        </Text>
                                    </View>
                                ) : null}

                                {Relationship ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={Single}>Single</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Marriage}>/Married/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Habitat}>Co-Habitating/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={InaRelationship}>In a{"\n"} Relationship</Text>
                                        </Text>
                                    </View>
                                ) : null}


                                {other ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={Single}>Single</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Marriage}>/Married/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={Habitat}>Co-Habitating/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={InaRelationship}>In a {"\n"}Relationship</Text>
                                        </Text>
                                    </View>


                                ) : null}


                            </View>


                            <View style={styles.sevendropDownStyle}>
                                <Text style={styles.labelText}>Do you have kids?</Text>

                                {kidsYes ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text style={styles.BoldTextRelationship} onPress={kidYes}>Yes</Text>
                                        <Text style={styles.normalTextRelationship} onPress={kidNo}>/No</Text>
                                    </View>
                                ) : null}


                                {kidsNo ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text style={styles.normalTextRelationship} onPress={kidYes}>Yes</Text>
                                        <Text style={styles.BoldTextRelationship} onPress={kidNo}>/No</Text>
                                    </View>
                                ) : null}


                                {kidsOther ? (
                                    <View style={styles.relationshipContainer}>
                                        <Text style={styles.normalTextRelationship} onPress={kidYes}>Yes</Text>
                                        <Text style={styles.normalTextRelationship} onPress={kidNo}>/No</Text>
                                    </View>
                                ) : null}


                            </View>



                            <View style={styles.eightdropDownStyle}>
                                <Text style={styles.labelText}>Do you have pets?</Text>

                                <View style={{ marginHorizontal: 5, borderRadius: 5, borderWidth: 1, height: 50 }}>
                                    <SectionedMultiSelect
                                        items={items}
                                        IconRenderer={Icon}
                                        uniqueKey="id"
                                        subKey="children"
                                        showDropDowns={true}
                                        expandDropDowns={true}
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={PetValue}
                                        hideSearch={false}
                                        readOnlyHeadings={true}
                                        selectChildren={true}
                                        showChips={false}


                                    />



                                </View>

                            </View>





                            {/*I spend my days code Container*/}

                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>I spend my days..</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setdays(text)}
                                        maxLength={120}
                                        value={daysvalue}
                                        placeholder={'I spend my days'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>

                            {/*I also speak code Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>I also speak</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setspeak(text)}
                                    value={spaekvalue}
                                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                />
                            </View>

                            <View style={styles.mainContainerPicker}>
                                <Button
                                    onPress={nextRoute}
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                />
                            </View>

                            <View style={styles.mainContainerPicker}>
                                <Button
                                    onPress={prevRoute}
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: " #056AAD", marginVertical: 8, paddingBottom: 10 }}
                                    buttonStyle={{ backgroundColor: "#056AAD", borderRadius: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}

                                />
                            </View>

                        </View>

                    </SafeAreaView>
                </ScrollView>

            )
        };
    }

    const ThirdRoute = () => {

        const [smokeValue, setsmokeValue] = useState("");
        const [alcoholValue, setalcoholValue] = useState("");
        const [Booksvalue, setBooks] = useState("");
        const [Moviesvalue, setMovies] = useState("");
        const [TVvalue, setTV] = useState("");
        const [Musicvalue, setMusic] = useState("");
        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)

        const [Never, setNever] = useState(false)
        const [Socially, setSocially] = useState(false)
        const [Yes, setYes] = useState(false)
        const [Rarely, setRarely] = useState(false)
        const [Weekends, setWeekend] = useState(false)
        const [Couple, setCouple] = useState(false)
        const [every, setEvery] = useState(false)
        const [smokeOther, setSmokeOther] = useState(false)


        const [alNever, setalNever] = useState(false)
        const [alSocially, setalSocially] = useState(false)
        const [alRarely, setalRarely] = useState(false)
        const [alWeekends, setalWeekend] = useState(false)
        const [alCouple, setalCouple] = useState(false)
        const [alevery, setalEvery] = useState(false)
        const [alsmokeOther, setalSmokeOther] = useState(false)
        const [spinner, setspinner] = useState(false)

        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });

        const nextRoute = () => {

            setThirdItem(false)
            setFourthItem(true)
            const third = { smokeValue: smokeValue, alcoholValue: alcoholValue, Booksvalue: Booksvalue, Moviesvalue: Moviesvalue, TVvalue, Musicvalue: Musicvalue }
            setthirdItems(third)

        }
        const prevRoute = () => {
            setSecondItem(true)
            setThirdItem(false)
        }

        useEffect(() => {
            CheckPhone()
            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                if (UserDetail != null) {
                    setspinner(true)
                    Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                        if (response.status == 200 && thirdItems == null) {

                            if (response.data.field_smoke.length == undefined) {

                                if (response.data.field_smoke.und[0].value == "Never") {
                                    setNever(true)
                                    setsmokeValue("Never")
                                }
                                else if (response.data.field_smoke.und[0].value == "Socially") {
                                    setSocially(true)
                                    setsmokeValue("Socially")
                                }
                                else if (response.data.field_smoke.und[0].value == "Rarely") {
                                    setRarely(true)
                                    setsmokeValue("Rarely")
                                }
                                else if (response.data.field_smoke.und[0].value == "Weekends Only") {
                                    setWeekend(true)
                                    setsmokeValue("Weekends Only")
                                }
                                else if (response.data.field_smoke.und[0].value == "Couple Times a Week") {
                                    setCouple(true)
                                    setsmokeValue("Couple Times a Week")
                                }
                                else if (response.data.field_smoke.und[0].value == "Every Day") {
                                    setEvery(true)
                                    setsmokeValue("Every Day")
                                }
                            }
                            else {
                                setSmokeOther(true)
                                setsmokeValue()
                            }

                            if (response.data.field_alcohol.length == undefined) {

                                if (response.data.field_alcohol.und[0].value == "Never") {
                                    setalNever(true)
                                    setalcoholValue("Never")
                                }
                                else if (response.data.field_alcohol.und[0].value == "Socially") {
                                    setalSocially(true)
                                    setalcoholValue("Socially")
                                }
                                else if (response.data.field_alcohol.und[0].value == "Rarely") {
                                    setalRarely(true)
                                    setalcoholValue("Rarely")
                                }
                                else if (response.data.field_alcohol.und[0].value == "Weekends Only") {
                                    setalWeekend(true)
                                    setalcoholValue("Weekends Only")
                                }
                                else if (response.data.field_alcohol.und[0].value == "Couple Times a Week") {
                                    setalCouple(true)
                                    setalcoholValue("Couple Times a Week")
                                }
                                else if (response.data.field_alcohol.und[0].value == "Every Day") {
                                    setalEvery(true)
                                    setalcoholValue("Every Day")
                                }
                            }
                            else {
                                setalSmokeOther(true)
                                setalcoholValue()
                            }

                            if (response.data.field_favorite_books.length == undefined) {
                                setBooks(response.data.field_favorite_books.und[0].value)
                            }
                            if (response.data.field_favorite_movies.length == undefined) {
                                setMovies(response.data.field_favorite_movies.und[0].value)
                            }
                            if (response.data.field_favorite_tv_shows.length == undefined) {
                                setTV(response.data.field_favorite_tv_shows.und[0].value)
                            }
                            if (response.data.field_favorite_music.length == undefined) {
                                setMusic(response.data.field_favorite_music.und[0].value)
                            }

                            setspinner(false)


                        }
                        if (thirdItems != null) {
                            setspinner(false)

                            if (thirdItems.smokeValue == "Never") {
                                setNever(true)
                                setsmokeValue("Never")
                            }
                            else if (thirdItems.smokeValue == "Socially") {
                                setSocially(true)
                                setsmokeValue("Socially")
                            }
                            else if (thirdItems.smokeValue == "Rarely") {
                                setRarely(true)
                                setsmokeValue("Rarely")
                            }
                            else if (thirdItems.smokeValue == "Weekends Only") {
                                setWeekend(true)
                                setsmokeValue("Weekends Only")
                            }
                            else if (thirdItems.smokeValue == "Couple Times a Week") {
                                setCouple(true)
                                setsmokeValue("Couple Times a Week")
                            }
                            else if (thirdItems.smokeValue == "Every Day") {
                                setEvery(true)
                                setsmokeValue("Every Day")
                            }
                            else {
                                setalSmokeOther(true)
                                setalcoholValue()
                            }
                            if (thirdItems.alcoholValue == "Never") {
                                setalNever(true)
                                setalcoholValue("Never")
                            }
                            else if (thirdItems.alcoholValue == "Socially") {
                                setalSocially(true)
                                setalcoholValue("Socially")
                            }
                            else if (thirdItems.alcoholValue == "Rarely") {
                                setalRarely(true)
                                setalcoholValue("Rarely")
                            }
                            else if (thirdItems.alcoholValue == "Weekends Only") {
                                setalWeekend(true)
                                setalcoholValue("Weekends Only")
                            }
                            else if (thirdItems.alcoholValue == "Couple Times a Week") {
                                setalCouple(true)
                                setalcoholValue("Couple Times a Week")
                            }
                            else if (thirdItems.alcoholValue == "Every Day") {
                                setalEvery(true)
                                setalcoholValue("Every Day")
                            }
                            else {
                                setalSmokeOther(true)
                                setalcoholValue()
                            }
                            setBooks(thirdItems.Booksvalue)
                            setMovies(thirdItems.Moviesvalue)
                            setTV(thirdItems.TVvalue)
                            setMusic(thirdItems.Musicvalue)

                        }




                    })

                }
            })

        }, [])


        const CheckPhone = () => {
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
        }

        const smokeNever = () => {
            setNever(true)
            setSocially(false)
            setRarely(false)
            setWeekend(false)
            setCouple(false)
            setEvery(false)
            setSmokeOther(false)
            setsmokeValue("Never")
        }
        const smokeSocially = () => {
            setSocially(true)
            setNever(false)
            setRarely(false)
            setWeekend(false)
            setCouple(false)
            setEvery(false)
            setSmokeOther(false)
            setsmokeValue("Socially")
        }

        const smokeRarely = () => {
            setRarely(true)
            setSocially(false)
            setNever(false)
            setWeekend(false)
            setCouple(false)
            setEvery(false)
            setSmokeOther(false)
            setsmokeValue("Rarely")
        }
        const smokeWeekends = () => {
            setWeekend(true)
            setRarely(false)
            setSocially(false)
            setNever(false)
            setCouple(false)
            setEvery(false)
            setSmokeOther(false)
            setsmokeValue("Weekends Only")

        }
        const smokeCouple = () => {
            setCouple(true)
            setWeekend(false)
            setRarely(false)
            setSocially(false)
            setNever(false)
            setEvery(false)
            setSmokeOther(false)
            setsmokeValue("Couple Times a Week")

        }
        const smokeEveryDay = () => {
            setEvery(true)
            setCouple(false)
            setWeekend(false)
            setRarely(false)
            setSocially(false)
            setNever(false)
            setSmokeOther(false)
            setsmokeValue("Every Day")
        }



        const smokealNever = () => {
            setalNever(true)
            setalSocially(false)
            setalRarely(false)
            setalWeekend(false)
            setalCouple(false)
            setalEvery(false)
            setalSmokeOther(false)
            setalcoholValue("Never")
        }
        const smokealSocially = () => {
            setalSocially(true)
            setalNever(false)
            setalRarely(false)
            setalWeekend(false)
            setalCouple(false)
            setalEvery(false)
            setalSmokeOther(false)
            setalcoholValue("Socially")
        }

        const smokealRarely = () => {
            setalRarely(true)
            setalSocially(false)
            setalNever(false)
            setalWeekend(false)
            setalCouple(false)
            setalEvery(false)
            setalSmokeOther(false)
            setalcoholValue("Rarely")
        }
        const smokealWeekends = () => {
            setalWeekend(true)
            setalRarely(false)
            setalSocially(false)
            setalNever(false)
            setalCouple(false)
            setalEvery(false)
            setalSmokeOther(false)
            setalcoholValue("Weekends Only")

        }
        const smokealCouple = () => {
            setalCouple(true)
            setalWeekend(false)
            setalRarely(false)
            setalSocially(false)
            setalNever(false)
            setalEvery(false)
            setalSmokeOther(false)
            setalcoholValue("Couple Times a Week")

        }
        const smokealEveryDay = () => {
            setalEvery(true)
            setalCouple(false)
            setalWeekend(false)
            setalRarely(false)
            setalSocially(false)
            setalNever(false)
            setalSmokeOther(false)
            setalcoholValue("Every Day")
        }



        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {


            return (
                <ScrollView >
                    <SafeAreaView style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 20 }}>
                        <Spinner
                            visible={spinner}
                            textContent={'Retrieving...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />
                        <View >
                            <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 8, marginVertical: 20 }}>
                                <Progress.Bar progress={0.7} unfilledColor="white" animationType="spring" borderColor="white" height={20} width={300} borderRadius={10} color="#056AAD" />
                            </View>


                            <View style={styles.seconddropDownStyle}>
                                <Text style={styles.labelText}>Do you smoke?</Text>

                                {Never ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeNever} >Never</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>/Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>/Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}

                                {Rarely ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever} >Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>Socially/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeRarely}>Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}
                                {Socially ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever} >Never/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeSocially}>Socially</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>/Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}


                                {Weekends ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>Rarely/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}


                                {Couple ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>Weekends Only/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeCouple}>Couple Times a Week</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>/Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}

                                {every ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokeEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}

                                {smokeOther ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokeEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}




                            </View>




                            <View style={styles.thirddropDownStyle}>
                                <Text style={styles.labelText}>How about drinking alcohol?</Text>

                                {alNever ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealNever} >Never</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealSocially}>/Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>/Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}

                                {alRarely ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever} >Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealSocially}>Socially/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealRarely}>Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}
                                {alSocially ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever} >Never/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealSocially}>Socially</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>/Rarely</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>/Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>Every Day</Text>
                                        </Text>
                                    </View>
                                ) : null}


                                {alWeekends ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>Rarely/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}


                                {alCouple ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>Weekends Only/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealCouple}>Couple Times a Week</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>/Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}

                                {alevery ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever}>Never/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.BoldTextRelationship} onPress={smokealEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}

                                {alsmokeOther ? (
                                    <View style={styles.relationshipContainer} >
                                        <Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealNever}>Never/</Text>/
                                        <Text style={styles.normalTextRelationship} onPress={smokealSocially}>Socially/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealRarely}>Rarely/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealWeekends}>Weekends Only</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealCouple}>/Couple Times a Week/</Text>
                                            <Text style={styles.normalTextRelationship} onPress={smokealEveryDay}>Every Day</Text>


                                        </Text>
                                    </View>
                                ) : null}


                            </View>



                            {/*Favorite Books code Container*/}

                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>Favorite Books</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setBooks(text)}
                                        maxLength={120}
                                        value={Booksvalue}
                                        placeholder={'Favorite Books'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>




                            {/*Favorite Movies code Container*/}

                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>Favorite Movies</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setMovies(text)}
                                        maxLength={120}
                                        value={Moviesvalue}
                                        placeholder={'Favorite Movies'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>


                            {/*Favorite TV Shows code Container*/}

                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>Favorite TV Shows</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setTV(text)}
                                        maxLength={120}
                                        value={TVvalue}
                                        placeholder={'Favorite TV Shows'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>

                            {/*Favorite Music code Container*/}

                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>Favorite Music</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setMusic(text)}
                                        maxLength={120}
                                        value={Musicvalue}
                                        placeholder={'Favorite Music'}
                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>




                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                    onPress={nextRoute}
                                />
                            </View>

                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, marginVertical: 10, height: 100, fontFamily: "roboto-bold" }}
                                    buttonStyle={{ fontFamily: "roboto-bold" }}
                                    buttonStyle={{ backgroundColor: "#056AAD", borderRadius: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                    onPress={prevRoute}
                                />
                            </View>


                        </View>
                    </SafeAreaView>
                </ScrollView>
            )
        }
    }
    function FourthRoute(props) {
        const [anyThingvalue, setanyThing] = useState("");
        const [spinner, setspinner] = useState(false)
        const [images, setImages] = useState()
        const [image, setImage] = useState(null);
        const [imageUrls, setImageUrls] = useState([])
        const [spinnerSecond, setspinnerSecond] = useState(false)

        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });




        const [visible, setVisible] = useState(false);
        const toggleOverlay = () => {
            setVisible(!visible);

        };
        const changePage = () => {
            props.props.navigation.navigate('FindFriends', { userUpated: "true" })
            setVisible(false);
        }
        const pickImage = async () => {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4, 3],
                quality: 1,
                allowsMultipleSelection: true,
            });



            if (!result.cancelled) {
                setImage(result.uri);
            }

            // Get File Name
            var url = result.uri;
            var filename = url.substring(url.lastIndexOf('/') + 1);
            //Post File Name
            Http.post('file/', {
                file: result.base64,
                filename: filename,
                filepath: "public://" + filename,
            }).then((response) => {

                //     setspinner(true)


                //Getting Full Url
                Http.get('file/' + response.data.fid).then((imageUrl) => {
                    console.log(imageUrl.data)
                    setImageUrls(imageUrl.data)
                    setspinner(false)

                })

            }).catch((error) => {

                if (error.response.status) {
                    console.log(error.response.data);
                    console.log(error.response.data);

                }


            })


        };

        const prevRoute = () => {
            setThirdItem(true)
            setFourthItem(false)
        }


        var items = [];
        useEffect(() => {

            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                const userId = UserDetail.data.user.uid
                setspinnerSecond(true)
                if (UserDetail != null) {
                    Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {

                        if (response.data.field_you_say.length == undefined) {
                            setanyThing(response.data.field_you_say.und[0].value)
                        }

                        if (response.data.field_user_avatar.length == undefined) {
                            for (let i = 0; i <= response.data.field_user_avatar.und.length; i++) {
                                items.push(response.data.field_user_avatar.und[i])

                                setspinnerSecond(false)
                            }

                        }
                        setspinnerSecond(false)
                        var newItem = response.data.field_user_avatar.und
                        setImages(newItem)



                    })
                }
            })

        }, [])


        //User Details Update
        const UserDetails = () => {
            if (firstItems.CancelValue == undefined) {
                firstItems.CancelValue = []
            }
            else {
                firstItems.CancelValue
            }
            if (firstItems.liveValue == undefined) {
                firstItems.liveValue = []
            }
            else {
                firstItems.liveValue
            }


            AsyncStorage.getItem('Token', (err, result) => {
                const UserDetail = JSON.parse(result)
                const userId = UserDetail.data.user.uid
                setspinner(true)
                Http.put('user/' + userId, {
                    field_do_for_fun: {
                        und: firstItems.activityValue
                    },
                    field_long_in_city: {
                        und: firstItems.liveValue,
                    },
                    field_talk_about: { und: [firstItems.talkValue] },


                    field_good_friend:
                    {
                        und: [firstItems.FriendValue]
                    },

                    field_plans_get_cancelled: {
                        und: firstItems.CancelValue,
                    },
                    field_relationship_status: {
                        und: secondsItems.StatusValue,
                    },
                    field_kids: {
                        und: secondsItems.KidsValue
                    },
                    field_any_pets: {
                        und: secondsItems.PetValue,
                    },
                    field_spend_your_days: {
                        und: [
                            {
                                value: secondsItems.daysvalue,
                            },
                        ],
                    },
                    field_languages: {
                        und: [
                            {
                                value: secondsItems.spaekvalue
                            }

                        ]
                    },
                    field_smoke: { und: thirdItems.smokeValue },
                    field_alcohol: { und: thirdItems.alcoholValue },
                    field_favorite_books: { und: [{ value: thirdItems.Booksvalue }] },
                    field_favorite_movies: { und: [{ value: thirdItems.Moviesvalue }] },
                    field_favorite_tv_shows: { und: [{ value: thirdItems.TVvalue }] },
                    field_favorite_music: { und: [{ value: thirdItems.Musicvalue }] },
                    field_you_say: { und: [{ value: anyThingvalue }] },
                    // field_user_avatar: {
                    //     und: [imageUrls],
                    // },
                }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    setspinner(false)
                    setVisible(true)
                }).catch(function (error) {
                    console.log(error.response)
                });



            })


        }


        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {

            return (
                <ScrollView>
                    <View style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}>
                        <Spinner
                            visible={spinner}
                            textContent={'Updating...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />
                        <Spinner
                            visible={spinnerSecond}
                            textContent={'Retrieving...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c4"}
                        />
                        <View>


                            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginVertical: 20 }}>
                                <Progress.Bar progress={1} unfilledColor="white" color="#056AAD" animationType="spring" width={317} borderColor="white" height={20} borderRadius={10} />
                            </View>
                            {/* <Text style={styles.labelTextTextarea}>Do you want to add some more photos?</Text>
                        <Text style={styles.labelUnderText}>(Up to 8)</Text>
                        <FlatList
                            data={images}
    
                            keyExtractor={item => item.fid}
                            renderItem={({ item }) => {
                                var pictureItem = item.filename
                                var pictureUrl = 'http://gowebtutorial.com/sites/default/files/' + pictureItem
    
                                return (
    
                                    <View style={{ flexDirection: 'row', flex: 2, marginHorizontal: 20 }}>
                                        <Image style={{ height: 50, width: 50 }} source={{ uri: pictureUrl }} />
                                    </View>
    
                                )
    
                            }}
                        /> */}

                            {/* <View style={styles.imageUploadButton}>
                            <Entypo name="camera" size={24} color="black" />
                            <Text style={styles.imageUploadButtonText} onPress={pickImage} >Upload From Gallery</Text>
                        </View> */}



                            {/*Anything else you want to share? Container*/}
                            <View style={styles.TextAreaContainer}>
                                <View style={styles.FieldContainer}>
                                    <Text style={styles.labelTextTextarea}>Anything else you want to share?</Text>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        onChangeText={text => setanyThing(text)}
                                        maxLength={120}
                                        value={anyThingvalue}

                                        placeholderTextColor={'#c7c7c7'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>




                            </View>



                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Complete"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    onPress={UserDetails}

                                />

                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: " #056AAD", marginVertical: 8, paddingBottom: 10 }}
                                    buttonStyle={{ backgroundColor: "#056AAD", borderRadius: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    onPress={prevRoute}
                                />
                            </View>



                        </View>
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                            <>
                                <Text style={styles.errorText}>User Details Updated</Text>
                                <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={changePage} />
                            </>
                        </Overlay>
                    </View>
                </ScrollView>

            )



        }
    }



    useEffect(() => {

    }, [])
    const [index, setIndex] = React.useState(0);




    return (
        <View style={{ flex: 1 }}>
            {EditfirstItem ? (
                <FirstRouteEdit />
            ) : null}
            {firstItem ? (
                <FirstRoute />
            ) : null}
            {secondItem ? (
                <SecondRoute />
            ) : null}
            {thirdItem ? (
                <ThirdRoute />
            ) : null}
            {fourthItem ? (
                <FourthRoute props={props} />
            ) : null}
        </View>
    );

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
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16
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
        marginVertical: 5,

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
    datePickerStyle: {

        marginLeft: 10,
        width: "95%",
        borderWidth: 1,
        borderRadius: 5


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
        marginVertical: 5
    },
    seconddropDownStyle: {
        position: "relative",
        zIndex: 30,
        backgroundColor: '#fff',
        marginVertical: 5
    },
    thirddropDownStyle: {
        position: "relative",
        zIndex: 20,
        backgroundColor: '#fff',
        marginVertical: 5
    },
    fourthdropDownStyle: {
        position: "relative",
        zIndex: 10,
        backgroundColor: '#fff',
        marginVertical: 5
    },
    fifthdropDownStyle: {
        position: "relative",
        zIndex: 9,
        backgroundColor: '#fff',
        marginVertical: 5
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
    errorText: {
        fontFamily: "Cairo_700Bold",
        fontSize: 18
    }

});




export default Editprofile


