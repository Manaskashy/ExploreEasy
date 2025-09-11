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
type BaliScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface Props {
  navigation: BaliScreenNavigationProp;
}

const Bali = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const places = [
        {
            name: 'Ubud Sacred Monkey Forest',
            image: require('../assets/udud.jpeg'),
            timing: '8:30 AM - 6:00 PM',
            fee: 'IDR 80,000',
            description: 'Sacred forest sanctuary with ancient temples and playful macaques',
        },
        {
            name: 'Tanah Lot Temple',
            image: require('../assets/tanah.jpg'),
            timing: '7:00 AM - 7:00 PM',
            fee: 'IDR 60,000',
            description: 'Iconic sea temple perched on a dramatic rock formation',
        },
        {
            name: 'Mount Batur',
            image: require('../assets/mount.jpg'),
            timing: '2:00 AM - 12:00 PM',
            fee: 'IDR 300,000',
            description: 'Active volcano offering spectacular sunrise trekking experiences',
        },
        {
            name: 'Tegalalang Rice Terrace',
            image: require('../assets/tegalalang.webp'),
            timing: '6:00 AM - 6:00 PM',
            fee: 'IDR 25,000',
            description: 'Stunning terraced rice paddies with breathtaking valley views',
        },
        {
            name: 'Uluwatu Temple',
            image: require('../assets/Uluwatu.jpg'),
            timing: '6:00 AM - 7:00 PM',
            fee: 'IDR 50,000',
            description: 'Ancient cliff-top temple with dramatic ocean vistas',
        },
        {
            name: 'Nusa Penida Island',
            image: require('../assets/Nusa.jpg'),
            timing: '6:00 AM - 6:00 PM',
            fee: 'IDR 500,000',
            description: 'Pristine island paradise with crystal clear waters and hidden beaches',
        },
        {
            name: 'Seminyak Beach',
            image: require('../assets/Seminyak.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Trendy beach area with luxury resorts and vibrant nightlife',
        },
        {
            name: 'Besakih Temple',
            image: require('../assets/Besakih.jpg'),
            timing: '7:00 AM - 6:00 PM',
            fee: 'IDR 60,000',
            description: 'Mother Temple of Bali, the largest and holiest temple complex',
        },
        {
            name: 'Waterbom Bali',
            image: require('../assets/Waterbom.jpg'),
            timing: '9:00 AM - 6:00 PM',
            fee: 'IDR 520,000',
            description: 'Thrilling water park with exciting slides and family attractions',
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
                    <Text style={styles.headerTitle}>Bali</Text>
                    <Text style={styles.headerSubtitle}>Island of the Gods</Text>
                </LinearGradient>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search places in Bali..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>About Bali</Text>
                    <Text style={styles.infoText}>
                        Bali is an Indonesian island located in the westernmost end of the Lesser Sunda Islands, lying between Java to the west and Lombok to the east. Known as the "Island of the Gods," Bali is famous for its volcanic mountains, iconic rice paddies, coral reefs, and beaches. The island is home to a diverse and sophisticated art culture, including traditional and modern dance, sculpture, painting, leather, metalworking, and music. Bali's rich culture and natural beauty make it one of the world's most popular tourist destinations.
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

export default Bali;