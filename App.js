import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './CameraScreen';
import NotesScreen from './NotesScreen';
import { ThemeContext, lightTheme, darkTheme } from './ThemeContext'; 

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(lightTheme); 

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <AppearanceProvider>
      <ThemeContext.Provider value={theme}>
      <NavigationContainer>
  <Stack.Navigator initialRouteName="Camera">
    <Stack.Screen name="Camera">
      {(props) => <CameraScreen {...props} toggleTheme={toggleTheme} />}
    </Stack.Screen>
    <Stack.Screen name="Notes">
      {(props) => <NotesScreen {...props} toggleTheme={toggleTheme} />}
    </Stack.Screen>
  </Stack.Navigator>
</NavigationContainer>
      </ThemeContext.Provider>
    </AppearanceProvider>
  );
}
