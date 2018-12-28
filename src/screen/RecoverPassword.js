import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import EmailValidator from 'email-validator';

export default class RecoverPassword extends Component {
    static navigationOptions = {
        title: 'Recuperar senha',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: 'white' },
        headerStyle: {
            backgroundColor: '#069',
        },
        headerTintColor: 'white'
    }

    state = {
        email: ''
    }

    onPressRecoverPassword() {
        const emailAddress = this.state.email;

        if (emailAddress === '') {
            Alert.alert('Email vazio', 'Entre com um email!');
        } else if (EmailValidator.validate(emailAddress)) {
            Alert.alert('Email inválido', 'Entre com um email válido!');
        } else {

            firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
                Alert.alert('Recuperação de senha', 'Foi enviado um email de recuperação de senha para ' + this.state.email);
            }).catch(function (error) {
                Alert.alert(error.code, error.menssage);
            });

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={"Entre com o email"} style={styles.input} />
                <TouchableOpacity style={styles.button} onPress={() => this.onPressRecoverPassword()}>
                    <Text style={styles.buttonText}>Recuperar a senha</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#EEE',
        borderWidth: 1,
        paddingHorizontal: 20
    },

    button: {
        height: 45,
        backgroundColor: '#069',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF'
    }
});