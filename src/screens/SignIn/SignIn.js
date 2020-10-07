import React, { useState,useEffect } from 'react';
import { Text, StyleSheet, View } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';

const SignIn = props => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [searchPostcode, setserachPostocde] = useState([])
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])

    const Loginh = async () => {
        await fetch('https://gowebtutorial.com/api/json/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user, password: pass })
        }).then((response) => response.json())
            .then(async (response) => {
                console.log("LoggedIN" + "  " + response)
            })

    }



    const LoginNew = () => {
        //axios.post('http://127.0.0.1:8000/api/login', payload) .then((response) => {}
        console.log("1. Hello before axios.post" + user + pass);
        //axios.post('http://127.0.0.1:8000/api/login', payload)
        axios.post('https://gowebtutorial.com/api/json/user/login', { username: user, password: pass })
            .then((response) => {
                console.log("New User" + response.data);
                console.log("2. Inside axios response");

                if (response.data.code == 200) {
                    //Set localstorage:
                    // const userDetails = { username: "RitinN" }
                    // localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    console.log("Login successfull");
                    return

                }
                else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert(response.data.success)
                }
                else if (response.data.code == 401) {
                    console.log("New User" + response);
                    alert(response.data.success)
                    console.log(response.data);

                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {

                console.log("The error is : " + error);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            });



    }



    const logOut = async () => {
        console.log("Hello" + searchPostcode)
        const responses = await fetch('https://gowebtutorial.com/api/json/user/logout', {}, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': "jm0vVJd2zaWV1n4McIuQYur7GflKlpmf0YKvIr8SVc8" }
        }).then((responses) => responses.json()).then((responses) => {
            console.log(responses)
        })



    }














    return (
        <View style={styles.mainContainer}>
            <Navigationbar />


            <View style={styles.secondMainCotainer}>

            <Text style={styles.TextContainer}>Login with Username</Text>

                <Input placeholder='Username' value={user} onChangeText={newValue => setUser(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                <Input placeholder="Password" value={pass} onChangeText={newValues => setPass(newValues)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                <Text style={styles.forgotPasswprdText} onPress ={() => props.navigation.navigate('Forgotpassword')}>Forgot password ?</Text>

                <View >
                    <Button title="Sign In" onPress={Loginh}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        containerStyle={{ width: "100%" }} />



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
    forgotPasswprdText:{
        textAlign:"right",
        marginHorizontal:20,fontSize:15,fontFamily: 'Cairo-Bold'
    },
    TextContainer:{
        textAlign:"center",
        fontFamily:"Cairo-Bold",
        fontSize:20
    }


})
export default SignIn