import React, { useState, useEffect ,useRef} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView, ScrollView,
    FlatList,
    Keyboard,
    KeyboardAvoidingView
} from "react-native";

import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Http from '../../Api/Http'
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
import { FontAwesome } from '@expo/vector-icons';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";

const Personalchat = (props) => {
    const { navigation } = props;
    const scrollViewRef = useRef();
    const scrollView  = useRef();
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    const [pmtid, setpmtid] = useState()
    const [userId, setUserId] = useState()
    const [userSend, setUserSend] = useState([])
  


    const [spinner,setSpinner] = useState(false)
    const [refresh,setRefresh] = useState(true)
    const [ NewMessage,setNewMessage] = useState()

    const [sendingMessage,setsendingMessage] = useState(true)
    const [postMessage,setpostMessage] = useState(false)
    const scrollRef = useRef();
    useEffect(() => {
    
        getChat()


    }, [])

    const handleClick = number => {
    	scrollRef.current.ScrollTo({
          y: (100 * number),
          animated: true,
    })
}

    const getChat = () =>{
        setSpinner(true)
        setRefresh(false)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            setUserId(UserDetail.data.user.uid)
            Http.get('privatemsg/' + navigation.state.params.threadId, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
                const userSendMessages = responses.data.messages;
                console.log(responses.data)
                setUserSend(userSendMessages)
                setpmtid(responses.data.pmtid)
                setSpinner(false)
                setRefresh(true)
                handleClick()
            })
        })
        // _scrollEnd = (evt) => {
        //     flatList1.scrollToEnd();
        //   }
    }



    const sendMessage = () =>{
        Keyboard.dismiss()
        setsendingMessage(false)
        setpostMessage(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            setUserId(UserDetail.data.user.uid)
            Http.post('privatemsg/',{
                thread_id: navigation.state.params.threadId,
                recipients: navigation.state.params.Uid,
                subject: "hello",
                body: NewMessage,
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
                const userSendMessages = responses.data.messages;
                setNewMessage()
                getChat()
                setsendingMessage(true)
                setpostMessage(false)
            })
        })
    }

   
    
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{
    return (
        <View style={styles.mainContainer}>

            <View style={styles.mainSecondContainer}>
        
            <View style={styles.leftContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <View style={{ flexDirection: "row", alignItems: "center" , marginLeft:15}}>

                    {/* <Ionicons name="md-arrow-round-back" size={24} color="black" style={{ marginLeft: 10 }} /> */}

                    <Image
                      source={{ uri: navigation.state.params.picture}}
                        style={styles.profileImage}
                    />
                    <Text style={{ fontSize: 20, color: "black", textAlign: "center",fontFamily:"Cairo_700Bold" }}>{navigation.state.params.Name}</Text>

                </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={getChat}>
                <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>

                {spinner ?(
             
                <Image style={styles.Image} source={require('../../../assets/Images/3.gif')}  style={{width:30,height:30}}/>
             
                ):null}

                {refresh ? (
                    <MaterialIcons name="refresh" size={24} color="black" />
                    ):null}
                </View>
                </TouchableOpacity>
            </View>
 
            </View>

            <AutoScrollFlatList

           
             style={{flex: 1}}
             
         
                data={userSend}
                keyExtractor={item => item.uid}
                refreshing={true}
               
                renderItem={({ item }) => {
                
                    var ReceiveMessage = []
                    var sendMessage = []

                    if (item.author == userId) {
                        sendMessage.push(     
                            <View style={styles.mainThirdContainer}>
                                    <View style={styles.rightChatMain}>
                                        <View style={styles.rightChat}>
                                            <Text style={styles.leftchatText}>{item.body}</Text>
                                        </View>
                                    </View>
                            </View>
                            
                         )
                    }
                    if (item.author != userId) {
                        ReceiveMessage.push(     <View style={styles.mainThirdContainer}>
                        <View style={styles.leftChat}>
                            <Text style={styles.chatText}>{item.body}</Text>
                        </View>
                    </View>)
                    }


                    return(
                        <ScrollView  >
                        <View style={{paddingBottom:10}}>
                       {ReceiveMessage}
                        {sendMessage}

                            </View>
                            </ScrollView>
                    )
                }}

            />


            <SafeAreaView>
           
                    <View style={styles.typingBar}>
                        <View style={{ flex: 19 }}>
                            <TextInput
                                style={styles.inputFieldStyle}
                                placeholder="Enter message here"
                                onChangeText={text => setNewMessage(text)}
                            value={NewMessage}
                            />
                        </View>

                        <View style={{ flex: 2 }}>
                            {sendingMessage ?(
                            <TouchableOpacity onPress={sendMessage}>
<FontAwesome name="send" size={20} color="black" />
                            </TouchableOpacity>
                            ):null}

                     {postMessage ?(
             
                     <Image style={styles.Image} source={require('../../../assets/Images/3.gif')}  style={{width:20,height:20}}/>
          
                      ):null}

                        </View>
                    </View>

            
            </SafeAreaView>



        </View>


    )

}
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white"
    },

    mainThirdContainer: {
        flex: 20,
        backgroundColor: "white",
        marginTop: 30

    },
    profileImage: {
        height: 50, width: 50, borderRadius: 50, marginHorizontal: 10
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: "#FAFAFA"

    },
    typingBar: {
        backgroundColor: "#d3d3d31c",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 65,
      
    },
    inputFieldStyle: {
        borderWidth: 1,
        borderRadius: 50,
        paddingLeft: 10,
        height: 30,
        marginHorizontal: 15,
        backgroundColor:"white"


    },
    leftChat: {
        backgroundColor: "#E7E7EB",
        width: "49%",
        paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, marginHorizontal: 8
    },
    chatText: {
        color: "black",
        fontFamily: "Cairo_700Bold",
        textAlign:"center"
    },
    leftchatText: {
        color: "white",
        fontFamily: "Cairo_700Bold",
        textAlign:"center"
    },
    rightChat: {
        backgroundColor: "#056AAD",
        width: "49%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 8,
      
    },
    rightChatMain: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    }





});
export default Personalchat 