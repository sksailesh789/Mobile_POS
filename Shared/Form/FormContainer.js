import React from 'react'
import {ScrollView, Dimensions, StyleSheet,Text} from 'react-native'

let {width,height} = Dimensions.get('window')

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
           <Text style={styles.title}>{props.title ? props.title : ''}</Text> 
           {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        // marginTop: 80,
        // marginBottom: 400,
        width:width,
        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',
        backgroundColor:'#fff',
        height: height

    },
    title : {
        fontSize: 30
    }
})
export default FormContainer;
