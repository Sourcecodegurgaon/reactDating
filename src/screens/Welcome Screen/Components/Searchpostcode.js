
import { Text, StyleSheet, View, Picker ,FlatList } from "react-native";
import Navigationbar from '../../../Navigationbar';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component ,useEffect} from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";
import * as font from 'expo-font';
const Searchpostcode = props => {
    //OverLay 
    const [visible, setVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState("");
    const toggleOverlay = () => {
        setVisible(visible);
    };
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf')
              });
          },[])


    // Geetting SearchResult
    const [searchPostcode, setserachPostocde] = useState([])
    const [term, setTerm] = useState('')




    return (
        //Html
        <View style={styles.MainBackground}>
      <View  style={styles.SecondMainBackground}>
            <Text style={styles.upperText}>Oops! Looks like we have not yet expanded to your area. Click here to suggest that we come to you next!
       Click here to suggest that we come to you next</Text>


            <Text style={styles.lowerText}>Find Friends</Text>
            <View style={{ marginHorizontal: 5}}>
                <Input placeholder='Postcode' value={term} onChangeText={newValue => setTerm(newValue)} style={{borderWidth:1,paddingHorizontal:8}}/>
            </View>

            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: "90%" , borderWidth:1, borderColor:"black"}}
                    value={selectedValue}
                    onValueChange={itemValue => setSelectedValue(itemValue)}>
                    <Picker.Item label="Australia" value="au" />
                    <Picker.Item label="Canada" value="ca" />
                    <Picker.Item label="India" value="in" />
                    <Picker.Item label="New Zealand" value="nz" />
                    <Picker.Item label="Singapore" value="sg" />
                    <Picker.Item label="United Kingdom" value="uk" />
                    <Picker.Item label="United States" value="us" />
                </Picker>
            </View>
            <Button containerStyle={{ marginHorizontal: 30, marginVertical: 30 }}
             titleStyle={{fontFamily:'Cairo-Bold',fontSize:20}}
             underlineColor="transparent"
             inputContainerStyle={{borderWidth:"none"}}
                buttonStyle={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}
                title="Search"
                onPress={() => props.navigation.navigate('WelcomeResult',{
                    term,selectedValue
                })}/>
           
</View>





        </View>





    );

};





const styles = StyleSheet.create({
    MainBackground: {
        backgroundColor: "#08080885",
        flex: 1,
        justifyContent:"center"
    },
    SecondMainBackground: {
        backgroundColor: "white",
         marginVertical: 20,
        marginHorizontal: 20,
        marginTop: 50,
        justifyContent:"center"
    },
    upperText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 23,
        fontFamily:'Cairo-Bold',
        lineHeight:30

    },
    lowerText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'Cairo-Bold',
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
        marginHorizontal: 15,
    },
  
});

export default Searchpostcode