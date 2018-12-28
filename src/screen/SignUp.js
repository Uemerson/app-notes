import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import EmailValidator from 'email-validator';

import firebase from 'react-native-firebase';

export default class SignUp extends Component {
    static navigationOptions = {
        title: 'Criar conta',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: 'white' },
        headerStyle: {
            backgroundColor: '#069',
        },
        headerTintColor: 'white'
    }

    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    onPressSignUp() {
        if (this.state.email === '')
            Alert.alert("Email vazio", "Entre com um email");
        else if (!EmailValidator.validate(this.state.email))
            Alert.alert("Email inválido", "Entre com um email válido");
        else if (this.state.password === '')
            Alert.alert("Senha vazia", "Entre com uma senha");
        else if (this.state.password.length < 6)
            Alert.alert("Senha pequena", "Senha deve conter no mínimo 6 caracteres");
        else if (this.state.password !== this.state.confirmPassword)
            Alert.alert("Confirmar senha", "As senhas não estão iguais!");
        else {

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(
                    (user) => {
                        this.props.navigation.push('Notes');
                    }
                )
                .catch(
                    (erro) => {
                        //erro.code, erro.menssage
                        
                        if (erro.code === 'auth/email-already-in-use')
                            Alert.alert("Email em uso", "Esse email já está em uso!")
                        else
                            Alert.alert(erro.code, erro.menssage);
                    }
                );

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email" keyboardType={"email-address"} onChangeText={(email) => this.setState({ email })} />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                <TextInput style={styles.input} placeholder="Confirme a senha" secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />

                <TouchableOpacity style={styles.buttonSignUp} onPress={() => this.onPressSignUp()}>
                    <Text style={styles.buttonText}>Inscrever-se</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#EEE',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginBottom: 10
    },

    buttonSignUp: {
        height: 45,
        backgroundColor: '#069',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF'
    }
});