import React from 'react'
import {StyleSheet, Text, View} from "react-native";

export default function Listagem({data}) {
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Nome: {data.nome}</Text>
            <Text style={styles.text}>Cargo: {data.cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#7e7d7d'
    },
    text: {
        fontSize: 17,
        color: '#FFF'
    }
})
