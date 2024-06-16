import React, { useContext, useEffect, useState } from 'react'
import Alldata from '../Contextapi';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Inputs(props) {
  const {currencyfrom,currencyto,convert,switchCur} = useContext( Alldata)
  


  return (
    <View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>{props.setChangeto('From')}}>
        <Text style={styles.text}>
          {currencyfrom.curName}
        </Text>
        
        </TouchableOpacity>
        {/* <Text>-{'>'}</Text> */}
        <TouchableOpacity onPress={()=>{switchCur()}}>
          <Image source={require('../assets/circle-arrow.png')} style={styles.image}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{props.setChangeto('To')}}>
        <Text style={styles.text}>
          {currencyto.curName}
        </Text>
        </TouchableOpacity>
    {/* <br /> */}
        </View>
        <TouchableOpacity onPress={()=>{convert()}} style={styles.button}>
          <Text style={styles.text}>convert</Text>
          
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  button:{
    // backgroundColor:'#35bfc2',
    backgroundColor:'#d1d1d1',
    borderRadius:10,
    // color:'white',
    // marginTop:'10px',
    alignSelf:'center',
    padding:5
  },
  image:{
    height:100,
    width:100,
    margin:20,
    padding:10,
    resizeMode:'center'  
  }, 
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    margin:5,
    marginBottom:40
  },
  text:{
    fontSize:30
  }



})