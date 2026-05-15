import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';


const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - SIZES.padding * 2 - 15) / 2;

const SocialDiscover = () => {
  const [viewMode, setViewMode] = useState<'feed' | 'map'>('feed');

  const posts = [
    {
      id: '1',
      user: 'Sarah J.',
      image: require('../assets/image2.jpg'),
      location: 'Hidden Waterfall, Bali',
      likes: '1.2k',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: '2',
      user: 'Mike T.',
      image: require('../assets/Lakshadweep.webp'),
      location: 'Secret Lagoon, Maldives',
      likes: '850',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: '3',
      user: 'Emma W.',
      image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
      location: 'Blue Lagoon, Iceland',
      likes: '2.4k',
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    {
      id: '4',
      user: 'Leo K.',
      image: require('../assets/agatti.jpg'),
      location: 'Agatti Sands',
      likes: '1.1k',
      avatar: 'https://i.pravatar.cc/150?u=4'
    }
  ];

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <Image source={item.image} style={styles.postImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.postOverlay}
      >
        <View style={styles.postInfo}>
          <Text style={styles.postLocation} numberOfLines={1}>{item.location}</Text>
          <View style={styles.postMeta}>
            <View style={styles.userWrapper}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.userName}>{item.user}</Text>
            </View>
            <View style={styles.likeWrapper}>
              <MaterialIcons name="favorite" size={14} color="#ff4b2b" />
              <Text style={styles.likeText}>{item.likes}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Community Discovery</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'feed' && styles.activeToggle]}
              onPress={() => setViewMode('feed')}
            >
              <MaterialIcons name="grid-view" size={20} color={viewMode === 'feed' ? COLORS.white : COLORS.textLight} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'map' && styles.activeToggle]}
              onPress={() => setViewMode('map')}
            >
              <MaterialIcons name="map" size={20} color={viewMode === 'map' ? COLORS.white : COLORS.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {viewMode === 'feed' ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          renderItem={renderPost}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={() => (
            <View style={styles.feedHeader}>
              <Text style={styles.subtitle}>Uncover hidden secrets from the ExploreEasy community.</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.mapMock}>
          <MaterialIcons name="explore" size={80} color="rgba(0,0,0,0.1)" />
          <Text style={styles.mapText}>Interactive Map loading...</Text>
          <Text style={styles.mapSubtext}>Showing 24 secrets nearby</Text>
        </View>
      )}


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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  feedContent: {
    padding: SIZES.padding,
    paddingBottom: 120,
  },
  feedHeader: {
    marginBottom: 20,
  },
  subtitle: {
    ...FONTS.body2,
    color: COLORS.textLight,
  },
  postCard: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 1.5,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    ...SHADOWS.medium,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  postInfo: {
    width: '100%',
  },
  postLocation: {
    ...FONTS.label,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 6,
  },
  userName: {
    ...FONTS.label,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  likeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    ...FONTS.label,
    color: COLORS.white,
    fontSize: 11,
    marginLeft: 4,
  },
  mapMock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  mapText: {
    ...FONTS.h3,
    color: COLORS.textLight,
    marginTop: 20,
  },
  mapSubtext: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginTop: 5,
  }
});

export default SocialDiscover;
