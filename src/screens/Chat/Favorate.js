import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView ,TouchableOpacity} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import Http from '../../Api/Http'
import { AsyncStorage } from 'react-native';

const Favorate = ({navigation,searchResults}) => {
    const [search,setSearch] = useState("")
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
  
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) { 
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        if(response.data.field_favorite_users.length == undefined){
                         const listFavorate = response.data.field_favorite_users.und[0].value;
                         const ParseFavorate = JSON.parse(listFavorate);
                         const uniqueFavorite = removeDuplicatesBy(
                            (x) => x[0].name,
                            ParseFavorate
                          );
                         setSearch(uniqueFavorite)
                          }
                    console.log(search)

                    }
                })
            }
        })




  }, [])

 const  removeDuplicatesBy = (keyFn, array) =>{
    var mySet = new Set();
    return array.filter(function (x) {
      var key = keyFn(x),
        isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });

 }
    return (
        <View style={styles.mainContainer}>

            <FlatList
                data={search}
                keyExtractor={item => item[0].uid}
                renderItem={({ item }) => {

                    console.log(item[0].activities)
                    return (
                     <TouchableOpacity  >
                     
                        <View style={styles.secondContainer}>
                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>   
                                <ScrollView style={styles.scrollView}>
                                    <View style={styles.mainContainerOutput}>
                                          <View style={styles.Image}>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: item[0].picture }}
                                                style={{ width: 100, height: 100 }}
                                            />  
                                          
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{ fontFamily: 'Montserrat-ExtraLight',color:'black'}}>{item[0].name}</Text>
                                            <Text style={{ fontFamily: 'Montserrat-ExtraLight', color: 'black', fontSize: 15 }}><Text style={{ fontFamily: 'Cairo-Bold' }}>Activity :</Text></Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                        </TouchableOpacity>

                    )

                }}
            />
        </View>




    )

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
        fontFamily: 'Cairo-Bold'
    },
    secondContainer: {
        flex: 2,
        marginHorizontal: 10,
    },

    mainContainerOutput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 20,
        borderRadius:3
    },
    textContainer: {
        marginHorizontal: 10
    },
   


});

export default Favorate