import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import MainScreen from './Screen/MainScreen';
import LoginScreen from './Screen/LoginScreen';
import Bali from './Screen/Bali';
import Maldives from './Screen/Maldives';
import Thailand from './Screen/Thailand';
import Nepal from './Screen/Nepal';
import Bhutan from './Screen/Bhutan';
import SriLanka from './Screen/SriLanka';
import Dubai from './Screen/Dubai';
import Singapore from './Screen/Singapore';
import Indonesia from './Screen/Indonesia';
import Vietnam from './Screen/Vietnam';
import Malaysia from './Screen/Malaysia';
import Lakshadweep from './Screen/laks';
import Booking from './Screen/Booking';
import ProfileScreen from './Screen/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: 'Home' }}
        />
        
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{ title: 'Booking' }}
        />
        
        <Stack.Screen
          name="Bali"
          component={Bali}
          options={{ title: 'BALI Info' }}
        />
        
        <Stack.Screen
          name="Maldives"
          component={Maldives}
          options={{ title: 'MALDIVES Info' }}
        />
        
        <Stack.Screen
          name="Thailand"
          component={Thailand}
          options={{ title: 'THAILAND Info' }}
        />
        
        <Stack.Screen
          name="Nepal"
          component={Nepal}
          options={{ title: 'NEPAL Info' }}
        />
        
        <Stack.Screen
          name="Bhutan"
          component={Bhutan}
          options={{ title: 'BHUTAN Info' }}
        />
        
        <Stack.Screen
          name="SriLanka"
          component={SriLanka}
          options={{ title: 'SRI LANKA Info' }}
        />
        
        <Stack.Screen
          name="Dubai"
          component={Dubai}
          options={{ title: 'DUBAI / UAE Info' }}
        />
        
        <Stack.Screen
          name="Singapore"
          component={Singapore}
          options={{ title: 'SINGAPORE Info' }}
        />
        
        <Stack.Screen
          name="Indonesia"
          component={Indonesia}
          options={{ title: 'INDONESIA Info' }}
        />
        
        <Stack.Screen
          name="Vietnam"
          component={Vietnam}
          options={{ title: 'VIETNAM Info' }}
        />
        
        <Stack.Screen
          name="Malaysia"
          component={Malaysia}
          options={{ title: 'MALAYSIA Info' }}
        />
        
        <Stack.Screen
          name="Lakshadweep"
          component={Lakshadweep}
          options={{ title: 'LAKSHADWEEP Info' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(98, 150, 174, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
});

export default App;