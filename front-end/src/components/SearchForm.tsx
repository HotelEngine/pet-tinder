import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, Picker } from 'react-native';
import { Button, ActivityIndicator, Surface, Menu, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { usePetDataProvider } from '../providers/PetDataProvider';

import styles from '../assets/styles';

const PET_TYPES = gql`
    query PET_TYPES {
        animalTypes {
            name
        }
    }
`;

const SearchForm = ({ closeModal }) => {
    const { called, data = { animalTypes: [] }, error, loading } = useQuery(PET_TYPES);
    const { control, register, handleSubmit, watch, errors } = useForm();
    const { searchPets } = usePetDataProvider();
    const [menuVisible, setMenuVisible] = React.useState(false);

    function onHandleSubmit(values) {
        searchPets(values);
    }

    function handleMenuDismiss() {
        setMenuVisible(false);
    }

    function handleMenuPress() {
        setMenuVisible(true);
    }

    function handleTypeButtonPress(searchValue) {
        searchPets(searchValue);
        closeModal();
    }

    return (
        <Surface style={styles.searchForm}>
            {data.animalTypes.map(({ name }) => (
                <Button key={name} onPress={() => handleTypeButtonPress({ type: name })}>
                    {name}
                </Button>
            ))}
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        label="Location"
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name="location"
                rules={{ required: true }}
                defaultValue=""
            />
        </Surface>
    );
};

export default SearchForm;
