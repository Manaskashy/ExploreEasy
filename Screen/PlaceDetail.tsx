import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = { 
  Main: undefined; 
  PlaceDetail: { place: any };
  Bali: undefined;
};

type PlaceDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlaceDetail'>;
type PlaceDetailScreenRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;

interface Props {
  navigation: PlaceDetailScreenNavigationProp;
  route: PlaceDetailScreenRouteProp;
}

const PlaceDetail = ({ navigation, route }: Props) => {
  const { place } = route.params;
  const [showMap, setShowMap] = useState(false);

  const placeLocation = {
    latitude: place.coordinates?.latitude || -8.5184,
    longitude: place.coordinates?.longitude || 115.2594,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={place.image}
              style={styles.placeImage}
              resizeMode="cover"
            />
            
            <Text style={styles.title}>{place.name}</Text>
            
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>⏰ Timings: {place.timing}</Text>
              <Text style={styles.infoText}>💰 Visit Fee: {place.fee}</Text>
            </View>

            <TouchableOpacity
              style={styles.mapToggleButton}
              onPress={() => setShowMap(!showMap)}
            >
              <Text style={styles.mapToggleText}>
                {showMap ? 'Hide Map' : '📍 Show Map'}
              </Text>
            </TouchableOpacity>
            
            {showMap && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={placeLocation}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                >
                  <Marker
                    coordinate={placeLocation}
                    title={place.name}
                    description="Tourist Destination"
                  />
                </MapView>
                <View style={styles.mapInfo}>
                  <Text style={styles.mapInfoText}>📍 {place.name}</Text>
                  <Text style={styles.mapInfoText}>
                    Coordinates: {placeLocation.latitude.toFixed(4)}, {placeLocation.longitude.toFixed(4)}
                  </Text>
                </View>
              </View>
            )}

                         <TouchableOpacity
               style={styles.backButton}
               onPress={() => navigation.goBack()}
             >
               <Text style={styles.backButtonText}>← Back to Bali</Text>
             </TouchableOpacity>
           </View>
         </ScrollView>
       </SafeAreaView>
     );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(98, 150, 174, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
  },
  placeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  mapToggleButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  mapToggleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  map: {
    width: '100%',
    height: 250,
  },
  mapInfo: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  mapInfoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PlaceDetail; 