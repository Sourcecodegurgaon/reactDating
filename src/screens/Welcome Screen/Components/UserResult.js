import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, TouchableOpacity, ScrollView, CheckBox } from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { Overlay } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight,Montserrat_700Bold_Italic,Montserrat_600SemiBold_Italic,Montserrat_500Medium_Italic,Montserrat_500Medium,Montserrat_400Regular} from '@expo-google-fonts/montserrat';
import { TouchableWithoutFeedback} from "react-native";

const UserResult = props => { 
    const [isSelected, setSelection] = useState(true);

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_700Bold_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_500Medium,
        Montserrat_400Regular
      });
    useEffect(() => {
       




    }, []);
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const navSigin = () =>{
        toggleOverlay()
        props.navigation.navigate('SignIn')
    }
    const navSignup = () =>{
        toggleOverlay()
        props.navigation.navigate('SignUp')
    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (


        <View style={styles.container}>
            <Text style={styles.mainHeading}>{props.tittle}</Text>
            <FlatList
                data={props.searchPostcode}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => {       
                    var active = item.Activity.join(', ')
    
                     const result = item.Birth.toString().replace( /(<([^>]+)>)/ig, '').slice(0, 2) 
   
                   const singleActivity = item.Activity[0].toString().split(' ').slice(0, 1).join(' ')
                     if(item.kids.length > 0)
                     {
                         var Parent = "Parent"
                     }
                     if(item.Pets.length > 0)
                     {
                         var Pets = 'Pet Owner'
                     }
                    if(item.kids.length > 0 && item.Pets.length > 0)
                    {
                        var Com = ","
                    }
                    console.log(item.verfied.length)

                    if(item.verfied == "true"){
                    //.replace( /(<([^>]+)>)/ig, '')
                    return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: "white" ,marginTop:10}} >
                            <ScrollView style={styles.scrollView}>
                                <TouchableWithoutFeedback onPress={toggleOverlay}>
                                <View>
                                <View style={styles.Verified}><Text style={{color:"white",textAlign:"center", fontFamily: "Montserrat_600SemiBold_Italic",paddingTop:1}}>Verified</Text></View>
                                    <View style={styles.mainContainerVerified} >
                                        <View style={styles.Image}>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: item.Picture[0] }}
                                                PlaceholderContent={<ActivityIndicator />}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <View styles={styles.UpperText}>
                                            
                                            {/* <View>
                                            <Text style={styles.nameText}>{item.Postal}</Text>
                                            </View> */}

                                            <View>
                                            <Text style={styles.nameText}>{item.name}</Text>
                                            </View>
                                            <View>
                                            <Text style={styles.AgeText}>{result}, {item.Gender}</Text>
                                            </View>
                                            <View>
                    <Text style={styles.parentText}>{Parent}{Com} {Pets}</Text>
                                            </View>
                                            </View>
                                         
                                         <View style={styles.LoweText}>
                                         <View>
                                            <Text style={styles.activityText} numberOfLines = {2}>Likes {active}</Text>

                                            </View>

                                            <View style={styles.InterestedContainer}>
                                            <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>

                                            </View>
                                         </View>
                                            </View>
                                            
                                           
                                        

                                    </View>
                                    </View>
                                </TouchableWithoutFeedback>


                            </ScrollView>


                        </SafeAreaView>


                    )
                    }

                    else 
                    {
                        return (
                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" ,marginTop:10}} >
                                <ScrollView style={styles.scrollView}>
                                    <TouchableWithoutFeedback onPress={toggleOverlay}>
                                    <View>
                                        <View style={styles.notVerified}></View>
                                        <View style={styles.mainContainer} >
                                            <View style={styles.Image}>
                                                <Image
                                                    style={styles.tinyLogo}
                                                    source={{ uri: item.Picture[0] }}
                                                    PlaceholderContent={<ActivityIndicator />}
                                                />
                                            </View>
                                            <View style={styles.textContainer}>
                                                <View styles={styles.UpperText}>
                                                
                                                {/* <View>
                                                <Text style={styles.nameText}>{item.Postal}</Text>
                                                </View> */}
    
                                                <View>
                                                <Text style={styles.nameText}>{item.name}</Text>
                                                </View>
                                                <View>
                                                <Text style={styles.AgeText}>{result}, {item.Gender}</Text>
                                                </View>
                                                <View>
                                              <Text style={styles.parentText}>{Parent}{Com} {Pets}</Text>
                                                </View>
                                                </View>
                                             
                                             <View style={styles.LoweText}>
                                             <View>
                                                <Text style={styles.activityText} numberOfLines = {2}>Likes {active}</Text>
    
                                                </View>
    
                                                <View style={styles.InterestedContainer}>
                                                <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>
    
                                                </View>
                                             </View>
                                                </View>
                                                
                                               
                                            
    
                                        </View>
                                        </View>
                                    </TouchableWithoutFeedback>
    
    
                                </ScrollView>
    
    
                            </SafeAreaView>
    
    
                        ) 
                    }

                }}
            />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ marginHorizontal: 30, paddingVertical: 20 }} backdropStyle={{ backgroundColor: "#000000a3" }}>

                <View>

                            <TouchableOpacity  style={styles.ImageContainer} onPress={toggleOverlay}>
                                <Image style={styles.ImageProfile} source={require('../../../../assets/Images/crosspop.png')} />
                            </TouchableOpacity >

                    <Text style={styles.popupTopMessage}>Sorry! Only Members can view profile details.</Text>
                    <Text style={styles.popupTopHeading}>Who's on the site?</Text>
                    <View style={styles.checkboxContainer}>
                        <Image style={styles.ImageCheck} source={require('../../../../assets/Images/check.png')} />
                        <Text style={styles.label}>Our youngest member is 18,{"\n"} our oldest member is 85</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Image style={styles.ImageCheck} source={require('../../../../assets/Images/check.png')} />
                        <Text style={styles.label}>64% in a Realtionship,{"\n"} 36% Not in a Realtionship</Text>

                    </View>
                    <Button
                        onPress={navSignup}
                        buttonStyle={{ backgroundColor: "green", textAlign: "center",  borderRadius: 10 }}
                        containerStyle={{ marginHorizontal: 15, marginVertical: 15 }}
                        titleStyle={{ fontSize: 20 ,fontFamily:"Cairo_700Bold"}}
                        title="Awesome! Sign me up!"
                    />
                    <Button

                        containerStyle={{ marginHorizontal: 15, marginVertical: 15,  borderRadius: 10 }}
                        buttonStyle={{backgroundColor:"#056AAD" }}
                        title="I am already a member"
                        titleStyle={{ fontSize: 20 ,fontFamily:"Cairo_700Bold"}}
                        onPress={navSigin}
                    />
                   
                </View>

            </Overlay>
        </View>

    )
            }
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:15,
        alignItems:"center",
        borderTopLeftRadius:0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        height:150,
        borderColor:"#8B8E8F",
       
    
        
    },
    mainContainerVerified:{
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:15,
        alignItems:"center",
        borderTopLeftRadius:0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        height:150,
        borderColor:"#056AAD",


    },
    oneLineActivity:{
        fontFamily: 'Montserrat_500Medium', 
        color: 'black', 
        fontSize: 13,
        marginRight:20
    },
    textContainer: {
        justifyContent: "space-between",
        marginLeft: 10,
        flexDirection:"column",
      
    },

    container: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: "white",
        flexDirection:"column"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold',
        alignItems:"center",
        textAlign:"center"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: "Montserrat_200ExtraLight",
        fontSize: 15,
        textAlign:"center"
    },
    ImageCheck: {
        height: 20,
        width: 20
    },
    popupTopMessage: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 20,

    },
    popupTopHeading: {
        fontFamily: "Cairo_700Bold",
        fontSize: 24,
        marginHorizontal: 20

    },
    activityText:
    { fontFamily: 'Montserrat_500Medium', 
    color: 'black', 
    fontSize: 13,
    marginRight:20,width:200 },
    tinyLogo:
    {
        width: 90, height: 90 ,
        borderRadius:90,
       
  
    
    },
    AgeText:{
        fontFamily: "Montserrat_600SemiBold_Italic",
        fontSize: 15,
        marginTop:-4
    },
    nameText:
    {
        fontFamily: "Montserrat_700Bold_Italic",
        fontSize: 20,
        marginTop:-10,
        textShadowColor:'#00000029',
        textShadowOffset: {width: 5, height: 2},
        textShadowRadius: 10, 
        elevation: 2
    },
    parentText:{
        fontFamily: 'Montserrat_500Medium_Italic', 
    color: '#676464', 
    marginTop:-2,
    marginBottom:10,
    fontSize:13


    },
    notVerified:
    {
        backgroundColor:"#8B8D8F",
        height:20,
        width:80,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        marginBottom:-10,
        marginLeft:10
    },


    Image:
    {
        shadowColor: '#00000080',
        shadowOffset: {width: 100, height: 100},
        shadowRadius: 5,
        elevation: 6,
        borderRadius:37
    },
    ImageContainer:{
    justifyContent:"flex-end",
    alignItems:"flex-end"
    },
    ImageProfile:{
    height:15,
    width:15
    },
    InterestedContainer:{
    marginTop:5,  
    },
    Verified:{
        backgroundColor: "#056AAD",
        height: 20,
        width: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -10,
        marginLeft: 10,
       color:"white"
    },
});

 
export default UserResult