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
}

const MainScreen = ({ navigation }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const destinations: Destination[] = [
        {
            id: '1',
            name: 'Lakshadweep',
            description: 'Tropical islands and turquoise waters',
            route: 'Lakshadweep',
            image: require('../assets/Lakshadweep.webp'),
            category: 'Islands'
        },
        {
            id: '2',
            name: 'Bali',
            description: 'Island of the Gods with rich culture and stunning beaches',
            route: 'Bali',
            image: require('../assets/image2.jpg'),
            category: 'Islands'
        },
        {
            id: '3',
            name: 'Maldives',
            description: 'Paradise islands with crystal clear waters and overwater bungalows',
            route: 'Maldives',
            image: require('../assets/aec4f3bd-1d7e-48b1-95ec-c0dd7c5a5159.jpg'),
            category: 'Islands'
        },
        {
            id: '4',
            name: 'Thailand',
            description: 'Land of smiles with temples, beaches, and vibrant culture',
            route: 'Thailand',
            image: require('../assets/wp949234.jpg'),
            category: 'Southeast Asia'
        },
        {
            id: '5',
            name: 'Nepal',
            description: 'Himalayan kingdom with ancient temples and trekking adventures',
            route: 'Nepal',
            image: require('../assets/image.webp'),
            category: 'Mountains'
        },
        {
            id: '6',
            name: 'Bhutan',
            description: 'Last Shangri-La with dzongs and Gross National Happiness',
            route: 'Bhutan',
            image: require('../assets/bhutan.jpg'),
            category: 'Mountains'
        },
        {
            id: '7',
            name: 'Sri Lanka',
            description: 'Pearl of the Indian Ocean with tea plantations and wildlife',
            route: 'SriLanka',
            image: require('../assets/Srilanka.jpg'),
            category: 'Islands'
        },
        {
            id: '8',
            name: 'Dubai',
            description: 'City of Gold with futuristic architecture and luxury shopping',
            route: 'Dubai',
            image: require('../assets/dubai.jpg'),
            category: 'Middle East'
        },
        {
            id: '9',
            name: 'Singapore',
            description: 'Lion City with modern attractions and multicultural heritage',
            route: 'Singapore',
            image: require('../assets/singapore.jpg'),
            category: 'Southeast Asia'
        },
        {
            id: '10',
            name: 'Indonesia',
            description: 'Emerald of the Equator with diverse islands and cultures',
            route: 'Indonesia',
            image: require('../assets/indonesia.jpg'),
            category: 'Southeast Asia'
        },
        {
            id: '11',
            name: 'Vietnam',
            description: 'Land of the Ascending Dragon with history and natural beauty',
            route: 'Vietnam',
            image: require('../assets/vietnam.jpg'),
            category: 'Southeast Asia'
        },
        {
            id: '12',
            name: 'Malaysia',
            description: 'Truly Asia with rainforests, beaches, and modern cities',
            route: 'Malaysia',
            image: require('../assets/Malaysia.jpg'),
            category: 'Southeast Asia'
        },
    ];

    const categories = ['All', 'Islands', 'Southeast Asia', 'Mountains', 'Middle East'];

    const filteredDestinations = destinations.filter(destination => {
        const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            destination.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const destinationRefs = destinations.map(() => useRef(new Animated.Value(1)));

    // Animation for fade-in and slide-up
    const slideAnim = useRef(new Animated.Value(-300)).current;
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    const handleDestinationPress = (route: keyof RootStackParamList) => {
        navigation.navigate(route);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header with Gradient */}
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Explore Easy</Text>
                    <Text style={styles.headerSubtitle}>Discover Amazing Destinations</Text>
                </LinearGradient>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search destinations..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={styles.searchIcon}>🔍</Text>
                </View>

                {/* Category Filter */}
                <View style={styles.categoryContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

                {/* Destinations Grid */}
                <View style={styles.destinationsContainer}>
                    <Text style={styles.sectionTitle}>
                        {selectedCategory === 'All' ? 'All Destinations' : `${selectedCategory} Destinations`}
                    </Text>
                    <View style={styles.destinationsGrid}>
                        {filteredDestinations.map((destination, idx) => {
                            const scale = destinationRefs[destinations.indexOf(destination)].current;
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
                                    key={destination.id}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={() => handleDestinationPress(destination.route)}
                                    style={styles.destinationCard}
                                >
                                    <Animated.View style={[styles.cardContent, { transform: [{ scale }] }]}>
                                        <Image
                                            source={destination.image}
                                            style={styles.destinationImage}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.destinationInfo}>
                                            <Text style={styles.destinationName}>{destination.name}</Text>
                                            <Text style={styles.destinationDescription}>
                                                {destination.description}
                                            </Text>
                                            <View style={styles.categoryTag}>
                                                <Text style={styles.categoryTagText}>{destination.category}</Text>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

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
    categoryContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    activeCategoryButton: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    categoryText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    activeCategoryText: {
        color: '#667eea',
    },
    destinationsContainer: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    destinationsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    destinationCard: {
        width: '48%',
        marginBottom: 20,
    },
    cardContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    destinationImage: {
        width: '100%',
        height: 120,
    },
    destinationInfo: {
        padding: 15,
    },
    destinationName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    destinationDescription: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
        marginBottom: 10,
    },
    categoryTag: {
        alignSelf: 'flex-start',
        backgroundColor: '#667eea',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    categoryTagText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 20,
    },
});

export default MainScreen;