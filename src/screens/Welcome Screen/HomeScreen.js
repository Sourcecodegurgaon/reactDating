import React ,{useEffect ,useState} from "react";
import { Text, StyleSheet, View } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";

const HomeScreen = props => {

  useEffect(() => {
    font.loadAsync({
        'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
        'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
          });
      },[])


 

  return (

 
    <View style={styles.mainTextContainer}>

      <Navigationbar />

      <View style={styles.mainTextContainerTwo}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.textTwo}>We can help you make platonic connections in your local area.</Text>
        <Text style={styles.textTwo}>First, ONE BIG RULE:{"\n"}

Platonic = we will not help you
find a date or sexual partners. No
judgment if that is your goal, but
kindly save your energy and use another app.</Text>



        <Button 
        onPress ={() => props.navigation.navigate('Postcode')}
          containerStyle={{ marginHorizontal: 15, marginVertical: 15, height:50,   fontFamily:"roboto-bold" ,borderRadius:10 }}
          buttonStyle = {{height:50,   fontFamily:"roboto-bold" }}
          title="Sounds Cool! Who can I meet"
          titleStyle={{fontFamily:'Cairo-Bold',fontSize:20}}
        />
        <Button 
        onPress ={() => props.navigation.navigate('SignUp')}
          buttonStyle={{ backgroundColor: "green",textAlign:"center",height:50,borderRadius:10  }}
              containerStyle={{ marginHorizontal: 15, marginVertical: 15}}
              titleStyle={{fontFamily:'Cairo-Bold',fontSize:20}}
          title="Awesome! Sign me up!"
        />

        <Text style={styles.textThree }  onPress ={() => props.navigation.navigate('SignIn')}>I am already a member</Text>
      </View>
    </View>

  )

};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginVertical: 10,
    marginHorizontal: 15,
    fontFamily: 'Montserrat-ExtraLight'

    

  },
  textTwo: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 19,
    fontFamily: 'Montserrat-ExtraLight'


  },
  textThree: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    color: "green",
    fontSize: 20,
    fontFamily:'Cairo-Bold'

  },
  mainTextContainer: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor:"white"
  },
  mainTextContainerTwo: {
    justifyContent: "center",
    flex: 2
  }
});

export default HomeScreen;


