import React, { useState, useEffect, Component } from 'react';
import { Text, StyleSheet, View, Dimensions, SafeAreaView, ScrollView, Image, Platform, TouchableHighlight, TouchableOpacity } from "react-native";
import axios from 'axios';
import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal';
import { WebView,ActivityIndicator } from 'react-native'
const queryString = require('query-string');
var qs = require('qs');
var data = qs.stringify({'grant_type':'client_credentials'});
var detail = qs.stringify({ "intent": "sale","payer": {"payment_method": "paypal" }})
export default class PayPalExpressCheckOut extends Component {

    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    }

    componentDidMount() {
        let currency = '100 USD'
        currency.replace(" USD", "")

        const dataDetail = {
            "intent": "sale",
            "payer": {"payment_method": "paypal" },
            "transactions": [{
                "amount": {
                    "total": currency,
                    "currency": "US", 
                    "details": {
                        "subtotal": currency,
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                }

            }],
            // "redirect_urls": {
            //     "return_url": "https://example.com",
            //     "cancel_url": "https://example.com"
            // }


        }

        axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic QVJkWjNlNXdBamlBaWJzV3JsTFVYeHppcDRkWUFkc2pILWdLSnJ2Umh2aHFXOHFiVkc1YVB6Qi0xT3JCRE5DM0tnZ2h4TElZeHBUQS10M3Q6RU03MmxDeFIyWWtiMnJVdnpGU3BYVnQzNU1Kbk9CWV9PZDlRbUgzZWZPYU16XzduVzJPbkdmc3Rrd2hFUFpmdlJDX19hWlZOcXlNN1BMNXU=',
                }
            }
        )
            .then(response => {
                this.setState({
                    accessToken: response.data.access_token
                })
                console.log(this.state.accessToken)

                axios.post('https://api.sandbox.paypal.com/v1/payments/payment', qs.stringify(dataDetail),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.state.accessToken}`
                        }
                    }
                )
                    .then(response => {

                        const { id, links } = response.data
                        const approvalUrl = links.find(data => data.rel == "approval_url")

                        this.setState({paymentId: id,approvalUrl: approvalUrl.href})
                    }).catch(err => {
                        console.log({ ...err })
                    })
            }).catch(err => {
                console.log({ ...err })
            })

    }

    _onNavigationStateChange = (webViewState) => {



            this.setState({
                approvalUrl: null
            })

            const { PayerID, paymentId } = webViewState.url

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    console.log(response)

                }).catch(err => {
                    console.log({ ...err })
                })

        
    }

    render() {

        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? <WebView
                        style={{ height: 400, width: 300 }}
                        source={{ uri: approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <ActivityIndicator />
                }
            </View>
        )
    }
}



