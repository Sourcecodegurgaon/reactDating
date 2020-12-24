import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView ,TouchableOpacity,Image,ImageBackground} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Moment from 'moment';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
import { Dimensions } from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'


const Toutorial = (props) => {
  console.log(Dimensions.get('window').height)
  console.log(Dimensions.get('window').width)

    useEffect(() => {
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if (LogoutToken != null) {

                Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                  console.log(LogoutToken.data.user.field_tutorial.length)
                })


            }
        })
        const win = Dimensions.get('window');
        const ratio = win.width/541; 
    }, [])
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
      if(!fontsLoaded)
      {
        return(<AppLoading />)
      }
      else{
     
     
    return (


<View style={styles.ImagesTotutrialcontainer}>
<ImageBackground source={require('../../../assets/Images/tutorial.jpg')} style={{width: Dimensions.get('window').width,
        height: 800 * Dimensions.get('window').width/375}} resizeMode='cover'>
    </ImageBackground>

</View>


           








   
    )




}
}
const styles = StyleSheet.create({

   
    ImagesTotutrialcontainer:{

      flex:1,
      

    },

     
      

});

export default Toutorial 