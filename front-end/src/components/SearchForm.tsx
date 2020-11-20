import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View } from 'react-native';
import { Surface, TextInput } from 'react-native-paper';

import styles from '../assets/styles';

const PET_TYPES = gql`
    query PET_TYPES {
        name
    }
`;

const SearchForm = () => {
    const { called, data, error, loading } = useQuery(PET_TYPES);

    return (
        <Surface style={styles.searchForm}>
            <TextInput />
        </Surface>
    );
};

export default SearchForm;
