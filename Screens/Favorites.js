import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

const Favorites = () => {
    const navigation = useNavigation();
    const [fav, setFav] = useState([
        {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '1'},
        {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '2'},
        {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '3'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '4'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '5'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '6'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '7'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '8'},
        // {name: 'Korean Tofu House', Type: 'Asian, Korean', id: '9'},
    ])
    const navigateToHome = () => {
        navigation.navigate("Home");
    }
    const navigateToAdd = () => {
        navigation.navigate("AddFav");
    }

    return (
        <View>
            <View style={styles.topArea}>
            <TouchableOpacity
                onPress={navigateToHome}
                style={styles.backButton}
            >
                <AntDesign name="left" size={24} color="#2A6F97" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navigateToAdd}
                style={styles.backButton}
            >
                <AntDesign name="plus" size={24} color="#2A6F97" />
            </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>YOUR FAVORITES</Text>
                <Text style={styles.bodyText}>Add your favorite restaurants here!</Text>
            </View>
            <View style={styles.listContainer}>
            <FlatList 
                data={fav}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item})=> (
                    <View elevation={5} style={styles.eachView}>
                        <View style={styles.star}>
                            <AntDesign name="star" size={15} color="#89C2D9" />
                        </View>
                        <View style= {styles.infoContainer}>
                        <View>
                            <Text style={styles.Ti}>{item.name}</Text>
                            <Text style={styles.Bo}>{item.Type}</Text>
                        </View>
                        <View>
                            <AntDesign name="right" size={24} color="#2A6F97" style={styles.right} />
                        </View>
                        </View>
                    </View>
                )}
            />
            </View>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    topArea: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
        height: '70%',
        marginTop: '5%'
    },
    backButton: {
        padding: 20
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700'
    },
    bodyText: {
        fontSize: 13
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
    }
})
