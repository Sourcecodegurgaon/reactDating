import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = props => {
  const [spinner, setspinner] = useState(false)
  let [fontsLoaded] = useFonts({
    Cairo_700Bold,
    Montserrat_200ExtraLight
  });
 
  useEffect(() => {

    AsyncStorage.getItem('Token', (err, result) => {
      const UserDetail = JSON.parse(result)
      console.log(UserDetail)
      if (UserDetail != null) {
        setspinner(true)
        Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {

          if (response.data.field_already_declared.und == undefined) {
            setspinner(false)
            props.navigation.navigate('Tophobbies')
          }
          else {
            setspinner(false)
            props.navigation.navigate('FindFriends')
          }
        })
      }
    })

  }, [])


  if (!fontsLoaded) {
    return (<AppLoading />)
  }
  else {

    return (


      <View style={styles.mainTextContainer}>
 <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c4"}
                />


        <View style={styles.mainTextContainerTwo}>
          <Text style={styles.text}>Welcome!</Text>
          <Text style={styles.textTwo}>We can help you make platonic connections in your local area.</Text>
          <Text style={styles.textTwo}>First, ONE BIG RULE:{"\n"}

          Platonic = we will not help you
           find a date or sexual partners. No
           judgment if that is your goal, but
            kindly save your energy and use another app.</Text>




        </View>

        <View style={styles.buttoncontainer}>
          <Button
            onPress={() => props.navigation.navigate('Postcode')}
            containerStyle={{ marginHorizontal: 15, marginVertical: 15, borderRadius: 10, }}
            buttonStyle={{ fontFamily: 'Cairo_700Bold' }}
            title="Sounds Cool! Who can I meet"
            titleStyle={{ fontSize: 18, fontFamily: 'Cairo_700Bold' }}
          />
          <Button
            onPress={() => props.navigation.navigate('SignUp')}
            buttonStyle={{ backgroundColor: "green", textAlign: "center", borderRadius: 10, }}
            containerStyle={{ marginHorizontal: 15, marginVertical: 15, }}
            titleStyle={{ fontSize: 18, fontFamily: 'Cairo_700Bold' }}
            title="Awesome! Sign me up!"
          />

          <Text style={styles.textThree} onPress={() => props.navigation.navigate('SignIn')}>I am already a member</Text>
        </View>

      </View>

    )

  };

}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginHorizontal: 15,
    fontFamily: "Montserrat_200ExtraLight",
     color:"#000000"



  },
  textTwo: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 19,
    fontFamily: "Montserrat_200ExtraLight",
    color:"#000000"


  },
  textThree: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    color: "green",
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
    


  },
  mainTextContainer: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal:15
  },
  spinnerTextStyle:{
    color:"white"
  }

});


export default HomeScreen;


