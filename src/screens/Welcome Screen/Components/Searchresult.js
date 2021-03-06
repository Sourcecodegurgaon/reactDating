import { Text, StyleSheet, View, Picker, FlatList, TouchableOpacity, Image } from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import UserResult from './UserResult'
import * as font from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
import { Linking } from 'react-native'
import { ViewPagerAndroid } from "react-native";
import { TouchableWithoutFeedback} from "react-native";

const SearchResult = props => {
const { navigation } = props;
const post = navigation.getParam('term')
const [searchPostcode, setSearchPostcode] = useState({ items: []});
const country = navigation.getParam('selectedValue')
const [visible, setVisible] = useState(false);
const [concatPostCode,setconcatPostCode] = useState()
const [matchLevel, setMatchLevel] = useState({count: 0});
const [pageIndex, setPageIndex] = useState({count: 0});

//Spinner
const [spinner ,setspinner] = useState(false)


const [currPages,setcurrPage] = useState()

const [noUsers,setNoUser] = useState(false)

let [fontsLoaded] = useFonts({
    Cairo_700Bold,
    Montserrat_200ExtraLight
    });

const toggleOverlay = () => {
    setVisible(!visible);
    navigation.goBack()
};
const nousertoggleOverlay = () => {
    setNoUser(!noUsers);
    navigation.goBack()
    
};


useEffect(() => {     
    getSearchData()        
}, []);


// const getCountry = async () =>{


//     const countryUser = await Http.get('post-json', {
//         params: {
//             country: country,
//         }
        
//     })

//     const PostalUser = await Http.get('post-json', {
//         params: {
//             postal_code: post,
//         }
        
//     })

//     if(countryUser.data.length == 0)
//     {
//         //navigation.navigate('NotFoundUser')
//     }
//     if(countryUser.data.length != 0)
//     {
//     if(PostalUser.data.length == 0)
//     {
//         setNoUser(true);
//     }
//     else
//     {
//         getSearchData()
//     }
// }
// }

const  getSearchData  =  async () =>{       
    
    


    setspinner(true)
    const postcode = post.substring(0,post.length - matchLevel.count)        
      
    // Note used postcode value
      const prevPostcode = (matchLevel.count != 0) ? post.substring(0, post.length - (matchLevel.count - 1)) : null;      
     
    // Axios Api Calling
    const responseUser = await Http.get('post-json', {
        params: {
            postal_code: postcode,
            country: country,
            page:pageIndex.count
        }
    }); 


    //Set Output in tempCurrPage
    var tempCurrPage = Object.keys(responseUser.data).map((i) => responseUser.data[i]);
    var newTempCurrPage = tempCurrPage;

    if(prevPostcode) {
        newTempCurrPage = tempCurrPage.filter(function (obj) {

            const str = obj.Postal;                        
            const post1 = "110030";
            const prev = new RegExp(prevPostcode, 'g');
            // console.log(str);
            // console.log(prevPostcode);        
            // console.log(str.match(prev));

            return !str.match(prev);
        });       
    }

   // console.log(tempCurrPage.length)
    //Check tempCurrPage Length
    if(tempCurrPage.length == 0){
        navigation.navigate('NotFoundUser')
        setspinner(false)  
}          
 
    //Check tempCurrPage Length is more than 0
        if (tempCurrPage.length > 0) {
            setSearchPostcode(state => ({
                            ...state,
                            items: searchPostcode.items.concat(newTempCurrPage)
            }));

            // setSearchPostcode(searchPostcode.data.filter(
            //     (thing, index, self) =>
            //         index === self.findIndex((t) => t.name === thing.name)
            //     ))

            setspinner(false)
        }
        
        // Check pageLegth  make Matchlevel ++  and page Inde -1
        if (tempCurrPage.length < 10) {          
            // setMatchLevel(incrementCount);
            setMatchLevel(state => ({
                ...state,
                count: state.count + 1
            }));

            setPageIndex(state => ({
                ...state,
                count: -1
            }));
            setPageIndex(0);
            setspinner(false)
        }
            
        
        // if (searchPostcode.length == 0) {
        //      setPageIndex(state => ({
        //          ...state,
        //          count: state.count + 1
        //      }));

        //     // getSearchData()
        //         return;
        // }

            setspinner(false)
              setPageIndex(state => ({
                  ...state,
                  count: state.count + 1
              }));

    // console.log("Page Index " + pageIndex.count);
    // console.log("search postcode " + searchPostcode.items.length);
    // console.log("Match level is " + matchLevel.count + "\n");
}


if(!fontsLoaded)
{
return(<AppLoading />)
}
else{


return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
            <Spinner
        visible={spinner}
        textContent={'loading...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor={"#000000c4"}
    />

        <UserResult searchPostcode={searchPostcode.items} tittle="Members near you"  navigation={navigation}/>
        <View style={{marginVertical:10}}>
        <Button title="Show More"
       containerStyle={{marginBottom:20}}
         buttonStyle={{ backgroundColor: "lightgrey"}}
         titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 15 , color:"black"}}
        onPress={getSearchData}/>
        </View>


        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
            <View>
            <TouchableOpacity onBackdropPress={toggleOverlay}>
                    <Image style={styles.ImageStyle} source={require('../../../../assets/Images/cross.png')} onBackdropPress={toggleOverlay}/>
                </TouchableOpacity>
                <View>
              
                <View style={{paddingVertical:10}}>
                <Text style={styles.notFoundText}>Looks like we have not yet expanded to your area. </Text>
                <Text style={{fontFamily:"Montserrat_200ExtraLight", textAlign:"center"}}><Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com')} style={{fontFamily:"Cairo_700Bold"}}> Click here </Text> 
                to suggest that we come to you next!</Text>
                </View>
                </View>
            </View>
        </Overlay> 
    
        <Overlay isVisible={noUsers} onBackdropPress={nousertoggleOverlay} >
            <View>
           
                <View>
              
                <View style={{paddingVertical:10,justifyContent:"center",alignItems:"center"}}>
                <Text style={styles.notFoundText}>No users in your pincode</Text>
                <Button
                                onPress={nousertoggleOverlay}
                                    buttonStyle={{ backgroundColor: "#056AAD", textAlign: "center", borderRadius: 10, }}
                                    containerStyle={{ marginHorizontal: 20, marginVertical: 15, width: 100, justifyContent: "center" }}
                                    titleStyle={{ fontSize: 18, fontFamily: 'Cairo_700Bold' }}
                                    title="Back"
                                />
                </View>
                </View>
            </View>
        </Overlay> 
    
    </View>

)


}
}


const styles = StyleSheet.create({
ImageStyle: {
    height: 25,
    width: 25,
    justifyContent: "flex-end",
    position: "absolute",
    right: 10,
    marginTop: 10,

},
notFoundText: {
    paddingVertical: 25,
    textAlign: "center",
    fontFamily: "Montserrat_200ExtraLight",
    fontSize: 17,
    marginTop: 10
},
spinnerTextStyle:{
    color:"white"
}




})

export default SearchResult