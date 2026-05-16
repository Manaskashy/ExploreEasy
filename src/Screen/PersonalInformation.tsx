import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const PersonalInformation = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [bio, setBio] = useState('Travel enthusiast | Nature lover | Explorer');

  const handleSave = () => {
    // This will later connect to Supabase
    Alert.alert('Success', 'Your profile has been updated!');
    navigation.goBack();
  };

  const InputField = ({ label, value, onChangeText, icon, keyboardType = 'default', multiline = false }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, multiline && styles.textAreaWrapper]}>
        <MaterialIcons name={icon} size={20} color={COLORS.primary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholderTextColor={COLORS.textLight}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#6366f1']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal Info</Text>
            <View style={{ width: 28 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoCard}>
            <Text style={styles.cardSubtitle}>Keep your profile up to date to get the best travel recommendations.</Text>

            <InputField
              label="Full Name"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />

            <InputField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
              keyboardType="email-address"
            />

            <InputField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              icon="phone-iphone"
              keyboardType="phone-pad"
            />

            <InputField
              label="Bio"
              value={bio}
              onChangeText={setBio}
              icon="info-outline"
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <LinearGradient
              colors={COLORS.gradientPrimary}
              style={styles.saveBtnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingBottom: 20,
    ...SHADOWS.medium,
  },
  headerContent: {
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    ...SHADOWS.medium,
    marginBottom: 30,
  },
  cardSubtitle: {
    ...FONTS.body2,
    color: COLORS.textLight,
    marginBottom: 25,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    ...FONTS.label,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 15,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...FONTS.body2,
    color: COLORS.text,
    paddingVertical: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveBtn: {
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  saveBtnGradient: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default PersonalInformation;
