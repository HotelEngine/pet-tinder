import * as React from 'react';
import defaultPet from '../../assets/pet.json';
import { Image, StyleSheet } from 'react-native';
import { Typeography, View } from '../core/';

export interface IPetCardProps {
    petData: any;
}

const PetCard = ({ petData = defaultPet }: IPetCardProps) => {
    return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PetCard;
