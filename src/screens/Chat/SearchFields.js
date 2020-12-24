import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import SearchItems from './SearchItems'
import Http from '../../Api/Http'
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight,Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Overlay } from 'react-native-elements';

const SearchFields = (props) => {

  const navigation = useNavigation();

  const [Postcode, setPostcode] = useState('')
  const [CountryValue, setCountry] = useState('')
  const [meetValue, setmeetValue] = useState("0");

  const [gender, setDefaultGender] = useState("")
  const [searchResults, setSearch] = useState()
  const [liveValue, setliveValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [activityValue, setactivityValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [android, setAndroid] = useState(false)
  const [ios, setIos] = useState(false)

  // Result Show Hide Variables
  const [output, setoutput] = useState(false)
  const [search, setSearchField] = useState(true)
  //Spinner
  const [spinner, setspinner] = useState(false)

  const [genderValue, setgenderValue] = useState(null);
  const [Male, setMale] = useState(false)
  const [Female, setFemale] = useState(false)
  const [Diverse, setDiverse] = useState(false)
  const [Everyone, setEveryone] = useState(false)
  const [nogender, setnogender] = useState(true)



  const [Minage, setMinage] = useState(null)
  const [Maxage, setMaxage] = useState(null)

  const [looking ,setLooking] = useState(null)
  const [goodfriends , setgoodfriends] = useState(false)
  const [preference , setPrefrence] = useState(false)
  const [lots,setlots] = useState(false)
  const [noFriend ,setnofriend] = useState(true)

  const [visible, setVisible] = useState(false);


 const [Message ,setMessage] = useState()
  let [fontsLoaded] = useFonts({
    Cairo_700Bold,
    Montserrat_200ExtraLight,
    Montserrat_400Regular
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };


  useEffect(() => {

    Platform.select({
      ios: () => setIos(true),
      android: () => setAndroid(true)
    })();

    AsyncStorage.getItem('Token', (err, result) => {
      const LogoutToken = JSON.parse(result)
      if (LogoutToken != null) {

          Http.get('user/' + LogoutToken.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': LogoutToken.data.sessid + "=" + LogoutToken.data.session_name, 'X-CSRF-Token': LogoutToken.data.token } }).then((response) => {
            console.log(LogoutToken.data.user.field_tutorial.length)
            if(LogoutToken.data.user.field_tutorial.length == 0)
            {
              props.navigation.navigation.navigate('Chats')
              //props.navigation.navigation.navigate('Toutorial')
            }
            else
            {
              props.navigation.navigation.navigate('Chats')

            }

        
          })


      }
  })
  }, [])

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
  

  const searchResult = async () => {

    if(genderValue == null || Minage == null || Maxage == null || looking == null)
    {
      setVisible(true)
      setMessage("Please fill all fields")
    }
    else
    {
      setspinner(true)
      const response = await Http.get('search-view', {
        params: {
          gender: genderValue,
          meet:looking,
          activity:selectedItems
        }
      }
  
      );
      if(response.data.length == 0)
      {
        setspinner(false)
        setVisible(true)
        setMessage("No result Found")
      }
      else
      {


        setSearch(response.data)
        setspinner(false)
        setoutput(true)
        setSearchField(false)

 
      
     
      }

    



   
  }
  }

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };
  const showSearchFields = () => {
    setoutput(false)
    setSearchField(true)
  }


  const MaleSelect = () => {

    setgenderValue("Male")
    setMale(true)
    setFemale(false)
    setDiverse(false)
    setEveryone(false)
    setnogender(false)
  }

  const FemaleSelect = () =>{
    setgenderValue("Female")
    setMale(false)
    setFemale(true)
    setDiverse(false)
    setEveryone(false)
    setnogender(false)

  }

  const DiverseSelect = () =>{
    setgenderValue("Gender Diverse")
    setMale(false)
    setFemale(false)
    setDiverse(true)
    setEveryone(false)
    setnogender(false)
  }

  const EveryoneSelect = () =>{
    setgenderValue("Everyone")
    setMale(false)
    setFemale(false)
    setDiverse(false)
    setEveryone(true)
    setnogender(false)
    
  }



 const goodSelect = () =>{
   setLooking("1")
   setgoodfriends(true)
   setPrefrence(false)
   setlots(false)
   setnofriend(false)
 }

 const lotsSelect = () =>{
  setLooking("2")
  setgoodfriends(false)
  setPrefrence(true)
  setlots(false)
  setnofriend(false)
 }

 const prefrenceSelect = () =>{
  setLooking("3")
  setgoodfriends(false)
  setPrefrence(false)
  setlots(true)
  setnofriend(false)
 }

 const resetFilter =() =>{
  setLooking()
  setgoodfriends(false)
  setPrefrence(false)
  setlots(false)
  setnofriend(true)
  setgenderValue()
  setMale(false)
  setFemale(false)
  setDiverse(false)
  setEveryone(false)
  setnogender(true)
  setMinage(null)
  setMaxage(null)
  setSelectedItems([])
  setSearch()
 }

  if (!fontsLoaded) {
    return (<AppLoading />)
  }
  
  else {
    return (
      <View style={styles.mainContainerField}>
        {spinner ? (
          <View style={styles.OverLayColor}>
            <View style={styles.OverLayImage}>
              <Image style={styles.ImageStyle} source={require('../../../assets/Images/loader.jpg')} />
            </View>
          </View>
        ) : null}
        <SafeAreaView>

          <ScrollView indicatorStyle={"white"}>
            <View style={{ paddingHorizontal:10}}>

              {/*Search Fields area start */}
              {search ? (
                <View style={styles.secondContainer}>

                  <Text style={styles.upperText}> Search User</Text>




                  <View style={styles.genderContainer}>


                    <View style={styles.postocdeField}>
                      <Text style={styles.headinglabelText}>Show Me : </Text>
                    </View>
                    {Male ? (
                      <View style={styles.GenderSelect}>
                        <Text>
                          <Text style={styles.boldLabel} onPress={MaleSelect}>Male</Text>
                          <Text style={styles.labelText} onPress={FemaleSelect}>/Female</Text>
                          <Text style={styles.labelText} onPress={DiverseSelect}>/Gender Diverse/</Text>
                          <Text style={styles.labelText} onPress={EveryoneSelect}>Everyone</Text>
                        </Text>

                      </View>
                    ) : null}


                    {Female ? (
                      <View style={styles.GenderSelect}>
                        <Text>
                          <Text style={styles.labelText} onPress={MaleSelect}>Male/</Text>
                          <Text style={styles.boldLabel} onPress={FemaleSelect}>Female</Text>
                          <Text style={styles.labelText} onPress={DiverseSelect}>/Gender Diverse/</Text>
                          <Text style={styles.labelText} onPress={EveryoneSelect}>Everyone</Text>
                        </Text>
                      </View>
                    ) : null}
                    {Diverse ? (

                      <View style={styles.GenderSelect}>
                        <Text>
                          <Text style={styles.labelText} onPress={MaleSelect}>Male/</Text>
                          <Text style={styles.labelText} onPress={FemaleSelect}>Female/</Text>
                          <Text style={styles.boldLabel} onPress={DiverseSelect}>Gender Diverse</Text>
                          <Text style={styles.labelText} onPress={EveryoneSelect}>/Everyone</Text>
                        </Text>
                      </View>



                    ) : null}

                    {Everyone ? (

                      <View style={styles.GenderSelect}>
                        <Text>
                          <Text style={styles.labelText} onPress={MaleSelect}>Male/</Text>
                          <Text style={styles.labelText} onPress={FemaleSelect}>Female/</Text>
                          <Text style={styles.labelText} onPress={DiverseSelect}>Gender Diverse/</Text>
                          <Text style={styles.boldLabel} onPress={EveryoneSelect}>Everyone</Text>
                        </Text>
                      </View>



                    ) : null}

                    {nogender ? (
                      <View style={styles.GenderSelect}>
                        <Text>
                          <Text style={styles.labelText} onPress={MaleSelect}>Male/</Text>
                          <Text style={styles.labelText} onPress={FemaleSelect}>Female/</Text>
                          <Text style={styles.labelText} onPress={DiverseSelect}>Gender Diverse/</Text>
                          <Text style={styles.labelText} onPress={EveryoneSelect}>Everyone</Text>
                        </Text>
                      </View>


                    ) : null}

                  </View>



                  <View style={styles.ageContainer}>
                    <View style={styles.postocdeField}>
                      <Text style={styles.headinglabelText}>Age : </Text>
                    </View>
                    <View style={styles.AgeFields}>
                      <View>
                      <TextInput
                        style={{ borderColor: 'gray', borderBottomWidth: 1 ,width:60}}
                        onChangeText={text => setMinage(text)}
                        value={Minage}
                      />
                      </View>
                      <View>
                      <Text style={styles.labelText}> to </Text>
                       </View>
                       <View>
                      <TextInput
                        style={{  borderColor: 'gray', borderBottomWidth: 1,width:60 }}
                        onChangeText={text => setMaxage(text)}
                        value={Maxage}
                      />
                      </View>
                    </View>


                   


                    
                  </View>




                  <View style={styles.lookingContainer}>
                    <View style={styles.postocdeField}>
                      <Text style={styles.headinglabelText}>of me, who are looking for : </Text>
                    </View>
                  </View>
                  <View style={styles.FriendSelect}>
                  {goodfriends ?(
                      <Text>
                        <Text style={styles.boldLabel} onPress={goodSelect}>a few good friends,</Text>
                        <Text style={styles.labelText} onPress={lotsSelect}> lots of acquaintances,</Text>
                        <Text style={styles.labelText} onPress={prefrenceSelect}> no preference</Text>
                      </Text>
                      ):null}

                   {lots ?(
                      <Text>
                        <Text style={styles.labelText} onPress={goodSelect}>a few good friends,</Text>
                        <Text style={styles.boldLabel} onPress={lotsSelect}>  lots of acquaintances,</Text>
                        <Text style={styles.labelText} onPress={prefrenceSelect}> no preference</Text>
                      </Text>
                      ):null}

                     {preference ?(
                      <Text>
                        <Text style={styles.labelText} onPress={goodSelect}>a few good friends,</Text>
                        <Text style={styles.labelText} onPress={lotsSelect}>  lots of acquaintances,</Text>
                        <Text style={styles.boldLabel} onPress={prefrenceSelect}>  no preference</Text>
                      </Text>
                      ):null} 

                     {noFriend  ?(
                      <Text>
                        <Text style={styles.labelText} onPress={goodSelect}>a few good friends,</Text>
                        <Text style={styles.labelText} onPress={lotsSelect}> lots of acquaintances,</Text>
                        <Text style={styles.labelText} onPress={prefrenceSelect}>no preference</Text>
                      </Text>
                      ):null} 

                    </View>

                    <View style={styles.lookingContainer}>
                    <View style={styles.postocdeField}>
                      <Text style={styles.headinglabelText}>and likes: </Text>
                    </View>
                  </View>
                  <View style={styles.FriendSelect}>
                 

                    <View style={{ borderRadius: 5, borderWidth: 1, height: 50, marginTop: 10, marginRight: 10 }}>
                      <SectionedMultiSelect
                        items={items}
                        IconRenderer={Icon}
                        uniqueKey="id"
                        subKey="children"
                        showDropDowns={true}
                        readOnlyHeadings={false}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        hideSearch={false}
                        expandDropDowns={true}
                        readOnlyHeadings={true}
                        selectChildren={true}
                        selectLabelNumberOfLines={0}
                        showChips	={false}
                        showCancelButton ={true}
                        single={true}
                      />



                    </View>





                    </View>


                  





                  <View style={{ marginVertical: 20 }} >
                    <Button title="Find Friends"
                      onPress={searchResult}
                      containerStyle={{ marginVertical: 10 }}
                      buttonStyle={{ marginHorizontal: 15, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                      titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                      containerStyle={{ width: "100%" }} />
                  </View>





                   <TouchableOpacity onPress={resetFilter}>
                  <Text style={styles.endText} >Reset Filter</Text>
                  </TouchableOpacity>






                  <View>
                  </View>
                </View>
              ) : null}

              {/*Search Fields area End */}
              {/*Search Result area start */}
              {output ? (
                <View style={{ flex: 3 }}>
                  <SearchItems searchResults={searchResults} navigation={props} minage={Minage}  Maxage={Maxage}/>

                  <Button title="Back"
                    onPress={showSearchFields}
                    containerStyle={{ marginVertical: 20 }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    containerStyle={{ width: "100%" }} />
                </View>
              ) : null}
 <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
   <View style={{marginHorizontal:20,paddingVertical:20}}>
     <View>
        <Text style={{  fontFamily: "Cairo_700Bold",
    fontSize: 18,paddingVertical:10,paddingHorizontal:20}}>{Message}</Text>
        </View>
        <View  style={{  fontFamily: "Cairo_700Bold",
    fontSize: 18,paddingVertical:10}}>
        <Button title="ok" onPress={toggleOverlay}  containerStyle={{marginHorizontal:20}}/>
        </View>
        </View>
      </Overlay>

              {/*Search Result area End */}




            </View>
          </ScrollView>
        </SafeAreaView>


      </View>
    )

  }
}
const styles = StyleSheet.create({

  mainContainerField: {
    flex: 1, backgroundColor: "white"
   
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
    fontFamily: "Cairo_700Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    marginTop:10

  },
  endText: {
    fontFamily: "Cairo_700Bold",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20, color: "red"
  },
  secondContainer: {
    justifyContent: "center",
    flex: 2
  },
  iAmContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    fontFamily: 'Montserrat_200ExtraLight'
  },
  labelText: {

    marginVertical: 5,
    fontFamily: 'Montserrat_200ExtraLight',
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
    fontFamily: "Cairo_700Bold",
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 10,
    marginVertical: 10
  },
  tinyLogo: {
    height: 20,
    width: 20,
    marginTop: -20,
    marginLeft: 20
  },
  postocdeField: {
    flexDirection: "row",
    alignContent: "flex-start"

  },
  dropDownStyle: {
    position: "relative",
    zIndex: 35,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  seconddropDownStyle: {
    position: "relative",
    zIndex: 30,
    backgroundColor: '#fff',
    marginBottom: 10
  },

  MultiMainDropDown: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',


  },
  DropDown: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 40
  },
  MultiDropDown: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    position: "relative",
    zIndex: 30,
    height: 40

  },
  dropDownActive: {
    fontFamily: 'Montserrat_200ExtraLight'
  },
  TextInput: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat_200ExtraLight',
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
    fontFamily: 'Cairo_700Bold'
  },
  textContainer: {
    marginHorizontal: 10
  },

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
    fontFamily: 'Cairo_700Bold'
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
    borderRadius: 3
  },
  textContainer: {
    marginHorizontal: 10
  },
  elipsText:
    { fontFamily: 'Montserrat_200ExtraLight', color: 'black', fontSize: 15, marginRight: 110 },
  iAmContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    fontFamily: 'Montserrat_200ExtraLight',
    borderRadius: 5,
    paddingTop: 3
  },
  androidDropDown: { borderWidth: 1, marginHorizontal: 10, borderRadius: 5 },
  androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 },
  spinnerTextStyle: {
    color: "white"
  },
  OverLayColor: {
    position: "absolute",
    top: 0,
    alignItems: "center",
    height: "100%",
    backgroundColor: "#000000c7",
    zIndex: 2,
    width: "100%",
    justifyContent: "center"
  },
  ImageStyle: {
    height: 320,
    width: 280,
    zIndex: 2
  },


  genderContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,


  },
  lookingContainer:{
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "flex-start",
    paddingTop:15
  },
  boldLabel: {
    fontFamily: "Cairo_700Bold",
    fontSize: 19
  },
  GenderSelect: {
    flexDirection: "row",
    paddingRight:20,
    marginRight:30

  },
  ageContainer:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    paddingLeft:20,
    paddingTop:15

  },
  AgeFields:{
    flexDirection:"row",
    alignItems:"center"
  },
  AgeText:{
    marginVertical: 5,
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 16
  },
  FriendSelect:{
    paddingLeft:20
  },
  headinglabelText:{

    fontFamily: 'Montserrat_400Regular',
    fontSize: 16
  }



})

export default SearchFields