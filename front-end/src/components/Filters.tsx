import * as React from 'react';
import styles from '../assets/styles';

import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useFontProvider } from '../providers/FontProvider';

const Filters = () => {
    const { isLoaded } = useFontProvider();

    return (
        <TouchableOpacity style={styles.filters}>
            {isLoaded('tinderclone') ? (
                <Text style={styles.filtersText}>
                    <Icon name="filter" /> Filters
                </Text>
            ) : (
                <Text>Filters</Text>
            )}
        </TouchableOpacity>
    );
};

export default Filters;
