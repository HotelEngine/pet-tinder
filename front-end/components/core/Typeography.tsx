import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '../core/Themed';

const defaultFontSize = 16;

interface iStyleArgs {
    bold: boolean;
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

interface iProps {
    children: React.ReactNode;
}

type iTypeographyProps = iProps & iStyleArgs;

const Typeography = ({ bold, children, type }: iTypeographyProps) => {
    return <Text style={getStyle({ bold, type })}>{children}</Text>;
};

const getStyle = ({ bold, type }: iStyleArgs) => {
    const types = {
        h1: {
            fontSize: defaultFontSize * 2,
        },
        h2: {
            fontSize: defaultFontSize * 1.75,
        },
        h3: {
            fontSize: defaultFontSize * 1.5,
        },
        h4: {
            fontSize: defaultFontSize * 1.25,
        },
        h5: {
            fontSize: defaultFontSize * 1,
        },
        h6: {
            fontSize: defaultFontSize * 1,
        },
        p: {
            fontSize: defaultFontSize,
        },
    };
    const returnStyle: any = types[type];

    if (bold) {
        returnStyle.fontWeight = 'bold';
    }

    return StyleSheet.create(returnStyle);
};

export default Typeography;
