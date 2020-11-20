import * as React from 'react';
import styles from '../assets/styles';

import { usePetDataProvider } from '../providers/PetDataProvider';

import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from '../components/Icon';

const Profile = () => {
    const { profileData } = usePetDataProvider();
    const photos = profileData.photos[0];
    const photoKeys = Object.keys(photos).filter(key => {
        if (key == '__typename') {
            return false;
        }
        return true;
    });

    const photoURL = photos[photoKeys[0]];
    const image = { uri: photoURL };

    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={image} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity>
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
                    matches={profileData.matchRating}
                    name={profileData.name}
                    age={profileData.age}
                    description={profileData.description}
                    distance={profileData.distance}
                    gender={profileData.gender}
                    size={profileData.size}
                    status={profileData.status}
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
