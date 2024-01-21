import React from "react"
import { StyleSheet, View, Text } from 'react-native'

const Error = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        color: 'red',
        fontSize: 15,
        fontWeight: '500'
    }
})

export default Error;