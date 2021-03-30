# react-native-paypal-gateway

[![version](https://img.shields.io/badge/version-1.0.0-gree.svg)]('')

Or refer to this article <https://medium.com/zestgeek/paypal-integration-in-react-native-9d447df4fce1>

React Native PayPal Checkout, A React Native Wrapper for iOS and Android to make online payments using Paypal checkout and credit/debit card payments.

## Getting started

### Installation

```bash
 npm i --save react-native-paypal-gateway
 ```

or

```bash
 yarn add react-native-paypal-gateway
```

### Linking

```bash
react-native link react-native-paypal-gateway
```

## Extra steps for iOS 🙄 [see here](https://github.com/paypal/PayPal-ios-SDK#with-or-without-cocoapods)

## Usage

### Payment

```javascript
import PayPal from 'react-native-paypal-gateway';

// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initialize(PayPal.NO_NETWORK, "<your-client-id>");
PayPal.pay({
  price: '40.70',
  currency: 'USD',
  description: 'Your description goes here',
}).then(confirm => console.log(confirm))
  .catch(error => console.log(error));
```

### FuturePayment

```javascript
import PayPal from 'react-native-paypal-gateway';

// Required for Future Payments
const options = {
  merchantName : "Merchant name",
  merchantPrivacyPolicyUri: "https://example.com/privacy",
  merchantUserAgreementUri: "https://example.com/useragreement",
}
// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initializeWithOptions(PayPal.NO_NETWORK, "<your-client-id>", options);

PayPal.obtainConsent().then(authorization => console.log(authorization))
  .catch(error => console.log(error));

// To decrease payment declines, you must specify a metadata ID header (PayPal-Client-Metadata-Id)
// in the payment call. See docs:
// https://developer.paypal.com/docs/integration/mobile/make-future-payment/#required-best-practices-for-future-payments

const metadataID = await PayPal.getClientMetadataId();
```

### Disclaimer

This project is created solely to suit our requirements, no maintenance/warranty are provided. Feel free to send in pull requests.

### Acknowledgement

This Project is the copied version of [Taessina](taessina/react-native-paypal-wrapper )
(which had a severe issue of crashing the app on card payment in iOS, since the original repo was archived. We had to made modification to resolve this issue).

This project is inspired by [MattFoley](https://github.com/MattFoley/react-native-paypal) (which does not support both Android and iOS simultaneously, and [shovelapps](https://github.com/shovelapps/react-native-paypal) a fork of the former repo (which we had some problems trying to integrate due to React Native version).
