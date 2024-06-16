import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Alldata from '../Contextapi'
import React, { useContext, useState } from 'react'


const Settings = () => {


  const {onoff,setOnOff} = useContext(Alldata)


  return (
    <View style={styles.home}>

      <TouchableOpacity onPress={()=>{setOnOff()}} style={styles.button}>
        <Text style={styles.text}>Turn {onoff} currency exchange saving</Text>
      </TouchableOpacity>
      <Text style={styles.subtext}>this setting allows you to exchange currency while you dont have a network connected</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  home:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#8d8d8d',
    alignItems: 'center',

  },
  button:{
    backgroundColor:'#d1d1d1',
    borderRadius:10,
    alignSelf:'center',
    padding:5
  },
  text:{
    fontSize:30
  },
  subtext:{
    fontSize:20,
    marginTop:10,
    marginLeft:20,
    marginRight:20
  }



})