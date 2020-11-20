import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const FormSearchModal = ({ children = null, open = false, onOpen = () => null, onClose = () => null }) => {
    return (
        <Modal animationType="slide" transparent={false} visible={open} onRequestClose={onClose}>
            <View style={styles.centeredView}>{children}</View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default FormSearchModal;
