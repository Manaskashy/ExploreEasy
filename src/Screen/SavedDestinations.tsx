import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const { width } = Dimensions.get('window');

const SavedDestinations = ({ navigation }: { navigation: any }) => {
  const savedItems = [
    {
      id: '1',
      name: 'Bali',
      location: 'Indonesia',
      image: require('../assets/image2.jpg'),
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Maldives',
      location: 'Indian Ocean',
      image: require('../assets/Lakshadweep.webp'),
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Lakshadweep',
      location: 'India',
      image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
      rating: 4.7,
    },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate(item.name)}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={14} color={COLORS.textLight} />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#fbbf24" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeBtn}>
        <MaterialIcons name="favorite" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Saved Destinations</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <FlatList
        data={savedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <MaterialIcons name="favorite-border" size={80} color="rgba(0,0,0,0.1)" />
            <Text style={styles.emptyText}>No destinations saved yet.</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('MainScreen')}
            >
              <Text style={styles.exploreText}>Explore Destinations</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerArea: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  listContent: {
    padding: SIZES.padding,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    ...FONTS.label,
    color: '#92400e',
    marginLeft: 4,
  },
  removeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...FONTS.body1,
    color: COLORS.textLight,
    marginTop: 20,
  },
  exploreBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
  },
  exploreText: {
    ...FONTS.label,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default SavedDestinations;
