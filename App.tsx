import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { navigationRef } from './src/navigation/NavigationService';
import MainScreen from './src/Screen/MainScreen';
import LoginScreen from './src/Screen/LoginScreen';
import SignUpScreen from './src/Screen/SignUpScreen';
import ForgotPasswordScreen from './src/Screen/ForgotPasswordScreen';
import Bali from './src/Screen/Bali';
import Maldives from './src/Screen/Maldives';
import Thailand from './src/Screen/Thailand';
import Nepal from './src/Screen/Nepal';
import Bhutan from './src/Screen/Bhutan';
import SriLanka from './src/Screen/SriLanka';
import Dubai from './src/Screen/Dubai';
import Singapore from './src/Screen/Singapore';
import Indonesia from './src/Screen/Indonesia';
import Vietnam from './src/Screen/Vietnam';
import Malaysia from './src/Screen/Malaysia';
import Lakshadweep from './src/Screen/laks';
import Booking from './src/Screen/Booking';
import ProfileScreen from './src/Screen/ProfileScreen';
import AITripPlanner from './src/Screen/AITripPlanner';
import SocialDiscover from './src/Screen/SocialDiscover';
import SavedDestinations from './src/Screen/SavedDestinations';
import Payment from './src/Screen/Payment';
import MyBookings from './src/Screen/MyBookings';
import { BookingProvider } from './src/Context/BookingContext';
import Footer from './src/Screen/Footer';
import PersonalInformation from './src/Screen/PersonalInformation';
import SecurityScreen from './src/Screen/SecurityScreen';



import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <BookingProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <View style={styles.container}>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
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
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Sign Up' }}
              />

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ title: 'Forgot Password' }}
              />

              <Stack.Screen
                name="Booking"
                component={Booking}
                options={{ title: 'Booking' }}
              />

              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ title: 'Payment' }}
              />

              <Stack.Screen
                name="MyBookings"
                component={MyBookings}
                options={{ title: 'My Bookings' }}
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

              <Stack.Screen
                name="AITripPlanner"
                component={AITripPlanner}
                options={{ title: 'AI Trip Planner' }}
              />

              <Stack.Screen
                name="SocialDiscover"
                component={SocialDiscover}
                options={{ title: 'Social Discover' }}
              />

              <Stack.Screen
                name="SavedDestinations"
                component={SavedDestinations}
                options={{ title: 'Saved Destinations' }}
              />

              <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{ title: 'Personal Information' }}
              />

              <Stack.Screen
                name="Security"
                component={SecurityScreen}
                options={{ title: 'Security' }}
              />


            </Stack.Navigator>
            <Footer />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </BookingProvider>
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