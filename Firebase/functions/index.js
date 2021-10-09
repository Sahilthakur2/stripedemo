const functions = require("firebase-functions");
const faker = require('faker');
const admin = require('firebase-admin');
const fetch= require( "node-fetch")
//admin.initializeApp(functions.config().firebase);
var serviceAccount = require("./Private.json");
const { firestore } = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stripedemo-ae443.firebaseio.com"
});
let db = admin.firestore();
// Initialize products array
const products = [];

// Max number of products
const LIMIT = 2;

// Push a new product to the array
for (let i = 0; i < LIMIT; i++) {
  products.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//
// exports.createCustomer = functions.database.ref('Users')
//   .onWrite((change, context) => {
//     
//     return;
//   });
exports.helloWorld = functions.https.onRequest((request, response) => {
  data =[{name:"John", age:30}]
 
  db.collection('Users')
  .doc()
  //.get()
  .set({
   name: 'Ada Lovelace',
    age: 30,
  })
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send({ name: "John", age: 20 });
});


exports.createStripeCustomer = functions.firestore
  .document('Users/{userId}')
  .onWrite((change, context) => {
     let userid = context.params.userId
     let data1 = change.after.data();
     console.log("abcdef",data1.name);
  const card = {
      email: "st@sprinzo.com",
     description: 'My First Test Customer (created for API docs)',
    };
    const get = fetch('https://api.stripe.com/v1/customers', {
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
      .then((json) => 
      docRef.update({ 
        customer_id: json.id
       }),
       //console.log("abc" ,get.json)
       )

       let docRef = db.collection('Users').doc(userid);
       return docRef.update({ 
        customer_id: "123"
       })
      //  console.log("jhgjg") 
     
    
    // const customer = await stripe.customers.create({
    //   email:Email,
    //   name:Name,
    //   phone:formattedNumber,
    //   description: Name + ' - ' + Email + ' - ' + formattedNumber,
    // });
    // let docRef = db.collection('Users').doc(userid);
    // return docRef.update({ 
    //     customer_id: customer.id, 
    // });
  });

  exports.paymentIntent = functions.https.onRequest(async (request, response) => {
  
    var data = request.body
    console.log(data);
    const card = {
      amount: "2000",
      currency: 'usd',
     // payment_method_types:['card'],
      payment_method: "pm_1JiaSKSGk7DiM4KkfpYcQOTh",
      customer : "cus_KNJNRtFrmAYi2X"
    };

    const get = fetch('https://api.stripe.com/v1/payment_intents', {
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
      .then((json) => 

      console.log("payment_intent ",json.id) ,
    await  fetch('https://api.stripe.com/v1/payment_intents/pi_3JibhWSGk7DiM4Kk082WxiCg/confirm', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"sk_test_51JhuCHSGk7DiM4KkvTE9MnEN9Zcxeeip4wpVBRNbRbsqPLvRhh3r1EUvEdGCdYbsvvEghlMJUYOhdEmbdHhl2O4r00bwBs5BzZ"}`
      },
      method: 'POST',
      
    }).then(response => response.json())
      .then((json) => console.log("Payment_confirm ",json.id) ,
   await   fetch('https://api.stripe.com/v1/payment_intents/pi_3JibhWSGk7DiM4Kk082WxiCg/capture', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${"sk_test_51JhuCHSGk7DiM4KkvTE9MnEN9Zcxeeip4wpVBRNbRbsqPLvRhh3r1EUvEdGCdYbsvvEghlMJUYOhdEmbdHhl2O4r00bwBs5BzZ"}`
      },
      method: 'POST',
      
    }).then(response => response.json())
      .then((json) => 
      console.log("Payment capture ",json.id) )
      )
      )
       
       // docRef.update({ 
         //  customer_id:json.id ,
      // }) )
    //var accountID = data.accountID
    // const paymentMethod = await stripe.paymentMethods.create({
    //   payment_method: data.paymentID,
    // },{
    //   stripeAccount: 'acct_1JI8UvF9y62cH8y8',
    // });
    // console.log('paymentMethod',paymentMethod);
  //  stripe.paymentIntents.create({
  //     amount: data.amount,
  //     currency: data.currency,
  //     payment_method_types: ['card'],
  //     payment_method: data.paymentID,
  //     confirm: true,
  //   },{
  //     stripeAccount: 'acct_1JhuCHSGk7DiM4Kk',
  //   }).then((res) => {
  //     console.log('res',res);
  //     response.status(200).send(res);
  //   })
  //     .catch(err => {
  //       console.log('Error', err);
  //       response.status(400).send(err);
  //     });
   
    //return response.send({status: 200, client_secret : paymentIntent.client_secret, paymend_method: paymentMethod.id})
  });
  
exports.helloWorld = functions.https.onRequest((request, response) => {
  data =[{name:"John", age:30}]

  db.collection('Users')
  .doc()
  //.get()
  .set({
   name: 'Ada Lovelace',
    age: 30,
  })
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send({ name: "John", age: 20 });
});
// exports.listProducts = functions.https.onRequest((data, context) => {
//     // ...
//     return products
//   });