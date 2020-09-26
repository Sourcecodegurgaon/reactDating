import { Text, StyleSheet, View, Picker, FlatList } from "react-native";
import Navigationbar from '../../../Navigationbar';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import UserResult from './UserList'
import * as font from 'expo-font';
const SearchResult = props => {
    const { navigation } = props;
    const post = navigation.getParam('term')
    const [searchPostcode, setserachPostocde] = useState([])

    const country = navigation.getParam('selectedValue')

    useEffect(() => {
        async function getKind() {
            const response = await Http.get('post-json', {
                params: {
                    postal_code: post,
                    country: country
                }
            });setserachPostocde(response.data)
        }

        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../../assets/fonts/Montserrat-ExtraLight.ttf')
              });
        getKind();
    }, []);
    return (
    
        <View style={{flex:1,backgroundColor:"white"}}>
            <Navigationbar />
            <UserResult searchPostcode={searchPostcode} tittle="Members near you"  /> 
        </View>

    )


}





export default SearchResult