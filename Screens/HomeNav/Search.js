import { signOut } from '@firebase/auth'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, KeyboardAvoidingView, TextInput, FlatList } from 'react-native'
import { auth } from '../../firebase'
import rData from '../../json/thankYouGrace.json'
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';


const Search = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [filterData, setFilterData] = useState(rData);
    const [masterData, setMasterData] = useState(rData);
    const db = getDatabase();
    const [input, setInput] = useState("");
    const [adding, setAdding] = useState("");
    const [currData, setData] = useState([]);
    const [favs, setFavs] = useState([]);

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
const searchFilter =(text)=> {
  if (text) {
      const newData = masterData.filter((item) => {
          const itemData = item.RESTAURANT
          const textData = text;
          return itemData.indexOf(textData) > -1;
      })
      setFilterData(newData);
      setInput(text);
  } else {
      setFilterData(masterData);
      setInput(text);
  }
}

const onItemClick = (item) => {
  navigation.navigate("ResInfo", {
    name : item.RESTAURANT,
    fsr : item.FSR,
    address: item.ADDRESS,
    location: item.LOCATION,
    type: item.TYPE,
    price: item.PRICE,
    popular: item.POPULAR,
    recommendation: item.RECOMMENDATION,
    monday: item.M,
    tuesday: item.T,
    wednesday: item.W,
    thursday: item.TH,
    friday: item.F,
    saturday: item.S,
    sunday: item.SU,
    tea: item.TEA,
  });
}

const ItemView = ({item}) => {
  return (
      <TouchableOpacity
      onPress={() => onItemClick(item)}
      >
      <Text style = {styles.itemStyle}>
          {item.RESTAURANT}
      </Text>
      </TouchableOpacity>
  )
}
const ItemSeperatorView =()=> {
  return (
  <View
      style={{height: 0.5, width:'100%', backgroundColor: '#c8c8c8'}}
  />
  )
}

  return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.Top}>
        <TouchableOpacity
                onPress={()=> navigation.openDrawer()}
                
                // style={styles.backButton}
            >
                <SimpleLineIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.inputAList}> 
            <View style={styles.inputContainer}> 
                <AntDesign name="search1" size={17} color="gray" />
                <TextInput
                     placeholder="Search..."
                     icon = { () => <AntDesign name="search1" size={24} color="black" />}
                     style={styles.input}
                     fontSize= {15}
                     value={input}
                     onChangeText={text => searchFilter(text)}
                />
                
            </View>
         </View>
         
        </View>
        {input != '' ? 
        <View style={styles.listContainer}>
                {input != '' ?
                <FlatList
                    data={filterData}
                    
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeperatorView}
                    renderItem={ItemView}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlist}
                />: null
            }
            </View>: null
        } 

        <Text style={{marginTop: '5%'}}>Restaurant List Goes Here</Text>
      </KeyboardAvoidingView>
  )
}

export default Search

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
backButton: {
  padding: 20
},
titleText: {
  fontSize: 24,
  fontWeight: '700'
},
bodyText: {
  fontSize: 13,
  textAlign: 'center',
  marginTop: '2%'
},
titleContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '40%',
  width: '70%'
},
inputContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  // marginBottom: '6%',
  backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'white',
    height: 35,
    borderRadius: 5,
    margin: 10,
    shadowColor: 'rgba(0,0,0, 0.6)',
  shadowOffset: { height: 3.5, },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  backgroundColor:'white',
  width: 275,
  marginTop: '4%'
},
inputAList: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},
input: {
  // marginHorizontal: 10,
  marginLeft: '3%',
  padding: 5,
  borderColor: 'white',
  borderRadius: 5,
  borderWidth: 2,
  width: '80%'
  // alignItems:'center',
  // justifyContent: 'center',
  // flex: 1,fgfg
},
button: {
  width: '30%',
  padding: 16,
  borderRadius: 40,
  alignItems: 'center',
  backgroundColor: '#36649E',
  marginBottom: 15
},
buttonText: {
  color: 'white',
  // fontWeight: '700',
  fontSize: 18,
  // fontFamily: OpenSans_SemiBold,
},
buttonContainer: {
  marginTop: '17%',
  justifyContent: 'center',
  alignItems: 'center'
},
itemStyle: {
  padding: 10,
},
listContainer: {
  // marginTop: '1%',
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'blue',
  height: 200,
  marginLeft: '11%'
},
flatlist: {
  width: 200,
  height: 100,
  padding: 10,
  borderColor: 'white',
  borderRadius: 10,
  borderWidth: 2,
  
  // alignItems:'center',
  // justifyContent: 'center',
  // flex: 1,
  shadowColor: 'rgba(0,0,0, 0.6)',
  shadowOffset: { height: 3.5, },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  backgroundColor:'white',
  width: 275,
  backgroundColor: 'white'

}


})

