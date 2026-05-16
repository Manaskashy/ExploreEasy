import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleReset = () => {
    if (email.trim()) {
      setIsSent(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/image.webp')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.overlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <Animated.View 
              style={[
                styles.content,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
              ]}
            >
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
              </TouchableOpacity>

              <View style={styles.headerTextContainer}>
                <Text style={styles.brandTitle}>Reset Password</Text>
                <Text style={styles.brandSubtitle}>
                  {isSent 
                    ? "Check your email for instructions" 
                    : "Enter your email to receive a reset link"}
                </Text>
              </View>

              <View style={styles.glassCard}>
                {!isSent ? (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Email Address</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="example@email.com"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={handleReset}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={['#6366f1', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                      >
                        <Text style={styles.buttonText}>Send Reset Link</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                      <MaterialIcons name="mark-email-read" size={50} color={COLORS.white} />
                    </View>
                    <Text style={styles.successText}>
                      We've sent a password reset link to your email.
                    </Text>
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => navigation.navigate('Login')}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={['#6366f1', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                      >
                        <Text style={styles.buttonText}>Back to Login</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Animated.View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTextContainer: {
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  brandTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
  brandSubtitle: {
    ...FONTS.body1,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.heavy,
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    ...FONTS.label,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  input: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: SPACING.md,
    color: COLORS.white,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  loginButton: {
    marginTop: SPACING.md,
    borderRadius: 15,
    overflow: 'hidden',
    ...SHADOWS.medium,
    width: '100%',
  },
  gradientButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  successText: {
    ...FONTS.body2,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
});

export default ForgotPasswordScreen;
