import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView, TouchableOpacity,ListItem ,SectionList} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack';
import UserDetails from '../Details/UserDetails'

import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_700Bold_Italic, Montserrat_600SemiBold_Italic, Montserrat_500Medium_Italic, Montserrat_500Medium, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

import { TouchableWithoutFeedback} from "react-native";
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'



const SearchItems = props => {
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_700Bold_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_500Medium,
        Montserrat_400Regular
    });

    const [blocking,setBlocking] = useState()
    const deleteItemById = Uid => () => {
        const filteredData = props.searchResults.filter(item => item.Uid !== Uid);
        props.searchResults({ data: filteredData });
      }
  
      
    useEffect(() => {
        
    
        deleteItemById()




        for(let use of props.searchResults.help)
        {
            setBlocking(use.uid) 
  
        }
        AsyncStorage.getItem('Token', (err, result) => {
            const LogoutToken = JSON.parse(result)
        
                 Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((responses) => {
                  if(responses.data.field_block_users.length == undefined)
                  {
                  const User = JSON.parse(responses.data.field_block_users.und[0].value)
                  //setBlocking(User) 
                //   for(let users of props.searchResults)

                //   console.log(users)
                //   {
//                   for (let userObject of User)
//                         {
//                             if(userObject != undefined && users.Uid != userObject.uid)
//                             {
// console.log(users)
//                                 setBlocking(userObject)  
//                             }
                          
//                         }
                    //}
               
                  }
     
 
               
                 })
       
       
             
        })
      
   
    }, []);
   
    const [verfified, setVerified] = useState()
    const [unverfified, setUnVerified] = useState(true)

   
      
    if (!fontsLoaded) {
        return (<AppLoading />)
    }
    else {

        return (


            <SafeAreaView  style={styles.container}>


              <FlatList
                    data={props.searchResults.New}
                    renderItem={({item}) => {

                    
             
       
                    const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)  

                        if(item.avatar == 0 && result >= props.minage && result <= props.Maxage &&  item.verfied.length == undefined ) {
                         
                        var active = item.Activities.join(', ')

                        const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)

                        const singleActivity = item.Activities[0].toString().split(' ').slice(0, 1).join(' ')
                        if (item.kids.length > 0) {
                            var Parent = "Parent"
                        }
                        if (item.Pets.length > 0) {
                            var Pets = 'Pet Owner'
                        }
                        if (item.kids.length > 0 && item.Pets.length > 0) {
                            var Com = "," 
                        }
                   

                     
                        return (
                            <View style={{ flex: 1, backgroundColor: "white", marginTop: 10 }} >
                                <View style={styles.scrollView}>
                                    <TouchableWithoutFeedback onPress={() => props.navigation.navigation.navigation.navigate('FindUserDetails', {
                                        uid: item.Uid
                                    })} 
                                    >    <View>
                                           <View style={styles.Verified}><Text style={{color:"white",textAlign:"center", fontFamily: "Montserrat_600SemiBold_Italic",paddingTop:1}}>Verified</Text></View>
                                                    <View style={styles.VeifiedmainContainer} >
                                      
                                            <View style={styles.Image}>
                                                <Image
                                                    style={styles.tinyLogo}
                                                    source={{ uri: item.Picture[0] }}
                                                    PlaceholderContent={<ActivityIndicator />}
                                                />
                                            </View>
                                            <View style={styles.textContainer}>
                                                <View styles={styles.UpperText}>
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
                                                        <Text style={styles.activityText} numberOfLines={2}>Likes {active}</Text>

                                                    </View>

                                                    <View style={styles.InterestedContainer}>
                                                        <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>

                                                    </View>
                                                </View>
                                            </View>




                                        </View>
                                        </View>
                                    </TouchableWithoutFeedback>


                                </View>


                            </View>


                        )
                                }


                               else if(item.avatar == 0 && result >= props.minage && result <= props.Maxage &&  item.verfied.length != undefined && item.Uid != blocking ) {
                              
                              
                                  
                                    var active = item.Activities.join(', ')
            
                                    const result = item.Birth.toString().replace(/(<([^>]+)>)/ig, '').slice(0, 2)
            
                                    const singleActivity = item.Activities[0].toString().split(' ').slice(0, 1).join(' ')
                                    if (item.kids.length > 0) {
                                        var Parent = "Parent"
                                    }
                                    if (item.Pets.length > 0) {
                                        var Pets = 'Pet Owner'
                                    }
                                    if (item.kids.length > 0 && item.Pets.length > 0) {
                                        var Com = ","
                                    }
                                    //.replace( /(<([^>]+)>)/ig, '')
                                    return (
                                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 10 }} >
                                            <View style={styles.scrollView}>
                                            <TouchableWithoutFeedback  onPress={() => props.navigation.navigation.navigation.navigate('FindUserDetails', {
                                                    uid: item.Uid
                                                })} activeOpacity="0.1">
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
                                                                    <Text style={styles.activityText} numberOfLines={2}>Likes {active}</Text>
            
                                                                </View>
            
                                                                <View style={styles.InterestedContainer}>
                                                                    <Text style={styles.oneLineActivity} >Interested in {singleActivity}</Text>
            
                                                                </View>
                                                            </View>
                                                        </View>
            
            
            
            
                                                    </View>
                                                    </View>
                                                </ TouchableWithoutFeedback >
            
            
                                            </View>
            
            
                                        </View>
            
            
                                    )
                                            }
                                        
                                else
                                {
                                    <View style={{flex:2,backgroundColor:"white",justifyContent:"center"}}>
                                        <Text style={{   fontFamily: 'Montserrat_500Medium',color: 'black', fontSize:20}}>No Result Found</Text>
                                    </View>
                                }
                                
                     }}
                     keyExtractor={(item,index)=>index}
                    /> 


            </SafeAreaView >

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
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: "center",
        borderTopLeftRadius: 0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 150,
        borderColor:"#8B8E8F",



    },

    VeifiedmainContainer: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: "center",
        borderTopLeftRadius: 0,
        shadowColor: '#8B8E8F',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 150,
        borderColor:"#056AAD",
    },

    oneLineActivity: {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20,
    },

    textContainer: {
        justifyContent: "space-between",
        marginLeft: 10,
        flexDirection: "column",
    },

    container: {
        flex: 1,
        marginBottom: 10,
        backgroundColor: "white",
        flexDirection: "column"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo_700Bold',
        alignItems: "center",
        textAlign: "center"
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
        textAlign: "center"
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
    {
        fontFamily: 'Montserrat_500Medium',
        color: 'black',
        fontSize: 13,
        marginRight: 20, width: 200
    },
    tinyLogo:
    {
        width: 90, height: 90,
        borderRadius: 90,



    },
    AgeText: {
        fontFamily: "Montserrat_600SemiBold_Italic",
        fontSize: 15,
        marginTop: -4
    },
    nameText:
    {
        fontFamily: "Montserrat_700Bold_Italic",
        fontSize: 20,
        marginTop: -10,
        textShadowColor: '#00000029',
        textShadowOffset: { width: 5, height: 2 },
        textShadowRadius: 10,
        elevation: 2
    },
    parentText: {
        fontFamily: 'Montserrat_500Medium_Italic',
        color: '#676464',
        marginTop: -2,
        marginBottom: 10,
        fontSize: 13


    },
    notVerified:
    {
        backgroundColor: "#8B8D8F",
        height: 20,
        width: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: -10,
        marginLeft: 10,
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

    Image:
    {
        shadowColor: '#00000080',
        shadowOffset: { width: 100, height: 100 },
        shadowRadius: 5,
        elevation: 6,
        borderRadius: 37
    },
    ImageContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    ImageProfile: {
        height: 15,
        width: 15
    },
    InterestedContainer: {
        marginTop: 5,
    }


});

export default SearchItems