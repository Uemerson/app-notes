import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable';

export default props => {
    let check = null;

    if (props.done !== false) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={'white'} />
            </View>
        )
    } else {
        check = <View style={styles.pending} />
    }

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF' />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    );

    const rightContent = [
        <TouchableOpacity
            style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20 }]}
            onPress={() => props.onDelete(props.id)} >
            <Icon name='trash' size={30} color='#FFF' />
        </TouchableOpacity>,
    ];
    
    return (
        <Swipeable
            leftContent={leftContent}
            rightButtons={rightContent}
            onLeftActionActivate={() => props.onDelete(props.id)}>

            <TouchableWithoutFeedback onPress={() => {props.onEdit(props.id, props.desc)}}>
                <View style={styles.container}>

                    <TouchableWithoutFeedback onPress={() => props.onDone(props.id, props.done)}>
                        <View style={styles.checkContainer}>{check}</View>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, flexWrap: 'wrap' }}>
                        <Text style={styles.description}>{props.desc}</Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>

        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA'
    },

    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },

    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },

    description: {
        color: 'black',
        fontSize: 15
    },

    exclude: {
        flex: 1,
        backgroundColor: '#ffe681',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    excludeText: {
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
});