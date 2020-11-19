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
    locationResult?: {
        coords: {
            altitude: number | null;
            altitudeAccuracy: number | null;
            latitude: number | null;
            accuracy: number | null;
            longitude: number | null;
            heading: number | null;
            speed: number | null;
        };
        timestamp: number | null;
    } | null;
    locationStatus: string | null;
    mapRegion: iMapRegion;
}

const INITIAL_STATE = {
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

const LocationContext = React.createContext(INITIAL_STATE);

export function useLocationProvider<INITIAL_STATE>() {
    return React.useContext(LocationContext);
}

const LocationProvider = ({ children }: ILocationProviderProps) => {
    const [state, setState] = React.useReducer(
        (state: iState, newState: iState) => ({ ...state, ...newState }),
        INITIAL_STATE
    );

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

    console.log(state);
    return <LocationContext.Provider value={state}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
