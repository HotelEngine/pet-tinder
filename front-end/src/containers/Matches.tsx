import * as React from 'react';
import styles from '../assets/styles';
import LoadingView from 'react-native-loading-view';

import { usePetDataProvider } from '../providers/PetDataProvider';

import { ScrollView, View, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import CardItem from '../components/CardItem';
import Icon from '../components/Icon';
import Demo from '../assets/data/demo.js';

const Matches = () => {
    const { called, data, loading } = usePetDataProvider();

    return (
        <View>
            {loading ? (
                <LoadingView loading={true}>
                    <Text>Loading animals...</Text>
                </LoadingView>
            ) : (
                <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
                    <View style={styles.containerMatches}>
                        <ScrollView>
                            <View style={styles.top}>
                                <Text style={styles.title}>Matches</Text>
                                <TouchableOpacity>
                                    <Text style={styles.icon}>
                                        <Icon name="optionsV" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                numColumns={2}
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <CardItem
                                            image={item.photos.medium}
                                            name={item.name}
                                            status={item.status}
                                            variant
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                </ImageBackground>
            )}
        </View>
    );
};

export default Matches;
