

 import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView ,TextInput} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight, Montserrat_400Regular} from '@expo-google-fonts/montserrat';
import { RadioButton } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

const CancelSubConfirmation = props => {
    const [value, setValue] = useState('first');
    const  [endDate, setEndDate] = useState()
    const [spinner, setspinner] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_400Regular
      });
      useEffect(() => {

        getSubscriptionType()

    }, []);

      const getSubscriptionType = () => {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                setspinner(true)
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.data.field_subcriptiontype.length == undefined) {

                        setEndDate(Moment(response.data.field_subscriptionenddate.und[0].value).format('DD/MM/yyyy'))
                        setspinner(false)
                    }
                    else {
                        //settrailMem(true)
                    }
                  
                })

            }

        })


    }

    const updateSubscription = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            setspinner(true)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
    
    
    
            Http.put('user/' + userId, {
                field_renewaloption:{und:[{value:"Manual"}]}
                
            },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
                props.navigation.goBack()
        
            }).catch(function (error) {
                console.log(error.response)
            })
    
    
        })
    
    
    
        
        
    
    
    
        })
    
    
      }



const Subscription = () =>{

    if(value == "Monthly")
    {
        props.navigation.navigate('MonthlySubConfirmation')
    }
}

 
if(!fontsLoaded)
{
    return(<AppLoading />)
}
else{
    return (
        <View style={styles.mainContainer}>
              <Spinner
                    visible={spinner}
                    textContent={'Updating...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#000000c2"}
                />
            <View style={styles.secondMainCotainer}>
            <ScrollView>
                <TouchableOpacity style={styles.imageContainer} onPress={()=>props.navigation.goBack()}>
                    <Image style={styles.Image} source={require('../../../assets/Images/cross.png')} />
                </TouchableOpacity>
          

                    <View style={styles.thirdContainer}>
                        <Text style={{textAlign:"center"}}>
                        <Text style={styles.subupperHeading}>Your present subscription ends on: </Text>
                        <Text style={styles.DateText}> {endDate} </Text>
                        </Text>
                        
                       

                        <Text style={styles.subupperHeading}>Your membership will not be renewed after above date.</Text>
                

                     


                    
                        <Button containerStyle={{ marginHorizontal: 5, marginVertical: 5 }}
                            onPress={updateSubscription}
                            title="Confirm"
                            buttonStyle={{ backgroundColor: "#277718", borderRadius: 10,  fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 17 }}

                        />
                   
                
                        <Button containerStyle={{ marginHorizontal: 5, marginVertical: 15 }}
                            onPress={() => props.navigation.goBack()}
                            title="Cancel"
                            buttonStyle={{  backgroundColor: "#056AAD", borderRadius: 10,  fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 17}}
                        />
                    </View>
         

                </ScrollView>
      

                </View>

        </View>
    )



}
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",
       justifyContent:"center"

    },
    secondMainCotainer:
    {
        backgroundColor: "white",
        justifyContent: "center",

        marginHorizontal: 30,
        marginVertical: 30,
        paddingBottom:10
    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    thirdContainer: {
        marginHorizontal: 20,

    },
    upperHeading: {
        fontSize: 18,

        marginVertical: 5,
        fontFamily: 'Cairo_700Bold',
     
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo_700Bold',
        color: "red",
        fontSize: 16,

    },
    Image:
    {
        width: 20,
        height: 20,
    },
    imageContainer:
    {
        alignItems: "flex-end",
        marginHorizontal: 10, marginVertical: 10
    },
    DateText:{
        fontFamily:"Montserrat_200ExtraLight"
    },
    subscriptionEndDateContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    ChangePasswordText:{
        fontFamily:"Montserrat_400Regular",
        textAlign:"center",
        fontSize:16,
        marginVertical:10
    },
    subupperHeading: {
        fontSize: 16,
   
        fontFamily: 'Cairo_700Bold',
        textAlign:"center",
        paddingVertical:10
   
    },
    RadioStyling: {
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",


      
    },

   spinnerTextStyle: {
        color: "white"
    },
})


export default CancelSubConfirmation