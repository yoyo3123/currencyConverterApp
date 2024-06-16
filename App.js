import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import {NavigationContainer}from '@react-navigation/native';//replace browserrouter
import {createNativeStackNavigator}from '@react-navigation/native-stack';//replace routes and route

import Home from './screens/Home';
import Header from './screens/Header'
import Settings from './screens/Settings'



import {Currencyprovider} from './Contextapi';




// npm i @react-navigation/native-stack
// npm i @react-navigation/native


export default function App() {

  const Stack = createNativeStackNavigator()
  

  return (

    <Currencyprovider>
      {/* <Header/> */}
      
      <NavigationContainer>

        <Stack.Navigator>
          
        <Stack.Screen name='Home' component={Home} options={{
          // title: 'My home',
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          header:Header
        }}/>
        <Stack.Screen name='Settings' component={Settings} options={{

          // header:Header
        }}/>

          
        </Stack.Navigator>
      </NavigationContainer>
    </Currencyprovider>

    // <View style={styles.container}>
    //   <Text style={styles.textstyle}>Open up App.js to start working on your app!</Text>

    //   <TextInput placeholder='hi' keyboardType='web-search' onChangeText={()=>{}}/>
      
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.8,
    flex:1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    backgroundColor:'black',
    fontSize:50,
    color:'#fff',

    

  },
});
