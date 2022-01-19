import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'

const Notif = () => {
    const [student, studentInfo] = useState([
        {name: '[username] has requested to follow you', id: '1'},
        {name: '[username] has requested to follow you', id: '2'},
        {name: '[username] has requested to follow you', id: '3'},
        {name: '[username] has requested to follow you', id: '4'},
        {name: '[username] has requested to follow you', id: '5'},
        {name: '[username] has requested to follow you', id: '6'},
        {name: '[username] has requested to follow you', id: '7'},
        {name: '[username] has requested to follow you', id: '8'},
        {name: '[username] has requested to follow you', id: '9'},
        {name: '[username] has requested to follow you', id: '10'},
        {name: '[username] has requested to follow you', id: '11'},
        {name: '[username] has requested to follow you', id: '12'},
        {name: '[username] has requested to follow you', id: '13'},
        {name: '[username] has requested to follow you', id: '14'},
        {name: '[username] has requested to follow you', id: '15'},
        {name: '[username] has requested to follow you', id: '16'},
        {name: '[username] has requested to follow you', id: '17'},
        {name: '[username] has requested to follow you', id: '18'},
        
    ])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.friendsIntro}>
                <Text style={styles.friendsText}>Recent Activity</Text>
            </View>
            <FlatList 
                data={student}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> (
                    <View elevation={5} style={styles.eachView}>
                        <View style={styles.profileImg}>
                            <Image style={styles.Img} source={require("../../assets/images/profilePic.png")}/>
                            <Text style = {styles.name}>{item.name}</Text> 
                            
                            <TouchableOpacity
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Add</Text>
                          </TouchableOpacity>
                          
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Notif

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    eachView: {
        marginHorizontal: 10,
        // marginTop: 
        padding: 10,
        // borderColor: '#C4C4C4',
        // borderRadius: 10,
        // borderWidth: 2,
        fontSize: 10,
        // alignItems:'center',
        // justifyContent: 'center',
        flex: 1,
        // shadowColor: 'rgba(0,0,0, 0.6)',
        // shadowOffset: { height: 3.5, },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        backgroundColor:'white',
    },
    friendsIntro: {
        marginTop: 10,
        padding: 5,
    },
    friendsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    profileImg: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    Img: {
    // flex: 1,
    width: '10%',
    height: '90%',
    resizeMode: 'contain',
    marginRight: 10
    // backgroundColor: 'black'
    },
    name: {
        marginTop: 15,
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    button: {
        width: '20%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#36649E',
        marginLeft: 35,
        marginTop: '2%',
        marginBottom: '3%'
      },
      buttonText: {
        color: 'white',
        fontSize: 9,
        fontWeight: 'bold',
        
        // fontFamily: OpenSans_SemiBold,
    },
    
})
