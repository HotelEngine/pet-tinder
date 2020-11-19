import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface IDataProviderProps {
    readonly children: React.ReactNode;
}

const client = new ApolloClient({
    uri: 'https://pet-tinder-hackathon.herokuapp.com/',
    cache: new InMemoryCache(),
});

const DataProvider = ({ children }: IDataProviderProps) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default DataProvider;
