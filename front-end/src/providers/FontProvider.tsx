import * as React from 'react';
import * as Font from 'expo-font';

interface IFontProviderProps {
    readonly children: React.ReactNode;
}

const DEFAULT_CONTEXT = Font;

const FontProviderContext = React.createContext(DEFAULT_CONTEXT);

export function useFontProvider<DEFAULT_CONTEXT>() {
    return React.useContext(FontProviderContext);
}

const FontProvider = ({ children }: IFontProviderProps) => {
    React.useEffect(() => {
        (async () => {
            await Font.loadAsync({
                tinderclone: require('./src/assets/fonts/tinderclone.ttf'),
            });
        })();
    }, []);

    return <FontProviderContext.Provider value={Font}>{children}</FontProviderContext.Provider>;
};

export default FontProvider;
