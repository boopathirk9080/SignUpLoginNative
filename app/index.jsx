import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </View>
  );
}