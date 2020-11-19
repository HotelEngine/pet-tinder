import * as React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

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
    setProfileData: (value: any) => void;
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
    loading: false,
    profileData: null,
    searchPets: () => null,
    setFiltersState: () => null,
    setProfileData: () => null,
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
            }
            photos {
                medium
                large
            }
        }
    }
`;

const PetDataProviderContext = React.createContext(DEFAULT_CONTEXT);

export function usePetDataProvider<DEFAULT_CONTEXT>() {
    return React.useContext(PetDataProviderContext);
}

const PetDataProvider = ({ children }: iPetDataProviderProps) => {
    const [filtersState, setFiltersState] = React.useReducer(
        (state, newState) => ({ ...state, newState }),
        INITIAL_FILTERS_STATE
    );
    const [profileData, setProfileData]: [any, (value: any) => void] = React.useState<any>(DEFAULT_CONTEXT.profileData);
    const [searchPets, { called, data, loading }] = useLazyQuery(PETS, { errorPolicy: 'all' });

    const context = {
        called,
        data,
        filters: filtersState,
        loading,
        profileData,
        searchPets,
        setFiltersState,
        setProfileData,
    };

    return <PetDataProviderContext.Provider value={context}>{children}</PetDataProviderContext.Provider>;
};

export default PetDataProvider;
