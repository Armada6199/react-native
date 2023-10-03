import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import { useTheme } from './ThemeContext';
export default function CameraScreen({ navigation }) {
    const theme = useTheme()
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setCapturedImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Screen</Text>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
      </View>
      <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
        <Text style={styles.captureButtonText}>Take a Photo</Text>
      </TouchableOpacity>
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
          <Button
            title="Add Note"
            onPress={() => navigation.navigate('Notes', { capturedImage })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor, 
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: theme.textColor, 
    },
    cameraContainer: {
      width: 300,
      height: 300,
      overflow: 'hidden',
      borderRadius: 10,
      borderColor: theme.textColor, 
    },
  });
  