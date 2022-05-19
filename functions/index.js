const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { query } = require("@firebase/firestore");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// alias firebase="`npm config get prefix`/bin/firebase"

exports.singlePlayerText = functions.https.onCall((data, context) => {
  //GETTING EVERYTHING WHERE MOOD IS FALSE
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = [];
    const resRef = db.collection('restaurants');
    resRef.where("MOOD", "==", false).get().then((querySnpshot) => {
      querySnpshot.forEach(doc => {
        result.push({
          resName: doc.data().RESTAURANT,
        })
      })
      console.log(result);
      resolve(result);
    })


    // resRef.get().then((querySnapshot) => {
    //   querySnapshot.forEach(doc => {
    //     console.log(doc.data().RESTAURANT);
    //     if (doc.data().RESTAURANT === 'Timeless Tea') {
    //       console.log("FOUND IT")
    //       result = doc.data().RESTAURANT;
    //       resolve(result);
    //     }
    //   });
    //  });
  })
});

exports.loadNationalities = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    // console.log(data.category);
    // console.log(data)
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = "";
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      console.log("YOOOO" + querySnapshot)
      querySnapshot.forEach(doc => {
        checker = doc.data().RESTAURANT;
        // console.log("doc data = " + doc.data().CATEGORY)
        // console.log("data data = " + data.category)
        if (doc.data().CATEGORY + "" === data.category) {
          // console.log("FIRST IF PASSED")
          // console.log(doc.data().NATIONALITY)
          const nationalities = doc.data().NATIONALITY.split(",");
          // console.log(nationalities)
          for (let i = 0; i < nationalities.length; i++) {
            if (!listChecker.includes(nationalities[i])) {
              console.log("FINAL IF")
              listChecker += nationalities[i];
              result.push({
                nationality: nationalities[i]
                // console.log(result)
              })
            }
          }
        }
      })
      console.log(result)
      resolve(result);
    })
  })
});

exports.navFromNationalities = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = 0;
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (data.category + "" === doc.data().CATEGORY) {
          for (let nationalityArrayIndex = 0; nationalityArrayIndex < data.nationality.length; nationalityArrayIndex++) {
            if (doc.data().NATIONALITY.includes(data.nationality[nationalityArrayIndex])) {
              result++;
              break;
            }
          }
        }
      })
      resolve(result);
    })
  })
})

exports.loadDesserts = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    // console.log(data.category);
    // console.log(data)
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = "";
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      console.log("YOOOO" + querySnapshot)
      querySnapshot.forEach(doc => {
        checker = doc.data().RESTAURANT;
        // console.log("doc data = " + doc.data().CATEGORY)
        // console.log("data data = " + data.category)
        if (doc.data().CATEGORY + "" === data.category) {
          // console.log("FIRST IF PASSED")
          // console.log(doc.data().NATIONALITY)
          const desserts = doc.data().DESSERT.split(",");
          // console.log(nationalities)
          for (let i = 0; i < desserts.length; i++) {
            if (!listChecker.includes(desserts[i])) {
              console.log("FINAL IF")
              listChecker += desserts[i];
              result.push({
                dessert: desserts[i]
                // console.log(result)
              })
            }
          }
        }
      })
      console.log(result)
      resolve(result);
    })
  })
});

exports.navFromDesserts = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = 0;
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (data.category + "" === doc.data().CATEGORY) {
          for (let dessertArrayIndex = 0; dessertArrayIndex < data.dessert.length; dessertArrayIndex++) {
            if (doc.data().DESSERT.includes(data.dessert[dessertArrayIndex])) {
              result++;
              break;
            }
          }
        }
      })
      resolve(result);
    })
  })
})

exports.loadAmbiances = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = "";
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        checker = doc.data().RESTAURANT;
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // get array of the ambiances of this restaurant
                const ambianceArray = doc.data().AMBIANCE.split(",");
                // go through ambiance array
                for (let ambianceIndex = 0; ambianceIndex < ambianceArray.length; ambianceIndex++) {
                  // add ambiance to ambiance category list if it is not already in the list
                  if (!listChecker.includes(ambianceArray[ambianceIndex])) {
                    listChecker += ambianceArray[ambianceIndex];
                    result.push({
                      ambiance: ambianceArray[ambianceIndex]
                    })
                  }
                }
              }
            }
          }

          // check dessert list if it exists
          if (data.dessert && data.dessert.length) {
            // loop through the possible desserts
            for (let dessertIndex = 0; dessertIndex < data.dessert.length; dessertIndex++) {
              // check if dessert from result is in the restaurant's dessert list
              if (doc.data().DESSERT.includes(data.dessert[dessertIndex])) {
                // get array of the ambiances of this restaurant
                const ambianceArray = doc.data().AMBIANCE.split(",");
                // go through ambiance array
                for (let ambianceIndex = 0; ambianceIndex < ambianceArray.length; ambianceIndex++) {
                  // add ambiance to ambiance category list if it is not already in the list
                  if (!listChecker.includes(ambianceArray[ambianceIndex])) {
                    listChecker += ambianceArray[ambianceIndex];
                    result.push({
                      ambiance: ambianceArray[ambianceIndex]
                    })
                  }
                }
              }
            }
          }
        }
      })
      resolve(result);
    })
  })
})
admin.initializeApp();

