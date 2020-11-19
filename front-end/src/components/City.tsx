import * as React from 'react';
import styles from '../assets/styles';

import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useFontProvider } from '../providers/FontProvider';

const City = () => {
    const { isLoaded } = useFontProvider();

    return (
        <TouchableOpacity style={styles.city}>
            {isLoaded('tinderclone') ? (
                <Text style={styles.cityText}>
                    <Icon name="marker" /> New York
                </Text>
            ) : (
                <Text>New York</Text>
            )}
        </TouchableOpacity>
    );
};

export default City;
