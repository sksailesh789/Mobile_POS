import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

const Input = (props) => {
    return (
        <TextInput
            style={[styles.input , props.border ? props.border : styles.bg]}
            placeholder = {props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText= {props.onChangeText}
            onFocus= {props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType= {props.keyboardType}
        >  
        </TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        fontSize: 15,
        color:'#4f4649'
    },
    bg: {
        borderColor:'#f0f0f0'
    }
})

export default Input;