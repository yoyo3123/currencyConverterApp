import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Alldata from '../Contextapi'
import React, { useContext, useEffect, useState } from 'react'
import Inputs from './Inputs';
import Selections from './Selections';


const Home = () => {


  const {setAmount,result,checkStatus,CheckOnOff,fromTo,getFavorites} = useContext(Alldata)

  const showInfo =()=>{
    if (result) {
      return(result)
    }else{
      return('Welcome to native app!!!')
    }
    
  }
  
  const changeAmount = (amount)=>{
      console.log(amount);
      if (amount >= 0) {
          setAmount(amount)
      }else{
          setAmount(0)
      }
  }
  const showSelections = ()=>{
      if (changeto) {
          return (<Selections changeto={changeto} setChangeto={setChangeto}/>)
      }
  }
  const [changeto,setChangeto]=useState()

  useEffect(()=>{
    CheckOnOff();
    fromTo();
    getFavorites()
  },[])
  return (
    <View style={styles.home}>
      <Text style={styles.text}>{showInfo()}</Text>
      <TextInput placeholder='Number input' textAlign='center' placeholderTextColor={'white'} inputMode='numeric' onEndEditing={()=>{checkStatus()}} onChangeText={(val)=>{changeAmount(val)}} style={styles.button}/>
      <Inputs setChangeto={setChangeto} />
      {showSelections()}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#8d8d8d',
    alignItems: 'center',
    overflow:'hidden'

  },
  text:{
    fontSize:30,
    borderRadius:10,
    backgroundColor:'#6d6d6d',
    padding:5
  },
  button:{
    // display:'flex',
    backgroundColor:'#3d3d3d',
    minWidth:200,
    color:'white',
    marginTop:10,
    marginBottom:30,
    borderRadius:5,
    fontSize:30,
    // alignSelf:'center'
  }



})