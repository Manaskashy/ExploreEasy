import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  StatusBar,
  ImageBackground,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Booking: undefined;
  SocialDiscover: undefined;
  AITripPlanner: undefined;
  SavedDestinations: undefined;
  MyBookings: undefined;
};

interface ProfileSection {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  color?: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  const sections: ProfileSection[] = [
    {
      id: '1',
      title: 'Personal Information',
      icon: 'person',
      color: '#6366f1',
      onPress: () => { },
      showArrow: true,
    },
    {
      id: 'my-bookings',
      title: 'My Bookings',
      icon: 'event-available',
      color: '#10b981',
      onPress: () => navigation.navigate('MyBookings'),
      showArrow: true,
    },
    {
      id: '2',
      title: 'Travel Preferences',
      icon: 'flight-takeoff',
      color: '#a855f7',
      onPress: () => { },
      showArrow: true,
    },
    {
      id: '3',
      title: 'Saved Destinations',
      icon: 'favorite-border',
      color: '#f43f5e',
      onPress: () => navigation.navigate('SavedDestinations' as any),
      showArrow: true,
    },
    {
      id: '4',
      title: 'Notifications',
      icon: 'notifications-none',
      color: '#fbbf24',
      onPress: () => { },
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: '5',
      title: 'Dark Mode',
      icon: 'dark-mode',
      color: '#1e293b',
      onPress: () => { },
      showSwitch: true,
      switchValue: darkModeEnabled,
      onSwitchChange: setDarkModeEnabled,
    },
    {
      id: '6',
      title: 'Help & Support',
      icon: 'help-outline',
      color: '#10b981',
      onPress: () => { },
      showArrow: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header Section */}
        <View style={styles.headerWrapper}>
          <ImageBackground
            source={require('../assets/bali_resort.png')}
            style={styles.headerImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(99, 102, 241, 0.85)']}
              style={styles.headerGradient}
            >
              <View style={styles.profileContainer}>
                <View style={styles.imageWrapper}>
                  <Image source={require('../assets/image2.jpg')} style={styles.profileImage} />
                  <TouchableOpacity style={styles.editBtn}>
                    <MaterialIcons name="camera-alt" size={18} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.nameText}>John Doe</Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          {/* Stats Card (Floating) */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLab}>Places</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>8</Text>
              <Text style={styles.statLab}>Countries</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>156</Text>
              <Text style={styles.statLab}>Days</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.sectionHeading}>Settings</Text>
          <View style={styles.card}>
            {sections.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.sectionItem, index === sections.length - 1 && { borderBottomWidth: 0 }]}
                onPress={item.onPress}
                activeOpacity={0.6}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                    <MaterialIcons name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
                {item.showArrow && <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />}
                {item.showSwitch && (
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onSwitchChange}
                    trackColor={{ false: '#e2e8f0', true: COLORS.primary + '80' }}
                    thumbColor={item.switchValue ? COLORS.primary : '#fff'}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
  headerWrapper: {
    marginBottom: 40,
    backgroundColor: COLORS.white,
  },
  headerImage: {
    width: '100%',
    height: 280,
  },
  headerGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  profileContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  editBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.white,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  nameText: {
    ...FONTS.h2,
    color: COLORS.white,
    fontSize: 28,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  locationText: {
    ...FONTS.label,
    color: COLORS.white,
    marginLeft: 4,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingVertical: 22,
    marginHorizontal: SIZES.padding,
    marginTop: -40,
    ...SHADOWS.heavy,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  statLab: {
    ...FONTS.label,
    color: COLORS.textLight,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#f1f5f9',
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: SIZES.padding,
  },
  sectionHeading: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: SPACING.sm,
    ...SHADOWS.light,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  itemText: {
    ...FONTS.body1,
    fontWeight: '500',
    color: COLORS.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: COLORS.error + '10',
  },
  logoutText: {
    ...FONTS.body1,
    color: COLORS.error,
    fontWeight: '700',
    marginLeft: 10,
  },
  bottomSpace: {
    height: 20,
  },
});

export default ProfileScreen;

