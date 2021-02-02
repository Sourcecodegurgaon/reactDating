import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView ,TouchableOpacity} from "react-native";
import React, { useState, Component, useEffect,useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Moment from 'moment';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';


const Chats = (props) => {


    useEffect(() => {
        console.log(props)
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
            if (LogoutToken != null) {

                Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
                  console.log(LogoutToken.data.user.field_tutorial.length)
                  if(LogoutToken.data.user.field_tutorial.length != undefined)
                  {
                    //props.navigation.navigation.navigate('Chats')
                    props.navigation.navigation.navigate('Toutorial')
                  }
                  else
                  {
                    props.navigation.navigation.navigate('Chats')

                  }

              
                })


            }
        })
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
        <View style={styles.mainContainer}>




            <View style={styles.secondContainer}>

                <FlatList
                
                    data={props.chatmessage}
                    keyExtractor={item => item.thread_id}
                    refreshing={true}
                    renderItem={({ item }) => {
                        console.log(item)
                        const PictureUrl = "http://gowebtutorial.com/sites/default/files/" + item.picture.filename
                       //Time Stamp to Date
                        var t = new Date();
                        t.setSeconds( item.time );
                        const formatted =  Moment(t).format('DD MMMM')
                        
                        
              
                        return (
                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
   
                                    <TouchableOpacity onPress={() => props.navigation.navigation.navigate('Personalchat',{
                                        threadId:item.thread_id,
                                        Name:item.name,
                                        picture:PictureUrl,
                                        Uid:item.uid
                                    })}>
                                    <View style={styles.mainContainerOutput}>

                                        <View style={styles.Image}>

                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: PictureUrl }}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{ fontFamily: 'Cairo_700Bold' }}>{item.name}</Text>
                                            <Text style={{ fontFamily: 'Montserrat_200ExtraLight', color: 'black', fontSize: 15,width: 100 }} numberOfLines = {1}>{item.subject}</Text>
                                        </View>
                                        <View style={styles.textContainerTime}>
                                            <Text style={{ fontFamily: 'Cairo_700Bold' }}>{formatted}</Text>
                                        </View>

                                    </View>
                                    </TouchableOpacity>
         
                            </SafeAreaView>

                        )

                    }}
                />


            </View>








        </View>

    )




}
}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    },


    container: {

        marginBottom: 10,
        backgroundColor: "white"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold'
    },
    secondContainer: {
        flex: 2,
        marginHorizontal: 10,
    },

    mainContainerOutput: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },
    textContainer: {
        marginHorizontal: 10
    },
    tinyLogo: {
        width: 60, height: 60, borderRadius: 40
    },
    textContainerTime: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1
    },
    ImagesTotutrialcontainer:{
position:"absolute",
top:0,
zIndex:100,
right:0,
left:0,
bottom:0
    },
    ImageProfile:{
        height:"100%",
        position:"absolute",
        top:0,
zIndex:200,
right:0,
left:0,
bottom:0
    }

});

export default Chats 