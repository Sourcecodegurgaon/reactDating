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
import Spinner from 'react-native-loading-spinner-overlay';
import { Value } from "react-native-reanimated";


const Toutorial = (props) => {
  console.log(Dimensions.get('window').height)
  console.log(Dimensions.get('window').width)

  const [imageOne,setImageOne]= useState(true)
  const [imageTwo,setImageTwo]= useState(false)
  const [imageThree,setImageThree]= useState(false)

    useEffect(() => {
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if (LogoutToken != null) {

                if(LogoutToken.data.user.field_tutorial.length == 0 || LogoutToken.data.user.field_tutorial.length == undefined)
                {
                  props.navigation.navigate('Toutorial')
                }
                else
                {
                    props.navigation.navigate('Tabs')
                }

            }
        })
        const win = Dimensions.get('window');
        const ratio = win.width/541; 
    }, [])



     const changeImageTwo = () =>{
       console.log("check")
      setImageOne(false)
      setImageTwo(true)
     }

     const changeImageThree = () =>{
  
     setImageOne(false)
     setImageTwo(false)
     setImageThree(true)
    
    }

    const GotoTabs = () =>{

        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if (LogoutToken != null) {

                Http.put('user/' + LogoutToken.data.user.uid, {
                    field_tutorial:{
                        und:[{
                            value: "true"
                        }
                        ]
                    }
                
                },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } },

                
                
                
                
                ).then((response) => {
                 console.log(response)


                }).catch(function (error) {
                    console.log(error.response)
                })


            }
        })
        const win = Dimensions.get('window');
        const ratio = win.width/541; 
        props.navigation.navigate('Tabs')
    }

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
 
{imageOne?(
    <TouchableOpacity onPress={changeImageTwo}>
<ImageBackground source={require('../../../assets/Images/tutorial.jpg')} style={{height:"100%",width:"100%",marginTop:12}}resizeMode='contain'>
    </ImageBackground>
    </TouchableOpacity>
):null}

{imageTwo?(
    <TouchableOpacity  onPress={changeImageThree}>
    <ImageBackground source={require('../../../assets/Images/tutorial2.jpg')} style={{height:"100%",width:"100%",marginTop:12}} resizeMode='contain'>
    </ImageBackground>
    </TouchableOpacity>
):null}
{imageThree ?(
    <TouchableOpacity onPress={GotoTabs}>
    <ImageBackground source={require('../../../assets/Images/tutorial3.jpg')} style={{height:"100%",width:"100%",marginTop:12}} resizeMode='contain'>
    </ImageBackground>
    </TouchableOpacity>
    ):null}
</View> 


           








   
    )




}
}
const styles = StyleSheet.create({

   
    ImagesTotutrialcontainer:{

    flex:1,
    justifyContent:"center",
    alignContent:"center"
      

    },

     
      

});

export default Toutorial 