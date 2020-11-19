import * as React from 'react';
import * as styles from './LocationInfo.scss';

import { useLocationProvider } from '../providers/LocationProvider';

import { ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';

const LocationInfo = ({ children, className }: ILocationInfoProps) => {
    const { hasLocationPermission, locationResult } = useLocationProvider;

    return (
        <View>
            <Text>hasLocationPermission: {hasLocationPermission}</Text>
            <Text>locationResult: {locationResult}</Text>
        </View>
    );
};

export default LocationInfo;
