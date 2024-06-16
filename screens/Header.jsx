import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

 const Header = () => {
    const nav = useNavigation()
  return (
    <View style={styles.home}>
      <TouchableOpacity onPress={()=>{nav.navigate('Settings')}}> 
          <Image source={require('../assets/gear.png')} style={styles.image}/>
      </TouchableOpacity>
      <Image source={require('../assets/applogo.png')} style={styles.image}/>
      {/* <Text style={styles.text}>O</Text > */}
      <TouchableOpacity style={styles.button} onPress={()=>{alert('no time for this if need help call me -yoav')}}> 
        <Text style={styles.text}>help?</Text> 
      </TouchableOpacity>
    </View>
  )
}
export default Header

const styles = StyleSheet.create({
  home:{
    flex:0,
    // justifyContent:'space-between',
    justifyContent:'space-between',
    alignSelf:'stretch',
    backgroundColor: 'rgb(100,100,100)',
    alignItems: 'center',
    flexDirection:'row',
    marginTop: Constants.statusBarHeight
    
    
  },
  text:{
    fontSize:20,
    
    // backgroundColor:'blue',
    color:'white'
  },
  button:{
    backgroundColor:'black',
    color:'white',
    borderRadius:5,
    padding:5,
    marginRight:5
    // marginTop:'10px',
  },
  image:{
    // backgroundColor:'blue',
    // color:'white',
    marginTop:5,
    marginLeft:5,
    marginBottom:5,
    width:50,
    height:50,
    resizeMode:'contain'
  }



})
