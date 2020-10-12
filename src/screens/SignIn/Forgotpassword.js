import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform ,TextInput} from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';


const Forgotpassword = () => {
    const [user, setUser] = useState('')
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])

    return (

        <View style={styles.mainContainer} >


            <View style={styles.secondmainContainer}>
                <Text style={styles.TextContainer}>Reset with Email or Username</Text>
                <TextInput
     placeholder='User Name/Email' value={user} onChangeText={newValue => setUser(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4,marginHorizontal:10,marginVertical:10 }}
    />

                <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
            
                <Button
                            containerStyle={{ marginHorizontal: 10,  marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
            
            </View>
         


        </View>


    )





}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:"white"
    },
    secondmainContainer: {
        flex: 2,
        justifyContent:"center"
    },
    TextContainer:{
        textAlign:"center",
        fontFamily:"Cairo-Bold",
        fontSize:20
    }

});

export default Forgotpassword

