import React, { useContext, useEffect, useState } from 'react'
import Alldata from '../Contextapi'
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Selections(props) {
    const {currencys,setCurrencyfrom,setCurrencyto,favorites,setFavorites} = useContext(Alldata)
    const [searchbar,setSearchbar] = useState()

    // const favorites = AsyncStorage.getItem('favorites')

    

    const curOptions = ()=>{
        if (searchbar) {
            return(
                currencys.map((val,ind)=>{
                    if (val.curName.toLowerCase().includes(searchbar) || val.curCode.toLowerCase().includes(searchbar)) {
                        return (
                            <View key={ind} style={styles.selectionsStyle}>
                                <TouchableOpacity onPress={()=>{
                                    addToFavorites(val.curName , val.curCode);
                                    alert('added');
                                }}> 
                                <Image source={require('../assets/star.png')} style={styles.images}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{change(val)}}>
                                    <Text style={styles.curSelections}>{val.curName} / {val.curCode}</Text>    
                                </TouchableOpacity>
                    
                            </View>
                        )    
                    }
                
            }))
        }else{
            return(
            currencys.map((val,ind)=>{
            return (
                <View key={ind} style={styles.selectionsStyle}>
                    <TouchableOpacity onPress={()=>{
                        addToFavorites(val.curName , val.curCode)
                    }}>
                       <Image source={require('../assets/star.png')} style={styles.images}/> 
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{change(val)}}>
                    
                        <Text style={styles.curSelections}>{val.curName} / {val.curCode}</Text>    
                    </TouchableOpacity>
                    
                </View>
            )
        }))
        }
    }
    
    const curFavorites = ()=>{
        if (!searchbar && favorites.length > 0) {
            return(
                favorites.map((val,ind)=>{
                return (
                    <View key={ind} style={styles.selectionsStyle}>
                                <TouchableOpacity onPress={()=>{removeFromFavorites(ind)}}> 
                                    <Image source={require('../assets/star.png')} style={styles.imageFavorites} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{change(val);}}>
                                    <Text style={styles.curSelections}>{val.curName} / {val.curCode}</Text>    
                                </TouchableOpacity>
                    
                            </View>
                )
            }))
        }
    }

    

    const addToFavorites = async (curName,curCode)=>{
        const favoritelist = await AsyncStorage.getItem('favorites',(err,result)=>{
            return(result)
        })
        if (!favoritelist) {
            const data = [{curName,curCode}]
            await AsyncStorage.setItem('favorites',JSON.stringify(data))
        }else{
            const list = JSON.parse(favoritelist)
            let addToFavoriteList = true
            list.map((val)=>{
                if (val.curName === curName) {
                    addToFavoriteList = !addToFavoriteList
                }
            })
            if (addToFavoriteList) {
                const data = [...list,{curName,curCode}]
                const parseable = JSON.stringify(data)
                console.log(parseable);
                setFavorites(data)
                await AsyncStorage.setItem('favorites',parseable)
            }
        }
    }

    const removeFromFavorites = async (ind)=>{
        console.log(ind);
        if (ind || ind === 0) {
                const list = [...favorites]
                list.splice(ind,1)  
                setFavorites(list)
                await AsyncStorage.setItem('favorites',JSON.stringify(list))
            
            
            await AsyncStorage.setItem('favorites',JSON.stringify(list))
        }
    }
    

    const change = (val)=>{
        if (props.changeto == 'From') {
            setCurrencyfrom({curCode:val.curCode,curName:val.curName})
        }else if (props.changeto == 'To') {
            setCurrencyto({curCode:val.curCode,curName:val.curName})
        }
        props.setChangeto()
}

  return (
    <View style={styles.curmenu}>
        <View style={{display:'flex',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{props.setChangeto()}}>
            <Text style={{fontSize:30,backgroundColor:'grey',width:30,paddingLeft:5,borderRadius:5,margin:5,}}>X</Text>
        </TouchableOpacity>
        <TextInput type="text" placeholder='Search' onChangeText={(val)=>{setSearchbar(val.toLocaleLowerCase())}} 
        style={styles.searchBox}/>
        </View>
        
        <SafeAreaView style={styles.scrollStyle}>
            <ScrollView >
                {curFavorites()}
                {curOptions()}     
            </ScrollView> 
            
        </SafeAreaView>
        


    </View>
  )
}

const styles = StyleSheet.create({
    curmenu:{
        zIndex: 15,
        elevation: (Platform.OS === 'android') ? 50 : 0,
        overflow:'hidden',
        maxHeight:500,
        minHeight:300,
        position:'absolute',
        top: 80,
        minWidth:250,
        backgroundColor:'#5d5d5d'
        
    },
    curSelections:{
        fontSize:20,
        paddingLeft:10,
        paddingRight:10,
    },
    scrollStyle:{
        paddingLeft:10,
        paddingRight:10,
        marginBottom:80
    },
    selectionsStyle:{
        backgroundColor:'#6d6d6d',
        margin:5,
        padding:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5
    },
    images:{
        tintColor:'grey',
        height:50,
        width:50
    }, 
    imageFavorites:{
        tintColor:'yellow',
        height:50,
        width:50
        
    },
    searchBox:{
        fontSize:30,
            paddingLeft:10,
            paddingRight:10,
            maxWidth:250,
            marginLeft:30,
    }
  
  
  
  })
