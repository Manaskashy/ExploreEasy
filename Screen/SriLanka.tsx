import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Animated,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Pressable,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Footer from './Footer';

type RootStackParamList = { 
    MainScreen: undefined;
    Profile: undefined;
    Login: undefined;
    Booking: undefined;
};
type SriLankaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface Props {
  navigation: SriLankaScreenNavigationProp;
}

const SriLanka = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const places = [
        {
            name: 'Sigiriya Rock Fortress',
            image: require('../assets/image2.jpg'),
            timing: '7:00 AM - 5:30 PM',
            fee: 'USD 30',
            description: 'Ancient palace and fortress complex on a massive rock column',
        },
        {
            name: 'Temple of the Sacred Tooth',
            image: require('../assets/Lakshadweep.webp'),
            timing: '5:30 AM - 8:00 PM',
            fee: 'USD 25',
            description: 'Sacred Buddhist temple housing the relic of Buddha\'s tooth',
        },
        {
            name: 'Yala National Park',
            image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
            timing: '6:00 AM - 6:00 PM',
            fee: 'USD 40',
            description: 'Famous wildlife sanctuary known for leopards and elephants',
        },
        {
            name: 'Galle Fort',
            image: require('../assets/image2.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'UNESCO World Heritage site with colonial architecture',
        },
        {
            name: 'Ella Rock',
            image: require('../assets/Lakshadweep.webp'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Scenic viewpoint with panoramic mountain and valley views',
        },
        {
            name: 'Polonnaruwa',
            image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
            timing: '7:00 AM - 6:00 PM',
            fee: 'USD 25',
            description: 'Ancient city with well-preserved ruins and monuments',
        },
        {
            name: 'Mirissa Beach',
            image: require('../assets/image2.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Beautiful beach famous for whale watching and surfing',
        },
        {
            name: 'Dambulla Cave Temple',
            image: require('../assets/Lakshadweep.webp'),
            timing: '7:00 AM - 7:00 PM',
            fee: 'USD 15',
            description: 'Ancient Buddhist temple complex with cave paintings',
        },
    ];

    const placeRefs = places.map(() => useRef(new Animated.Value(1)));
    const filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Animation for fade-in and slide-up
    const slideAnim = useRef(new Animated.Value(-300)).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with Gradient */}
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Sri Lanka</Text>
                    <Text style={styles.headerSubtitle}>Pearl of the Indian Ocean</Text>
                </LinearGradient>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search places in Sri Lanka..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>About Sri Lanka</Text>
                    <Text style={styles.infoText}>
                        Sri Lanka, formerly known as Ceylon, is a tropical island nation in the Indian Ocean off the southern coast of India. Known as the "Pearl of the Indian Ocean," this beautiful country offers diverse landscapes from pristine beaches and lush tea plantations to ancient temples and wildlife sanctuaries. Sri Lanka is famous for its rich cultural heritage, including ancient Buddhist sites, colonial architecture, and traditional Ayurvedic practices. The country is also renowned for its world-class tea, spices, and warm hospitality, making it a perfect destination for culture, nature, and adventure lovers.
                    </Text>
                </View>

                {/* Top Places */}
                <Text style={styles.sectionTitle}>Top Places to Visit</Text>
                {filteredPlaces.map((place, idx) => {
                    const scale = placeRefs[places.indexOf(place)].current;
                    const onPressIn = () => {
                        Animated.spring(scale, {
                            toValue: 0.97,
                            useNativeDriver: true,
                        }).start();
                    };
                    const onPressOut = () => {
                        Animated.spring(scale, {
                            toValue: 1,
                            useNativeDriver: true,
                        }).start();
                    };
                    return (
                        <Pressable
                            key={place.name}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            style={{ width: '100%' }}
                        >
                            <Animated.View style={[styles.placeContainer, { transform: [{ scale }] }]}> 
                                <Image
                                    source={place.image}
                                    style={styles.placeImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.placeContent}>
                                    <Text style={styles.placeName}>{idx + 1}. {place.name}</Text>
                                    <Text style={styles.placeDescription}>{place.description}</Text>
                                    <View style={styles.placeDetails}>
                                        <View style={styles.detailItem}>
                                            <Text style={styles.detailLabel}>🕒</Text>
                                            <Text style={styles.detailText}>{place.timing}</Text>
                                        </View>
                                        <View style={styles.detailItem}>
                                            <Text style={styles.detailLabel}>💰</Text>
                                            <Text style={styles.detailText}>{place.fee}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </Pressable>
                    );
                })}

                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('MainScreen')}
                >
                    <Text style={styles.backButtonText}>← Back to Home</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacing} />
            </ScrollView>
            <Footer activeRoute="MainScreen" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    searchInput: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    searchIcon: {
        position: 'absolute',
        right: 40,
        top: 15,
        fontSize: 20,
    },
    infoCard: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    placeContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    placeImage: {
        width: '100%',
        height: 200,
    },
    placeContent: {
        padding: 20,
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    placeDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 15,
    },
    placeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 16,
        marginRight: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#667eea',
        fontWeight: '500',
    },
    backButton: {
        backgroundColor: '#667eea',
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 20,
    },
});

export default SriLanka; 