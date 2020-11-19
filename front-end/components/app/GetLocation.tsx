import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";

interface iMapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface iState {
  hasLocationPermissions?: boolean;
  locationResult?: any | null;
  mapRegion: iMapRegion;
}

const INITIAL_STATE = {
  hasLocationPermissions: false,
  locationResult: null,
  mapRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

const CurrentPosition = () => {
  const [state, setState] = React.useReducer(
    (state: iState, newState: iState) => ({ ...state, ...newState }),
    INITIAL_STATE
  );

  // Set state with location results and map region if possible.
  React.useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestPermissionsAsync();
      const newState: { [key: string]: any } = {};

      if (status !== "granted") {
        newState.locationResult = "Permission to access location was denied";
      } else {
        newState.hasLocationPermissions = true;
      }

      let location = await Location.getCurrentPositionAsync({});

      newState.locationResult = JSON.stringify(location);
      // Center the map on the location we just fetched.
      setState({
        ...newState,
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    };

    getLocationAsync();
  }, []);

  function handleMapRegionChange(mapRegion) {
    console.log(mapRegion);
    setState({ mapRegion });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Pan, zoom, and tap on the map!</Text>

      {state.locationResult === null ? (
        <Text>Finding your current location...</Text>
      ) : state.hasLocationPermissions === false ? (
        <Text>Location permissions are not granted.</Text>
      ) : state.mapRegion === null ? (
        <Text>Map region doesn't exist.</Text>
      ) : (
        <MapView
          style={{ alignSelf: "stretch", height: 400 }}
          region={state.mapRegion}
          onRegionChange={handleMapRegionChange}
        />
      )}

      <Text>Location: {state.locationResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});

export default CurrentPosition;
