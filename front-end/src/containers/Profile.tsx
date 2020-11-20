import * as React from 'react';
import styles from '../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { usePetDataProvider } from '../providers/PetDataProvider';

import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';

const Profile = () => {
    const navigation = useNavigation();
    const { profileData = {} } = usePetDataProvider();
    const { matchRating, name, age, description, photos, distance, gender, size, status } = profileData || {};
    const image = { uri: photos && photos?.length && photos[0] ? photos[0].medium : undefined };

    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={image} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.topIconLeft}>
                                <Icon name="chevronLeft" />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.topIconRight}>
                                <Icon name="optionsV" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ProfileItem
                    matches={matchRating}
                    name={name}
                    age={age}
                    description={description}
                    distance={distance}
                    gender={gender}
                    size={size}
                    status={status}
                />

                <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.circledButton}>
                        <Text style={styles.iconButton}>
                            <Icon name="optionsH" />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundedButton}>
                        <Text style={styles.iconButton}>
                            <Icon name="chat" />
                        </Text>
                        <Text style={styles.textButton}>Start chatting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Profile;
