import { Text, StyleSheet, View, Picker, FlatList , SafeAreaView, ScrollView} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';


const UserResult = props => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
              });
   
    }, []);

    return (
    
 
<View style={styles.container}>
    <Text style={styles.mainHeading}>{props.tittle}</Text>
            <FlatList
                data={props.searchPostcode}
                keyExtractor={item => item.uid}
                renderItem={({ item }) => {
                    return (
                        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                        <ScrollView style={styles.scrollView}>
                        <View style={styles.mainContainer}>
                            <View style={styles.Image}>

                                <Image
                                    style={styles.tinyLogo}    
                                    source={{ uri: item.Picture[0] }}
                                    style={{ width: 150, height: 130 }}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Montserrat-ExtraLight'}}>{item.name}</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}><Text style={{fontFamily:'Cairo-Bold'}}>Activity :</Text> {item.Activity}</Text>
                            </View>
                    
                        </View>
                        </ScrollView>
                    </SafeAreaView>

                  
                    )

                }}
            />
            
        </View>
 
    )

}
const styles = StyleSheet.create({
    mainContainer: {
    flexDirection:"row",
    marginVertical:10,
    marginHorizontal:10,
    borderWidth:1,
    backgroundColor:'white',
    },
    textContainer:{
        justifyContent:"center",
        marginLeft:10,
        flex:1
    },
  
    container:{
        flex:1,
        marginBottom:10,
        backgroundColor:"white"
    },
    mainHeading:
    {
        marginHorizontal:10,
        marginVertical:10,
        fontSize:23,
        fontFamily:'Cairo-Bold'
    }
 
  });
  

export default UserResult