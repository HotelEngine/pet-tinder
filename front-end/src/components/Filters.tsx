import * as React from 'react';
import styles from '../assets/styles';

import { Text, TouchableOpacity, View } from 'react-native';
import FormSearchModal from './FormSearchModal';
import SearchForm from './SearchForm';
import Icon from './Icon';

const Filters = () => {
    const [showForm, setShowForm] = React.useState(false);

    const handleFiltersPress = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <TouchableOpacity style={styles.filters} onPress={handleFiltersPress}>
                <Text style={styles.filtersText}>
                    <Icon name="filter" /> Filters
                </Text>
            </TouchableOpacity>
            <FormSearchModal open={showForm}>
                <View>
                    <TouchableOpacity style={styles.filters} onPress={handleFiltersPress}>
                        <Text style={styles.filtersText}>
                            <Icon name="filter" /> Filters
                        </Text>
                    </TouchableOpacity>
                    <SearchForm closeModal={handleFiltersPress} />
                </View>
            </FormSearchModal>
        </>
    );
};

export default Filters;
