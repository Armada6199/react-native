import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext'; 
export default function NotesScreen({ route }) {
  const theme = useTheme();
  const [note, setNote] = useState('');
  const { capturedImage } = route.params;

  const saveNote = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes Screen</Text>
      <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
      <TextInput
        placeholder="Add a note..."
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.noteInput}
        multiline
      />
            <Button title="Change Theme" onPress={props.toggleTheme} />
      <Button title="Save Note" onPress={saveNote} />
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
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  noteInput: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: theme.textColor, 
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: theme.textColor, 
  },
});
