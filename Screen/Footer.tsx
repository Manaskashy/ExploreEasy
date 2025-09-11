import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type RootStackParamList = {
  MainScreen: undefined;
  Profile: undefined;
  Login: undefined;
  Booking: undefined;
};

interface FooterItem {
  id: string;
  title: string;
  icon: string;
  route: keyof RootStackParamList;
  isActive?: boolean;
}

const Footer = ({ activeRoute = 'MainScreen' }: { activeRoute?: keyof RootStackParamList }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const footerItems: FooterItem[] = [
    {
      id: '1',
      title: 'Home',
      icon: '🏠',
      route: 'MainScreen',
    },
    {
      id: '2',
      title: 'Profile',
      icon: '👤',
      route: 'Profile',
    },
    {
      id: '3',
      title: 'Login',
      icon: '🔐',
      route: 'Login',
    },
    {
      id: '4',
      title: 'Booking',
      icon: '📅',
      route: 'Booking',
    },
  ];

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  const FooterItem = ({ item }: { item: FooterItem }) => {
    const isActive = activeRoute === item.route;
    
    return (
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => handleNavigation(item.route)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
          <Text style={[styles.icon, isActive && styles.activeIcon]}>{item.icon}</Text>
        </View>
        <Text style={[styles.title, isActive && styles.activeTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.footer}>
        {footerItems.map((item) => (
          <FooterItem key={item.id} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
  },
  iconContainer: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.5%'),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  icon: {
    fontSize: wp('6%'),
  },
  activeIcon: {
    color: '#fff',
  },
  title: {
    fontSize: wp('3%'),
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTitle: {
    color: '#667eea',
    fontWeight: '600',
  },
});

export default Footer;
