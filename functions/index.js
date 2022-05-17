const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
    return new Promise(function(resolve, reject) {
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
admin.initializeApp();

