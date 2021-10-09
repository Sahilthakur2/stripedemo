import { CardField, useStripe } from '@stripe/stripe-react-native';
import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'


export default function PaymentScreen() {
  const { confirmPayment } = useStripe();

  return (

    
    <CardField 
    style={{height: 150}}
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
  );
}