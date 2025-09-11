import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Switch,
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
  Login: undefined;
  Profile: undefined;
  // Add other routes as needed
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
}

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const profileSections: ProfileSection[] = [
    {
      id: '1',
      title: 'Personal Information',
      icon: '👤',
      onPress: () => Alert.alert('Personal Information', 'Edit your personal details'),
      showArrow: true,
    },
    {
      id: '2',
      title: 'Travel Preferences',
      icon: '✈️',
      onPress: () => Alert.alert('Travel Preferences', 'Customize your travel experience'),
      showArrow: true,
    },
    {
      id: '3',
      title: 'Saved Destinations',
      icon: '❤️',
      onPress: () => Alert.alert('Saved Destinations', 'View your favorite places'),
      showArrow: true,
    },
    {
      id: '4',
      title: 'Travel History',
      icon: '📅',
      onPress: () => Alert.alert('Travel History', 'See your past adventures'),
      showArrow: true,
    },
    {
      id: '5',
      title: 'Notifications',
      icon: '🔔',
      onPress: () => {},
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: '6',
      title: 'Dark Mode',
      icon: '🌙',
      onPress: () => {},
      showSwitch: true,
      switchValue: darkModeEnabled,
      onSwitchChange: setDarkModeEnabled,
    },
    {
      id: '7',
      title: 'Location Services',
      icon: '📍',
      onPress: () => {},
      showSwitch: true,
      switchValue: locationEnabled,
      onSwitchChange: setLocationEnabled,
    },
    {
      id: '8',
      title: 'Language',
      icon: '🌐',
      onPress: () => Alert.alert('Language', 'Change app language'),
      showArrow: true,
    },
    {
      id: '9',
      title: 'Currency',
      icon: '💰',
      onPress: () => Alert.alert('Currency', 'Set your preferred currency'),
      showArrow: true,
    },
    {
      id: '10',
      title: 'Help & Support',
      icon: '❓',
      onPress: () => Alert.alert('Help & Support', 'Get assistance'),
      showArrow: true,
    },
    {
      id: '11',
      title: 'About App',
      icon: 'ℹ️',
      onPress: () => Alert.alert('About App', 'App version and information'),
      showArrow: true,
    },
    {
      id: '12',
      title: 'Privacy Policy',
      icon: '🔒',
      onPress: () => Alert.alert('Privacy Policy', 'Read our privacy policy'),
      showArrow: true,
    },
    {
      id: '13',
      title: 'Terms of Service',
      icon: '📋',
      onPress: () => Alert.alert('Terms of Service', 'Read our terms'),
      showArrow: true,
    },
  ];

  const ProfileSectionItem = ({ item }: { item: ProfileSection }) => (
    <TouchableOpacity
      style={styles.sectionItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.sectionLeft}>
        <Text style={styles.sectionIcon}>{item.icon}</Text>
        <Text style={styles.sectionTitle}>{item.title}</Text>
      </View>
      <View style={styles.sectionRight}>
        {item.showSwitch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={item.switchValue ? '#f5dd4b' : '#f4f3f4'}
          />
        )}
        {item.showArrow && <Text style={styles.arrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.headerGradient}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/image2.jpg')}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>✏️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <Text style={styles.userLocation}>📍 New York, USA</Text>
          </LinearGradient>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Destinations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Days</Text>
          </View>
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          {profileSections.map((item) => (
            <ProfileSectionItem key={item.id} item={item} />
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      <Footer activeRoute="Profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editButtonText: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  sectionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
