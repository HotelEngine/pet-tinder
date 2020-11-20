import * as React from 'react';
import styles from '../assets/styles';

import { Text, View } from 'react-native';
import Icon from './Icon';

const ProfileItem = ({ matches, name, age, description, distance, gender, size, status }) => {
    return (
        <View style={styles.containerProfileItem}>
            <View style={styles.matchesProfileItem}>
                <Text style={styles.matchesTextProfileItem}>
                    <Icon name="heart" /> {matches.toFixed()}% Match!
                </Text>
            </View>

            <Text style={styles.name}>{name}</Text>

            <Text style={styles.descriptionProfileItem}>Age: {age}</Text>

            <Text style={styles.descriptionProfileItem}>Distance: {distance.toFixed(1)} miles</Text>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="circle" />
                </Text>
                <Text style={styles.infoContent}>{description}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="circle" />
                </Text>
                <Text style={styles.infoContent}>Gender: {gender}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="circle" />
                </Text>
                <Text style={styles.infoContent}>Size: {size}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.iconProfile}>
                    <Icon name="circle" />
                </Text>
                <Text style={styles.infoContent}>Status: {status}</Text>
            </View>
        </View>
    );
};

export default ProfileItem;
