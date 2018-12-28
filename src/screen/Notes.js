import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Routes from '../Routes';
import firebase from 'react-native-firebase';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons';

//Components
import Note from '../components/Note';

export default class Notes extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        
        const prevGetStateForAction = Routes.router.getStateForAction;

        Routes.router.getStateForAction = (action, state) => {
            // Do not allow to go back from Login
            if (action.type === "Navigation/BACK" && state && state.routes[state.index].routeName === "Notes") {
                return null;
            }

            // Do not allow to go back to Login
            /*if (action.type === "Navigation/BACK" && state) {
                const newRoutes = state.routes.filter(r => r.routeName !== "Notes");
                const newIndex = newRoutes.length - 1;
                return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
            }*/

            return prevGetStateForAction(action, state);
        };

        let userId = firebase.auth().currentUser.uid;
        let notesList = firebase.database().ref('/users/' + userId);

        notesList.on('value', (snapshot) => {
            const notes =
                snapshot.val() !== null ?
                    Object.entries(snapshot.val()).map(item => ({ key: item[0], ...item[1] }))
                    : [];
            this.setState({ notes }, this.filterNotes);
        });
    }

    state = {
        allNotes: false,
        notes: [],
        visibleNotes: []
    }

    filterNotes() {
        let visibleNotes = null;

        if (this.state.allNotes) {
            visibleNotes = [...this.state.notes];
        } else {
            const filter = note => note.done === false;
            visibleNotes = this.state.notes.filter(filter);
        }

        this.setState({ visibleNotes });
    }

    onPressSignOut() {
        firebase.auth().signOut().then(
            () => {
                this.props.navigation.push('SignIn');
            }
        );
    }

    onPressFilter() {
        const allNotes = !this.state.allNotes;
        this.setState({ allNotes }, () => this.filterNotes());
    }

    onDelete = id => {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).child(id).remove();
    }

    onDone = (id, done) => {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).child(id).child('done').set(!done);
    }

    onPressAllDone() {
        let userId = firebase.auth().currentUser.uid;
        this.state.visibleNotes.forEach(item => {
            firebase.database().ref('/users/' + userId).child(item.key).child('done').set(true);
        });
    }

    onAdd() {
        this.props.navigation.push('AddNotes');
    }

    onEdit = (id, desc) => {
        this.props.navigation.push('EditNotes', { id, desc });
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.onPressSignOut()} style={styles.buttonSignOut}>
                        <Text style={{ marginRight: 5, color: '#ffe681' }}>Deslogar</Text>
                        <Icon name="sign-out" size={30} color={'#ffe681'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    <FlatList
                        data={this.state.visibleNotes}
                        keyExtractor={item => `${item.key}`}
                        renderItem={({ item }) =>
                            <Note
                                {...item}
                                id={item.key}
                                onDelete={this.onDelete}
                                onDone={this.onDone}
                                onEdit={this.onEdit} />}
                    />

                </View>

                <ActionButton buttonColor="#ffe681">
                    <ActionButton.Item buttonColor='#9b59b6' title="Nova nota" onPress={() => this.onAdd()}>
                        <IonIcon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title={this.state.allNotes ? "Visualizar todas" : "Somente não concluídas"} onPress={() => this.onPressFilter()}>
                        <IonIcon name={this.state.allNotes ? 'md-eye' : 'md-eye-off'} style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Concluir todas" onPress={() => this.onPressAllDone()}>
                        <IonIcon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    header: {
        alignItems: 'flex-end'
    },

    body: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },

    buttonSignOut: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})
