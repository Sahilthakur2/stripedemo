import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import stripe from 'tipsi-stripe'
//const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
export default function demopayment() {
    const params = {
        //mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 17,
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
      
     
    useEffect(async() => {
        const customer = await stripe.customers.create({
            email: 'jenny.rosen@example.com',
            payment_method: 'pm_1FWS6ZClCIKljWvsVCvkdyWg',
            invoice_settings: {
              default_payment_method: 'pm_1FWS6ZClCIKljWvsVCvkdyWg',
            },
          });
        
        //stripe.setOptions({
         //   publishableKey: 'pk_test_51JhuCHSGk7DiM4KkBx5XjjrV3HsujUKr95betl4VgT9S8ZXskOTiZHVPgsN6WJRlsW69Cf7X37K95wvBCvBEpu8p00tZuSmr4n',
          
       //   })
       
}, [])
 async function ab(){
    const paymentMethod1= await stripe.paymentRequestWithCardForm(params)
}
  
    return (
       
    //         <PaymentCardTextField
    //      style={styles.field}
    //     cursorColor={"red"}
    //     textErrorColor={"red"}
    //     placeholderColor={"red"}
    //     numberPlaceholder={"red"}
    //     expirationPlaceholder={"red"}
    //     cvcPlaceholder={"red"}
    //     disabled={false}
    //     onParamsChange={handleFieldParamsChange}
    //   />
    <View style={{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center"
    }}>
        <Text onPress={()=>ab()} >Hello</Text>
    </View>
     
    )
}

const styles = StyleSheet.create({
    field: {
      width: 300,
      color: '#449aeb',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
    }
  })
