import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';
import Http from '../../Api/Http'
import { AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_400Regular} from '@expo-google-fonts/montserrat';
import CustomMultiPicker from "react-native-multiple-select-list";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
const Tophobbies = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [otherActvities, setotherActvities] = useState([]);

    const [activityValue, setactivityValue] = useState("");

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_400Regular
      });
      //Spinner
      const [spinner ,setspinner] = useState(false)
  
  

    const items = [
        // this is the parent or 'item'
        {
          name: 'What do you like to do for fun?',
          id: 0,
          // these are the children or 'sub items'
          children: [
            {
              name: 'yoga',
              id: 'yoga',
            },
            {
              name: 'playdates (parents and children)',
              id: 'playdates (parents and children)',
            },
            {
              name: 'sightseeing',
              id: 'sightseeing',
            },
            {
              name: 'artsy stuff (making or looking at)',
              id: 'artsy stuff (making or looking at)',
            },
            {
              name: 'cooking',
              id: 'cooking',
            },
            {
              name: 'dancing',
              id: 'dancing',
            },
            {
                name: 'people watching',
                id: 'people watching',
              },
              {
                name: 'traveling/vacations',
                id: 'traveling/vacations',
              },
              {
                name: 'history buff',
                id: 'history buff',
              },
              {
                name: 'board games',
                id: 'board games',
              },
              {
                name: 'sports (playing)',
                id: 'sports (playing)',
              },
              {
                name: "mom's/dad's night out w/o kids",
                id: "mom's/dad's night out w/o kids",
              },
              {
                name: 'outdoor activities',
                id: 'outdoor activities',
              },
              {
                name: 'dining out',
                id: 'dining out',
              },
              {
                name: 'concerts/shows',
                id: 'concerts/shows',
              },
              {
                name: 'sports (watching)',
                id: 'sports (watching)',
              },

              {
                name: 'shopping',
                id: 'shopping',
              },

              {
                name: 'video games',
                id: 'video games',
              },

              {
                name: 'photography',
                id: 'photography',
              },
              {
                name: 'animal lover/pet owner',
                id: 'animal lover/pet owner',
              },
              {
                name: 'chess',
                id: 'chess',
              },

            
          ],
        },

      
      ];
      

 


    const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setSelectedItems(selectedItems);
    };

    const onOtherActivitiesChange = (otherActvities) => {
        // Set Selected Items
        setotherActvities(otherActvities);
    };

    const SubmitDetails = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail= JSON.parse(result)
            if(UserDetail != null)
            {
              Http.put('user/' + UserDetail.data.user.uid, {
                field_already_declared: {
                    und: [
                      {
                        value: "true",
                      },
                    ],
                  },
                  field_top3_activities: {
                    und: selectedItems,
                  }
               


              },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
                props.navigation.navigate('Tabs')
            }).catch(function (error) {
              setspinner(false)
              console.log(error.response)
          });
            }     
          }) 
   




    }

    const dontAskAgain = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail= JSON.parse(result)
            if(UserDetail != null)
            {
              Http.put('user/' + UserDetail.data.user.uid, {
                field_already_declared: {
                    und: [
                      {
                        value: "true",
                      },
                    ],
                  },
                 
              },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
              
                console.log(response)
                setspinner(false)
                             props.navigation.navigate('Tabs')

               
            })  
            }     
          }) .catch(function (error) {
            setspinner(false)
            console.log(error.response)
        });
   




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
            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}>Hello! Would you like to add your top three activities and interests to improve your search results?</Text>
                  
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Top 3 Activities/Interest</Text>
                        <View style={styles.iAmContainer}>
                        <SafeAreaView>
                        <View >
                            <View  >
                            <SectionedMultiSelect
                             items={items}
                             IconRenderer={Icon}
                             uniqueKey="id"
                             subKey="children"
                             showDropDowns={true}
                             readOnlyHeadings={true}
                             onSelectedItemsChange={onSelectedItemsChange}
                              selectedItems={selectedItems}
                             hideSearch={false}
                             expandDropDowns={true}
                             readOnlyHeadings={true}
                             selectChildren={true}
                             showChips	={false}
                             />

                              
                            </View>
                        </View>
                    </SafeAreaView>
                        </View>
                    </View>




                

                </View>
                <View>
                    <View style={{marginVertical:20}}>
                        <Button title="Add More to Profile"
                            containerStyle={{marginVertical:10}}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "#056AAD", borderRadius: 10,fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                            containerStyle={{ width: "100%" }}
                            onPress= {SubmitDetails} />
                    </View>
                    <View >
                        <Button title="Return to Search"
                            containerStyle={{marginVertical:10}}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10,fontFamily: 'Cairo_700Bold' }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                            containerStyle={{ width: "100%" }}
                            onPress={() => props.navigation.navigate('Tabs')} />
                    </View>
                </View>
                <View>
                

      <Text style={styles.upperText} onPress={dontAskAgain}>Don’t ask me this again</Text>
                </View>





            </View>

        </View>




    )

}
}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor:"white"
    },
    secondMainCotainer:
    {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    upperText:
    {
        fontFamily: "Montserrat_400Regular",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal:20

    },
    secondContainer:{
        justifyContent:"center",
        flex:2,
        marginHorizontal:20
    },
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat_400Regular',
        borderRadius:5,
        paddingTop:3,
        height:50
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16
    },
    mainContainerPicker:
    {
        marginVertical: 8
    },
    overflowContainer:
    {
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 80,
        overflow: "hidden"

    },
    spinnerTextStyle:{
      color:"white"
    }


})

export default Tophobbies