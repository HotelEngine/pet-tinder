import * as React from 'react';
import styles from '../assets/styles';

import { useLocationProvider } from '../providers/LocationProvider';

import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const City = () => {
    const { city } = useLocationProvider();

    return (
        <TouchableOpacity style={styles.city}>
            <Text style={styles.cityText}>
                <Icon name="marker" /> {city}
            </Text>
        </TouchableOpacity>
    );
};

export default City;
