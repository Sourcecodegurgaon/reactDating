import { Text, StyleSheet, View, Picker, FlatList , SafeAreaView, ScrollView} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import NavigationBar from '../../Navigationbar'




const SearchItems = () => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])


    return (
        <View style={styles.mainContainer}>
            <NavigationBar />
           <View style={styles.secondContainer}>
              
            <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                        <ScrollView style={styles.scrollView}>
                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    style={{ width: 150, height: 130 }}
                               
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Montserrat-ExtraLight'}}>Ritin</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}><Text style={{fontFamily:'Cairo-Bold'}}>Activity :</Text>dance,yoga, </Text>
                            </View>
                    
                        </View>

                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    style={{ width: 150, height: 130 }}
                               
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Montserrat-ExtraLight'}}>Ritin</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}><Text style={{fontFamily:'Cairo-Bold'}}>Activity :</Text>dance,yoga, </Text>
                            </View>
                    
                        </View>

                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}
                                    style={{ width: 150, height: 130 }}
                               
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Montserrat-ExtraLight'}}>Ritin</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}><Text style={{fontFamily:'Cairo-Bold'}}>Activity :</Text>dance,yoga, </Text>
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
        borderWidth:1,
        marginVertical:20
    },
    textContainer:{
        marginHorizontal:10
    }


  });

export default SearchItems