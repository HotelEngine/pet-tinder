import * as React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { remove } from 'lodash';

import { useLocationProvider } from './LocationProvider';

interface iPetDataProviderProps {
    readonly children: React.ReactNode;
}

interface iSearchFilters {
    latitude?: number | '';
    longitude?: number | '';
    type?: string | '';
    breed?: string | '';
    distance?: number | '';
    age?: string | '';
    size?: string | '';
    goodWithChildren?: boolean | '';
    goodWithPets?: boolean | '';
    status?: string | '';
    coat?: string | '';
}

interface iData {
    data: any;
}

interface iContext {
    called: boolean;
    data: iData[];
    filters: iSearchFilters;
    loading: boolean;
    profileData: any;
    searchPets: (value: { variables: iSearchFilters; pollingInterval?: number; errorPolicy: 'all' }) => void;
    setFiltersState: (value: iSearchFilters) => void;
    setLikedIds: (value: iSearchFilters) => void;
    setProfileData: (value: any) => void;
    setProfileRecord: (value: any) => void;
}

const INITIAL_FILTERS_STATE: iSearchFilters = {
    latitude: '',
    longitude: '',
    type: '',
    breed: '',
    distance: '',
    age: '',
    size: '',
    goodWithChildren: '',
    goodWithPets: '',
    status: '',
    coat: '',
};

const DEFAULT_CONTEXT = {
    called: false,
    data: [],
    filters: INITIAL_FILTERS_STATE,
    likedIds: [],
    loading: false,
    profileData: null,
    searchPets: () => null,
    setLikedIds: () => null,
    setFiltersState: () => null,
    setProfileData: () => null,
    setProfileRecord: () => null,
};

const PETS = gql`
    query PETS(
        $latitude: Float
        $longitude: Float
        $type: String
        $breed: String
        $distance: Int
        $age: String
        $size: String
        $goodWithChildren: Boolean
        $goodWithPets: Boolean
        $status: String
        $coat: String
    ) {
        animals(
            latitude: $latitude
            longitude: $longitude
            type: $type
            breed: $breed
            distance: $distance
            age: $age
            size: $size
            goodWithChildren: $goodWithChildren
            goodWithPets: $goodWithPets
            status: $status
            coat: $coat
        ) {
            id
            url
            type
            species
            age
            gender
            size
            coat
            name
            description
            status
            published_at
            distance
            contact {
                email
                phone
                address {
                    city
                }
            }
            photos {
                medium
                large
            }
            matchRating
        }
    }
`;

const PetDataProviderContext = React.createContext(DEFAULT_CONTEXT);

export function usePetDataProvider<DEFAULT_CONTEXT>() {
    return React.useContext(PetDataProviderContext);
}

const PetDataProvider = ({ children }: iPetDataProviderProps) => {
    const { hasLocationPermissions, locationResult } = useLocationProvider();
    const [filtersState, setFiltersState] = React.useReducer(
        (state, newState) => ({ ...state, newState }),
        INITIAL_FILTERS_STATE
    );
    const [likedIds, setLikedIds] = React.useReducer((state, { type = 'add', likedId }) => {
        return type === 'add' ? [...state, likedId] : remove(state, likedId);
    }, []);
    const [profileData, setProfileData]: [any, (value: any) => void] = React.useState<any>(data?.animals[0]);
    const [searchPets, { called, data, loading, error }] = useLazyQuery(PETS, { errorPolicy: 'all' });

    if (error) {
        console.log('DATA QUERY ERROR: ', JSON.stringify(error, undefined, 4));
    }

    function getSearchVars(searchFields) {
        const defaultFields = {
            latitude: locationResult?.coords?.latitude,
            longitude: locationResult?.coords?.longitude,
            type: '',
        };
        return { variables: { ...defaultFields, ...searchFields, size: 'small', coat: 'short' } };
    }

    const handleSearchPets = (searchFields) => {
        const searchVars = getSearchVars(searchFields);
        console.log('BUTTON REQUEST VARS', searchVars);
        searchPets(searchVars);
    };

    React.useEffect(() => {
        if (hasLocationPermissions && locationResult && locationResult?.coords) {
            console.log('INITIAL REQUEST VARS', getSearchVars());
            searchPets(getSearchVars());
        }
    }, [hasLocationPermissions, locationResult]);

    function setProfileRecord(recordId) {
        const record = data.animals.find(({ id }) => id === recordId) || profileData;

        console.log(
            'NEW PROFILE RECORD',
            data.animals.find(({ id }) => id === recordId)
        );
        setProfileData(record);
    }

    const context = {
        called,
        data: data?.animals || [],
        filters: filtersState,
        likedIds,
        loading,
        error,
        profileData,
        searchPets: handleSearchPets,
        setFiltersState,
        setLikedIds,
        setProfileData,
        setProfileRecord,
    };

    console.log('PETS RESPONSE', data);
    return <PetDataProviderContext.Provider value={context}>{children}</PetDataProviderContext.Provider>;
};

export default PetDataProvider;
