import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';

import styles from './src/assets/styles';

import LocationProvider from './src/providers/LocationProvider';
import DataProvider from './src/providers/DataProvider';
import PetDataProvider from './src/providers/PetDataProvider';
import HomeScreen from './src/containers/Home';
import MatchesScreen from './src/containers/Matches';
import MessagesScreen from './src/containers/Messages';
import ProfileScreen from './src/containers/Profile';
import Icon from './src/components/Icon';

const Tab = createBottomTabNavigator();

const App = () => {
    const [customFontsLoaded] = useFonts({
        tinderclone: require('./src/assets/fonts/tinderclone.ttf'),
    });

    return customFontsLoaded ? (
        <PaperProvider>
            <LocationProvider>
                <DataProvider>
                    <PetDataProvider>
                        <NavigationContainer>
                            <Tab.Navigator
                                screenOptions={({ route }: any) => ({
                                    tabBarIcon: ({ focused }) => {
                                        const iconFocused = focused ? '#7444C0' : '#363636';
                                        const iconName: any = {
                                            Explore: 'explore',
                                            Matches: 'heart',
                                            Chat: 'chat',
                                            Profile: 'user',
                                        };

                                        return (
                                            <Text style={[styles.iconMenu, { color: iconFocused }]}>
                                                <Icon name={iconName[route.name]} />
                                            </Text>
                                        );
                                    },
                                })}
                                tabBarOptions={{
                                    activeTintColor: '#7444C0',
                                    inactiveTintColor: '#363636',
                                    labelStyle: {
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        paddingTop: 10,
                                    },
                                    style: {
                                        backgroundColor: '#FFF',
                                        borderTopWidth: 0,
                                        paddingVertical: 30,
                                        height: 60,
                                        marginBottom: 0,
                                        shadowOpacity: 0.05,
                                        shadowRadius: 10,
                                        shadowColor: '#000',
                                        shadowOffset: { height: 0, width: 0 },
                                    },
                                }}
                            >
                                <Tab.Screen name="Explore" component={HomeScreen} />
                                <Tab.Screen name="Matches" component={MatchesScreen} />
                                <Tab.Screen name="Chat" component={MessagesScreen} />
                                <Tab.Screen name="Profile" component={ProfileScreen} />
                            </Tab.Navigator>
                        </NavigationContainer>
                    </PetDataProvider>
                </DataProvider>
            </LocationProvider>
        </PaperProvider>
    ) : (
        <View>
            <Text>Loading fonts...</Text>
        </View>
    );
};

export default App;
