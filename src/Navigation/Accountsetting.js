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
import Http from '../Api/Http'
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';


const AccountSetting = props => {
    const [value, setValue] = useState();
    const [monthlyMem, setmonthlyMem] = useState(false)
    const [yearlyMem, setyearlyMem] = useState(false)
    const [trialMem, settrailMem] = useState(false)
    const [spinner, setspinner] = useState(false)
    const  [endDate, setEndDate] = useState()

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight,
        Montserrat_400Regular
      });
      useEffect(() => {
        props.navigation.addListener('didFocus', () => {     
            setmonthlyMem(false)   
            setyearlyMem(false)
            getSubscriptionType()             
        });
     

    }, [])

 const getSubscriptionType = () =>{
    AsyncStorage.getItem('Token', (err, result) => {
        const UserDetail = JSON.parse(result)
        if (UserDetail != null) {
            setspinner(true)
            Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
            if(response.data.field_subcriptiontype.length == undefined)
            {


                
                if(response.data.field_subcriptiontype.und[0].value == "Monthly")
                {

                    setmonthlyMem(true)
                    setEndDate(Moment(response.data.field_subscriptionenddate.und[0].value).format('DD/MM/yyyy'))
                    
                }
     
                if(response.data.field_subcriptiontype.und[0].value == "Yearly")
                {

                    setyearlyMem(true)
                    setEndDate(Moment(response.data.field_subscriptionenddate.und[0].value).format('DD/MM/yyyy'))
                    
                }
            }
            else
            {
             settrailMem(true)
            }
            setspinner(false)
            })
         
        }

    })


 }







const Subscription = () =>{

    if(value == "monthly" )
    {
        props.navigation.navigate('MonthlySubConfirmation',{type:value})
    }
    if( value == "Yearly")
    {
        props.navigation.navigate('YearlySubConfirmation',{type:value})
    }

   
    if(value == "Cancel")
    {
        props.navigation.navigate('CancelSubConfirmation')
        
    }
    if(value == "Freeze")
    {
        props.navigation.navigate('FreezeSubConfirmation')
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
                    <Image style={styles.Image} source={require('../../assets/Images/cross.png')} />
                </TouchableOpacity>
          

                    <View style={styles.thirdContainer}>
                        <Text style={styles.upperHeading}>Present Subscription:</Text>
                         {monthlyMem ?( <Text style={styles.subupperHeading}>Monthly Subscription</Text>  ):null}
                        {monthlyMem ?(
                        <View style={styles.subscriptionEndDateContainer}>
                        <Text style={styles.subupperHeading}>Monthly Subscription End Date:</Text>
                        <Text style={styles.DateText}> {endDate} </Text>
                        </View>
                        ):null}

                      {yearlyMem ?( <Text style={styles.subupperHeading}>Yearly Subscription</Text>  ):null}
                        {yearlyMem ?(
                        <View style={styles.subscriptionEndDateContainer}>
                        <Text style={styles.subupperHeading}>Yearly Subscription End Date:</Text>
                        <Text style={styles.DateText}> {endDate} </Text>
                        </View>
                        ):null}



                        <Text style={styles.upperHeading}>Change App Subscription:</Text>

                        {monthlyMem ?(
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Annual Subscription</Text>
                            <RadioButton value="Yearly" color="#056AAD" />
                        </View>

                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Freeze Subscription</Text>
                            <RadioButton value="Freeze" color="#056AAD" />
                        </View>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Cancel App Subscription</Text>
                            <RadioButton value="Cancel" color="#056AAD" />
                        </View>
                    </RadioButton.Group>
                        ):null}


                        {yearlyMem ?(
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Monthly Subscription</Text>
                            <RadioButton value="monthly" color="#056AAD"/>

                        </View>


                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Freeze Subscription</Text>
                            <RadioButton value="Freeze" color="#056AAD" />
                        </View>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Cancel App Subscription</Text>
                            <RadioButton value="Cancel" color="#056AAD" />
                        </View>
                    </RadioButton.Group>
                        ):null}

                 {trialMem ?(
                        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Monthly Subscription</Text>
                            <RadioButton value="monthly" color="#056AAD"/>

                        </View>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Annual Subscription</Text>
                            <RadioButton value="Yearly" color="#056AAD" />
                        </View>

                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Freeze Subscription</Text>
                            <RadioButton value="Freeze" color="#056AAD" />
                        </View>
                        <View style={styles.RadioStyling}>
                            <Text style={{  fontFamily: 'Cairo_700Bold'}}>Cancel App Subscription</Text>
                            <RadioButton value="Cancel" color="#056AAD" />
                        </View>
                    </RadioButton.Group>
                        ):null}


                        <Button containerStyle={{ marginHorizontal: 5, marginVertical: 5 }}
                            onPress={Subscription}
                            title="Update Billing Info"
                            buttonStyle={{ backgroundColor: "#277718", borderRadius: 10,  fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 17 }}

                        />
                        <Text style={styles.upperHeading}>Change Password</Text>
                        <Text style={styles.subupperHeading}>To change password click the link below.</Text>
                        <View style={styles.ChangePasswordContainer}>
                        <Text style={styles.ChangePasswordText}>Change Password</Text>
                        </View>

                   



                        <Button containerStyle={{ marginHorizontal: 5, marginVertical: 15 }}
                            onPress={() => props.navigation.navigate('Forgotpassword')}
                            title="Continue"
                            buttonStyle={{  backgroundColor: "#277718", borderRadius: 10,  fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 17}}
                        />
                    </View>

                    
                    <TouchableOpacity onPress={() => props.navigation.navigate('CloseAccountConfirm')}>
                    <Text style={styles.bottomText}>Close Account</Text>
                    </TouchableOpacity>

                </ScrollView>
      

                </View>

        </View>
    )



}
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",

    },
    secondMainCotainer:
    {
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30,
        paddingBottom:10
    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    thirdContainer: {
        marginHorizontal: 20
    },
    upperHeading: {
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 5,
        fontFamily: 'Cairo_700Bold'
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
        marginHorizontal: 16,
        fontFamily: 'Cairo_700Bold'
    },
    RadioStyling: {
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
        borderWidth:1,
        marginVertical:4,
        borderColor:"#F5F4F5",
        backgroundColor:"#F5F4F4"
    },
 spinnerTextStyle: {
        color: "white"
    },

})


export default AccountSetting