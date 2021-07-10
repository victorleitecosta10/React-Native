import React, {useState} from 'react'
import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useNavigation} from "@react-navigation/native";
import firebase from "../../services/firebaseConnection";

export default function Cadastro() {
    const navigation = useNavigation();
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function cadastrar() {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((value) => {
                firebase.database().ref('usuarios').child(value.user.uid).set({
                    nome: name
                })
                alert('Usuario cadastrado com sucesso!')
                navigation.navigate('Home', {user: value.user.email})
                //Navegando usuario para Home e levando o email do usuario para a tela home
            })
            .catch((error) => {
                alert('Ops algo deu errado!');
                console.log(error);
            })

        setName('');
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>

            {/* NOME */}
            <Text style={styles.texto}>Nome</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid='transparent'
                onChangeText={(nome) => setName(nome)}
                value={name}
            />

            {/* EMAIL */}
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
                title='Cadastrar'
                onPress={cadastrar}
            />

            <TouchableOpacity
                style={styles.conta}
                onPress={() => navigation.navigate('Login')}>

                <Text style={{textAlign: 'center'}}>Já tenho uma conta</Text>

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
        conta: {
            marginTop: 25
        }
    }
)
