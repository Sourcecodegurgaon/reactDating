import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView ,TouchableOpacity} from "react-native";

import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import { TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_400Regular} from '@expo-google-fonts/montserrat';
const NewChat = props => {
    const [enterSubject, setSubject] = useState("hello")
    const [Message, setMessage] = useState()
          //Spinner
          const [spinner ,setspinner] = useState(false)



    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular
      });
    
    useEffect(() => {
console.log(props.navigation)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
            }
        })
    }, [])

    const sendMessage = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            Http.post('privatemsg/',{
                recipients: props.navigation.state.params.Name,
                subject:enterSubject,
                body:Message
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
                const userSendMessages = responses.data.messages;
                setspinner(false)
                props.navigation.navigate("Tabs")
            })
        })
    }

    const ClickMessageOne = () =>{
       setMessage("Hello! What are you currently reading or listening to?")
  
    }
    const ClickMessageTwo = () =>{
        setMessage("Hey there! What is one thing that always makes you laugh or puts a smile on your face?")
   
     }
     const ClickMessageThree = () =>{
        setMessage("Hiyah! What is one thing you are looking forward to in the next few months and wouldn’t miss for the world")
   
     }

     const ClickMessageFour = () =>{
        setMessage("Hi! What did you do on your best day ever?")
   
     }
     const ClickMessageFive = () =>{
        setMessage("Helloooo! What is the best gift you have ever given?")
   
     }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (


        <View style={styles.mainTextContainer}>
                <Spinner
          visible={spinner}
          textContent={'Sending...'}
          textStyle={styles.spinnerTextStyle}
          overlayColor={"#000000c2"}
        />

            <View style={styles.secondmainTextContainer}>

     
                 <ScrollView>
                <View style={styles.Textcontainer}>
    <Text style={styles.newChatHeadingText}>Choose a conversation starter or {"\n"} type your own</Text>
               <TouchableOpacity onPress={ClickMessageOne}>
                <Text style={styles.headingText}>Hello! What are you currently reading or listening to?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ClickMessageTwo}>
                <Text style={styles.headingText}>Hey there! What is one thing that always makes you laugh or puts a smile on your face?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ClickMessageThree}>
                <Text style={styles.headingText}>Hiyah! What is one thing you are looking forward to in the next few months and wouldn’t miss for the world</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ClickMessageFour}>
                <Text style={styles.headingText}>Hi! What did you do on your best day ever? </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ClickMessageFive}>
                <Text style={styles.headingText}>Helloooo! What is the best gift you have ever given?</Text>
                </TouchableOpacity>
                </View>
   
              <View style={styles.FieldArea}>
                <TextInput
                    style={{ height: 50, borderColor: 'black', borderWidth: 1, borderRadius: 5, paddingLeft: 7 ,marginHorizontal:15,paddingRight:7}}
                    onChangeText={text => setMessage(text)}
                    value={Message}
                    placeholder="Write your own message here"
                />

                

                <Button
                    title="Send" 
                    onPress={sendMessage} 
                    buttonStyle={{ backgroundColor: "green",textAlign:"center",borderRadius:10 , }}
                    containerStyle={{ marginHorizontal: 15, marginVertical: 15 ,   }}
                    titleStyle={{fontSize:20,fontFamily: 'Cairo_700Bold' }}
                    />
</View>
</ScrollView>

            </View>
           
        </View>

    )

};
}

const styles = StyleSheet.create({
    FieldContainer: {
        marginVertical: 10,

    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat_400Regular'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_400Regular'
    },
    headingText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
 
        marginVertical: 5,
        paddingHorizontal:15
    },
    mainTextContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"

    },
    secondmainTextContainer: {
     
      
    },
    Textcontainer:{
      marginHorizontal:20,
      marginTop:10
    },
    FieldArea:{
        justifyContent:"center",
        marginHorizontal:20,
        marginVertical:20
    },
    newChatHeadingText:
    {
        fontFamily:"Cairo_700Bold",
        fontSize:18,
      textAlign:"center"
    },
    spinnerTextStyle:{
        color:"white"
    }
});


export default NewChat;


