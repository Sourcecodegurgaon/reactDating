import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';




const SignIn = props => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [searchPostcode, setserachPostocde] = useState([])

    const [spinner ,setspinner] = useState(false)
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if(LogoutToken != null)
            {
              props.navigation.navigate('FindFriends')
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
            axios.post('https://gowebtutorial.com/api/json/user/login', { username: user, password: pass }, {
                headers: {'Accept': 'application/json','Content-Type': 'application/json'}
               }).then((response) => {
                setspinner(false) 
               AsyncStorage.setItem('Token',JSON.stringify(response))
               AsyncStorage.getItem('Token', (err, result) => {
                const LogoutToken = JSON.parse(result)
               
                //Connect Api
                axios.post('http://gowebtutorial.com/api/json/system/connect', {}, {
                    headers: {'Accept': 'application/json','Content-Type': 'application/json','X-Cookie' : LogoutToken.data.sessid + "=" + LogoutToken.data.session_name ,'X-CSRF-Token' :LogoutToken.data.token}
                   }).then((response)=>{
                   
                    AsyncStorage.setItem('Connected',JSON.stringify(response))
           
                        props.navigation.navigate('FindFriends')
                   })

              });
            }).catch(function (error) {    
           
                    alert(error.response.data);
        
                
                // console.log(error.response.status);
                // console.log(error.response.headers);
            });

  
    }




    return (
        <View style={styles.mainContainer}>
            <Spinner
          visible={spinner}
          textContent={'Signing...'}
          textStyle={styles.spinnerTextStyle}
        />

            <View style={styles.secondMainCotainer}>

                <Text style={styles.TextContainer}>Login with Username</Text>

                <Input placeholder='Username' value={user} onChangeText={newValue => setUser(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                <Input placeholder="Password" value={pass} onChangeText={newValues => setPass(newValues)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                <Text style={styles.forgotPasswprdText} onPress={() => props.navigation.navigate('Forgotpassword')}>Forgot password ?</Text>

                <View >
                    <Button title="Sign In" onPress={Login}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10,  fontFamily: 'Cairo-Bold' }}
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
    forgotPasswprdText: {
        textAlign: "right",
        marginHorizontal: 20, fontSize: 15, fontFamily: 'Cairo-Bold'
    },
    TextContainer: {
        textAlign: "center",
        fontFamily: "Cairo-Bold",
        fontSize: 20
    },
    spinnerTextStyle: {
        color: 'black'
      },


})
export default SignIn