import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
    StatusBar,
    Modal,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

type RootStackParamList = {
    MainScreen: undefined;
    Profile: undefined;
    Login: undefined;
    Booking: { destinationName?: string, price?: string };
    Bali: undefined;
    Maldives: undefined;
    Thailand: undefined;
    Nepal: undefined;
    Bhutan: undefined;
    SriLanka: undefined;
    Dubai: undefined;
    Singapore: undefined;
    Indonesia: undefined;
    Vietnam: undefined;
    Malaysia: undefined;
    Lakshadweep: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
    navigation: MainScreenNavigationProp;
}

interface Destination {
    id: string;
    name: string;
    description: string;
    route: keyof RootStackParamList;
    image: any;
    category: string;
    rating: number;
    price: string;
}

const MainScreen = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [sortBy, setSortBy] = useState('Default');

    const destinations: Destination[] = [
        {
            id: '1',
            name: 'Lakshadweep',
            description: 'Tropical islands and turquoise waters',
            route: 'Lakshadweep',
            image: require('../assets/Lakshadweep.webp'),
            category: 'Islands',
            rating: 4.8,
            price: '₹24,999',
        },
        {
            id: '2',
            name: 'Bali',
            description: 'Island of the Gods with rich culture',
            route: 'Bali',
            image: require('../assets/image2.jpg'),
            category: 'Islands',
            rating: 4.9,
            price: '₹35,999',
        },
        {
            id: '3',
            name: 'Maldives',
            description: 'Paradise islands and overwater bungalows',
            route: 'Maldives',
            image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
            category: 'Islands',
            rating: 5.0,
            price: '₹85,999',
        },
        {
            id: '4',
            name: 'Thailand',
            description: 'Land of smiles and vibrant culture',
            route: 'Thailand',
            image: require('../assets/wp949234.jpg'),
            category: 'Southeast Asia',
            rating: 4.7,
            price: '₹18,999',
        },
        {
            id: '5',
            name: 'Nepal',
            description: 'Himalayan kingdom and trekking adventures',
            route: 'Nepal',
            image: require('../assets/image.webp'),
            category: 'Mountains',
            rating: 4.6,
            price: '₹12,499',
        },
        {
            id: '6',
            name: 'Bhutan',
            description: 'Last Shangri-La with dzongs',
            route: 'Bhutan',
            image: require('../assets/bhutan.jpg'),
            category: 'Mountains',
            rating: 4.8,
            price: '₹28,999',
        },
        {
            id: '7',
            name: 'Sri Lanka',
            description: 'Pearl of the Indian Ocean',
            route: 'SriLanka',
            image: require('../assets/Srilanka.jpg'),
            category: 'Islands',
            rating: 4.5,
            price: '₹15,999',
        },
        {
            id: '8',
            name: 'Dubai',
            description: 'City of Gold and luxury shopping',
            route: 'Dubai',
            image: require('../assets/dubai.jpg'),
            category: 'Middle East',
            rating: 4.9,
            price: '₹42,999',
        },
        {
            id: '9',
            name: 'Singapore',
            description: 'Garden city with futuristic architecture',
            route: 'Singapore',
            image: require('../assets/image2.jpg'),
            category: 'Southeast Asia',
            rating: 4.8,
            price: '₹38,999',
        },
        {
            id: '10',
            name: 'Indonesia',
            description: 'Vast archipelago with volcanic landscapes',
            route: 'Indonesia',
            image: require('../assets/wp949234.jpg'),
            category: 'Southeast Asia',
            rating: 4.7,
            price: '₹22,999',
        },
        {
            id: '11',
            name: 'Vietnam',
            description: 'Stunning coastline and rich history',
            route: 'Vietnam',
            image: require('../assets/bhutan.jpg'),
            category: 'Southeast Asia',
            rating: 4.6,
            price: '₹19,999',
        },
        {
            id: '12',
            name: 'Malaysia',
            description: 'Diverse mix of modern cities and rainforests',
            route: 'Malaysia',
            image: require('../assets/Srilanka.jpg'),
            category: 'Southeast Asia',
            rating: 4.5,
            price: '₹21,999',
        },
    ];

    const categories = ['All', 'Islands', 'Southeast Asia', 'Mountains', 'Middle East'];

    const filteredDestinations = destinations
        .filter(destination => {
            const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                destination.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'Price') {
                return parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', ''));
            }
            if (sortBy === 'Rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

    const slideAnim = useRef(new Animated.Value(0)).current;
    const featuredListRef = useRef<FlatList>(null);
    const mainScrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All' && searchQuery === '') {
            const dataLength = destinations.slice(0, 3).length * 1000;
            const timer = setInterval(() => {
                const nextIndex = (currentIndex + 1) % dataLength;
                setCurrentIndex(nextIndex);
                featuredListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [currentIndex, selectedCategory, searchQuery]);

    const handleScrollEnd = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        // Logic for jumping back/forward can be added here if manual scrolling is allowed
    };

    const handleDestinationPress = (route: keyof RootStackParamList) => {
        navigation.navigate(route as any);
    };

    const scrollToAllDestinations = () => {
        mainScrollRef.current?.scrollTo({ y: 580, animated: true });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <ScrollView 
                ref={mainScrollRef}
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingText}>Hello, Explorer!</Text>
                        <Text style={styles.headerTitle}>Where to next?</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton} onPress={() => { }}>
                        <MaterialIcons name="notifications-none" size={26} color={COLORS.primary} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchSection}>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color={COLORS.textLight} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search destinations..."
                            placeholderTextColor={COLORS.textLight}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setIsFilterVisible(true)}
                    >
                        <MaterialIcons name="tune" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Filter Modal */}
                <Modal
                    visible={isFilterVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsFilterVisible(false)}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setIsFilterVisible(false)}
                    >
                        <View style={styles.filterContainer}>
                            <Text style={styles.filterTitle}>Sort By</Text>
                            {['Default', 'Price', 'Rating'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.filterOption,
                                        sortBy === option && styles.activeFilterOption
                                    ]}
                                    onPress={() => {
                                        setSortBy(option);
                                        setIsFilterVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.filterOptionText,
                                        sortBy === option && styles.activeFilterOptionText
                                    ]}>
                                        {option === 'Price' ? 'Price: Low to High' : option}
                                    </Text>
                                    {sortBy === option && (
                                        <MaterialIcons name="check" size={20} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>

                {/* Category Filter */}
                <View style={styles.categorySection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.activeCategoryButton
                                ]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.activeCategoryText
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Section */}
                {selectedCategory === 'All' && searchQuery === '' && (
                    <View style={styles.featuredSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recommended</Text>
                            <TouchableOpacity onPress={scrollToAllDestinations}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            ref={featuredListRef}
                            data={new Array(1000).fill(destinations.slice(0, 3)).flat()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.featuredScroll}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            pagingEnabled={false}
                            snapToInterval={280 + SPACING.md}
                            decelerationRate="fast"
                            getItemLayout={(data, index) => ({
                                length: 280 + SPACING.md,
                                offset: (280 + SPACING.md) * index,
                                index,
                            })}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.featuredCard}
                                    onPress={() => handleDestinationPress(item.route)}
                                >
                                    <Image source={item.image} style={styles.featuredImage} />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                                        style={styles.featuredOverlay}
                                    >
                                        <View style={styles.featuredInfo}>
                                            <Text style={styles.featuredName}>{item.name}</Text>
                                            <View style={styles.featuredMeta}>
                                                <MaterialIcons name="star" size={16} color="#fbbf24" />
                                                <Text style={styles.featuredRating}>{item.rating}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                {/* Destinations List */}
                <View style={styles.listSection}>
                    <Text style={styles.sectionTitle}>
                        {selectedCategory === 'All' ? 'All Destinations' : `${selectedCategory}`}
                    </Text>
                    <View style={styles.destinationsGrid}>
                        {filteredDestinations.map((dest) => (
                            <TouchableOpacity
                                key={dest.id}
                                style={styles.destinationCard}
                                onPress={() => handleDestinationPress(dest.route)}
                            >
                                <Image source={dest.image} style={styles.destImage} />
                                <View style={styles.destInfo}>
                                    <Text style={styles.destName}>{dest.name}</Text>
                                    <Text style={styles.destPrice} numberOfLines={1}>{dest.description}</Text>
                                    <View style={styles.destFooter}>
                                        <Text style={styles.priceTag}>{dest.price}</Text>
                                        <View style={styles.ratingBox}>
                                            <MaterialIcons name="star" size={14} color="#fbbf24" />
                                            <Text style={styles.ratingText}>{dest.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* AI Floating Button */}
            <TouchableOpacity
                style={styles.aiFab}
                onPress={() => navigation.navigate('AITripPlanner' as any)}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    style={styles.aiFabGradient}
                >
                    <MaterialIcons name="auto-awesome" size={28} color={COLORS.white} />
                    <View style={styles.aiBadge}>
                        <Text style={styles.aiBadgeText}>AI</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        paddingTop: SPACING.lg,
        marginBottom: SPACING.lg,
    },
    greetingText: {
        ...FONTS.body2,
        color: COLORS.textLight,
    },
    headerTitle: {
        ...FONTS.h1,
        color: COLORS.text,
    },
    notificationButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    searchSection: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        marginBottom: SPACING.lg,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        paddingHorizontal: SPACING.md,
        height: 55,
        ...SHADOWS.light,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: 16,
        color: COLORS.text,
    },
    filterButton: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        marginLeft: SPACING.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    categorySection: {
        marginBottom: SPACING.lg,
    },
    categoryScroll: {
        paddingLeft: SIZES.padding,
    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        marginRight: SPACING.sm,
        ...SHADOWS.light,
    },
    activeCategoryButton: {
        backgroundColor: COLORS.primary,
    },
    categoryText: {
        ...FONTS.body2,
        fontWeight: '600',
        color: COLORS.textLight,
    },
    activeCategoryText: {
        color: COLORS.white,
    },
    featuredSection: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        ...FONTS.h3,
        color: COLORS.text,
    },
    seeAllText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    featuredScroll: {
        paddingLeft: SIZES.padding,
    },
    featuredCard: {
        width: 280,
        height: 180,
        borderRadius: 25,
        marginRight: SPACING.md,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        justifyContent: 'flex-end',
        padding: SPACING.md,
    },
    featuredInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuredName: {
        ...FONTS.h3,
        color: COLORS.white,
    },
    featuredMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    featuredRating: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },
    listSection: {
        paddingHorizontal: SIZES.padding,
    },
    destinationsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SPACING.md,
    },
    destinationCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginBottom: SPACING.md,
        overflow: 'hidden',
        ...SHADOWS.light,
    },
    destImage: {
        width: '100%',
        height: 140,
    },
    destInfo: {
        padding: SPACING.md,
    },
    destName: {
        ...FONTS.h3,
        fontSize: 16,
        color: COLORS.text,
    },
    destPrice: {
        ...FONTS.body2,
        color: COLORS.textLight,
        fontSize: 11,
        marginTop: 2,
    },
    destFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    priceTag: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        ...FONTS.label,
        color: COLORS.text,
        marginLeft: 2,
    },
    bottomSpacing: {
        height: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: SPACING.lg,
        ...SHADOWS.heavy,
    },
    filterTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    activeFilterOption: {
        backgroundColor: COLORS.primary + '10',
        borderRadius: 10,
    },
    filterOptionText: {
        ...FONTS.body1,
        color: COLORS.text,
    },
    activeFilterOptionText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    aiFab: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        ...SHADOWS.heavy,
    },
    aiFabGradient: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aiBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#f472b6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    aiBadgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default MainScreen;