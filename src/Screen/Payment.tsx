import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useBookings } from '../Context/BookingContext';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  MainScreen: undefined;
  Booking: { destinationName: string; price?: string };
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

const Payment = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const bookingData = (route.params as any) || {};

  const { addBooking } = useBookings();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const snackbarAnim = React.useRef(new Animated.Value(-150)).current;

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: 'account-balance-wallet', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit / Debit Card', icon: 'credit-card', desc: 'Visa, Mastercard, RuPay' },
    { id: 'net', name: 'Net Banking', icon: 'account-balance', desc: 'All major banks available' },
    { id: 'cash', name: 'Pay at Hotel', icon: 'payments', desc: 'Pay during check-in' },
  ];

  const triggerSnackbar = () => {
    setShowSnackbar(true);
    Animated.spring(snackbarAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();

    setTimeout(() => {
      Animated.timing(snackbarAnim, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSnackbar(false);
        navigation.navigate('MainScreen');
      });
    }, 3000);
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      addBooking({
        destination: bookingData.destination || 'Selected Destination',
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        roomType: bookingData.roomType,
        hotelName: bookingData.hotelName,
        price: bookingData.price || '₹12,499'
      });
      triggerSnackbar();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Booking Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <MaterialIcons name="location-on" size={18} color={COLORS.primary} />
            <Text style={styles.summaryText}>{bookingData.destination || 'Selected Destination'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialIcons name="event" size={18} color={COLORS.primary} />
            <Text style={styles.summaryText}>{bookingData.checkIn} - {bookingData.checkOut}</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialIcons name="people" size={18} color={COLORS.primary} />
            <Text style={styles.summaryText}>{bookingData.guests} Travelers · {bookingData.roomType} Room</Text>
          </View>
          <View style={styles.summaryRow}>
            <MaterialIcons name="hotel" size={18} color={COLORS.primary} />
            <Text style={styles.summaryText}>{bookingData.hotelName || 'Selected Hotel'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Amount</Text>
            <Text style={styles.priceValue}>{bookingData.price || '₹12,499'}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.activeMethodCard
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={[styles.iconContainer, selectedMethod === method.id && styles.activeIconContainer]}>
              <MaterialIcons 
                name={method.icon} 
                size={24} 
                color={selectedMethod === method.id ? COLORS.white : COLORS.primary} 
              />
            </View>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodName, selectedMethod === method.id && styles.activeMethodText]}>
                {method.name}
              </Text>
              <Text style={[styles.methodDesc, selectedMethod === method.id && styles.activeMethodDesc]}>
                {method.desc}
              </Text>
            </View>
            <View style={[styles.radio, selectedMethod === method.id && styles.activeRadio]}>
              {selectedMethod === method.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.secureNote}>
          <MaterialIcons name="security" size={16} color={COLORS.textLight} />
          <Text style={styles.secureText}>Your payment is 100% secure and encrypted</Text>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.payBtn, loading && { opacity: 0.7 }]} 
          onPress={handlePayment}
          disabled={loading}
        >
          <LinearGradient
            colors={COLORS.gradientPrimary}
            style={styles.gradientBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.payBtnText}>
              {loading ? 'Processing...' : `Confirm & Pay ${bookingData.price || '₹12,499'}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Custom Snackbar */}
      {showSnackbar && (
        <Animated.View style={[styles.snackbar, { transform: [{ translateY: snackbarAnim }] }]}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.snackbarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialIcons name="check-circle" size={24} color={COLORS.white} />
            <View style={styles.snackbarTextContainer}>
              <Text style={styles.snackbarTitle}>Booking Confirmed!</Text>
              <Text style={styles.snackbarSub}>Your trip to {bookingData.destination} is all set.</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryTitle: {
    ...FONTS.h3,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryText: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    ...FONTS.body1,
    color: COLORS.text,
  },
  priceValue: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 18,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: '#f1f5f9',
    ...SHADOWS.light,
  },
  activeMethodCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#f0f9ff',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: COLORS.primary,
  },
  methodInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  methodName: {
    ...FONTS.h3,
    fontSize: 15,
    color: COLORS.text,
  },
  methodDesc: {
    ...FONTS.body2,
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  activeMethodText: {
    color: COLORS.primary,
  },
  activeMethodDesc: {
    color: COLORS.primary,
    opacity: 0.7,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRadio: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    opacity: 0.6,
  },
  secureText: {
    ...FONTS.label,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  payBtn: {
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  gradientBtn: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  snackbar: {
    position: 'absolute',
    top: SPACING.xl + 20,
    left: SPACING.lg,
    right: SPACING.lg,
    zIndex: 1000,
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.heavy,
  },
  snackbarGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  snackbarTextContainer: {
    marginLeft: SPACING.md,
  },
  snackbarTitle: {
    ...FONTS.h3,
    fontSize: 15,
    color: COLORS.white,
  },
  snackbarSub: {
    ...FONTS.body2,
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default Payment;
