import { Text, StyleSheet, View, Picker, FlatList , SafeAreaView, ScrollView} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';





const Chats = () => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])


    return (
        <View style={styles.mainContainer}>
         
           <View style={styles.secondContainer}>
              
            <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                        <ScrollView style={styles.scrollView}>
                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    
                               
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>Gagarhymes</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}>Hello</Text>
                            </View>
                            <View style={styles.textContainerTime}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>15 June</Text>
                            </View>
                    
                        </View>

                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    
                               
                                />
                            
                    </View>
                    <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>KPL N</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}>How were you? </Text>
                            </View>
                            <View style={styles.textContainerTime}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>15 July</Text>
                            </View>
                        </View>

                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    
                               
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>Kristina</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}>What you do?</Text>
                            </View>
                            <View style={styles.textContainerTime}>
                                <Text style={{fontFamily:'Cairo-Bold',justifyContent:"flex-end"}}>15 Aug</Text>
                            </View>
                        </View>
                        </ScrollView>
                    </SafeAreaView>

                  

      
            





            </View>

        </View>




    )

}
const styles = StyleSheet.create({
    mainContainer: {
    backgroundColor:'white',
    flex:1
    },
  
  
    container:{
       
        marginBottom:10,
        backgroundColor:"white"
    },
    mainHeading:
    {
        marginHorizontal:10,
        marginVertical:10,
        fontSize:23,
        fontFamily:'Cairo-Bold'
    },
    secondContainer:{
flex:2,
    marginHorizontal:10,
    },
  
    mainContainerOutput:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20
    },
    textContainer:{
        marginHorizontal:10
    },
    tinyLogo:{
        width: 60, height: 60,borderRadius:40 
    },
    textContainerTime:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
   flex:1
    }


  });

export default Chats