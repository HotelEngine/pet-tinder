const appName = 'PetTinder';

export default {
    name: appName,
    version: '1.0.0',
    extra: {
        apiKey: process.env.REACT_NATIVE_PET_API_KEY,
        apiSecret: process.env.REACT_NATIVE_PET_API_SECRET,
        appName: appName,
    },
};
