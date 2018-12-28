import React, { Component } from 'react'
import { Alert, Modal, View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

export default class AddNotes extends Component {

    static navigationOptions = {
        title: 'Nova nota',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: 'white' },
        headerStyle: {
            backgroundColor: '#ffe681',
        },
        headerTintColor: 'white'
    }

    state = { desc: '' }

    onPressSaveNote() {

        if (this.state.desc !== '') {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId).push().set({
                desc: this.state.desc,
                done: false
            });

            this.props.navigation.goBack();
        } else {
            Alert.alert("Entre com uma descrição!", "Descrição não pode ser vazia!");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Descrição da nota" style={styles.input}
                    onChangeText={desc => this.setState({ desc })}
                    value={this.state.desc}
                    multiline={true} />

                <TouchableOpacity onPress={() => this.onPressSaveNote()} style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        flex: 1,
        alignSelf: 'stretch',
        textAlignVertical: 'top'
    },

    button: {
        height: 50,
        backgroundColor: '#ffe681',
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