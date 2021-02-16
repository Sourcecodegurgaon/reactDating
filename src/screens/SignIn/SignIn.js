import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput,ActivityIndicator,Alert } from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight,Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { NativeModules } from 'react-native'
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking'
//var RCTNetworking = require(“RCTNetworking”);
const SignIn = props => {
    const [user, setUser] = useState(null)
    const [pass, setPass] = useState(null)

    // OverLay 
    const [error, setError] = useState("")
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    


    //Spinner
    const [spinner, setspinner] = useState(false)

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
    });


    useEffect(() => {
       
        RCTNetworking.clearCookies(() => { });

        setspinner(false)

        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if (LogoutToken != null) {
                Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                    if (LogoutToken.data.user.field_trial_period_start_date.length == undefined) {
                        becomeCerified()
                    }
                })

            }
        })
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);



    const Login = () => {
        setspinner(true)
        //Login User Api
        axios.post('http://gowebtutorial.com/api/json/user/login', { username: user, password: pass }, {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        }).then((response) => {
            setspinner(false)
            AsyncStorage.setItem('Token', JSON.stringify(response))
             AsyncStorage.getItem('Token', (err, result) => {
              const LogoutToken = JSON.parse(result)
                //Connect Api
                axios.post('http://gowebtutorial.com/api/json/system/connect', {}, {
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token }
                }).then((response) => {
                    if (response.status == 200) {
                        AsyncStorage.setItem('Connected', JSON.stringify(response))
                        Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                       
                            if (response.data.field_trial_period_start_date.length == 0) {
                                setspinner(false)
                                props.navigation.navigate('Becomeverified')
                                
                            }
                            else {
                                becomeCerified()
                                setspinner(false)
                                //props.navigation.navigate('FindFriends')
                            }
                        })
                    }


                })

             });
        }).catch(function (error) {
            setspinner(false)
            if (error.response.status) {
                setspinner(false)
                setVisible(true)
            }
        });

    
    }



    const becomeCerified = () => {
        AsyncStorage.getItem('Token', (err, result) => {
            setspinner(true)
            const LogoutToken = JSON.parse(result)
            if (LogoutToken.data.user.field_trial_period_start_date.length == undefined) {
                var msDiff = new Date().getTime() - new Date(LogoutToken.data.user.field_trial_period_start_date.und[0].value).getTime();    //Future date - current date
            }
            var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          
            if (daysTill30June2035 > 8) {
                setspinner(false)
                props.navigation.navigate('TrialOver')
            }
            else {
                setspinner(false)
                props.navigation.navigate('FindFriends')
            }


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
                    textContent={'Signing...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />

                <View style={styles.secondMainCotainer}>

                    <Text style={styles.TextContainer}>Login with Username</Text>
                    <View style={styles.FieldContainer}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={newValue => setUser(newValue)}
                            value={user}
                            labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholder='Username'
                        />
                    </View>
                    <View style={styles.FieldContainer}>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={newValues => setPass(newValues)}
                            value={pass}
                            labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholder='Password'
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={styles.forgotPasswprdText} onPress={() => props.navigation.navigate('Forgotpassword')}>Forgot password ?</Text>

                    <Button title="Log In" onPress={Login}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                    />
                </View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <>
                        <Text style={styles.errorText}>Wrong username or password</Text>
                        <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                    </>
                </Overlay>


            </View>
        )
    }
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
        paddingHorizontal: 20

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    forgotPasswprdText: {
        textAlign: "right",
        marginHorizontal: 10, fontSize: 15, fontFamily: 'Montserrat_200ExtraLight',
        marginVertical: 5,
        marginTop: -5,
        marginBottom: 10
    },
    TextContainer: {
        textAlign: "center",
        fontFamily: "Cairo_700Bold",
        fontSize: 20
    },
    spinnerTextStyle: {
        color: 'white',
     
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
        fontSize: 16
    },
    TextInput: {
        borderWidth: 1,
        height: 35,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat_200ExtraLight',
        borderRadius: 5
    },
    FieldContainer: {
        marginVertical: 10
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
    buttoncontainerStyle: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    errorText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        textAlign: "center"
    }

})
export default SignIn