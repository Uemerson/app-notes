import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import EmailValidator from 'email-validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import Routes from '../Routes';

export default class SignIn extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);

        const prevGetStateForAction = Routes.router.getStateForAction;

        Routes.router.getStateForAction = (action, state) => {
            if (action.type === "Navigation/BACK" && state && state.routes[state.index].routeName === "SignIn") {
                return null;
            }
            return prevGetStateForAction(action, state);
        };
    }

    state = {
        email: '',
        password: ''
    }

    onPressSignIn() {
        const email = this.state.email;
        const password = this.state.password;

        if (email === '') {
            Alert.alert("Notas", "Entre com um email!");
        } else if (!EmailValidator.validate(email)) {
            Alert.alert("Notas", "Email inválido!");
        } else if (password === '') {
            Alert.alert("Notas", "Entre com uma senha!");
        } else {

            firebase.auth().signInWithEmailAndPassword(
                email,
                password
            )
            .then(
                (user) => {
                    this.props.navigation.push('Notes');
                }
            )
            .catch(
                (erro) => {
                    //erro.code, erro.menssage

                    if (erro.code === 'auth/user-not-found')
                        Alert.alert("Usuário não registrado", "Esse usuário ainda não foi registrado na nossa base de dados")
                    else
                        Alert.alert(erro.code, erro.message);
                }
            );

        }

    }

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.title}><Icon name="sticky-note" size={50} color={"#ffe681"} /> Notas</Text>

                <TextInput style={styles.input} placeholder="Email" keyboardType={"email-address"} onChangeText={(email) => this.setState({ email })} />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />

                <TouchableOpacity style={styles.buttonSignIn} onPress={() => this.onPressSignIn()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text
                    style={styles.signup}
                    onPress={() => this.props.navigation.push('SignUp')}>Ainda não tem conta? Inscreva-se</Text>
                <Text
                    style={styles.recoverPassword}
                    onPress={() => this.props.navigation.push('RecoverPassword')}>Esqueceu a senha?</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        padding: 20
    },

    title: {
        fontSize: 50,
        paddingBottom: 100,
        color: "#ffe681"
    },

    signup: {
        color: '#069',
        paddingTop: 30,
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },

    recoverPassword: {
        color: '#069',
        paddingTop: 15,
        textDecorationLine: 'underline',
        fontWeight: 'bold'
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

    buttonSignIn: {
        height: 45,
        backgroundColor: '#069',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#FFF'
    }
});
