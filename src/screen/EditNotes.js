import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

export default class EditNotes extends Component {
    static navigationOptions = {
        title: 'Editar nota',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: 'white' },
        headerStyle: {
            backgroundColor: '#ffe681',
        },
        headerTintColor: 'white'
    }

    state = {
        desc: this.props.navigation.getParam('desc')
    }

    onPressSaveNote() {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).child(this.props.navigation.getParam('id')).child('desc').set(this.state.desc);
        this.props.navigation.goBack();
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