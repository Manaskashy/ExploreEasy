import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { navigationRef } from '../navigation/NavigationService';
import { COLORS, SHADOWS, SIZES, SPACING } from '../styles/Theme';

type RootStackParamList = {
  MainScreen: undefined;
  Profile: undefined;
  Login: undefined;
  Booking: undefined;
  SocialDiscover: undefined;
  AITripPlanner: undefined;
};

interface FooterItem {
  id: string;
  title: string;
  iconName: string;
  route: keyof RootStackParamList;
}

const Footer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeRoute, setActiveRoute] = useState<string | undefined>('MainScreen');

  useEffect(() => {
    // Listen to navigation state changes via the global ref
    const unsubscribe = navigationRef.addListener('state', () => {
      const route = navigationRef.getCurrentRoute();
      if (route) {
        setActiveRoute(route.name);
      }
    });

    return unsubscribe;
  }, []);

  const tabScreens = ['MainScreen', 'Profile', 'SocialDiscover', 'Booking'];

  // Hide footer on screens that are not part of the main tabs
  if (!activeRoute || !tabScreens.includes(activeRoute)) {
    return null;
  }

  const footerItems: FooterItem[] = [
    {
      id: '1',
      title: 'Explore',
      iconName: 'explore',
      route: 'MainScreen',
    },
    {
      id: '2',
      title: 'Booking',
      iconName: 'event',
      route: 'Booking',
    },
    {
      id: '3',
      title: 'Discover',
      iconName: 'public',
      route: 'SocialDiscover',
    },
    {
      id: '4',
      title: 'Profile',
      iconName: 'person-outline',
      route: 'Profile',
    },
  ];

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.footerContainer}>
        {footerItems.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.footerItem}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconWrapper,
                isActive && styles.activeIconWrapper
              ]}>
                <MaterialIcons
                  name={item.iconName}
                  size={24}
                  color={isActive ? COLORS.primary : COLORS.textLight}
                />
                <Text style={styles.activeLabel}>{item.title}</Text>
              </View>


            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    borderTopColor: '#f1f5f9',
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 0,
    justifyContent: 'space-around',
    width: '100%',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    marginBottom: 4,
  },
  activeLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Footer;

