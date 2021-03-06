import * as React from 'react';
import * as Font from 'expo-font';
import styles from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

import { usePetDataProvider } from '../providers/PetDataProvider';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const CardItem = ({
    actions,
    description,
    recordId,
    image,
    matches,
    name,
    onPressLeft,
    onPressRight,
    status,
    variant,
    error,
}) => {
    const navigation = useNavigation();
    const { setProfileRecord } = usePetDataProvider();
    // Custom styling
    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: variant ? 150 : 296,
            margin: variant ? 0 : 20,
        },
    ];

    const nameStyle = [
        {
            paddingTop: variant ? 10 : 15,
            paddingBottom: variant ? 5 : 7,
            color: '#363636',
            fontSize: variant ? 15 : 30,
        },
    ];

    function handleProfilePress() {
        console.log('SETTING RECORD ID OF PROFILE', recordId);
        setProfileRecord(recordId);
        navigation.navigate('Profile');
    }

    return (
        <View style={styles.containerCardItem}>
            {image && <Image source={image} style={imageStyle} />}
            {typeof matches === 'number' && (
                <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        <Icon name="heart" /> {matches.toFixed(0)}% Match!
                    </Text>
                </View>
            )}
            <Text style={nameStyle} numberOfLines={1}>
                {name}
            </Text>
            {description && <Text style={styles.descriptionCardItem}>{description || ' '}</Text>}
            {status && (
                <View style={styles.status}>
                    <View style={status === 'Online' ? styles.online : styles.offline} />
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            )}
            {actions && (
                <View style={styles.actionsCardItem}>
                    <TouchableOpacity style={styles.miniButton}>
                        <Text style={styles.star}>
                            <Icon name="star" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
                        <Text style={styles.dislike}>
                            <Icon name="dislike" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => onPressRight()}>
                        <Text style={styles.like}>
                            <Icon name="like" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.miniButton} onPress={handleProfilePress}>
                        <Text style={styles.flash}>
                            <Icon name="flash" />
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default CardItem;
