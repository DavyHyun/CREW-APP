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
});

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
});

exports.navFromAmbiances = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = 0;
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // if it is, increment res count then move on to next restaurant
                    result++;
                    nationalityIndex = data.nationality.length;
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
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // if it is, increment res count then move on to next restaurant
                    result++;
                    dessertIndex = data.dessert.length;
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
});

exports.loadDining = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = "";
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // if it is, add dining to dining list if it is not already on list
                    if (!listChecker.includes(doc.data().DINING)) {
                      listChecker += doc.data().DINING;
                      result.push({
                        dining: doc.data().DINING
                      })
                    }
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
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // if it is, add dining to dining list if it is not already on list
                    if (!listChecker.includes(doc.data().DINING)) {
                      listChecker += doc.data().DINING;
                      result.push({
                        dining: doc.data().DINING
                      })
                    }
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
});

exports.navFromDining = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = 0;
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        result++;
                        nationalityIndex = data.nationality.length;
                      }
                    }

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
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        result++;
                        dessertIndex = data.dessert.length;
                      }
                    }
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
});

exports.loadPrices = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = [];
    var checker;
    var listChecker = "";
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {
          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        // add price to price category if not already added
                        if (!listChecker.includes(doc.data().PRICE)) {
                          listChecker += doc.data().PRICE;
                          result.push({
                            price: doc.data().PRICE
                          })
                        }
                      }
                    }

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
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        // add price to price category if not already added
                        if (!listChecker.includes(doc.data().PRICE)) {
                          listChecker += doc.data().PRICE;
                          result.push({
                            price: doc.data().PRICE
                          })
                        }
                      }
                    }
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
});

exports.navFromPrices = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = 0;
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        // loop through possible prices
                        for (let priceIndex = 0; priceIndex < data.price.length; priceIndex++) {
                          // check if price from result price array is in restaurant's price
                          if (doc.data().PRICE.includes(data.price[priceIndex])) {
                            result++;
                            nationalityIndex = data.nationality.length;
                          }
                        }
                      }
                    }

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
                // loop through the possibel ambiances
                for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                  // check if ambiance from result ambiance array is in restaurant's ambaince list
                  if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                    // loop through possible dining speeds
                    for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                      // check if dining index from result dining array is in restaurant's dining
                      if (doc.data().DINING.includes(data.dining[diningIndex])) {
                        // loop through possible prices
                        for (let priceIndex = 0; priceIndex < data.price.length; priceIndex++) {
                          // check if price from result price array is in restaurant's price
                          if (doc.data().PRICE.includes(data.price[priceIndex])) {
                            result++;
                            dessertIndex = data.dessert.length;
                          }
                        }
                      }
                    }
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
});

exports.filterDisplayRes = functions.https.onCall((data, context) => {
  return new Promise(function (resolve, reject) {
    var db = admin.firestore();
    var result = [];
    const resRef = db.collection('restaurants');
    resRef.get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        if (doc.data().CATEGORY + "" === data.category) {

          // check nationality list if it exists
          if (data.nationality && data.nationality.length) {
            // loop through the possible nationalities
            for (let nationalityIndex = 0; nationalityIndex < data.nationality.length; nationalityIndex++) {
              // check if nationality from result is in the restaurant's nationality list
              if (doc.data().NATIONALITY.includes(data.nationality[nationalityIndex])) {
                //check if ambiance list exists
                if (data.ambiance && data.ambiance.length) {
                  // loop through the possibel ambiances
                  for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                    // check if ambiance from result ambiance array is in restaurant's ambaince list
                    if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                      // check if dining list exists
                      if (data.dining && data.dining.length) {
                        // loop through possible dining speeds
                        for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                          // check if dining index from result dining array is in restaurant's dining
                          if (doc.data().DINING.includes(data.dining[diningIndex])) {
                            // check if prices list exists
                            if (data.price && data.price.length) {
                              // loop through possible prices
                              for (let priceIndex = 0; priceIndex < data.price.length; priceIndex++) {
                                // check if price from result price array is in restaurant's price
                                if (doc.data().PRICE.includes(data.price[priceIndex])) {
                                  result.push(doc.data());
                                  nationalityIndex = data.nationality.length;
                                }
                              }
                            } else {
                              result.push(doc.data());
                              nationalityIndex = data.nationalityIndex;
                            }

                          }
                        }
                      } else {
                        result.push(doc.data());
                        nationalityIndex = data.nationality.length;
                      }
                    }
                  }
                } else {
                  result.push(doc.data());
                  nationalityIndex = data.nationality.length;
                }

              }
            }
          } else {
            result.push(doc.data());
          }

          // check dessert list if it exists
          if (data.dessert && data.dessert.length) {
            // loop through the possible desserts
            for (let dessertIndex = 0; dessertIndex < data.dessert.length; dessertIndex++) {
              // check if dessert from result is in the restaurant's dessert list
              if (doc.data().DESSERT.includes(data.dessert[dessertIndex])) {
                //check if ambiance list exists
                if (data.ambiance && data.ambiance.length) {
                  // loop through the possibel ambiances
                  for (let ambianceIndex = 0; ambianceIndex < data.ambiance.length; ambianceIndex++) {
                    // check if ambiance from result ambiance array is in restaurant's ambaince list
                    if (doc.data().AMBIANCE.includes(data.ambiance[ambianceIndex])) {
                      // check if dining list exists
                      if (data.dining && data.dining.length) {
                        // loop through possible dining speeds
                        for (let diningIndex = 0; diningIndex < data.dining.length; diningIndex++) {
                          // check if dining index from result dining array is in restaurant's dining
                          if (doc.data().DINING.includes(data.dining[diningIndex])) {
                            // check if prices list exists
                            if (data.price && data.price.length) {
                              // loop through possible prices
                              for (let priceIndex = 0; priceIndex < data.price.length; priceIndex++) {
                                // check if price from result price array is in restaurant's price
                                if (doc.data().PRICE.includes(data.price[priceIndex])) {
                                  result.push(doc.data());
                                  dessertIndex = data.dessert.length;
                                }
                              }
                            } else {
                              result.push(doc.data());
                              dessertIndex = data.dessert.length;
                            }

                          }
                        }
                      } else {
                        result.push(doc.data());
                        dessertIndex = data.dessert.length;
                      }
                    }
                  }
                } else {
                  result.push(doc.data());
                  dessertIndex = data.dessert.length;
                }

              }
            }
          } else {
            result.push(doc.data());
          }
        }
      })
      resolve(result);
    })
  })
})

admin.initializeApp();

