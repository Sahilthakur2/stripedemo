import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
//import functions from '@react-native-firebase/functions';
import { StripeProvider, initStripe, CardField, CardForm, confirmPayment, useStripe, Stripe } from '@stripe/stripe-react-native';
//import stripe from "tipsi-stripe"
import Button from './src/components/Button';
import { demoCardFormParameters } from './src/screens/demodata';
import PaymentScreen from './src/screens/paymentscreen';
export default function App() {
  const { confirmPayment } = useStripe();
  const params = {
    //mandatory
    number: '4242424242424242',
    expMonth: 11,
    expYear: 37,
    cvc: '223',
    //optional
    name: 'Test User',
    currency: 'usd',
    addressLine1: '123 Test Street',
    addressLine2: 'Apt. 5',
    addressCity: 'Test City',
    addressState: 'Test State',
    addressCountry: 'Test Country',
    addressZip: '55555',
  }
  // stripe.init({
  //   publishableKey: 'pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n',
  // });

  const [products, setProducts] = useState();



  function getCreditCardToken(creditCardData) {

    const card = {
      email: "st@sprinzo.com",
      description: 'My First Test Customer (created for API docs)',
      // 'card[number]': "4242424242424242",
      // 'card[exp_month]': "8",


    };
    //console.log(params);

    return fetch('https://api.stripe.com/v1/customers', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data in request body
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${"sk_test_51JhuCHSGk7DiM4KkvTE9MnEN9Zcxeeip4wpVBRNbRbsqPLvRhh3r1EUvEdGCdYbsvvEghlMJUYOhdEmbdHhl2O4r00bwBs5BzZ"}`
      },

      method: 'POST',

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json())
      .then((json) => { setProducts(json) }, console.log("customer created"))
  };




  function getCreditCard(creditCardData) {

    const card = {
      'card[number]': "4242424242424242",
      'card[exp_month]': "8",
      'card[exp_year]': "24",
      'card[cvc]': "123",
      'card[name]': 'Test User',
      'card[currency]': 'usd',
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n"}`
      },
      method: 'POST',

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json())
      .then((json) => { setProducts(json) }, console.log("payment created"))
  };

  function atachcustomer(creditCardData) {

    const card = {
      customer : "cus_KNJNRtFrmAYi2X",
      //type : "card"
      // 'card[number]': "4242424242424242",
      // 'card[exp_month]': "8",
      // 'card[exp_year]': "24",
      // 'card[cvc]': "123",
      // 'card[name]': 'Test User',
      // 'card[currency]': 'usd',
    };
    return fetch('https://api.stripe.com/v1/payment_methods/pm_1JiaSKSGk7DiM4KkfpYcQOTh/attach', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"sk_test_51JhuCHSGk7DiM4KkvTE9MnEN9Zcxeeip4wpVBRNbRbsqPLvRhh3r1EUvEdGCdYbsvvEghlMJUYOhdEmbdHhl2O4r00bwBs5BzZ"}`
      },
      method: 'POST',

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json())
      .then((json) => { setProducts(json) }, console.log("payment created"))
  };


  function paymethodmethod(creditCardData) {

    const card = {
    
      'card[number]': "4242424242424242",
      'card[exp_month]': "8",
      'card[exp_year]': "24",
      'card[cvc]': "123",
     type : "card"
    };
    return fetch('https://api.stripe.com/v1/payment_methods', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n"}`
      },
      method: 'POST',

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json())
      .then((json) => { setProducts(json) }, paymentintent() ,console.log("payment created"))
  };

  function paymentintent(){
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n"}`
         },
      body: JSON.stringify({ 
        amount: "30",
        currency: "usd",
        payment_method: products.id,
        payment_method_types:'card',
        confirm:true,
        
       })
  };
  fetch("http://localhost:5001/stripedemo-ae443/us-central1/paymentIntent", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }



  



  useEffect(() => {
    initStripe({
      publishableKey: "pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n",

    });
  }, []);


  const [publishableKey, setPublishableKey] = useState('');
  const [loading, setLoading] = useState(true);


  function json() {
    console.log(products.id);
  }



  function store() {

    firestore()
      .collection('Users')
      .doc()
      //.get()
      .set({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  }



  async function getMoviesFromApi() {
    try {
      const response = await fetch('http://localhost:5001/stripedemo-ae443/us-central1/helloWorld');
      const json = await response.json();
      console.log(json.name);
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };




  //export default function  CardFormScreen()  {
  return (
    <View style={{ backgroundColor: "white", justifyContent: "center", flex: 1 }}>
      <Text onPress={() => getMoviesFromApi()}>create user</Text>
      <Text onPress={() => store()}>store</Text>
      <StripeProvider
        style={{ height: 150 }}
        publishableKey={"pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n"}
      //merchantIdentifier="merchant.identifier"
      >
        <CardField
          // style={{height: 50}}
          postalCodeEnabled={true}

          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#fff121',
            textColor: '#000000',

          }}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            global.pay = cardDetails
            //confirmPayment(cardDetails)
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
      </StripeProvider>
      <Text onPress={() => json()
        //confirmPayment(global.pay)
      } >value --

      </Text>
      <Text onPress={() => getCreditCard()
        //confirmPayment(global.pay)
      } >generate token

      </Text>
      <Text onPress={() => getCreditCardToken()
        //confirmPayment(global.pay)
      } >
        create  new customer
      </Text>
      <Text onPress={() => paymethodmethod()
        //confirmPayment(global.pay)
      } >
        create  payment method id 
      </Text>
      <Text onPress={() => atachcustomer()
        //confirmPayment(global.pay)
      } >attach customer

      </Text>


    

      
    </View>
  )
}
// stripe.setOptions({
//   publishableKey : "pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n",
// })
// export default function  CardFormScreen()  {


// const [loading, setLoading] = useState()
// const [paymentMethod, setpaymentMethod] = useState(null)


//  const  handleCardPayPress = async () => {
//   // console.log("hello");
//     try {
//      // console.log("hello1");
//      setLoading(true)
//       setpaymentMethod(null)


//      const paymentMethod1= await stripe.paymentRequestWithCardForm(demoCardFormParameters)
// console.log("dgd",paymentMethod1);
//       setLoading(false)
//       setpaymentMethod(paymentMethod1)
//     } catch (ErrorEvent) {
//       console.log(ErrorEvent);
//       setLoading(false)
//     }
//   }




//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Card Form Example</Text>
//          <Text style={styles.instruction}>Click button to show Card Form dialog.</Text>

//       <TouchableOpacity onPress={()=>handleCardPayPress()}>
//         <Text>
//           enter card and pay
//         </Text>
//          {/* // text="Enter you card and pay"
//           loading={loading}
//          // onPress={handleCardPayPress()} */}

//        </TouchableOpacity> 
//        <Button
//           text="Enter your card and pay"
//           loading={loading}
//           onPress={() => handleCardPayPress()}

//         />
//          <View style={styles.paymentMethod} >
//           {paymentMethod}
//             <Text style={styles.instruction}>Payment Method: {JSON.stringify(paymentMethod)}</Text>

//         </View>
//       </View>
//     )
//   }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor:"white"
//   },
//   header: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instruction: {
//     textAlign: 'center',
//     color: 'black',
//     marginBottom: 5,
//   },
//   paymentMethod: {
//     height: 20,
//   },
// })