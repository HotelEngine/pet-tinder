import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View } from 'react-native';
import { TextInput } from './core';

const PET_TYPES = gql`
    query PET_TYPES {
        name
    }
`;

const SearchForm = () => {
    const { called, data, error, loading } = useQuery(PET_TYPES);

    return (
        <View>
            <TextInput />
        </View>
    );
};

export default SearchForm;
