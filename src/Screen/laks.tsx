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
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    MainScreen: undefined;
    Booking: { destinationName: string; price?: string };
};
type LakshadweepScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Lakshadweep = ({ navigation }: { navigation: LakshadweepScreenNavigationProp }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollY = useRef(new Animated.Value(0)).current;

    const places = [
        {
            name: 'Agatti Island',
            image: require('../assets/agatti.jpg'),
            rating: 4.8,
            duration: '2-3 Days',
            description: 'Main gateway island with stunning beaches and water sports activities',
        },
        {
            name: 'Kadmat Island',
            image: require('../assets/image2.jpg'),
            rating: 4.7,
            duration: '3-4 Days',
            description: 'Longest island with pristine beaches and excellent diving spots',
        },
        {
            name: 'Minicoy Island',
            image: require('../assets/minicoy.jpg'),
            rating: 4.9,
            duration: '2 Days',
            description: 'Southernmost island with unique Maldivian culture and lighthouse',
        },
        {
            name: 'Kavaratti Island',
            image: require('../assets/Kavaratti.jpg'),
            rating: 4.6,
            duration: '3 Days',
            description: 'Administrative capital with beautiful lagoons and marine life',
        },
        {
            name: 'Bangaram Island',
            image: require('../assets/Bangaram.webp'),
            rating: 5.0,
            duration: '4 Days',
            description: 'Teardrop-shaped island perfect for snorkeling and relaxation',
        }
    ];

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [400, 300],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                {/* Hero Header */}
                <Animated.View style={[styles.heroContainer, { height: headerHeight }]}>
                    <Image source={require('../assets/Lakshadweep.webp')} style={styles.heroImage} />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.heroOverlay}
                    >
                        <SafeAreaView edges={['top']}>
                            <TouchableOpacity style={styles.backFab} onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </SafeAreaView>

                        <View style={styles.heroInfo}>
                            <Text style={styles.heroTitle}>Lakshadweep</Text>
                            <View style={styles.statsBar}>
                                <View style={styles.statItem}>
                                    <MaterialIcons name="star" size={18} color="#fbbf24" />
                                    <Text style={styles.statText}>4.9</Text>
                                </View>
                                <View style={styles.statSeparator} />
                                <View style={styles.statItem}>
                                    <MaterialIcons name="schedule" size={18} color={COLORS.white} />
                                    <Text style={styles.statText}>5-7 Days</Text>
                                </View>
                                <View style={styles.statSeparator} />
                                <View style={styles.statItem}>
                                    <MaterialIcons name="payments" size={18} color={COLORS.white} />
                                    <Text style={statItemStyle.statText}>Premium</Text>
                                </View>
                                <View style={styles.statSeparator} />
                                <TouchableOpacity style={styles.statItem} onPress={() => { }}>
                                    <MaterialIcons name="favorite-border" size={20} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Content Section */}
                <View style={styles.content}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.aboutText}>
                            Lakshadweep is a pristine archipelago of 36 coral islands in the Arabian Sea. Known for its crystal-clear turquoise waters and vibrant marine life, it offers an untouched tropical escape like no other.
                        </Text>

                        <View style={styles.highlightGrid}>
                            <View style={styles.highlightBox}>
                                <MaterialIcons name="waves" size={24} color={COLORS.primary} />
                                <Text style={styles.highlightText}>Coral Reefs</Text>
                            </View>
                            <View style={styles.highlightBox}>
                                <MaterialIcons name="sailing" size={24} color={COLORS.primary} />
                                <Text style={styles.highlightText}>Water Sports</Text>
                            </View>
                            <View style={styles.highlightBox}>
                                <MaterialIcons name="landscape" size={24} color={COLORS.primary} />
                                <Text style={styles.highlightText}>Pristine</Text>
                            </View>
                        </View>
                    </View>

                    {/* Horizontal Discovery */}
                    <View style={styles.discoverySection}>
                        <Text style={styles.sectionTitle}>Top Experiences</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discoveryScroll}>
                            {places.map((place, index) => (
                                <TouchableOpacity key={index} style={styles.discoveryCard} onPress={() => navigation.navigate('Booking', { destinationName: 'Lakshadweep', price: '₹24,999' })}>
                                    <Image source={place.image} style={styles.discoveryImage} />
                                    <View style={styles.discoveryInfo}>
                                        <Text style={styles.discoveryName}>{place.name}</Text>
                                        <View style={styles.discoveryMeta}>
                                            <MaterialIcons name="star" size={14} color="#fbbf24" />
                                            <Text style={styles.discoveryRating}>{place.rating}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Detailed List */}
                    <Text style={styles.sectionTitle}>All Highlights</Text>
                    {places.map((place, index) => (
                        <View key={index} style={styles.listCard}>
                            <Image source={place.image} style={styles.listImage} />
                            <View style={styles.listContent}>
                                <Text style={styles.listName}>{place.name}</Text>
                                <Text style={styles.listDesc} numberOfLines={2}>{place.description}</Text>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={[styles.bookButton, { marginTop: SPACING.xl }]} onPress={() => navigation.navigate('Booking', { destinationName: 'Lakshadweep', price: '₹24,999' })}>
                        <LinearGradient
                            colors={COLORS.gradientPrimary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientBtn}
                        >
                            <Text style={styles.bookButtonText}>Book Your Trip</Text>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.white} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </Animated.ScrollView>
        </View>
    );
};

const statItemStyle = StyleSheet.create({
    statText: {
        ...FONTS.label,
        color: COLORS.white,
        marginLeft: 6,
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    heroContainer: {
        width: '100%',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    heroOverlay: {
        flex: 1,
        padding: SPACING.lg,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backFab: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveFab: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroInfo: {
        marginBottom: SPACING.xl,
    },
    heroTitle: {
        ...FONTS.h1,
        color: COLORS.white,
        fontSize: 48,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    statsBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.md,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statSeparator: {
        width: 1,
        height: 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 15,
    },
    statText: {
        ...FONTS.label,
        color: COLORS.white,
        marginLeft: 6,
    },
    content: {
        paddingHorizontal: SIZES.padding,
        marginTop: -40,
    },
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: SPACING.lg,
        ...SHADOWS.heavy,
    },
    sectionTitle: {
        ...FONTS.h3,
        color: COLORS.text,
        marginBottom: SPACING.md,
        marginTop: SPACING.lg,
    },
    aboutText: {
        ...FONTS.body2,
        color: COLORS.textLight,
        lineHeight: 22,
    },
    highlightGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.lg,
        paddingTop: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    highlightBox: {
        alignItems: 'center',
    },
    highlightText: {
        ...FONTS.label,
        color: COLORS.text,
        marginTop: 6,
    },
    discoverySection: {
        marginTop: SPACING.xl,
    },
    discoveryScroll: {
        paddingRight: 20,
    },
    discoveryCard: {
        width: 200,
        height: 250,
        borderRadius: 25,
        marginRight: 15,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    discoveryImage: {
        width: '100%',
        height: '100%',
    },
    discoveryInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    discoveryName: {
        ...FONTS.h3,
        color: COLORS.white,
        fontSize: 16,
    },
    discoveryMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    discoveryRating: {
        ...FONTS.label,
        color: COLORS.white,
        marginLeft: 4,
    },
    listCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        alignItems: 'center',
        ...SHADOWS.light,
    },
    listImage: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
    listContent: {
        flex: 1,
        marginLeft: 15,
    },
    listName: {
        ...FONTS.h3,
        fontSize: 16,
        color: COLORS.text,
    },
    listDesc: {
        ...FONTS.body2,
        color: COLORS.textLight,
        fontSize: 13,
        marginTop: 4,
    },
    bookButton: {
        borderRadius: 20,
        overflow: 'hidden',
        ...SHADOWS.heavy,
        marginBottom: 30,
    },
    gradientBtn: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bookButtonText: {
        ...FONTS.h3,
        color: COLORS.white,
        marginRight: 10,
    },
});

export default Lakshadweep;