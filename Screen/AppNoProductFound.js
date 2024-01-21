import React from 'react'
import {View,StyleSheet,Dimensions} from 'react-native'
import LottieView from "lottie-react-native"

const AppNoProductFound = () => {
  return (
    <View style={[styles.container,{height:Dimensions.get('screen').height - 100.0 ,}]}>
        <LottieView source={require('../assets/72311-no-data-found.json')} 
         autoPlay loop  />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        zIndex: 10000,backgroundColor:'red'
    }
})
export default AppNoProductFound