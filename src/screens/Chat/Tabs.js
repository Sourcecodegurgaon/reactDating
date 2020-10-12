import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SearchItems from './SearchItems'
import DropDownPicker from 'react-native-dropdown-picker';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import Http from '../../Api/Http'
import Favorate from './Favorate'

//Search User Tab
const SearcUserTab = ({navigation}) => {
  const [Postcode, setPostcode] = useState('')
  const [CountryValue, setCountry] = useState('')
  const [meetValue, setmeetValue] = useState("0");
  const [genderValue, setgenderValue] = useState("0");

  const [gender , setDefaultGender] = useState("")




  const [searchResults, setSearch] = useState('')




  const [liveValue, setliveValue] = useState("");

  const [selectedValue, setSelectedValue] = useState("");
  const [activityValue, setactivityValue] = useState("");

  // Result Show Hide Variables
  const [output, setoutput] = useState(false)
  const [search, setSearchField] = useState(true)

  useEffect(() => {
    font.loadAsync({
      'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
      'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
    });

  }, [])


  const searchResult = async () => {

   if (genderValue != 0) {
    setDefaultGender(genderValue);
  } else if (genderValue == 0) {
    setDefaultGender("");
  } 
    const response = await Http.get('search-view', {
      params: {
        postal: Postcode,
        country: CountryValue,
      }
    }

    ); setSearch(response.data)
    setoutput(true)
    setSearchField(false)
  }


  const showSearchFields = () => {
    setoutput(false)
    setSearchField(true)
  }

  return (
    <View style={styles.mainContainerField}>
      {/*Search Fields area start */}
      {search ? (
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.upperText}> Search User</Text>
            <Text style={styles.upperTextHeading}>Location</Text>
            <View style={styles.mainContainerPicker}>
              <Text style={styles.labelText}>Postcode</Text>
              <View style={styles.postocdeField}>
                <View style={{ flex: 5 }}>
                  <TextInput
                    placeholder='Enter Postcode' value={Postcode} onChangeText={newValue => setPostcode(newValue)} style={styles.TextInput} />

                </View>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Image style={styles.tinyLogo} source={require('../../../assets/Images/locate.png')} />
                </View>
              </View>
              <View style={styles.dropDownStyle}>
                <Text style={styles.labelText}>Country </Text>
                <DropDownPicker
                  items={[
                    { label: 'Australia', value: 'au' },
                    { label: 'Canada', value: 'ca' },
                    { label: 'India', value: 'in' },
                    { label: 'New Zealand', value: 'nz' },
                    { label: 'Singapore', value: 'sg' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'United States', value: 'us' },
                  ]}
                  containerStyle={styles.DropDown}
                  labelStyle={styles.dropDownActive}
                  
                  onChangeItem={items => setCountry(items.value)}
                  value={CountryValue}
                  defaultValue={CountryValue}
                  defaultIndex={0}
                />


                <View>
                  

                <Text style={styles.upperTextHeading}>Criteria</Text>
        
        <View style={styles.dropDownStyle}>

                  <Text style={styles.labelText}>Looking For</Text>
                <DropDownPicker
                  items={[
                    { label: 'No Prefrence', value: '0' },
                    { label: 'a few goods friends', value: '1' },
                    { label: 'a lot of accquaintancesa', value: '2' },
                    { label: 'no preference', value: '3' },
             
                  ]}
                  containerStyle={styles.DropDown}
                  labelStyle={styles.dropDownActive}
                  
                  onChangeItem={items => setmeetValue(items.value)}
                  value={meetValue}
                  defaultValue={meetValue}
                  defaultIndex={1}
                />
</View>

           
           <View style={styles.seconddropDownStyle}>
                <Text style={styles.labelText}>Gender</Text>
                <DropDownPicker
                  items={[
                    { label: 'No Prefrence', value: '0' },
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Gender Diverse', value: 'Gender Diverse' },
             
                  ]}
                  containerStyle={styles.DropDown}
                  labelStyle={styles.dropDownActive}
                  
                  onChangeItem={items => setgenderValue(items.value)}
                  value={genderValue}
                  defaultValue={genderValue}
                  defaultIndex={0}
                />
</View>









               <View style={{ marginVertical: 20 }} >
                    <Button title="Find Friends"
                      onPress={searchResult}
                      containerStyle={{ marginVertical: 10 }}
                      buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold' }}
                      titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                      containerStyle={{ width: "100%" }} />
                  </View>
                </View>
              </View>

              <Text style={styles.endText} >Reset Filter</Text>

            </View>

       
            {/* <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Activities</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={activityValue}
                                style={{ height: 35, width: "100%" }}
                                value={activityValue}
                                onValueChange={itemValue => setactivityValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="No Prefrence" value="No Prefrence" />
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />
                  
                            </Picker>
                        </View>
                    </View> */}
          </View>

          <View>


          </View>





        </View>



      ) : null}

      {/*Search Fields area End */}


      {/*Search Result area start */}

      {output ? (
        <View style={{ flex: 3 }}>

          <SearchItems searchResults={searchResults}  navigation={navigation}/>
          <Button title="Back"
            onPress={showSearchFields}
            containerStyle={{ marginVertical: 20 }}
            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold'}}
            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
            containerStyle={{ width: "100%" }} />
        </View>
      ) : null}


      {/*Search Result area End */}




    </View>




  )

}








function SettingsScreen() {
  return (
    <View><Text>Hello</Text></View>
    //<SearchField />
  );
}

function Favorates() {
  return (
    <Favorate />
  )
}



const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Chat') {
          iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
        } else if (route.name === 'Favorate') {
          iconName = focused ? 'ios-star' : 'ios-star';
        }
        else if (route.name === 'Search') {
          iconName = focused ? 'ios-search' : 'ios-search';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>

      <Tab.Screen name="Chat" component={SettingsScreen} />
      <Tab.Screen name="Favorate" component={Favorates} />
      <Tab.Screen name="Search" component={SearcUserTab} navigation={navigation}/>
    </Tab.Navigator>
  );
}

const Tabs = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({

  mainContainerField: {
    flex: 1,backgroundColor:"white"
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
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,

  },
  endText: {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20, color: "red"
  },
  secondContainer: {
    justifyContent: "center",
    flex: 2
  },
  iAmContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight'
  },
  labelText: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontFamily: 'Montserrat-ExtraLight',
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
  upperTextHeading: {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 10,
    marginVertical:10
  },
  tinyLogo: {
    height: 20,
    width: 20,
    marginTop: -20,
    marginLeft: 20
  },
  postocdeField: {
    flexDirection: "row",
    alignItems: "center",

  },
  dropDownStyle: {
    position: "relative",
    zIndex: 35,
    backgroundColor: '#fff',
    marginBottom:10
  },
  seconddropDownStyle:{
    position: "relative",
    zIndex: 30,
    backgroundColor: '#fff',
  },
  DropDown: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 40
  },
  dropDownActive: {
    fontFamily: 'Montserrat-ExtraLight'
  },
  TextInput: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-ExtraLight',
    borderRadius: 5,
    backgroundColor: "white"
  },


  // Result Conatiner Styles

  ResultsMainContainer: {
    flex: 2,

  },
  mainContainerOutput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 20,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10
  },
  mainHeading:
  {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 23,
    fontFamily: 'Cairo-Bold'
  },
  textContainer: {
    marginHorizontal: 10
  },
 




})

export default Tabs