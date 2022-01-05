import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, StatusBar } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const database = getDatabase();
  const dbref = ref(database);


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Log In or Sign Up");
      console.log('success');
    })
  }
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  }

  const navigateToChat = () => {
    navigation.navigate("Chat");
  }

  const navigateToFriendsHome = () => {
    navigation.navigate("FriendsHome");
  }

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  }

  const navigateToReviews = () => {
    navigation.navigate("Reviews");
  }






  return (

    <View style={styles.layout}>
      <View style={styles.topBar}>
      <Image
              style={styles.frostyLogo}
              source={require("../assets/frostyLogos/frostylogo.png")}
            />
      <TouchableOpacity
        onPress={navigateToProfile}
        style={styles.profileButton}
      >
        
      </TouchableOpacity>
      </View>
      
      {/*The view below holds top half of screen*/}
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <View>
            <Image
              style={styles.logo}
              source={require("../assets/frostyLogos/frosty_open_mouth.png")}
            />

          </View>
        </View>
        <View style={styles.topRightContainer}>
          <Image style={styles.chatBox} source={require("../assets/chatbox.png")} />
          {/* <Text style={styles.textBox}>Welcome back {auth.currentUser.email}! Ready for Winter Quarter?! </Text> */}
          <Text style={styles.textBox}>Welcome back Collin! I'm excited to make it through Winter Quarter with you! </Text>
          <TouchableOpacity
          onPress={handleSignOut}
          style={styles.buttonS}
        >
          <Text style={{color: 'black'}}>Sign Out</Text>
        </TouchableOpacity>
        </View>


      </View>

      {/*The View below holds bottom half of screen*/}
      <View style={styles.bottomContainer}>

        <TouchableOpacity
          onPress={navigateToChat}
          style={styles.chatButton}
        >
          <Image style={styles.chatButtonIcon} source={require("../assets/buttonLogos/chat.png")} />
          <Text style={styles.chatButtonText}>Chat with Frosty!</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToFriendsHome}
          style={styles.friendsButton}
        >
          <Image style={styles.peopleButtonIcon} source={require("../assets/buttonLogos/people.png")} />
          <Text style={styles.friendsButtonText}>Connect with Your Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToFavorites}
          style={styles.favoritesButton}
        >
          <Image style={styles.buttonIcon} source={require("../assets/buttonLogos/star.png")} />
          <Text style={styles.favoritesButtonText}>Your Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToReviews}
          style={styles.reviewsButton}
        >
          <Image style={styles.reviewsButtonIcon} source={require("../assets/buttonLogos/library_books.png")} />
          <Text style={styles.reviewsButtonText}>Reviews from Fellow Students</Text>
        </TouchableOpacity>
      </View>

    </View>




  )
}

export default HomeScreen

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'stretch',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#E5E5E5'
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 20,
    // backgroundColor: 'black'
  },
  textLogo: {
    padding: 10

  },
  
  topContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // flex: 1,
    // borderWidth: 1,
    // borderColor: '#FF5733',
    padding: 20,
    flexDirection: 'row',
    height: '40%',
    // height: Dimensions.get('window').height / 2
    // backgroundColor: 'black'
    marginBottom: '10%'

  },
  chatBox: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 115,
    top: 37,
    left: 5
  },
  topLeftContainer: {
    flex: 1,
    // borderWidth: 5,
    // borderColor: '#F333FF',
    alignItems: 'center',
    paddingRight: 5
  },
  buttonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    bottom: 5,
    tintColor: '#2A6F97',
    opacity: 0.49
  },
  chatButtonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    top: 0,
    opacity: 0.45,
    tintColor: '#2A6F97',
  },
  peopleButtonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 48,
    top: 7,
    tintColor: '#2A6F97',
    opacity: 0.42
  },
  reviewsButtonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    top: 6,
    tintColor: '#2A6F97',
    opacity: 0.57
  },
  topRightContainer: {
    flex: 1,
    // borderWidth: 5,
    // borderColor: '#335BFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#61FF33',
    // padding: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 60,
    // paddingHorizontal: 20
  },

  profileButton: {
    alignSelf: 'flex-end',

    borderWidth: 1,
    borderColor: '#ABB1B3',
    aspectRatio: 1,
    padding: 19,
    borderRadius: 30,
    left: -1815,
    top: 38
  },
  frostyLogo: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    height: 40,
    left: -970,
    top: 38,
    borderWidth: 1
  },

  logo: {
    resizeMode: "contain",
    alignSelf: 'center',
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width / 2,
    top: 5
  },
  textBox: {
    // marginTop: 20,
    // alignSelf: 'center'
    bottom: 68,
    left: 10,
    color: '#F5F5F5',
    paddingHorizontal: 10
  },

  chatButton: {
    backgroundColor: '#A9D6E5',
    width: '40%',
    // marginHorizontal: '5%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    // marginTop: 60,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  friendsButton: {
    backgroundColor: '#89C2D9',
    width: '40%',
    // marginHorizontal: '5%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    // marginTop: 60,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  favoritesButton: {
    backgroundColor: '#6CB3D0',
    width: '40%',
    // marginHorizontal: '5%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    // marginTop: 60,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  reviewsButton: {
    backgroundColor: '#529ABA',
    width: '40%',
    // marginHorizontal: '5%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    // marginTop: 60,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 14
    // textShadowColor: '#000000',
    // textShadowRadius: 0.5,

  },
  chatButtonText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: '#000000',
    textShadowRadius: 0.8,
    textAlign: 'center',
    top: 5
  },
  friendsButtonText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: '#000000',
    textShadowRadius: 0.8,
    top: 14,
    textAlign: 'center',
  },
  favoritesButtonText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: '#000000',
    textShadowRadius: 0.8,
    textAlign: 'center',
    top: 5
  },
  reviewsButtonText: {
    color: '#F5F5F5',
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: '#000000',
    textShadowRadius: 0.8,
    textAlign: 'center',
    top: 14
  },
  // signOut: {
  //   width: '100%',
  //       padding: '5%',
  //       borderRadius: 40,
  //       alignItems: 'center',
  //       backgroundColor: '#36649E',
  //       marginBottom: '2%',
  //       borderStyle: 'solid',
  //       borderColor: '#36649E',
  //       borderWidth: 1,
  //       marginTop: '15%'
  // }
  buttonS: {
        padding: '5%',
        borderRadius: 40,
        alignItems: 'center',
        backgroundColor: '#36649E',
        borderStyle: 'solid',
        borderColor: '#36649E',
        borderWidth: 1,
  }

})
