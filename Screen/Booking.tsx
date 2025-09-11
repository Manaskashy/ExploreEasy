import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Footer from './Footer';

type RootStackParamList = {
  MainScreen: undefined;
  Profile: undefined;
  Login: undefined;
  Booking: undefined;
};

const Booking = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [roomType, setRoomType] = useState('');

  const handleBooking = () => {
    if (!destination || !checkIn || !checkOut || !guests || !roomType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    Alert.alert(
      'Booking Confirmed!',
      `Your booking for ${destination} has been confirmed. Check-in: ${checkIn}, Check-out: ${checkOut}, Guests: ${guests}, Room: ${roomType}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setDestination('');
            setCheckIn('');
            setCheckOut('');
            setGuests('');
            setRoomType('');
          },
        },
      ]
    );
  };

  const popularDestinations = [
    'Bali, Indonesia',
    'Maldives',
    'Thailand',
    'Singapore',
    'Dubai, UAE',
    'Lakshadweep, India',
  ];

  const roomTypes = [
    'Standard Room',
    'Deluxe Room',
    'Suite',
    'Villa',
    'Overwater Bungalow',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Book Your Trip</Text>
          <Text style={styles.headerSubtitle}>Plan your perfect getaway</Text>
        </LinearGradient>

        {/* Booking Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Destination</Text>
          <TextInput
            style={styles.input}
            placeholder="Where do you want to go?"
            value={destination}
            onChangeText={setDestination}
            placeholderTextColor="#999"
          />

          <Text style={styles.sectionTitle}>Travel Dates</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                value={checkIn}
                onChangeText={setCheckIn}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.dateInput}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD/YYYY"
                value={checkOut}
                onChangeText={setCheckOut}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Guests</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of guests"
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <Text style={styles.sectionTitle}>Room Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Select room type"
            value={roomType}
            onChangeText={setRoomType}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
            <Text style={styles.bookingButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Destinations */}
        <View style={styles.popularContainer}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularDestinations.map((dest, index) => (
              <TouchableOpacity
                key={index}
                style={styles.destinationCard}
                onPress={() => setDestination(dest)}
              >
                <Text style={styles.destinationText}>{dest}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Room Types */}
        <View style={styles.roomTypesContainer}>
          <Text style={styles.sectionTitle}>Room Types</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roomTypes.map((room, index) => (
              <TouchableOpacity
                key={index}
                style={styles.roomTypeCard}
                onPress={() => setRoomType(room)}
              >
                <Text style={styles.roomTypeText}>{room}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      <Footer activeRoute="Booking" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f9fa',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 0.48,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingButton: {
    backgroundColor: '#667eea',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  popularContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  destinationCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  destinationText: {
    color: '#667eea',
    fontWeight: '500',
  },
  roomTypesContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  roomTypeCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  roomTypeText: {
    color: '#667eea',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default Booking;
