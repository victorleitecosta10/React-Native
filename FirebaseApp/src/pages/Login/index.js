import React, {useState} from 'react'
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import firebase from '../../services/firebaseConnection'
import {useNavigation} from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function logar() {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((value) => {
                navigation.navigate('Home', {user: value.user.email})
            })
            .catch((error) => {
                alert('Ops algo deu errado!')
            })

        setEmail('')
        setPassword('')
        Keyboard.dismiss()
    }

    async function logout() {
        await firebase.auth().signOut()
        alert('Deslogado com sucesso!')
    }

    return (
        <View style={styles.container}>
            {/* EMAIL*/}
            <Text style={styles.texto}>Email</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />

            {/* SENHA */}
            <Text style={styles.texto}>Senha</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={(texto) => setPassword(texto)}
                value={password}
            />

            <Button
                title='Acessar'
                onPress={logar}
            />

            <TouchableOpacity
                style={styles.conta}
                onPress={() => navigation.navigate('Cadastro')}>

                <Text style={{textAlign: 'center'}}>Criar uma conta</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 10
        },
        texto: {
            fontSize: 20
        },
        input: {
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#121212',
            height: 45,
            fontSize: 17
        },
        usuario: {
            marginTop: 20,
            marginBottom: 20,
            fontSize: 23,
            textAlign: 'center'
        },
        conta: {
            marginTop: 25
        }
    }
)
