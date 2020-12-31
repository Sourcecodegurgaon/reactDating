import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TextInput, ActionSheetIOS , Modal} from "react-native";
import { Picker } from 'react-native'

import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from 'react-native-textarea';
import Http from '../../Api/Http'
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements'
import { Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';
import { Camera } from 'expo-camera';
import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectMultiple from 'react-native-select-multiple'
import CustomMultiPicker from "react-native-multiple-select-list";
import { Linking } from 'react-native'
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// import FirstPage from "./FirstPage"





//Export Upper Content



const SignUp = props => {
 const [firstItem ,setFirstItem]  = useState(true)   
 const [secondItem ,setSecondItem]  = useState(false) 
 const [thirdItem ,setThirdItem]  = useState(false) 
 const [fourthItem ,setFourthItem]  = useState(false)
 const [fifthItem,setFifthItem] = useState(false) 


 const [firstItems,setFirstItems] = useState()
 const [secondsItems,setsecondsItems] = useState()
 const [thirdItems,setthirdItems] = useState()
 const [fourthItems,setfourthItems] = useState()
 const [fifthItems,setfifthItems] = useState()

    function FirstRoute() {


        //Fields 
        const [userName, setuserName] = useState();
        const [userFirstName, setuserFirstName] = useState();
        const [userLastName, setuserLastName] = useState();
        const [date, setDate] = useState();
        const [message, setMessage] = useState()
    
        const [errorOverLay, seterrorOverLay] = useState(false);
    
    
        const [avaliableSpinner, setavaliableSpinner] = useState(false)

        const toggleOverlay = () => {
            seterrorOverLay(!errorOverLay);
        };
        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });
        useEffect(() => {
       if(firstItems != null)
       {
        setuserName(firstItems.userName)
        setuserFirstName(firstItems.userFirstName)
        setuserLastName(firstItems.userLastName)
        setDate(firstItems.date)
        
       }
        }, []);
     




        const checkUserDetail = () => {
            if (userName == null) {
                toggleOverlay()
                setMessage("Please Enter Username")
            }
            else if (userFirstName == null) {
                toggleOverlay()
                setMessage("Please Enter First Name")
            }
            else if (userLastName == null) {
                toggleOverlay()
                setMessage("Please Enter Last Name")
            }
            else if (date == null) {
                toggleOverlay()
                setMessage("Please Select Date")
            }
            else if (
                Math.floor(Math.abs(Date.now() - new Date(date).getTime()) /
                    (1000 * 3600 * 24) /
                    365.25
                ) < 18
            ) {
                toggleOverlay()
                setMessage("age must be 18+")
            }
            else {
     
                nextRoute()
             
            }
    
    
        }
    
    
        const checkUserName = () => {
            setavaliableSpinner(true)
            Http.get("CheckUsername", {
                params: {
                    Name: userName
                }
            }).then((userNames) => {
                if (userNames.data.length == 0) {
                    setavaliableSpinner(false)
                    toggleOverlay()
                    setMessage("Username available")
    
                }
                else {
                    setavaliableSpinner(false)
                    console.log(userNames.data.length)
                    toggleOverlay()
                    setMessage("Username already taken")
    
                }
    
    
            })
    
    
        }
    
        const nextRoute = () =>{
            const FirstRoute ={userName: userName, userFirstName: userFirstName, userLastName: userLastName, userLastName: userLastName, date: date}
             setFirstItems(FirstRoute)
            setFirstItem(false)
            setSecondItem(true)
       
        }
    const showDate = () =>{
        console.log(date)
    }
        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
            return (
                <SafeAreaView style={{ backgroundColor: "white", flex: 1, height: "100%"}}>
                    <ScrollView style={styles.SpacingSide}>
                        <View style={{ backgroundColor: "white", flex: 1 }}>
                            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                                <Progress.Bar progress={0.3} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                            </View>
    
    
                            <Spinner
                                visible={avaliableSpinner}
                                textContent={'Searching...'}
                                textStyle={styles.spinnerTextStyle}
                                overlayColor={"#000000c4"}
                            />
    
    
                            {/*Field Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>What should we call you here?*</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserName(text)}
                                    value={userName}
                                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                    placeholder="Username"
                                />
                            </View>
                            <Text style={styles.lowerTextfield}>(This is your username)</Text>
    
    
                            <Button
                                containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                onPress={checkUserName}
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                title="Check availability"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
    
                            />
    
                            {/*Field First Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>What is your First name*</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserFirstName(text)}
                                    value={userFirstName}
                                />
                            </View>
                            <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>
    
    
    
                            {/*Field Last Name Container*/}
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText}>What is your Last name*</Text>
                                <TextInput
                                    style={styles.TextInput}
                                    onChangeText={text => setuserLastName(text)}
                                    value={userLastName}
                                />
                            </View>
                            <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>
    
    
                            <View style={styles.FieldContainer}>
                                <Text style={styles.labelText} onPress={showDate}>When is your birthday?*</Text>
                                <DatePicker
                                    style={styles.datePickerStyle}
                                    date={date} // Initial date from state
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="Date of Birth"
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
                            </View>
                            <Text style={styles.lowerTextfield}>(Only age is displayed publicly)</Text>
                            <Text style={styles.notifyText}>*Not4Dating is for adults 18 and older. I confirm that I am over 18 years old by clicking on the continue button below.</Text>
                            <Button containerStyle={{ marginHorizontal: 10, marginVertical: 10 ,paddingBottom:20}}
                                onPress={checkUserDetail}
                                title="Continue"
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            />
                            <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                                <>
                                    <Text style={styles.errorText}>{message}</Text>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                                    </View>
                                </>
                            </Overlay>
    
                        </View>
                    </ScrollView>
                </SafeAreaView>
    
            )
        };
    }
    
    const SecondRoute = () => {
    
    
        //const firstRoute = route.params
    
        const [IamName, setuserIamtName] = useState();
        const [contracted, setContracted] = useState()
        const [consider, setconsider] = useState()
        const [meet, setMeet] = useState()
        const [errorOverLay, seterrorOverLay] = useState(false);
        const [message, setMessage] = useState()
        const [result, setResult] = useState("🔮");
        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)
        const toggleOverlay = () => {
            seterrorOverLay(!errorOverLay);
        };
    
        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular,
        });

        useEffect(() => {
            if(secondsItems != null)
            {
               
                setuserIamtName(secondsItems.Gender)
                setContracted(secondsItems.Contract)
                setconsider(secondsItems.consider)
                setMeet(secondsItems.meet)             
            }
             }, []);

   
        const checkFields = () => {
            console.log(consider)
            if (IamName == null) {
                toggleOverlay()
                setMessage("Please Select Items from I am")
            }
            else if (contracted == null) {
                toggleOverlay()
                setMessage("Please Select Items from Wanting to be contacted by")
            }
            else if (consider == undefined) {
                toggleOverlay()
                setMessage("Please Select Items from I Consider Myself")
            }
            else if (meet == null) {
                toggleOverlay()
                setMessage("Please Select Items from I want to meet")
            }
            else {
                nextRoute()
            }
        }
    
        useEffect(() => {
    
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
        }, [])
    
        const popup = () => {
            toggleOverlay()
            setMessage("We want to know who you want to be contacted by so we can filter search results you show up in appropriately.")
    
        }
    

        const nextRoute = () =>{
           const Second = { Gender: IamName, Contract: contracted, meet: meet, consider: consider }
            setsecondsItems(Second)
            setFirstItem(false)
            setSecondItem(false)
            setThirdItem(true)
        }
        const prevRoute = () =>{
            setFirstItem(true)
            setSecondItem(false)
        }
        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
            return (
                <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
                    <ScrollView style={styles.SpacingSide}>
                        <View>
                            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                                <Progress.Bar progress={0.5} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
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
                                            <Picker.Item label='Select Item' />
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
    
                            {/*Field Wanting to be contacted by Container*/}
                            <View style={styles.seconddropDownStyle}>
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
                                                <Picker.Item label='Select Item' />
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
                            </View>
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD" }}
                                    buttonStyle={{ borderRadius: 10, backgroundColor: "#056AAD" }}
                                    title="Why do we ask this if its
                                      not for dating or sex?"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 16 }}
                                    onPress={popup}
                                />
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
                                            <Picker.Item label='Select Item'/>
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
    
    
                            <View style={styles.mainContainerPicker}>
                                <Text style={styles.labelText}>And</Text>
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
                                            <Picker.Item label='Select Item'/>
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
    
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                    buttonStyle={{ backgroundColor: "green", borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    onPress={checkFields}
                        
    
                                />
                                <Button
                                    containerStyle={{ marginHorizontal: 10 }}
                                    buttonStyle={{ backgroundColor: "#AA0D0D", borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    //onPress={() => navigate('First')}
                                    onPress={prevRoute}
    
                                />
                            </View>
    
                            <View style={styles.mainContainerPicker}>
    
                            </View>
    
                        </View>
    
                        <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                            <>
                                <Text style={styles.errorText}>{message}</Text>
                                <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                                    <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                                </View>
                            </>
                        </Overlay>
                    </ScrollView>
                </SafeAreaView>
    
            )
        };
    }
    
    
    
    const ThirdRoute = () => {
        const [image, setImage] = useState(null);
    
    
        const [imageUrls, setImageUrls] = useState()
        const [spinner, setspinner] = useState(false)
        const [doSomething, doSomethingWith] = useState()
        const [imageNotUploaded, setimageNotUploaded] = useState(true)
        const [uploadedImage, setuploadedImage] = useState(false)
       // const secondRoute = route.params
        //Camers
        const [hasPermission, setHasPermission] = useState(null);
        const [type, setType] = useState(Camera.Constants.Type.back);
        const [Openingspinner, setOpeningspinner] = useState()
        const [camera, setShowCamera] = useState(false);
        const [uploadButton,setuploadButton] = useState(false)
        const [selFieData,setSelfieData] = useState()

        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });
    
    
        useEffect(() => {
            async function getKind() {
                (async () => {
                    const { status } = await Camera.requestPermissionsAsync();
                    setHasPermission(status === 'granted');
                  })();

              if(thirdItems != null)
              {
                  setImage(thirdItems.uri_full)
                setuploadedImage(true)
                setimageNotUploaded(false)
              }

            }
            getKind();
        }, []);
        if (hasPermission === null) {
            return <View />;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

        const CameraModule = (props) => {
            const [cameraRef, setCameraRef] = useState(null);
            const [type, setType] = useState(Camera.Constants.Type.back);



        const takePicture = async ()=>{
            {if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({
                    base64: true,
                })  
                setuploadButton(true)
                setSelfieData(photo)
                props.setImage(photo);
                props.setModalVisible();
                setimageNotUploaded(false)
                
         
              }
            }
          
        }
         return (
             <Modal
               animationType="slide"
               transparent={true}
               visible={true}
               onRequestClose={() => {
                 props.setModalVisible();
               }}
             >
               <Camera
                 style={{ flex: 1 }}
                 ratio="16:9"
                 flashMode={Camera.Constants.FlashMode.on}
                 type={type}
                 ref={(ref) => {
                   setCameraRef(ref);
                 }}
               >
                 <View
                   style={{
                     flex: 1,
                     backgroundColor: "transparent",
                     justifyContent: "flex-end",
                   }}
                 >
                   <View
                     style={{
                       backgroundColor: "white",
                       flexDirection: "row",
                 alignItems:"center",
                       justifyContent:"space-evenly"
                     }}
                   >
                        <Button
                              
                                buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10,paddingHorizontal:20}}
    
                                title="Exit"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                onPress={() => {
                                    props.setModalVisible();
                                    }}
                            />
                 
            
                         <Button
                                containerStyle={{ marginVertical: 10 }}
                                buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10, marginVertical: 10 }}
                                title="Click Picture"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18}}
                                onPress={takePicture}
                            />
                      
                      <Button
                                containerStyle={{ marginVertical: 10 }}
                                buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10,  marginVertical: 10 ,paddingHorizontal:20}}
    
                                title={type === Camera.Constants.Type.back ? "Front" : "Back"}
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                onPress={() => {
                                    setType(
                                      type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                  }}
                            />
            
               
                   </View>
                 </View>
               </Camera>
             </Modal>
           );
         };
        const nextRoute = () =>{
          
            setThirdItem(false)
            setFourthItem(true)
            //[thirdItems,
        }
        const prevRoute = () =>{
            setSecondItem(true)
            setThirdItem(false)
        }
        const pickImage = async () => {
    
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4, 3],
                quality: 1,
            });
    
    
    
            if (!result.cancelled) {
                setImage(result.uri);
                setimageNotUploaded(false)
                setspinner(false)
            }
         
            // Get File Name
            var url = result.uri;
            var filename = url.substring(url.lastIndexOf('/') + 1);
            setspinner(true)
            //Post File Name
            Http.post('file/', {
                file: result.base64,
                filename: filename,
                filepath: "public://" + filename,
            }).then((response) => {
                //Getting Full Url
                Http.get('file/' + response.data.fid).then((imageUrl) => {
                    setImageUrls(imageUrl.data)
                    setthirdItems(imageUrl.data)
                    setuploadedImage(true)
                    setspinner(false)
                })
    
            })
    
    
        };


        const uploadSeflie = () =>{
            var url = selFieData.uri;
            var filename = url.substring(url.lastIndexOf('/') + 1);

            setspinner(true)
            //Post File Name
            Http.post('file/', {
                file: selFieData.base64,
                filename: filename,
                filepath: "public://" + filename,
            }).then((response) => {
                //Getting Full Url
                Http.get('file/' + response.data.fid).then((imageUrl) => {
                    setImageUrls(imageUrl.data)
                    setthirdItems(imageUrl.data)
                    setuploadedImage(true)
                    setspinner(false)
                })
    
            })
      
    
            
        }

        const resetSelFie = () =>{
            setImage(null)
            setimageNotUploaded(true)
            setuploadButton(false)
         }
        const resetImage = () => {
            setImage(null)
            setuploadedImage(false)
            setimageNotUploaded(true)
    
        }
        const cameras = () => {
            setType(
                type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
            );
    
        }
    
    
        const ImageAddress = (uri) =>{
      console.log(uri)
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
    
        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
    
            return (
    
                <ScrollView>
                    <View style={{  backgroundColor: "white",  paddingHorizontal: 20,height:"100%" }}>
    
                        <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20 }}>
                            <Progress.Bar progress={0.7} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                        </View>
                        <Spinner
                            visible={spinner}
                            textContent={'Uploading Image...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c2"}
                        />
                        <Spinner
                            visible={Openingspinner}
                            textContent={'Image...'}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor={"#000000c2"}
                        />
    
                        <View style={{ flex: 2, backgroundColor: "white", alignItems: "center" ,height:"100%"}}>
                            {imageNotUploaded ? (
                                <View>
                                    <View style={styles.ImageTopHeading}>
                                        <Text style={styles.ImageTopHeadingText}>Choose Your Profile Photo</Text>
                                    </View>
                              
                                    <TouchableOpacity onPress={() => {setShowCamera(true);}}>
                                        <View style={styles.imageUploadButton} >
                                            <Entypo name="camera" size={24} color="black" />
                                            <Text style={styles.imageUploadButtonText} >Take a selfie</Text>
                                        </View>
                                    </TouchableOpacity>
                                

                                    {camera && (

                                        <View>
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          setImage={(result) => setImage(result.uri)}
        />



    
                           
     

</View>


      )}

                                    <View style={{height:20}}></View>
    
                                    <View style={styles.imageUploadButton}>
                                        <Entypo name="camera" size={24} color="black" />
    
                                        <Text style={styles.imageUploadButtonText} onPress={pickImage} >Upload from library</Text>
    
                                    </View>
    
    
                                    <View style={{height:20}}></View>
    
    
                                    <View style={styles.ImageTopHeading}>
                                        <Text style={styles.ImageTopHeadingText}>
                                            OR
                                        </Text>
                                    </View>
                              
    
                                    <View style={styles.Iconcontainer}>
    
                             <TouchableOpacity onPress={ImageAddress('../../../assets/Images/l1.png')}>
                                        <Image style={styles.Image} source={require('../../../assets/Images/l1.png')} />
                                        </TouchableOpacity>
                                        <Image style={styles.Image} source={require('../../../assets/Images/l2.png')} />
                                        <Image style={styles.Image} source={require('../../../assets/Images/l3.png')} />
                                        <Image style={styles.Image} source={require('../../../assets/Images/l4.png')} />
    
                                    </View>
                                    <View style={styles.Iconcontainer}>
                                        <Image style={styles.Image} source={require('../../../assets/Images/l5.png')} />
                                        <Image style={styles.Image} source={require('../../../assets/Images/l6.png')} />
                                        <Image style={styles.Image} source={require('../../../assets/Images/l7.png')} />
                                        <Image style={styles.Image} source={require('../../../assets/Images/l8.png')} />
    
                                    </View>
                                </View>
    
    
    
    
    
    
    
                            ) : null}
    
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    
    
    
    
    
                        </View>
                       {uploadButton ?(
                        <View style={styles.mainContainerPicker}>
                                <TouchableOpacity onPress={resetSelFie}>
                                    <Text style={styles.ImageTopHeadingText}>Remove Selfie</Text>
                                </TouchableOpacity>

                           </View>
                           ):null}

    
    
    
    
                        {uploadedImage ? (
    
                            <View style={styles.mainContainerPicker}>
                                <TouchableOpacity onPress={resetImage}>
                                    <Text style={styles.ImageTopHeadingText}>Remove Image</Text>
                                </TouchableOpacity>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    //onPress={() => navigate('Fourth', { secondRoute: secondRoute, result: imageUrls })}
                                    onPress ={nextRoute}
    
                                />
                            </View>
                        ) : null}
                        {uploadButton ?(
    
                            <Button
                                    containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Upload Selfie"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    //onPress={() => navigate('Fourth', { secondRoute: secondRoute, result: imageUrls })}
                                    onPress ={uploadSeflie}
    
                                />
                            ):null}
                        <View style={styles.mainContainerPicker}>
                            <Button
                                containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
    
                                title="Previous"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                onPress={prevRoute}
                            />
                        </View>
                    </View>
                </ScrollView>
    
            )
        }
    }
    const FourthRoute = () => {
    
   
    
        const [liveValue, setliveValue] = useState("");
        const [activityValue, setactivityValue] = useState("");
    
        const [CountryValue, setCountry] = useState(null);
        const [Postalcode, setPostal] = useState(null)
        const [selectedItems, setSelectedItems] = useState([]);
        const [errorOverLay, seterrorOverLay] = useState(false);
        const [message, setMessage] = useState()
        const [android, setAndroid] = useState(false)
        const [ios, setIos] = useState(false)
    
    
        const [visible, setVisible] = useState(false);
        const toggleReadMore = () => {
            setVisible(!visible);
        };
        let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight
        });
        const toggleOverlay = () => {
            seterrorOverLay(!errorOverLay);
        };
    

        useEffect(() => {
            if(fourthItems != null)
            {
                setCountry(fourthItems.CountryValue)
                setPostal(fourthItems.Postalcode)
                setSelectedItems(fourthItems.Activity)
            }
           
        }, []);
       
        const checkUserDetails = () => {
    
            if (CountryValue == null) {
                toggleOverlay()
                setMessage("Please Select Items from Country")
            }
            else if (Postalcode == null) {
                toggleOverlay()
                setMessage("Please enter Postcode")
            }
            else if (selectedItems == null) {
                toggleOverlay()
                setMessage("Select activities")
            }
            else {
                nextRoute()
               
          
    
    
            }
    
    
        }
        useEffect(() => {
    
            Platform.select({
                ios: () => setIos(true),
                android: () => setAndroid(true)
            })();
        }, [])
    
        const nextRoute = () =>{
            const fourthItem = { CountryValue: CountryValue, Postalcode: Postalcode, Activity: selectedItems }
           setfourthItems(fourthItem)
            setFourthItem(false)
            setFifthItem(true)
        }
        const prevRoute = () =>{
            setThirdItem(true)
            setFourthItem(false)
        }


        const popup = () => {
            toggleOverlay()
            setMessage(
    
    
                <Text>I’m sorry, we haven’t yet expanded worldwide.  If you would like us to expand to your area next, please let us know at  <Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com')} style={styles.EmailText}> contactus@not4dating.com </Text></Text>
    
            )
    
        }
    
        const Secondpopup = () => {
            toggleOverlay()
            setMessage("We focus your search results near you because Not4Dating wants to help people make friends in the real world, not just online.")
    
        }
    
    
        
        const items = [
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
    
    
        ];fourthItems,setfourthItems
    
    
        const onSelectedItemsChange = (selectedItems) => {
            // Set Selected Items
            setSelectedItems(selectedItems);
        };
    
    
        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
    
            return (
                <ScrollView nestedScrollEnabled={false}>
                    <View style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}>
                        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
    
    
    
                            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20 }}>
                                <Progress.Bar progress={0.9} unfilledColor="white" color="#056AAD" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
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
                                         <Picker.Item label='I live In'  />
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
    
    
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD" }}
                                    title="Why isn't my country here?"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                    containerStyle={{ marginHorizontal: 10 }}
                                    buttonStyle={{ borderRadius: 10, backgroundColor: "#056AAD" }}
                                    onPress={popup}
                                />
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
    
    
    
    
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    title="Why can I only meet people who live near me?"
                                    containerStyle={{ marginHorizontal: 10 }}
                                    buttonStyle={{ borderRadius: 10, backgroundColor: "#056AAD" }}
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                    onPress={Secondpopup}
                                />
                            </View>
    
    
    
    
    
    
    
    
                            <View >
                                <Text style={styles.labelText}>What are your top  hobbies or interests? {"\n"} 
                                <Text style={{fontSize:15}}>(Don’t worry you can add more later)</Text></Text>
                                <View style={{ marginHorizontal: 10, borderWidth: 1, borderRadius: 5, height: 50 }}>
                                    <SectionedMultiSelect
                                        items={items}
                                        IconRenderer={Icon}
                                        uniqueKey="id"
                                        subKey="children"
                                        showDropDowns={true}
                                        readOnlyHeadings={true}
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={selectedItems}
                                        hideSearch={false}
                                        expandDropDowns={true}
                                        readOnlyHeadings={true}
                                        selectChildren={true}
                                        showChips	={false}
                                    />
    
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                            <Text style={styles.labelText}>Terms and Conditions</Text>
    
                            <View style={styles.overflowContainer}>
    
                                <Text style={styles.overflowContainerText}>
                                    This Terms of Use (“Agreement”) is a legally binding agreement made by and
                                    between Not 4 Dating, LLC
                                    (“N4D”) and you, personally and, if applicable, on behalf of the entity for whom you are using this web
                                    site (collectively, “you”). 
                              </Text>

                            </View>
                            </View>
                            <TouchableOpacity onPress={toggleReadMore}>
                                <Text style={styles.TextReadMore}>Read More</Text>
                            </TouchableOpacity>
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10, marginVertical: 10 }}
                                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                    title="Continue"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    onPress={checkUserDetails}
                                />
                            </View>
    
                            <View style={styles.mainContainerPicker}>
                                <Button
                                    containerStyle={{ marginHorizontal: 10 }}
                                    buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
                                    title="Previous"
                                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                                    //onPress={() => navigate('Third')}
                                    onPress={prevRoute}
    
                                />
                            </View>
    
                            <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                                <>
                                    <Text style={styles.errorText}>{message}</Text>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                                    </View>
                                </>
                            </Overlay>
    
    
                            <Overlay isVisible={visible} onBackdropPress={toggleReadMore}>
                                <ScrollView>
                                    <View style={styles.MainContainerReadmore}>
                                    <Text style={styles.PrivacyHeading}>Privacy Policy</Text>
                                <Text style={styles.ReadMoreText}>This Terms of Use (“Agreement”) is a legally binding agreement made by and
                                between Not 4 Dating, LLC
                                (“N4D”) and you, personally and, if applicable, on behalf of the entity for whom you are using this web
                                site (collectively, “you”). This Agreement governs your use of the not4dating.com web site (the “Site”)
                                and the services offered by N4D on the Site (the “Services”), so please read it carefully.BY CLICKING THE “I AGREE” BUTTON OR ACCESSING OR USING ANY PART OF THE SITE, YOU AGREE THAT YOU HAVE
                                READ, UNDERSTAND AND AGREE TO BE BOUND BY THIS AGREEMENT AND THE TERMS AND CONDITIONS REFERENCED HEREIN,
                                WHETHER OR NOT YOU REGISTERED AS A MEMBER. IF YOU DO NOT AGREE TO BE SO BOUND, DO NOT ACCESS OR USE THE
                                WEB SITE. INTERNET TECHNOLOGY AND THE APPLICABLE LAWS, RULES, AND REGULATIONS CHANGE FREQUENTLY.
                                ACCORDINGLY, N4D RESERVES THE RIGHT TO MAKE CHANGES TO THIS AGREEMENT AT ANY TIME. YOUR CONTINUED USE OF
                                THE SITE AND SERVICES CONSTITUTES ASSENT TO ANY NEW PROVISION OF THIS AGREEMENT THAT MAY BE POSTED ON
                                THE WEB SITE.
    
                                You must be at least eighteen (18) years of age to register with the Site or use the Site. By using the
                                Site, you represent and warrant that you have the right, authority and capacity to enter into this
                                Agreement and to abide by all of the terms and conditions of this Agreement.
    
                                This Agreement will remain in full force and effect while you use the Site and/or are registered with
                                the Site.
    
                                Representations and Warranties.
                                Each party represents and warrants to the other party: (i)that it has the full power and authority to
                                enter into and perform its obligations under this Agreement; (ii)the assent to and performance by it of
                                its obligations under this Agreement do not constitute a breach of or conflict with any other agreement
                                or arrangement by which it is bound, or any applicable laws, regulations or rules; and (iii)this
                                Agreement contains legal, valid and binding obligations of the parties executing or assenting to this
                                Agreement, enforceable in accordance with its terms and conditions.
                                You represent and warrant to N4D that: (i)you will not infringe the patent, copyright, trademark, trade
                                secret, right of publicity or other right of any third party in your use of the Site and (ii)you will
                                comply with all applicable laws, rules and regulations in your use of the Site.
    
                                Prohibited Conduct
                                In your use of the Site, you may not: (i)infringe any patent, trademark, trade secret, copyright, right
                                of publicity or other right of any party; (ii)disrupt or interfere with the security or use of the Site
                                or any web sites linked to the Site; (iii)interfere with or damage the Site, including, without
                                limitation, through the use of viruses, cancel bots, Trojan horses, harmful code, flood pings, denial of
                                service attacks, packet or IP spoofing, forged routing or electronic mail address information, or
                                similar methods or technology; (iv)attempt to use another’s user name or password, impersonate another
                                person or entity, misrepresent your affiliation with a person or entity, including without limitation
                                N4D, or use a false identity; (v)attempt to obtain unauthorized access to the Site or portions of the
                                Site that are restricted from general access; (vi)engage, directly or indirectly, in transmission of
                                “spam,” chain letters, junk mail or any other type of unsolicited solicitation; (vii)collect, manually
                                or through an automatic process, information about other users without their express consent or other
                                information relating to the Site; (viii)submit false or misleading information to N4D; (ix)engage in any
                                activity that interferes with any third party’s ability to use or enjoy the Site; or (x)assist any third
                                party in engaging in any activity prohibited by this Agreement.
    
                                Privacy Policy
                                You agree to the terms of N4D’s Privacy Policy, which is incorporated by reference into this Agreement.
    
                                Intellectual Property
                                All materials on the Site, including without limitation, the N4D logo, design, text, graphics, other
                                files, and the selection and arrangement thereof are either owned by N4D or are the property of N4D’s
                                suppliers or licensors. You may not use such materials without permission.
    
                                NOT4DATING™ and the NOT4DATING logo™ are trademarks owned by N4D. Page headers, custom graphics, button
                                icons and scripts are trademarks or trade dress of N4D. You may not use any of these trademarks, trade
                                dress, or trade names without express permission of N4D. N4D will retain ownership of its intellectual
                                property rights and you may not obtain any rights therein by virtue of this Agreement or otherwise.
    
                                You will have no right to use, copy, display, perform, create derivative works from, distribute, have
                                distributed, transmit or sublicense from materials or content available on the Site. You may not use any
                                third-party intellectual property without the express written permission of the applicable third party,
                                except as permitted by law.
    
                                Content Posted by You
                                You will not post on the Site or transmit to N4D members, any obscene, abusive, harassing or illegal
                                material or any material that infringes or violates another party’s rights. You will not provide
                                misleading or false information to N4D or to other members. N4D may review and delete any content which,
                                in N4D’s sole discretion, violates this Agreement or which might be offensive, illegal, or that might
                                violate the rights or threaten the safety of other members. By posting information on the Site, you
                                automatically grant to N4D an irrevocable, perpetual, non-exclusive, royalty-free, worldwide license to
                                use the information and prepare derivative works thereof, and to grant and authorize sublicenses of the
                                foregoing.
    
                                Linking and Framing
                                You may not deep link to password-protected portions of the Site; or frame, inline link, or similarly
                                display any N4D content or property, including, without limitation, the Site.
    
                                Confidentiality
                                You may obtain information that is confidential and proprietary to N4D. Such information (“Confidential
                                Information”) may include, without limitation, consumer information, product information, marketing
                                information, and confidential communications from N4D. You shall keep all Confidential Information
                                confidential and not disclose it to any third party. Further, you shall not use the Confidential
                                Information for any purposes.
    
                                Indemnification
                                You agree to hold N4D and its employees, representatives, agents, attorneys, affiliates, directors,
                                employees, officers, managers and shareholders (the “Indemnified Parties”) harmless from any damage,
                                loss, cost or expense (including without limitation, attorneys’ fees and costs) incurred in connection
                                with any third-party claim, demand or action (“Claim”) brought or asserted against any of the
                                Indemnified Parties: (i)alleging facts or circumstances that would constitute a breach of any provision
                                of this Agreement by you or (ii)arising from, related to, or connected with your use of the Site. If you
                                are obligated to provide indemnification pursuant to this provision, N4D may, in its sole and absolute
                                discretion, control the disposition of any Claim at your sole cost and expense. Without limitation of
                                the foregoing, you may not settle, compromise or in any other manner dispose of any Claim without the
                                consent of N4D.
    
                                Disclaimers, Exclusions and Limitations
                                N4D PROVIDES THE ON AN “AS IS” AND “AS AVAILABLE” BASIS. N4D DOES NOT REPRESENT OR WARRANT THAT THE
                                SITE, ITS USE, OR ANY INFORMATION THEREFROM: (I)WILL BE UNINTERRUPTED, (II)WILL BE FREE OF DEFECTS,
                                INACCURACIES OR ERRORS, (III)WILL MEET YOUR REQUIREMENTS, OR (IV) WILL OPERATE IN THE CONFIGURATION OR
                                WITH OTHER HARDWARE OR SOFTWARE YOU USE.
                                N4D DOES NOT SCREEN ITS MEMBERS, CONDUCT BACKGROUND CHECKS ON ITS MEMBERS, OR CONFIRM THE ACCURACY OF
                                THE STATEMENTS OF ITS MEMBERS. N4D MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE CONDUCT OF
                                MEMBERS. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL INTERACTIONS WITH OTHER N4D MEMBERS
    
                                N4D MAKES NO WARRANTIES OTHER THAN THOSE MADE EXPRESSLY IN THIS AGREEMENT, AND HEREBY DISCLAIMS ANY AND
                                ALL IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE,
                                MERCHANTABILITY AND NON-INFRINGEMENT.
                                N4DWILL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, PUNITIVE OR
                                SPECIAL DAMAGES (INCLUDING DAMAGES RELATING TO LOST PROFITS, LOST DATA OR LOSS OF GOODWILL) ARISING OUT
                                OF, RELATING TO OR CONNECTED WITH THE USE OF THE SITE, BASED ON ANY CAUSE OF ACTION, EVEN IF ADVISED OF
                                THE POSSIBILITY OF SUCH DAMAGES.
    
                                Limitation of Liability
                                EXCEPT FOR A BREACH OF A PARTY’S REPRESENTATIONS AND WARRANTIES OR IN CONNECTION WITH YOUR INDEMNITY
                                OBLIGATIONS UNDER THIS AGREEMENT, IN NO EVENT WILL THE LIABILITY OF EITHER PARTY IN CONNECTION WITH THIS
                                AGREEMENT OR THE SITE EXCEED $100.
    
                                Force Majeure
                                N4D will not be liable for failing to perform under this Agreement by the occurrence of any event beyond
                                its reasonable control, including, without limitation, a labor disturbance, an Internet outage or
                                interruption of service, a communications outage, failure by a service provider to N4D to perform, fire,
                                terrorism, natural disaster or war.
    
                                Arbitration
                                All disputes arising out of or relating to this Agreement (including its formation, performance or
                                alleged breach) or your use of the Site will be exclusively resolved under confidential binding
                                arbitration held in New York, New York before and in accordance with the Rules of the American
                                Arbitration Association. The arbitrator’s award will be binding and may be entered as a judgment in any
                                court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under
                                this Agreement will be joined to an arbitration involving any other party subject to this Agreement,
                                whether through class arbitration proceedings or otherwise. Notwithstanding the foregoing, N4D will have
                                the right to seek injunctive or other equitable relief in state or federal court located in New York,
                                New York to enforce this Agreement or prevent an infringement of a third party’s rights. In the event
                                equitable relief is sought, each party hereby irrevocably submits to the personal jurisdiction of such
                                court.
    
                                Waiver of Class Action Rights
                                By entering into this Agreement, you hereby irrevocably waive any right you may have to join claims with
                                those of others in the form of a class action or similar procedural device. Any claims arising out of,
                                relating to, or connected with this Agreement must be asserted individually.
    
                                Limitation of Actions
                                You acknowledge and agree that, regardless of any statute or law to the contrary, any claim or cause of
                                action you may have arising out of, relating to, or connected with your use of the Site must be filed
                                within one calendar year after such claim or cause of action arises, or forever be barred.
    
                                Changes to the Web Site or Service
                                N4D may, in its sole discretion, change, modify, suspend, make improvements to or discontinue any aspect
                                of the Site, temporarily or permanently, at any time without notice to you, and N4D will not be liable
                                for doing so. Without limiting the foregoing, and notwithstanding anything contained in this Agreement,
                                N4D will have the right from time to time to change the amount of the fees or institute new fees
                                relating to the Site. Further, N4D may impose limits on the amount of storage space for members, or
                                delete materials: (i)stored for an excessive period of time; (ii)that are out-of-date; or (iii)relating
                                to an inactive member account.
    
                                Termination
                                N4D will have the right to terminate your account or your access to the Web Site if it reasonably
                                believes you have breached any of the terms and conditions of this Agreement or N4D discontinues the
                                Site.
    
                                Effect of Termination
                                If your account is terminated, N4D may delete any web sites, files, graphics or other content or
                                materials relating to your use of the Site on N4D’s servers or otherwise in its possession and N4D will
                                have no liability to you or any third party for doing so. Following termination, you will not be
                                permitted to use the Site. If your account or your access to the Site is terminated, N4D reserves the
                                right to exercise whatever means it deems necessary to prevent unauthorized access to the Site,
                                including, but not limited to, technological barriers, IP mapping, and direct contact with your Internet
                                Service Provider.
    
                                Survival
                                This Agreement will survive indefinitely unless and until N4D chooses to terminate it, regardless of
                                whether any account you open is terminated by you or N4D or if you have the right to access or use the
                                Site.
    
                                This Agreement contain the entire understanding of the you and N4D regarding you and N4D regarding the
                                use of the Site, and supersedes all prior and contemporaneous agreements and understandings between you
                                and N4D regarding the use of the Site.
    
                                Notices and Electronic Communications
                                All notices required or permitted to be given under this Agreement will be in writing and delivered to
                                the other party by any of the following methods: (i)hand delivery, (ii)certified U.S. mail, return
                                receipt requested, postage prepaid, (iii)overnight courier, or (iv)electronic mail. If you give notice
                                to N4D, you must use the address shown on the Site. If N4D provides notice to you, it will use the
                                contact information provided by you to N4D. All notices will be deemed received and effective as
                                follows: (i)if by hand-delivery, on the date of delivery, (ii)if by delivery by U.S. mail, on the date
                                of receipt appearing on a return receipt card, (iii)if by overnight courier, on the date receipt is
                                confirmed by such courier service, or (iv)if by electronic mail, 24 hours after the message was sent, if
                                no “system error” or other notice of non-delivery is generated. Each party agrees that any notice that
                                it receives from the other party electronically satisfies any legal requirement that such communications
                                be in writing.
                             </Text>
                             <View style={{marginTop:20}}>
                             <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleReadMore} />
                             </View>
                             </View>
                             </ScrollView>
                            </Overlay>
    
    
                        </SafeAreaView>
    
                    </View>
                </ScrollView>
            )
    
    
    
        }
    }
    
    
    
    const FifthRoute = (props) => {
    
    
        const [enterEmail, setEnterEmail] = useState()
        const [ConfirmEmail, setConfirmEmail] = useState()
        const [errorsOverLay, seterrorsOverLay] = useState(false);
        const [successOverLay, setsuccessOverLay] = useState(false);
        const [message, setMessage] = useState()
        const [spinner, setspinner] = useState(false)
        const [imageUrls, setImageUrls] = useState()
            let [fontsLoaded] = useFonts({
            Cairo_700Bold,
            Montserrat_200ExtraLight,
            Montserrat_400Regular
        });
        

        const successOverlay = () => {
            setsuccessOverLay(!successOverLay);
            props.props.navigation.navigate('Home')
        };
        const togglesOverlay = () => {
            seterrorsOverLay(!errorsOverLay);
        };
    
        useEffect(() => {
          if(fifthItems != null)
          {
            setEnterEmail(fifthItems.enterEmail)
            setConfirmEmail(fifthItems.ConfirmEmail)
          }
        }, [])
    

        const submitDetails = () => {
            setspinner(true)
            if(enterEmail == null && ConfirmEmail == null)
            {
                setspinner(false)
                togglesOverlay()
                setMessage("Please Enter Email")
            }
            else if (enterEmail != ConfirmEmail)
            {
                setspinner(false)
                togglesOverlay()
                setMessage("Email and confirm email should be same")
            }
            else
            {
             
                setspinner(true)
            let ts = Math.round(new Date().getTime() / 1000);
            
            var d = new Date();
            var n = d.getTimezoneOffset();
            Http.post("user/register", {
                name: firstItems.userName,
                mail: enterEmail,
                conf_mail: ConfirmEmail,
                timezone: ts,
                login: ts,
                access: ts,
    
                field_consider_myself_: {
                    und: secondsItems.consider
                },
                field_first_name: {
                    und: [
                        {
                            value: firstItems.userFirstName,
                        },
                    ],
                },
                field_last_name: {
                    und: [
                        {
                            value: firstItems.userLastName
                        },
                    ],
                },
                field_zip_code: {
                    und: [
                        {
                            postal_code: fourthItems.Postalcode,
                            country: fourthItems.CountryValue,
                        },
                    ],
                },
                field_birth_date: {
                    und: [{
                    value:firstItems.date + ts,
    
                    },
                    ]
                    },
    
                field_gender: {
                    und: secondsItems.Gender,
                },
    
                field_activities_interests: {
                    und: fourthItems.Activity,
                },
                field_look_meet: {
                    und: secondsItems.meet,
                },
                picture_upload: thirdItems,
    
                picture: thirdItems,
    
                field_user_avatar: {
                    und: [thirdItems],
                },
    
                field_want_contarct: {
                    und: secondsItems.Contract,
                },
            }).then((response) => {
    
                if (response.status == 200) {
                    successOverlay()
                    setspinner(false)
                    
                }
             
    
            }).catch((error) => {
    
                    if (error.response.status) {
                        console.log(error.response.data.form_errors);
                        console.log(error.response.data);
                        setspinner(false)
                        togglesOverlay()
                        setMessage("Username is already taken/Email is already taken")
                    }
    
    
                })

             }
    
    
    
    
        }
       
        const prevRoute = () =>{
            const Emails = {enterEmail:enterEmail,ConfirmEmail:ConfirmEmail}
            setfifthItems(Emails)
            setFifthItem(false)
            setFourthItem(true)
        }

    
    
    
    
    
    
    
    
    
    
    
        if (!fontsLoaded) {
            return (<AppLoading />)
        }
        else {
    
    
    
            return (
                <ScrollView >
                <SafeAreaView style={{ backgroundColor: "white", paddingHorizontal: 20,flex:1,justifyContent:"center",height:"100%"}}>

                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20 }}>
                        <Progress.Bar progress={1} unfilledColor="white" color="#056AAD" animationType="spring" width={317} borderColor="white" height={20} borderRadius={10} />
                    </View>
    
                    <Spinner
                        visible={spinner}
                        textContent={'Creating Account...'}
                        textStyle={styles.spinnerTextStyle}
                        overlayColor={"#000000c4"}
                        
                    />
    
                    <View style={{justifyContent:"space-between",flex:2,backgroundColor: "white",height:"100%"}}>
                    <View >
                        <View style={styles.FieldContainer}>
    
                            <TextInput
                                style={styles.TextInput}
                                onChangeText={text => setEnterEmail(text)}
                                value={enterEmail}
                                labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                placeholder="Enter email address"
                            />
                        </View>
                        <View style={styles.FieldContainer}>
    
                            <TextInput
                                style={styles.TextInput}
                                onChangeText={text => setConfirmEmail(text)}
                                value={ConfirmEmail}
                                labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                                placeholder="Confirm email address"
                            />
                        </View>

                        <View style={styles.mainContainerPicker}>
                            <Button
    
                                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                                title="Continue"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                onPress={submitDetails}
                            />
                        </View>
    
                        <View style={styles.mainContainerPicker}>
                            <Button
                                containerStyle={{ marginVertical: 10 }}
                                buttonStyle={{ fontFamily: "roboto-bold" }}
                                buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10, marginHorizontal: 10, marginVertical: 10 }}
                                title="Previous"
                                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                                onPress={prevRoute}
                            />
                        </View>
                    </View>
                    </View>
                    <Overlay isVisible={errorsOverLay} onBackdropPress={togglesOverlay}>
                            <>
                                <Text style={styles.errorText}>{message}</Text>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={togglesOverlay} />
                                    </View>
                                </View>
                            </>
                        </Overlay>

                        <Overlay isVisible={successOverLay} onBackdropPress={successOverlay}>
                            <>
                                <Text style={styles.errorText}>Account Created Successfully, Please verify your mail</Text>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={successOverlay} />
                                    </View>
                                </View>
                            </>
                        </Overlay>
                        </SafeAreaView>
                </ScrollView>
              
            )
        }
    }


    return (
        <View style={{ flex: 1 }}>
        {firstItem?(
        <FirstRoute/>
        ):null}

        {secondItem?(
            <SecondRoute/>
        ):null}

{thirdItem ?(
    <ThirdRoute/>
):null}
{fourthItem ?(
    <FourthRoute/>
):null}

{fifthItem ?(
<FifthRoute props={props}/>

):null}

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
        marginHorizontal: 15,
        marginVertical: 5,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: "black"
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
        fontFamily: 'Montserrat_400Regular',
    },
    lowerTextfield: {

        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Montserrat_200ExtraLight'

    },
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat_200ExtraLight'
    },

    labelTextTextarea: {
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
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
        overflow: "hidden"

    },
    overflowContainerText:
    {
        marginHorizontal: 5,
        textAlign: "justify",
        marginVertical: 10,
        fontFamily: 'Montserrat_400Regular',
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
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat_200ExtraLight',
        borderRadius: 5,

    },
    FieldContainer: {
        marginVertical: 10,

    },
    DropDown: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 5,
        zIndex: 1,
        backgroundColor: '#fff'


    },
    dropDownActive: {
        // fontFamily: 'Montserrat_200ExtraLight'
    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat_200ExtraLight'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_200ExtraLight'
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
    datePickerStyle: {

        marginLeft: 10,
        width: "95%",
        borderWidth: 1,
        borderRadius: 5


    },
    notifyText: {
        fontFamily: "Cairo_700Bold",
        fontSize: 14,
        color: "grey",
        marginHorizontal: 10
    },
    CheckboxContainer: {
        flexDirection: "row",
        marginVertical: 10
    },
    ImageTopHeadingText: {
        fontSize: 20,
        fontFamily: 'Montserrat_200ExtraLight',
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    imageUploadButtonText: {
        fontSize: 20,
        fontFamily: 'Montserrat_200ExtraLight',
        backgroundColor: "#DFF4F5",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"


    },
    imageUploadButton: {
        fontSize: 20,
        fontFamily: 'Montserrat_200ExtraLight',
        backgroundColor: "#DFF4F5",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    DropDown: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        height: 40
    },
    MultiDropDown: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        position: "relative",
        zIndex: 30,
        height: 40

    },
    dropDownActive: {
        fontFamily: 'Montserrat_200ExtraLight'
    },
    errorText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        textAlign: "center"
    },
    androidDropDown: { borderWidth: 1, marginHorizontal: 10, borderRadius: 5 },
    androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 },
    SpacingSide: {
        paddingHorizontal: 15,
        backgroundColor: "white"
    },
    successButton:
    {
        backgroundColor: "#056AAD",
        borderRadius: 5
    },
    Image: {
        height: 50,
        width: 50
    },
    Iconcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        marginHorizontal: 20
    },
    spinnerTextStyle: {
        color: "white"
    },
    TextReadMore: {
        textAlign: "right",
        fontFamily: "Cairo_700Bold",
        paddingRight: 15,
        fontSize: 16
    },
    ReadMoreText:{
        fontSize:15,
        fontFamily: 'Montserrat_400Regular',
        paddingHorizontal:10,
        textAlign:"justify"

    },
    PrivacyHeading:{
        textAlign:"center",
        fontFamily: "Cairo_700Bold",
        fontSize:16,
        paddingVertical:10
    },
    MainContainerReadmore:{
        marginVertical:20
    },
    EmailText:{
        color:"#056AAD",
        textDecorationLine:"underline"
    }

});




export default SignUp