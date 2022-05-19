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

exports.loadNationalities = functions.https.onCall((data, context) => {
  return new Promise(function(resolve, reject) {
    // console.log(data.category);
    // console.log(data)
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = [];
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      console.log("YOOOO" + querySnapshot)
      querySnapshot.forEach(doc => {
        checker = doc.data().RESTAURANT;
        // console.log("doc data = " + doc.data().CATEGORY)
        // console.log("data data = " + data.category)
        if(doc.data().CATEGORY + "" === data.category) {
          // console.log("FIRST IF PASSED")
          // console.log(doc.data().NATIONALITY)
          const nationalities = doc.data().NATIONALITY.split(",");
          // console.log(nationalities)
          for(let i = 0; i < nationalities.length; i++) {
            if(!listChecker.includes(nationalities[i])) {
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
})
admin.initializeApp();

