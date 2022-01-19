import React from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { useState} from 'react'

const Recommended = () => {
    const [student, studentInfo] = useState([
        {name: 'Collin Kim', year: 'Freshman', major: 'Computer Science', id: '1'},
        {name: 'Hanara Nam', year: 'Freshman', major: 'Engineering', id: '2'},
        {name: 'Grace Yim', year: 'Sophomore', major: 'Informatics', id: '3'},
        {name: '', year: '', major: '', id: '4'},
        {name: '', year: '', major: '', id: '5'},
        {name: '', year: '', major: '', id: '6'},
        {name: '', year: '', major: '', id: '7'},
        {name: '', year: '', major: '', id: '8'},
        {name: '', year: '', major: '', id: '9'},
        {name: '', year: '', major: '', id: '10'},
    ])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={student}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> (
                    <View elevation={5} style={styles.eachView}>
                        <View style={styles.profileImg}>
                            {item.name != '' ?
                            <Image style={styles.Img} source={require("/Users/davidhyun/FrostyApp/assets/images/profilePic.png")}/>: null
                            }   
                            {item.name != '' ?
                            <TouchableOpacity
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Add</Text>
                          </TouchableOpacity>: null
                            }  
                        </View>
                        <Text style = {styles.name}>{item.name}</Text>
                        <View style={styles.infoContainer}>
                            {item.name != '' ?
                            <Image style={styles.ImgInfo} source={require("/Users/davidhyun/FrostyApp/assets/images/yearPic.png")}/>: null
                            }   
                            <Text style={styles.infoText}>{item.year}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            {item.name != '' ?
                            <Image style={styles.ImgInfo} source={require("/Users/davidhyun/FrostyApp/assets/images/majorPic.png")}/>: null
                            }   
                            <Text style={styles.infoText}>{item.major}</Text>
                        </View>
                        
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Recommended

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    eachView: {
        marginHorizontal: 10,
        marginTop: 24,
        padding: 10,
        borderColor: '#C4C4C4',
        borderRadius: 10,
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
    },
    profileImg: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    Img: {
        // flex: 1,
        width: '35%',
        height: '100%',
        resizeMode: 'contain',
    },
    name: {
        marginTop: 4,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 7
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        width: '100%',
        height: 20,
        // backgroundColor: 'black'
        opacity: 0.7,
    },
    ImgInfo: {
        // flex: 1,
        width: '10%',
        height: '60%',
        marginRight: 5,
        resizeMode: 'contain',
        // backgroundColor: 'black'
    },

    infoText: {
        fontSize: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        
        // fontFamily: OpenSans_SemiBold,
    },
    button: {
        width: '45%',
        padding: 9,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginBottom: '10%',
        marginTop: '2%'
      }
})
