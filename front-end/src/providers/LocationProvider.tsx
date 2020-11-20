import * as React from 'react';
import * as Location from 'expo-location';

interface ILocationProviderProps {
    readonly children: React.ReactNode;
}

interface iMapRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface iState {
    hasLocationPermissions?: boolean;
    locationResult?: any;
    locationStatus: string | null;
    mapRegion: iMapRegion;
    city: 'Earth' | null;
}

const INITIAL_STATE = {
    city: 'Earth',
    hasLocationPermissions: false,
    locationResult: null,
    locationStatus: null,
    mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
};

const LocationContext = React.createContext({ ...INITIAL_STATE, city: null });

export function useLocationProvider<iState>() {
    return React.useContext(LocationContext);
}

const LocationProvider = ({ children }: ILocationProviderProps) => {
    const [state, setState] = React.useReducer(
        (state: iState, newState: iState) => ({ ...state, ...newState }),
        INITIAL_STATE
    );

    // get the city
    React.useEffect(() => {
        const getCity = async () => {
            const { hasLocationPermissions, locationResult } = state;
            let newCity = 'Earth';

            if (hasLocationPermissions && locationResult.coords?.longitude && locationResult.coords?.longitude) {
                const rGeocode = await Location.reverseGeocodeAsync({
                    latitude: locationResult.coords?.latitude,
                    longitude: locationResult.coords?.longitude,
                });

                newCity = rGeocode[0].city || state.city;
            }

            console.log({ newCity });
            if (state.city !== newCity) {
                setState({ city: newCity });
            }
        };

        getCity();
    }, [state]);

    // Set state with location results and map region if possible.
    React.useEffect(() => {
        const getLocationAsync = async () => {
            let { status } = await Location.requestPermissionsAsync();
            const newState: iState = { ...state };

            if (status !== 'granted') {
                newState.locationStatus = 'Permission to access location was denied';
            } else {
                newState.hasLocationPermissions = true;
            }

            let location = await Location.getCurrentPositionAsync({});

            console.log({ location });
            newState.locationResult = location;

            // Center the map on the location we just fetched.
            setState({
                ...newState,
                mapRegion: {
                    latitude: location?.coords?.latitude || state.mapRegion.latitude,
                    longitude: location?.coords?.longitude || state.mapRegion.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            });
        };

        getLocationAsync();
    }, []);

    return <LocationContext.Provider value={{ ...state }}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
