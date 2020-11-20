import * as React from 'react';
import { ScrollView, Text, View, ImageBackground } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import LoadingView from 'react-native-loading-view';
import { usePetDataProvider } from '../providers/PetDataProvider';

const Home = () => {
    const swiperRef = React.useRef({ swipeLeft: () => null, swipeRight: () => null });
    const { called, data, loading, error } = usePetDataProvider();

    const renderCard = ({ id, photos, name, description, matchRating }: { [key: string]: any }, index: number) => {
        const image = photos && photos.length && photos[0] ? photos[0].medium : undefined;

        function getImage() {
            let responsePhoto;

            if (photos?.length) {
                const photo = photos[0];
                const photoKeys = Object.keys(photo);

                if (photoKeys.includes('medium')) {
                    responsePhoto = photo.medium;
                } else {
                    responsePhoto = photo[photoKeys[0]];
                }
            }

            return { uri: responsePhoto };
        }

        return (
            <Card key={index}>
                <CardItem
                    image={getImage()}
                    recordId={id}
                    name={name}
                    error={error}
                    description={description}
                    matches={matchRating}
                    actions
                    onPressLeft={() => swiperRef.current.swipeLeft()}
                    onPressRight={() => swiperRef.current.swipeRight()}
                />
            </Card>
        );
    };

    return (
        <View style={styles.homeContainer}>
            {(loading || !called) && (
                <LoadingView loading={loading || !called} style={{ position: 'absolut' }}>
                    <Text>Loading animals...</Text>
                </LoadingView>
            )}
            {error && (
                <ScrollView style={styles.error}>
                    <Text>{typeof error === 'string' ? error : JSON.stringify(error, undefined, 4)}</Text>
                </ScrollView>
            )}
            {!error && !loading && called && (
                <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
                    <View style={styles.containerHome}>
                        <View style={styles.top}>
                            <City />
                            <Filters />
                        </View>
                        {!!data?.length && (
                            <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiperRef}>
                                {data.map(renderCard)}
                            </CardStack>
                        )}
                    </View>
                </ImageBackground>
            )}
        </View>
    );
};

export default Home;
