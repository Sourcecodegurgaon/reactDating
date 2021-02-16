import React, { useState, useEffect, Component } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TouchableHighlight, TouchableOpacity } from "react-native";
import axios from 'axios';
import { WebView,ActivityIndicator } from 'react-native'
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
import { PayPalButton } from "react-paypal-button-v2";


import * as InAppPurchases from 'expo-in-app-purchases';

import { Button } from 'react-native-elements';

const PayPalExpressCheckOut = () =>{
 

    return(



        <View><Text>Hello</Text>
        

        <Button title="Log In" //onPress={componentDidMount}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                    />
    
        </View>
    )
}
export default PayPalExpressCheckOut



