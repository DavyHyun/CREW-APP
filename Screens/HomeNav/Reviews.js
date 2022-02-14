import React, {useState, useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import rData from '../../json/thankYouGrace.json'
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/core'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import SelectDropdown from 'react-native-select-dropdown'
import { Feather } from '@expo/vector-icons'; 
import Accordion from 'react-native-collapsible/Accordion';
import { back } from 'react-native/Libraries/Animated/Easing';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const Reviews = () => {
    const options = ["Food", "Study Spots", "Courses"];
    const [curr, setCurr] = useState([])
    const FOODREVIEWS = [
        {
            title: "Don't go pho shizzle.",
            username: "davyhyun",
            content: "\"Breh this place blows fr pho asia noodle house in Everett 1000000x better frfr\""
        },
        {
            title: "Starbucks never fails~~",
            username: "_graceyim",
            content: "\"I had another 20 shots of espresso today starbucks does it the best yessir\""
        }
    ]
    const STUDYREVIEWS = [
        {
            title: "Odegaard not it :<",
            username: "collinjkim",
            content: "\"Odegaard has actual monkeys now especially in first floor can't focus no more don't go\""
        },
        {
            title: "Madrona LRC the spot!!!",
            username: "_graceyim",
            content: "\"I go madrona LRC only. I get so much work done highly recommend\""
        }
    ]
    const COURSEREVIEWS = [
        {
            title: "Math 125",
            username: "davyhyun",
            content: "\"I had a 4.0 and after the final my grade went to 3.5. I've never experienced such difficulty in my life.\""
        },
        {
            title: "CHEM 159",
            username: "jxhanara",
            content: "\"Easy 4.0. At least for me lmao\""
        }
    ]
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState([])
    const navigateToHome = () => {
        navigation.navigate("Home");
    }
    
    // const renderSectionTitle = (section) => {
    //     // return (
    //     //     <View style={styles.content}>
    //     //       <Text>{section.content}</Text>
    //     //     </View>
    //     // );
    // }
    const renderHeader = (section) => {
        return (
            <View style={styles.headerT}>
                <View style={styles.header}>
              <Ionicons name="md-person-circle-outline" size={50} color="#B8B6B6" />
              <View style={styles.TandU}>
                <Text style={styles.headerText}>{section.title}</Text>
                <Text style={styles.userText}>{section.username}</Text>
              </View>
              </View>
              <View style={{padding: 5}}>
                <AntDesign name="down" size={20} color="#2A6F97" style={{marginTop: '45%'}} />
              </View>
            </View>
        );
    }
    const renderContent = (section) => {
        return (
            <View style={styles.content}>
                <Text style={styles.contentText}>{section.content}</Text>
            </View>
        )
    }

    const updateSections = (activeSections) => {
        setActiveSection(activeSections)
    }
    return (
        <View style={{flex: 1,flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{}}>
            <View style={styles.topArea}>
            <TouchableOpacity
                onPress={()=> navigation.openDrawer()}
                style={styles.backButton}
            >
                <SimpleLineIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
            </View>
            <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>REVIEWS</Text>
                <Text style={styles.bodyText}>Post reviews on any of the categories and also read reviews from fellow students!</Text>
            </View>
            <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.dropButton}
            >
                <Text style={styles.dropButtonText}>Saved</Text>
                <Feather name="bookmark" size={15} color="#AAA9A9" style={styles.icon}/>
            </TouchableOpacity>
            <SelectDropdown
	            data={options}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownStyle={styles.dropStyle}
                rowStyle={styles.rowStyle}
                rowTextStyle={styles.rowText}
                defaultButtonText="Filter"
                renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"#AAA9A9"}
                        size={12}
                      />
                    );
                  }}
	            onSelect={(selectedItem, index) => {
                    if (selectedItem == "Food")  {
                    setCurr(FOODREVIEWS)
                    } else if (selectedItem == "Study Spots") {
                        setCurr(STUDYREVIEWS)
                    } else {
                        setCurr(COURSEREVIEWS)
                    }
	            }}
	            buttonTextAfterSelection={(selectedItem, index) => {               
		            return selectedItem
	            }}
	            rowTextForSelection={(item, index) => {
		            return item
	            }}
            />
            </View>
            <View style={styles.accordionContainer}>
            <Accordion
                sections={curr}
                activeSections={activeSection}
                // renderSectionTitle={renderSectionTitle}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                sectionContainerStyle={styles.secSt}
                underlayColor="white"
            />
            </View>
            </View>
            </View>
            <View style={{marginBottom: '10%', alignItems:'center'}}>
            <TouchableOpacity style={{}}>
                <Ionicons name="add-circle-outline" size={60} color="#2C7DA0" />
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Reviews
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topArea: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
        width: '70%'
    },
    dropButton: {
        width: "30%",
        // height: 30,
        padding: 8,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#AAA9A9",
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    
    buttonsContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    backButton: {
        padding: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700'
    },
    bodyText: {
        marginTop: '2%',
        fontSize: 13,
        textAlign: 'center'
    },
    eachView: {
        marginHorizontal: 10,
        marginTop: 24,
        padding: 10,
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        fontSize: 10,
        // alignItems:'center',
        // justifyContent: 'center',
        flex: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor:'white',
        width: 350,

    },
    icon: {
        // marginLeft: '15%'
    },
    Ti: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: '2%',
        marginLeft:'15%'
    },
    Bo: {
        fontSize: 14,
        color: '#5F5D5D',
        marginLeft:'15%',
        marginBottom: '5%'

    },
    star: {
        // backgroundColor: 'black'
        marginBottom: '2%'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    right: {
        marginTop: '25%'
    },
    dropdown1BtnStyle: {
        width: "30%",
        height: 30,
        backgroundColor: "#FFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#AAA9A9"
      },
      dropdown1BtnTxtStyle: { color: "#707070", textAlign: "left", fontSize: 12 },
      dropButtonText: { color: "#707070", textAlign: "center", fontSize: 12 },
      dropStyle: {
          marginTop: '2%',
          borderRadius: 10,
        borderWidth: 1,
            borderColor: "#AAA9A9",
            justifyContent: 'center',
            alignItems: 'center'
      },
      rowStyle: {
        height: 30,
        width: 75,
        // backgroundColor: 'black'
      },
      rowText: {
        fontSize: 10,
      },
      secSt: {
          marginTop: '10%',
          marginHorizontal: 10,
        // marginTop: 24,
        padding: 10,
        borderColor: '#AAA9A9',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 10,
        // alignItems:'center',
        // justifyContent: 'center',
        // flex: 1,
        shadowColor: 'rgba(0,0,0, 0.6)',
        shadowOffset: { height: 3.5, },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor:'white',
        width: 350,
      },
      header: {
         flexDirection: 'row',
         justifyContent: 'flex-start'
      },
      TandU: {
        flexDirection: 'column',
        marginLeft: '4%',
        // backgroundColor: 'black',
        justifyContent: 'center'
      },
      headerText: {
        fontSize: 20,
        fontWeight: '600'
      },
      userText: {
          marginTop: '4%',
        fontSize: 12,
        
    },
    content: {
        marginTop: '3%',
        padding: 6,
    },
    contentText: {
        fontSize: 12,
        fontStyle: 'italic'
        // fontWeight: '600'
      },
    headerT: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
