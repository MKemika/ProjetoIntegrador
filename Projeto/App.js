import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { css } from './assets/css/css';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


export default function App() {
  const [origin, setOrigin] = useState();

  useEffect(() => {
    (async function () {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421
        })
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);

  return (
    <MapView
      style={css.map}
      initialRegion={origin}
      showsUserLocation={true}
      zoomEnabled={false}
      loadingEnabled={true}
    />
  )
}