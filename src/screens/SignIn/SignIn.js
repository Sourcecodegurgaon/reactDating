import React from 'react';
import { Text, StyleSheet, View } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import { useState } from "react";
import axios from 'axios';

const SignIn = () => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')


    const Login = async () => {
        fetch('https://gowebtutorial.com/api/json/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": ""
            },
            body: JSON.stringify({
                "username": user, "password": pass
            })
        }).then((response) => response.json())
            .then((res) => {
                if (typeof (res.message) != "undefined") {
                    alert("Error", "Error: " + res.message);
                }
                else {
                    console.log(res)
                    alert("Welcome" + " You have succesfully logged in");
                }
            }).catch((error) => {
                console.error(error);
            });
    }



    return (
        <View style={styles.mainContainer}>
            <Navigationbar />


            <View style={styles.secondMainCotainer}>


                <Input placeholder='Username' value={user} onChangeText={newValue => setUser(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                <Input placeholder="Password" value={pass} onChangeText={newValues => setPass(newValues)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />


                <View >
                    <Button title="Sign In" onPress={Login}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        containerStyle={{width:"100%"}} />
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
    }


})
export default SignIn