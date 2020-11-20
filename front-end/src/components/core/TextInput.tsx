import * as React from 'react';
import { TextInput as ReactTextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';

export interface ITextInputProps {
    readonly error?: string | undefined;
    readonly label?: string | undefined;
    readonly inputProps?: { [key: string]: any } | undefined;
    readonly value: string | '';
    readonly style: { value: { [key: string]: string } };
}

const TextInput = ({ value, style, inputProps }: ITextInputProps) => {
    return (
        <View>
            <ReactTextInput style={styles.input} />
        </View>
    );
};

export default TextInput;

const styles = StyleSheet.create({
    input: { borderColor: '#ececec', borderWidth: 2, padding: 3, paddingLeft: 8, paddingRight: 8, width: '800%' },
});
