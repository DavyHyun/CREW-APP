import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth } from '../../firebase'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons'; 


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
              source={require("../../assets/dropDownLogos/person_outline.png")}
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
              source={require("../../assets/dropDownLogos/Vector.png")}
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
              source={require("../../assets/dropDownLogos/help_outline.png")}
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
    var userId = getAuth().currentUser.uid;
    const db = getDatabase();
            const favRef = ref(db, 'users/' + userId + '/favorite');
            onValue(favRef, (snapshot) => {
              const data = snapshot.val();
              if (data.favorite != null) {
                  navigation.navigate("Favorites");
              } else {
                navigation.navigate("AddFav");
              }
            })
  }

  const navigateToReviews = () => {
    navigation.navigate("Reviews");
  }

  return (
      <View style={styles.container}>
        <View style={styles.Top}>
        <TouchableOpacity
                onPress={()=> navigation.openDrawer()}
                // style={styles.backButton}
            >
                <SimpleLineIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
        {/*Profile Button*/}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.profileButton}
        >
          <Text style={{ color: 'black' }}>^-^</Text>
          {renderDropdown()}
        </TouchableOpacity>
        </View>
      </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'black'
},
  

Top: {
// height: '50%',
    width: '80%',
    marginTop: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'blue',
},

  
  profileButton: {
    borderWidth: 1,
    borderColor: '#ABB1B3',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // right: 1813,
    // backgroundColor: 'black'
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

})

