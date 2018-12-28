import React from 'react';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

//Screen
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import RecoverPassword from './screen/RecoverPassword';
import Notes from './screen/Notes';
import AddNotes from './screen/AddNotes';
import EditNotes from './screen/EditNotes';

//Função que verifica se o usuário está logado
function userSignIn(){
    let signIn = false;

    firebase.auth().onAuthStateChanged(user => {
        if (user)
            signIn = true;
        else
            signIn = false;
    });

    return signIn;
}

export default Routes = createStackNavigator(
    {
        SignIn: {
            screen: SignIn
        },

        SignUp: {
            screen: SignUp
        },

        RecoverPassword: {
            screen: RecoverPassword
        },

        Notes: {
            screen: Notes
        },

        AddNotes: {
            screen: AddNotes
        },

        EditNotes: {
            screen: EditNotes
        }
    },
    {
        //Se o usuário estiver logado, redireciona para a screen de notes
        //caso não para a screen signIn
        initialRouteName: (userSignIn() ? 'Notes' : 'SignIn')   
    }
);