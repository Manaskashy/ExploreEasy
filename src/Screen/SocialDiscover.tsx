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
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';


const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - SIZES.padding * 2 - 15) / 2;

const SocialDiscover = () => {
  const [viewMode, setViewMode] = useState<'feed' | 'map'>('feed');
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');

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

  const [discoveries, setDiscoveries] = useState(posts);

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostLocation.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://i.pravatar.cc/150?u=you',
      title: newPostTitle,
      location: newPostLocation,
      image: require('../assets/image2.jpg'), // Placeholder for new post
      likes: '0',
    };

    setDiscoveries([newPost, ...discoveries]);
    setNewPostTitle('');
    setNewPostLocation('');
    setIsCreateModalVisible(false);
  };

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
              <MaterialIcons name="grid-view" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, viewMode === 'map' && styles.activeToggle]}
              onPress={() => setViewMode('map')}
            >
              <MaterialIcons name="map" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {viewMode === 'feed' ? (
        <FlatList
          data={discoveries}
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
      ) : null}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsCreateModalVisible(true)}
      >
        <LinearGradient
          colors={[COLORS.primary, '#6366f1']}
          style={styles.fabGradient}
        >
          <MaterialIcons name="add" size={32} color={COLORS.white} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Create Post Modal */}
      <Modal
        visible={isCreateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Discovery</Text>
              <TouchableOpacity onPress={() => setIsCreateModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.imagePickerPlaceholder}>
              <MaterialIcons name="add-a-photo" size={40} color={COLORS.textLight} />
              <Text style={styles.imagePickerText}>Add a photo</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="What did you find?"
                value={newPostTitle}
                onChangeText={setNewPostTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Where is it?"
                value={newPostLocation}
                onChangeText={setNewPostLocation}
              />
            </View>

            <TouchableOpacity
              style={styles.postBtn}
              onPress={handleCreatePost}
            >
              <LinearGradient
                colors={COLORS.gradientPrimary}
                style={styles.postBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.postBtnText}>Post Discovery</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerArea: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
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
    color: COLORS.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 4,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    ...SHADOWS.heavy,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SPACING.xl,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  imagePickerPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  imagePickerText: {
    ...FONTS.label,
    color: COLORS.textLight,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    ...FONTS.label,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  modalInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 15,
    ...FONTS.body2,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  postBtn: {
    marginTop: SPACING.xl,
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  postBtnGradient: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBtnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default SocialDiscover;
