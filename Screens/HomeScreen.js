import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    try {
    const db = getDatabase();
    var userId = getAuth().currentUser.uid;
    const nameRef = ref(db, 'users/' + userId + '/personalInfo');
    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      setName(data.name)
    });
  } catch (error) {
    console.log(error);
  }
}, [])


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("Log In or Sign Up");
      console.log('success');
    })
  }

  // Drop Down Methods
  const toggleDropdown = () => {
    setVisible(!visible);
  }

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropDown}>
            <TouchableOpacity
              onPress={navigateToProfile}
              style={styles.dropDownButton}>
                <Image
              style={styles.dropDownProfileImage}
              source={require("../assets/dropDownLogos/person_outline.png")}
            />
              <Text style={styles.dropDownProfileText}>
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.dropDownButton}>
                <Image
              style={styles.dropDownSignOutImage}
              source={require("../assets/dropDownLogos/Vector.png")}
            />
              <Text style={styles.dropDownSignOutText}>
                Sign Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigateToHelp}
              style={styles.dropDownButton}>
                <Image
              style={styles.dropDownHelpImage}
              source={require("../assets/dropDownLogos/help_outline.png")}
            />
              <Text style={styles.dropDownHelpText}>
                Help
              </Text>
            </TouchableOpacity>
        </View>


      )
    }
  }


  const navigateToProfile = () => {
    navigation.navigate("Profile");
    setVisible(false);
  }
  
  const navigateToHelp = () => {
    navigation.navigate("Help");
    setVisible(false);
  }

  // Button Navigation
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

      {/*The view below holds the top bar*/}
      <View style={styles.topBar}>

        {/*Frosty Logo*/}
        <Image
          style={styles.frostyLogo}
          source={require("../assets/frostyLogos/frostylogo.png")}
        />

        {/*Profile Button*/}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.profileButton}
        >
          <Text style={{ color: '#999d9e' }}>^-^</Text>
          {renderDropdown()}
        </TouchableOpacity>
      </View>

      {/*The view below holds top half of screen*/}
      <View style={styles.topContainer}>

        {/*Frosty Logo*/}
        <View style={styles.topLeftContainer}>
          <View>
            <Image
              style={styles.logo}
              source={require("../assets/frostyLogos/frosty_open_mouth.png")}
            />
          </View>
        </View>

        {/*Message bubble*/}
        <View style={styles.topRightContainer}>
          <Image style={styles.chatBox} source={require("../assets/chatbox.png")} />

          <Text style={styles.textBox}> Welcome back {name}! I'm excited to make it through Winter Quarter with you! </Text>
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

        {/*Chat Button*/}
        <TouchableOpacity
          onPress={navigateToChat}
          style={styles.chatButton}
        >
          <Image style={styles.chatButtonIcon} source={require("../assets/buttonLogos/chat.png")} />
          <Text style={styles.chatButtonText}>Chat with Frosty!</Text>
        </TouchableOpacity>

        {/*Friends Button*/}
        <TouchableOpacity
          onPress={navigateToFriendsHome}
          style={styles.friendsButton}
        >
          <Image style={styles.peopleButtonIcon} source={require("../assets/buttonLogos/people.png")} />
          <Text style={styles.friendsButtonText}>Connect with Your Friends</Text>
        </TouchableOpacity>

        {/*Favorites Button*/}
        <TouchableOpacity
          onPress={navigateToFavorites}
          style={styles.favoritesButton}
        >
          <Image style={styles.favoritesButtonIcon} source={require("../assets/buttonLogos/star.png")} />
          <Text style={styles.favoritesButtonText}>Your Favorites</Text>
        </TouchableOpacity>

        {/*Reviews Button*/}
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
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#E5E5E5'
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    marginTop: 20,
    top: 30,
  },
  frostyLogo: {
    resizeMode: 'contain',
    height: 40,
    right: 970,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: '#ABB1B3',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    right: 1813,
  },

  // Drop Down 
  dropDown: {
    width: 160,
    height: 90,
    position: 'absolute',
    backgroundColor: '#E5E5E5',
    bottom: -93,
    right: 1,
    padding: 5,
    borderRadius: 7,
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 2.5, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    justifyContent: 'space-between',
    zIndex: 2
  },
  dropDownButton: {
    width: 160,
    zIndex: 1,
    flexDirection: 'row',
    padding: 1,
    marginVertical: 1
  },

  // Drop Down Images
  dropDownProfileImage: {
    bottom: 1
  },
  dropDownSignOutImage: {
    top: 2,
    left: 3,
  },
  dropDownHelpImage: {
    left: 1
  }, 
  
  //Drop Down Text
  dropDownProfileText: {
    left: 5
  },
  dropDownSignOutText: {
    left: 11
  },
  dropDownHelpText: {
    left: 8
  },

  // Top 
  topContainer: {
    padding: 20,
    flexDirection: 'row',
    height: '40%',
    marginBottom: '10%',
    top: 30,
    zIndex: -1
  },

  // Top Left (frosty drawing) 
  topLeftContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 5,

  },
  logo: {
    resizeMode: "contain",
    alignSelf: 'center',
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width / 2,
    bottom: 30,

  },

  // Top Right (chat bubble) 
  topRightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  chatBox: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 115,
    top: 37,
    left: 5,

  },
  textBox: {
    bottom: 72,
    left: 10,
    color: '#F5F5F5',
    paddingHorizontal: 10,

  },

  // Bottom
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 60,
  },

  // Buttons
  chatButton: {
    backgroundColor: '#A9D6E5',
    width: '40%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  friendsButton: {
    backgroundColor: '#89C2D9',
    width: '40%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  favoritesButton: {
    backgroundColor: '#6CB3D0',
    width: '40%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  reviewsButton: {
    backgroundColor: '#529ABA',
    width: '40%',
    aspectRatio: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, width: 3.5 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },

  // Button Icons
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
  favoritesButtonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    bottom: 5,
    tintColor: '#2A6F97',
    opacity: 0.49
  },
  reviewsButtonIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    top: 6,
    tintColor: '#2A6F97',
    opacity: 0.57
  },

  // Button Text
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
  // buttonS: {
  //       padding: '5%',
  //       borderRadius: 40,
  //       alignItems: 'center',
  //       backgroundColor: '#36649E',
  //       borderStyle: 'solid',
  //       borderColor: '#36649E',
  //       borderWidth: 1,
  // }

})

{/* <TouchableOpacity
          onPress={handleSignOut}
          style={styles.buttonS}
        >
          <Text style={{color: 'black'}}>Sign Out</Text>
        </TouchableOpacity> */}
