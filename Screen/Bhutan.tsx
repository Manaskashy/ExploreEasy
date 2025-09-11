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
type BhutanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface Props {
  navigation: BhutanScreenNavigationProp;
}

const Bhutan = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const places = [
        {
            name: 'Tiger\'s Nest Monastery',
            image: require('../assets/Tigers.jpg'),
            timing: '8:00 AM - 4:00 PM',
            fee: 'USD 25',
            description: 'Iconic monastery perched on a cliff at 3,120 meters altitude',
        },
        {
            name: 'Punakha Dzong',
            image: require('../assets/Punakha.jpg'),
            timing: '9:00 AM - 5:00 PM',
            fee: 'USD 25',
            description: 'Beautiful fortress at the confluence of two rivers',
        },
        {
            name: 'Thimphu Dzong',
            image: require('../assets/Thimpu.jpg'),
            timing: '9:00 AM - 5:00 PM',
            fee: 'USD 25',
            description: 'Government seat and largest dzong in Bhutan',
        },
        {
            name: 'Buddha Dordenma',
            image: require('../assets/Buddhajpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Giant Buddha statue overlooking Thimphu Valley',
        },
        {
            name: 'Chele La Pass',
            image: require('../assets/Chele.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Highest motorable pass with stunning Himalayan views',
        },
        {
            name: 'Paro Valley',
            image: require('../assets/Paro.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Scenic valley with traditional Bhutanese architecture',
        },
        {
            name: 'Bumthang Valley',
            image: require('../assets/Bhumtang.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Spiritual heart of Bhutan with ancient temples',
        },
        {
            name: 'Phobjikha Valley',
            image: require('../assets/Phobijkha.jpg'),
            timing: 'Open 24 hours',
            fee: 'Free',
            description: 'Glacial valley famous for black-necked cranes',
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
                    <Text style={styles.headerTitle}>Bhutan</Text>
                    <Text style={styles.headerSubtitle}>Last Shangri-La</Text>
                </LinearGradient>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search places in Bhutan..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>About Bhutan</Text>
                    <Text style={styles.infoText}>
                        Bhutan, known as the "Land of the Thunder Dragon," is a small Himalayan kingdom famous for its unique approach to development measured by Gross National Happiness rather than GDP. This mystical land is characterized by its pristine landscapes, ancient Buddhist monasteries, and traditional culture that has remained largely unchanged for centuries. Bhutan is home to dramatic mountain scenery, lush valleys, and a deeply spiritual way of life. The country prioritizes sustainable tourism and cultural preservation, making it one of the most authentic and unspoiled destinations in the world.
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

export default Bhutan; 