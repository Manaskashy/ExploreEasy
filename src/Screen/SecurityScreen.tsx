import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const SecurityScreen = () => {
  const navigation = useNavigation();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    
    // Success logic
    Alert.alert('Success', 'Your password has been updated securely.');
    setIsPasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const SecurityItem = ({ title, description, icon, color, onPress, showSwitch, switchValue, onSwitchChange }: any) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={onPress} 
      disabled={showSwitch}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <MaterialIcons name={icon} size={22} color={color} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#e2e8f0', true: COLORS.primary + '80' }}
          thumbColor={switchValue ? COLORS.primary : '#fff'}
        />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f59e0b', '#d97706']} // Amber/Gold for Security
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Security & Privacy</Text>
            <View style={{ width: 28 }} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Login & Recovery</Text>
        <View style={styles.card}>
          <SecurityItem
            title="Change Password"
            description="Update your password regularly"
            icon="lock-outline"
            color="#6366f1"
            onPress={() => setIsPasswordModalVisible(true)}
          />
          <View style={styles.divider} />
          <SecurityItem
            title="Two-Factor Auth"
            description="Add an extra layer of security"
            icon="verified-user"
            color="#10b981"
            showSwitch={true}
            switchValue={twoFactorEnabled}
            onSwitchChange={setTwoFactorEnabled}
          />
        </View>

        <Text style={styles.sectionTitle}>Device Security</Text>
        <View style={styles.card}>
          <SecurityItem
            title="Biometric Login"
            description="Use FaceID or Fingerprint"
            icon="fingerprint"
            color="#a855f7"
            showSwitch={true}
            switchValue={biometricsEnabled}
            onSwitchChange={setBiometricsEnabled}
          />
        </View>

        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <View style={[styles.card, { borderColor: COLORS.error + '30', borderWidth: 1 }]}>
          <SecurityItem
            title="Delete Account"
            description="Permanently remove your data"
            icon="delete-forever"
            color={COLORS.error}
            onPress={() => Alert.alert('Delete Account', 'This action cannot be undone. Are you sure?', [{text: 'Cancel'}, {text: 'Delete', style: 'destructive'}])}
          />
        </View>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal
        visible={isPasswordModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setIsPasswordModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showCurrentPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="••••••••"
                />
                <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                  <MaterialIcons 
                    name={showCurrentPassword ? "visibility" : "visibility-off"} 
                    size={22} 
                    color={COLORS.textLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="••••••••"
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                  <MaterialIcons 
                    name={showNewPassword ? "visibility" : "visibility-off"} 
                    size={22} 
                    color={COLORS.textLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons 
                    name={showConfirmPassword ? "visibility" : "visibility-off"} 
                    size={22} 
                    color={COLORS.textLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>


            <TouchableOpacity style={styles.updateBtn} onPress={handleChangePassword}>
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                style={styles.updateBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.updateBtnText}>Update Password</Text>
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
  },
  sectionTitle: {
    ...FONTS.label,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 20,
    marginLeft: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 5,
    ...SHADOWS.light,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...FONTS.body1,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemDescription: {
    ...FONTS.label,
    color: COLORS.textLight,
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 15,
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
    padding: 25,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  inputGroup: {
    marginBottom: 20,
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
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    ...FONTS.body2,
    color: COLORS.text,
  },

  updateBtn: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  updateBtnGradient: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBtnText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});

export default SecurityScreen;
