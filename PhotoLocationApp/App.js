import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={(ref) => (cameraRef = ref)}>
        <View style={styles.cameraButtons}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() =>
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
          >
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      {capturedPhoto && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedPhoto.uri }} style={styles.image} />
          {location && (
            <Text style={styles.locationText}>
              Location: {location.coords.latitude}, {location.coords.longitude}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  flipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  captureButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
    margin: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 10,
  },
});
