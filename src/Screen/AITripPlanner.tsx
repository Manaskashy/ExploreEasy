import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';


const { width } = Dimensions.get('window');

type RootStackParamList = {
  MainScreen: undefined;
  AITripPlanner: undefined;
};

type AITripPlannerNavigationProp = StackNavigationProp<RootStackParamList>;

const AITripPlanner = ({ navigation }: { navigation: AITripPlannerNavigationProp }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const generateItinerary = () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setItinerary(null);
    fadeAnim.setValue(0);

    // Mocking AI response
    setTimeout(() => {
      const mockResult = {
        title: "Your Dream Escape",
        destination: prompt.includes("Bali") ? "Ubud, Bali" : "Tropical Paradise",
        days: [
          {
            day: 1,
            title: "Nature & Culture",
            activities: ["Sunrise hike at Mt. Batur", "Visit Sacred Monkey Forest", "Traditional Dance Performance"]
          },
          {
            day: 2,
            title: "Beach & Relaxation",
            activities: ["Surf lessons at Kuta", "Spa treatment at Seminyak", "Sunset dinner at Jimbaran"]
          },
          {
            day: 3,
            title: "Adventure & Art",
            activities: ["Tegallalang Rice Terrace", "Art Market shopping", "Coffee plantation tour"]
          }
        ]
      };

      setItinerary(mockResult);
      setLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#6366f1', '#a855f7']}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>AI Trip Planner</Text>
            <View style={{ width: 28 }} />
          </View>
        </SafeAreaView>

      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!itinerary && !loading && (
          <View style={styles.emptyState}>
            <MaterialIcons name="lightbulb_outline" size={64} color="rgba(0,0,0,0.1)" />
            <Text style={styles.emptyText}>Tell me your dream trip and I'll handle the rest.</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingState}>
            <Text style={styles.loadingText}>Crafting your perfect itinerary...</Text>
          </View>
        )}

        {itinerary && (
          <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
            <Text style={styles.itineraryTitle}>{itinerary.title}</Text>
            <View style={styles.destBadge}>
              <MaterialIcons name="location-on" size={16} color={COLORS.primary} />
              <Text style={styles.destText}>{itinerary.destination}</Text>
            </View>

            {itinerary.days.map((day: any, idx: number) => (
              <View key={idx} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayNum}>Day {day.day}</Text>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                </View>
                {day.activities.map((act: string, aIdx: number) => (
                  <View key={aIdx} style={styles.activityItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.activityText}>{act}</Text>
                  </View>
                ))}
              </View>
            ))}
          </Animated.View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Where do you want to go?"
              placeholderTextColor={COLORS.textLight}
              value={prompt}
              onChangeText={setPrompt}
              multiline
            />
            <TouchableOpacity
              style={styles.magicButton}
              onPress={generateItinerary}
              disabled={loading}
            >
              <LinearGradient
                colors={['#f472b6', '#fb7185']}
                style={styles.magicGradient}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <MaterialIcons name="auto-awesome" size={24} color={COLORS.white} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBackground: {
    paddingBottom: 10,
    ...SHADOWS.heavy,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
    fontSize: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginBottom: Platform.OS === 'ios' ? 20 : 0, // Adjusted after removing Footer
    ...SHADOWS.medium,
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 5,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    ...FONTS.body2,
    color: COLORS.text,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 50,
    maxHeight: 120,
  },
  magicButton: {
    margin: 5,
  },
  magicGradient: {
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...FONTS.body2,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  loadingState: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    ...FONTS.body2,
    color: COLORS.primary,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 10,
  },
  itineraryTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  destBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  destText: {
    ...FONTS.label,
    color: COLORS.primary,
    marginLeft: 4,
  },
  dayCard: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayNum: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dayTitle: {
    ...FONTS.h3,
    fontSize: 16,
    color: COLORS.text,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    marginTop: 8,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
    ...FONTS.body2,
    color: COLORS.textLight,
    fontSize: 14,
  }
});

export default AITripPlanner;
