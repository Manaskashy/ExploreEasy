import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useBookings } from '../Context/BookingContext';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';


type RootStackParamList = {
  MainScreen: undefined;
  MyBookings: undefined;
};

const MyBookings = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { bookings } = useBookings();

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <LinearGradient colors={COLORS.gradientPrimary} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.headerSubtitle}>View and manage your upcoming adventures</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <MaterialIcons name="event-note" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyDesc}>Your travel history will appear here once you make your first booking.</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('MainScreen')}
            >
              <LinearGradient
                colors={COLORS.gradientPrimary}
                style={styles.exploreGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.exploreBtnText}>Start Exploring</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {bookings.map((booking) => (
              <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.destInfo}>
                    <Text style={styles.destName}>{booking.destination}</Text>
                    <Text style={styles.bookingId}>ID: #{booking.id.toUpperCase()}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="event" size={18} color={COLORS.primary} />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Check-in</Text>
                      <Text style={styles.detailValue}>{booking.checkIn}</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="event" size={18} color={COLORS.primary} />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Check-out</Text>
                      <Text style={styles.detailValue}>{booking.checkOut}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.hotelRow}>
                  <MaterialIcons name="hotel" size={18} color={COLORS.primary} />
                  <Text style={styles.hotelText}>{booking.hotelName}</Text>
                </View>

                <View style={styles.footerRow}>
                  <View style={styles.guestInfo}>
                    <MaterialIcons name="people" size={18} color={COLORS.textLight} />
                    <Text style={styles.guestText}>{booking.guests} Guests · {booking.roomType}</Text>
                  </View>
                  <Text style={styles.priceText}>{booking.price}</Text>
                </View>

                <TouchableOpacity style={styles.viewDetailsBtn}>
                  <Text style={styles.viewDetailsText}>View Trip Details</Text>
                  <MaterialIcons name="chevron-right" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: SIZES.padding,
    ...SHADOWS.medium,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,

  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...FONTS.body2,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: 10,
  },
  emptyDesc: {
    ...FONTS.body2,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreBtn: {
    width: '70%',
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  exploreGradient: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreBtnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  listContainer: {
    gap: SPACING.lg,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: SPACING.lg,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  destInfo: {
    flex: 1,
  },
  destName: {
    ...FONTS.h3,
    fontSize: 18,
    color: COLORS.text,
  },
  bookingId: {
    ...FONTS.label,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    ...FONTS.label,
    color: '#059669',
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailTextContainer: {
    marginLeft: 10,
  },
  detailLabel: {
    ...FONTS.label,
    color: COLORS.textLight,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  detailValue: {
    ...FONTS.body1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  hotelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  hotelText: {
    ...FONTS.body2,
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestText: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginLeft: 8,
  },
  priceText: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
  },
  viewDetailsText: {
    ...FONTS.body1,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginRight: 5,
  },
});

export default MyBookings;
