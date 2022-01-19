import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native'

const MyFriends = () => {

    const [student, studentInfo] = useState([
        {name: '[username]', id: '1'},
        {name: '[username]', id: '2'},
        {name: '[username]', id: '3'},
        {name: '[username]', id: '4'},
        {name: '[username]', id: '5'},
        {name: '[username]', id: '6'},
        {name: '[username]', id: '7'},
        {name: '[username]', id: '8'},
        {name: '[username]', id: '9'},
        {name: '[username]', id: '10'},
        {name: '[username]', id: '11'},
        {name: '[username]', id: '12'},
        {name: '[username]', id: '13'},
        {name: '[username]', id: '14'},
        {name: '[username]', id: '15'},
        
    ])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.friendsIntro}>
                <Text style={styles.friendsText}>15 friends</Text>
            </View>
            <FlatList 
                data={student}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> (
                    <View elevation={5} style={styles.eachView}>
                        <View style={styles.profileImg}>
                            <Image style={styles.Img} source={require("/Users/davidhyun/FrostyApp/assets/images/profilePic.png")}/>
                            <Text style = {styles.name}>{item.name}</Text> 
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default MyFriends

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    eachView: {
        marginHorizontal: 10,
        marginTop: 10,
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
     width: '15%',
    height: '100%',
    resizeMode: 'contain',
    marginRight: 10
    // backgroundColor: 'black'
    },
    name: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 7,
    }

})
