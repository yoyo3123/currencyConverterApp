import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,useState } from "react";

const Alldata = createContext()

export const Currencyprovider = ({children}) =>{




    const currencys = [
         {curCode:"AUD",	curName:"Australian Dollar"}
        ,{curCode:"BGN",	curName:"Bulgarian Lev"}
        ,{curCode:"BRL",	curName:"Brazilian Real"}
        ,{curCode:"CAD",	curName:"Canadian Dollar"}
        ,{curCode:"CHF",	curName:"Swiss Franc"}
        ,{curCode:"CNY",	curName:"Chinese Renminbi Yuan"}
        ,{curCode:"CZK",	curName:"Czech Koruna"}
        ,{curCode:"DKK",	curName:"Danish Krone"}
        ,{curCode:"EUR",	curName:"Euro"}
        ,{curCode:"GBP",	curName:"British Pound"}
        ,{curCode:"HKD",	curName:"Hong Kong Dollar"}
        ,{curCode:"HUF",	curName:"Hungarian Forint"}
        ,{curCode:"IDR",	curName:"Indonesian Rupiah"}
        ,{curCode:"ILS",	curName:"Israeli New Sheqel"}
        ,{curCode:"INR",	curName:"Indian Rupee"}
        ,{curCode:"ISK",	curName:"Icelandic Króna"}
        ,{curCode:"JPY",	curName:"Japanese Yen"}
        ,{curCode:"KRW",	curName:"South Korean Won"}
        ,{curCode:"MXN",	curName:"Mexican Peso"}
        ,{curCode:"MYR",	curName:"Malaysian Ringgit"}
        ,{curCode:"NOK",	curName:"Norwegian Krone"}
        ,{curCode:"NZD",	curName:"New Zealand Dollar"}
        ,{curCode:"PHP",	curName:"Philippine Peso"}
        ,{curCode:"PLN",	curName:"Polish Złoty"}
        ,{curCode:"RON",	curName:"Romanian Leu"}
        ,{curCode:"SEK",	curName:"Swedish Krona"}
        ,{curCode:"SGD",	curName:"Singapore Dollar"}
        ,{curCode:"THB",	curName:"Thai Baht"}
        ,{curCode:"TRY",	curName:"Turkish Lira"}
        ,{curCode:"USD",	curName:"United States Dollar"}
        ,{curCode:"ZAR",	curName:"South African Rand"}
    ]

    const [currencyfrom,setCurrencyfrom]=useState({curCode:null,curName:'From'})
    const [currencyto,setCurrencyto]=useState({curCode:null,curName:'To'})
    const [favorites,setFavorites] = useState([])
    const [result,setResult] = useState()
    const [amount,setAmount]=useState(0)
    const [onoff,setOnoff] = useState('on')
    

    const addToFavorites = (val)=>{
        setFavorites([...favorites,val])
    }

    const checkStatus = ()=>{
        if (currencyfrom.curCode && currencyto.curCode) {
            convert()
        }
    }

    const CheckOnOff = async ()=>{
        const results = await AsyncStorage.getItem('settingsOnOff',(err,result)=>{
            if (result) {
              return(result)
            }
        })
        
        const valParsed = JSON.parse(results)
        // console.log(valParsed.onoff);
        if (!results) {
            const data = {onoff:false}
            const parsed = JSON.stringify(data)
            await AsyncStorage.setItem('settingsOnOff',parsed)
        }else if (valParsed.onoff) {
            setOnoff('off')
        } 
    }

    const setOnOff = async ()=>{
        const results = await AsyncStorage.getItem('settingsOnOff',(err,result)=>{
            if (result) {
              
              return(result)
            }
        })
        const valParsed = JSON.parse(results)
        console.log(valParsed.onoff);
        if (valParsed.onoff) {
            setOnoff('on')
            const data = {onoff:false}
            const parsed = JSON.stringify(data)
            await AsyncStorage.mergeItem('settingsOnOff',parsed)
        }else{
            setOnoff('off')
            const data = {onoff:true}
            const parsed = JSON.stringify(data)
            await AsyncStorage.mergeItem('settingsOnOff',parsed)
        }
    }

    const fromTo = async () => {
        let results;
        await AsyncStorage.getItem('fromTo',(err,result)=>{
        
                if (result) {
                //   const valUnparsed = JSON.stringify(result.replace(/(?:\\[rn])+/g, ''))
                //   const valParsed = JSON.parse(JSON.parse(valUnparsed))
                  const valParsed = JSON.parse(result)
                  results = valParsed
                }
            })
              if (results) {
                console.log(results.from);
                setCurrencyfrom({curCode:results.from.curCode,curName:results.from.curName})
                setCurrencyto({curCode:results.to.curCode,curName:results.to.curName})
                
              }
            
            
    }

    const getFavorites = async ()=>{
        const favoriteList = await AsyncStorage.getItem('favorites',(err,result)=>{
            return(result)
        })
        const list = await JSON.parse(favoriteList)
        if (list) {
            setFavorites(list)
        }
        
    }

        
    const switchCur = ()=>{
        currencyfrom
        const saveSwitch = currencyfrom
        setCurrencyfrom(currencyto)
        setCurrencyto(saveSwitch)
    }
    
    const convert = async () =>{
        const from = currencyfrom
        const to = currencyto
        const apikey = '8JCzxjhMR8uvHW8u3jyz7RVxtkhoxqUi'
        if (currencyfrom.curCode && currencyto.curCode) {
            let response;
            let results;
            try {
                
                const host = 'api.frankfurter.app';
                response = await fetch(
                    `https://${host}/latest?amount=1&from=${from.curCode}&to=${to.curCode}`
                // `https://api.currencybeacon.com/v1/convert?api_key=${apikey}&from=${from.curCode}&to=${to.curCode}&amount=${1}`
                )
                results = await response.json();
                console.log(results);
            } catch (error) {
             console.log(error);   
            }
            
            
            const fromTo = await AsyncStorage.getItem('fromTo', (err, result) => {
                return (result)
            });
            if (fromTo) {
                AsyncStorage.mergeItem('fromTo',JSON.stringify({from,to})) 
            }else{
                AsyncStorage.setItem('fromTo',JSON.stringify({from,to})) 
            }

            if (!response) {
                const resultlist = await AsyncStorage.getItem('itemsOnOff',(err,result)=>{
                    if (result) {
                      return(result)
                    }
                })
                if (resultlist) {
                    const valParsed = JSON.parse(resultlist)
                    console.log(valParsed);
                    if (valParsed.from == from.curCode && valParsed.to == to.curCode) {
                        results = {amount:1,rates:{[to.curCode]:valParsed.rates[to.curCode]}}}
                    }
                    
                
                
            }else if (onoff == 'off') {
                const resultlist = await AsyncStorage.getItem('itemsOnOff',(err,result)=>{
                    if (result) {
                        console.log(result);
                      return(result)
                    }
                })
                if (resultlist) {
                    const data = {from:from.curCode,to:to.curCode,value:results.rates[to.curCode]}
                    const parsed = JSON.stringify(data)
                    await AsyncStorage.mergeItem('itemsOnOff',parsed)
                }else{
                    const data = {from:from.curCode,to:to.curCode,value:results.rates[to.curCode]}
                    const parsed = JSON.stringify(data)
                    await AsyncStorage.setItem('itemsOnOff',parsed)
                }
                     
            }
            if (results) {
                const str = (results.rates[to.curCode] * amount).toString()
                const slicedString = str.substring(0,str.indexOf('.')+4)
                const num = Number(slicedString)
                setResult(`${results.amount * amount} ${from.curCode} is ${num} ${to.curCode}`)  
            }else{
                setResult('network error please find signal')
            }
            
        }else{      
            setResult('Please select a currency')
        }
    
    
    }

    return (
        <Alldata.Provider value={{currencys,result,onoff,CheckOnOff,getFavorites,favorites,setFavorites,setOnOff,switchCur,checkStatus,fromTo,setCurrencyfrom,currencyfrom,currencyto,setCurrencyto,convert,setAmount,addToFavorites}}>{children}</Alldata.Provider>

    )
}


export default Alldata;