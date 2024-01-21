import React from 'react'
import {View,StyleSheet,Dimensions} from 'react-native'
import LottieView from "lottie-react-native"

const AppLoader = () => {
  return (
    <View style={[styles.container,{height:Dimensions.get('screen').height - 300.0 ,}]}>
        <LottieView source={require('../assets/97930-loading.json')} 
         autoPlay loop  />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        zIndex: 10000
    }
})
export default AppLoader