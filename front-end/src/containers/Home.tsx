import * as React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import City from '../components/City';
import Filters from '../components/Filters';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import LoadingView from 'react-native-loading-view';
import { usePetDataProvider } from '../providers/PetDataProvider';

const Home = () => {
    const swiperRef = React.useRef({ swipeLeft: () => null, swipeRight: () => null });
    const { called, data, loading } = usePetDataProvider();

    const renderCard = ({ photos, name, description }, index) => {
        const image = photos && photos.length && photos[0] ? photos[0].medium : undefined;

        return (
            <Card key={index}>
                <CardItem
                    image={{ uri: image }}
                    name={name}
                    description={description}
                    matches={90}
                    actions
                    onPressLeft={() => swiperRef.current.swipeLeft()}
                    onPressRight={() => swiperRef.current.swipeRight()}
                />
            </Card>
        );
    };

    if (called && data && data?.length) console.log(data[0].photos[0].medium);
    return loading || !called || !data || !data?.length ? (
        <LoadingView loading={true}>
            <Text>Loading animals...</Text>
        </LoadingView>
    ) : (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    <City />
                    <Filters />
                </View>

                <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiperRef}>
                    {data.map(renderCard)}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

export default Home;
