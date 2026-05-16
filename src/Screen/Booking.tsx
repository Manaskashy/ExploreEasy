import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Modal,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

type RootStackParamList = {
  MainScreen: undefined;
  Profile: undefined;
  Login: undefined;
  Booking: { destinationName?: string, price?: string };
  Payment: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
    hotelName: string;
    price: string;
  };
};

const Booking = () => {
  const hotelsByDestination: { [key: string]: any[] } = {
    'Bali': [
      { id: 'b1', name: 'Grand Bali Resort', image: require('../assets/bali_resort.png'), price: '₹4,500', rating: 4.8 },
      { id: 'b2', name: 'Uluwatu Sunset Villa', image: require('../assets/bali_resort.png'), price: '₹6,200', rating: 4.9 },
    ],
    'Dubai': [
      { id: 'd1', name: 'Dubai Skyline Hotel', image: require('../assets/dubai_modern.png'), price: '₹8,900', rating: 4.9 },
      { id: 'd2', name: 'Desert Palm Oasis', image: require('../assets/dubai_modern.png'), price: '₹11,500', rating: 4.8 },
    ],
    'Maldives': [
      { id: 'm1', name: 'Maldives Overwater', image: require('../assets/maldives_villa.png'), price: '₹12,500', rating: 5.0 },
      { id: 'm2', name: 'Blue Lagoon Resort', image: require('../assets/maldives_villa.png'), price: '₹15,800', rating: 4.9 },
    ],
    'Nepal': [
      { id: 'n1', name: 'Everest View Lodge', image: require('../assets/nepal_lodge.png'), price: '₹3,200', rating: 4.7 },
      { id: 'n2', name: 'Annapurna Base Camp', image: require('../assets/nepal_lodge.png'), price: '₹2,800', rating: 4.6 },
    ],
    'Lakshadweep': [
      { id: 'l1', name: 'Agatti Island Resort', image: require('../assets/laks_resort.png'), price: '₹5,500', rating: 4.8 },
      { id: 'l2', name: 'Bangaram Beach Tents', image: require('../assets/laks_resort.png'), price: '₹4,200', rating: 4.7 },
    ],
    'Thailand': [
      { id: 't1', name: 'Phuket Beach Resort', image: require('../assets/thailand_beach.png'), price: '₹3,800', rating: 4.7 },
      { id: 't2', name: 'Krabi Cliff Villa', image: require('../assets/thailand_beach.png'), price: '₹5,100', rating: 4.8 },
    ],
    'Singapore': [
      { id: 's1', name: 'Marina Bay Luxury', image: require('../assets/singapore_hotel.png'), price: '₹9,500', rating: 4.9 },
      { id: 's2', name: 'Orchard Road Hotel', image: require('../assets/singapore_hotel.png'), price: '₹7,800', rating: 4.7 },
    ],
  };

  const defaultHotels = [
    { id: 'def1', name: 'Global Comfort Inn', image: require('../assets/bali_resort.png'), price: '₹3,500', rating: 4.5 },
  ];

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const initialDestination = (route.params as any)?.destinationName || '';
  const initialPrice = (route.params as any)?.price || '₹12,499';
  const [destination, setDestination] = useState(initialDestination);
  const [basePrice, setBasePrice] = useState(initialPrice);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [roomType, setRoomType] = useState('Deluxe');
  const [selectedHotel, setSelectedHotel] = useState(defaultHotels[0]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const currentHotels = hotelsByDestination[destination] || defaultHotels;

  React.useEffect(() => {
    const { destinationName, price } = (route.params as any) || {};
    if (destinationName) setDestination(destinationName);
    if (price) setBasePrice(price);
  }, [route.params]);

  React.useEffect(() => {
    const available = hotelsByDestination[destination] || defaultHotels;
    setSelectedHotel(available[0]);
  }, [destination]);

  const CalendarModal = ({ visible, onClose, onSelect, title }: any) => {
    const [viewDate, setViewDate] = useState(new Date());
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const changeMonth = (offset: number) => {
      setViewDate(new Date(year, month + offset, 1));
    };

    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <Pressable style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <MaterialIcons name="chevron-left" size={30} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>{`${monthName} ${year}`}</Text>
              <TouchableOpacity onPress={() => changeMonth(1)}>
                <MaterialIcons name="chevron-right" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDays}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
                <Text key={`${d}-${index}`} style={styles.weekDayText}>{d}</Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {blanks.map(b => <View key={`b-${b}`} style={styles.dayButtonEmpty} />)}
              {days.map(day => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dateObj = new Date(year, month, day);
                const isPast = dateObj < today;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayButton, isPast && styles.dayButtonDisabled]}
                    onPress={() => {
                      if (!isPast) {
                        onSelect(`${day} ${monthName} ${year}`);
                        onClose();
                      }
                    }}
                    disabled={isPast}
                  >
                    <Text style={[styles.dayText, isPast && styles.dayTextDisabled]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  };

  const GuestPickerModal = ({ visible, onClose, onSelect, selected }: any) => {
    const options = ['1', '2', '3', '4', '5', '6', '7', '8+'];
    return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <Pressable style={styles.guestPickerContainer}>
            <Text style={styles.calendarTitle}>Number of Travelers</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.guestListOption, selected === opt && styles.activeGuestListOption]}
                  onPress={() => {
                    onSelect(opt);
                    onClose();
                  }}
                >
                  <Text style={[styles.guestListText, selected === opt && styles.activeGuestListText]}>
                    {opt} {opt === '1' ? 'Traveler' : 'Travelers'}
                  </Text>
                  {selected === opt && <MaterialIcons name="check" size={20} color={COLORS.white} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    );
  };

  const handleBooking = () => {
    if (!destination || !checkIn || !checkOut || !guests || !roomType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const destPrice = parseInt(basePrice.replace(/[₹,]/g, ''));
    const hotelPrice = parseInt(selectedHotel.price.replace(/[₹,]/g, ''));
    const guestCount = guests === '8+' ? 8 : parseInt(guests);
    const totalPrice = `₹${((destPrice + hotelPrice) * guestCount).toLocaleString('en-IN')}`;

    navigation.navigate('Payment', {
      destination,
      checkIn,
      checkOut,
      guests,
      roomType,
      hotelName: selectedHotel.name,
      price: totalPrice
    });
  };

  const popularDestinations = [
    { name: 'Bali', icon: 'beach-access', price: '₹35,999' },
    { name: 'Maldives', icon: 'pool', price: '₹85,999' },
    { name: 'Thailand', icon: 'temple-hindu', price: '₹18,999' },
    { name: 'Dubai', icon: 'apartment', price: '₹42,999' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <ImageBackground
          source={require('../assets/booking_header.png')}
          style={styles.header}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Plan Your Trip</Text>
            <Text style={styles.headerSubtitle}>
              {destination ? `Customizing your ${destination} escape` : 'Seamless booking for your next adventure'}
            </Text>
          </View>
        </ImageBackground>

        {/* Form Container */}
        <View style={styles.content}>
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Where to?</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                <TextInput
                  style={styles.input}
                  placeholder="Destination"
                  value={destination}
                  onChangeText={setDestination}
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Check-in</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowCheckIn(true)}
                >
                  <MaterialIcons name="event" size={20} color={COLORS.primary} />
                  <Text style={[styles.inputText, !checkIn && { color: COLORS.textLight }]}>
                    {checkIn || "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Check-out</Text>
                <TouchableOpacity
                  style={styles.inputWrapper}
                  onPress={() => setShowCheckOut(true)}
                >
                  <MaterialIcons name="event" size={20} color={COLORS.primary} />
                  <Text style={[styles.inputText, !checkOut && { color: COLORS.textLight }]}>
                    {checkOut || "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Travelers</Text>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setShowGuestPicker(true)}
              >
                <MaterialIcons name="people" size={20} color={COLORS.primary} />
                <Text style={styles.inputText}>{guests} {guests === '1' ? 'Traveler' : 'Travelers'}</Text>
                <View style={{ flex: 1 }} />
                <MaterialIcons name="expand-more" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <CalendarModal
              visible={showCheckIn}
              onClose={() => setShowCheckIn(false)}
              onSelect={setCheckIn}
              title="Select Check-in Date"
            />
            <CalendarModal
              visible={showCheckOut}
              onClose={() => setShowCheckOut(false)}
              onSelect={setCheckOut}
              title="Select Check-out Date"
            />
            <GuestPickerModal
              visible={showGuestPicker}
              onClose={() => setShowGuestPicker(false)}
              onSelect={setGuests}
              selected={guests}
            />

            <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
              <LinearGradient colors={COLORS.gradientPrimary} style={styles.gradientBtn}>
                <Text style={styles.bookBtnText}>Confirm & Pay Total</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Hotel Selection */}
          <Text style={styles.sectionTitle}>Stays in {destination || 'Destination'}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hotelScroll}>
            {currentHotels.map((hotel) => (
              <TouchableOpacity
                key={hotel.id}
                style={[
                  styles.hotelCard,
                  selectedHotel?.id === hotel.id && styles.activeHotelCard
                ]}
                onPress={() => setSelectedHotel(hotel)}
              >
                <Image source={hotel.image} style={styles.hotelImage} />
                <View style={styles.hotelInfo}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <View style={styles.hotelFooter}>
                    <Text style={styles.hotelPrice}>{hotel.price}/night</Text>
                    <View style={styles.ratingBox}>
                      <MaterialIcons name="star" size={14} color="#fbbf24" />
                      <Text style={styles.ratingText}>{hotel.rating}</Text>
                    </View>
                  </View>
                </View>
                {selectedHotel.id === hotel.id && (
                  <View style={styles.selectedBadge}>
                    <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Select */}
          <Text style={styles.sectionTitle}>Popular Choices</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
            {popularDestinations.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.quickCard}
                onPress={() => {
                  setDestination(item.name);
                  setBasePrice(item.price);
                }}
              >
                <MaterialIcons name={item.icon} size={28} color={COLORS.primary} />
                <Text style={styles.quickText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: SIZES.padding,
    overflow: 'hidden',
    ...SHADOWS.heavy,
  },
  headerTop: {
    marginBottom: 15,
    marginTop: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  headerContent: {
    // No extra styles needed yet
  },
  headerTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    ...FONTS.body2,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: SIZES.padding,
    marginTop: -30,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: SPACING.lg,
    ...SHADOWS.heavy,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...FONTS.label,
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
  },
  bookBtn: {
    marginTop: SPACING.md,
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  gradientBtn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitle: {
    ...FONTS.h3,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  quickScroll: {
    paddingBottom: 10,
  },
  quickCard: {
    backgroundColor: COLORS.white,
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.light,
  },
  quickText: {
    ...FONTS.label,
    color: COLORS.text,
    marginTop: 8,
  },
  bottomSpace: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: SPACING.lg,
    ...SHADOWS.heavy,
  },
  calendarTitle: {
    ...FONTS.h3,
    textAlign: 'center',
    marginBottom: SPACING.md,
    color: COLORS.text,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    ...FONTS.label,
    color: COLORS.textLight,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  dayButtonEmpty: {
    width: 40,
    height: 40,
    margin: 2,
  },
  dayButtonDisabled: {
    backgroundColor: 'transparent',
  },
  dayText: {
    ...FONTS.label,
    color: COLORS.text,
  },
  dayTextDisabled: {
    color: '#cbd5e1',
  },
  guestPickerContainer: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: SPACING.lg,
    ...SHADOWS.heavy,
  },
  guestListOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activeGuestListOption: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  guestListText: {
    ...FONTS.body1,
    color: COLORS.text,
  },
  activeGuestListText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  hotelScroll: {
    paddingBottom: 20,
  },
  hotelCard: {
    backgroundColor: COLORS.white,
    width: 200,
    borderRadius: 20,
    marginRight: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.light,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeHotelCard: {
    borderColor: COLORS.primary,
  },
  hotelImage: {
    width: '100%',
    height: 120,
  },
  hotelInfo: {
    padding: 12,
  },
  hotelName: {
    ...FONTS.h3,
    fontSize: 14,
    color: COLORS.text,
  },
  hotelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  hotelPrice: {
    ...FONTS.label,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...FONTS.label,
    color: COLORS.text,
    marginLeft: 2,
    fontSize: 10,
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
});

export default Booking;
