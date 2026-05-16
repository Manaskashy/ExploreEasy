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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../styles/Theme';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainScreen: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
                <Text style={styles.brandTitle}>ExploreEasy</Text>
                <Text style={styles.brandSubtitle}>Create your account</Text>
              </View>

              <View style={styles.glassCard}>
                <Text style={styles.loginTitle}>Sign Up</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
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

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('MainScreen')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Get Started</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>Or sign up with</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <MaterialCommunityIcons name="google" size={28} color="#EA4335" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <MaterialCommunityIcons name="apple" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <MaterialCommunityIcons name="facebook" size={28} color="#1877F2" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.signUpContainer}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.signUpText}>Already have an account? <Text style={styles.signUpLink}>Sign In</Text></Text>
                </TouchableOpacity>
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
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  brandTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    letterSpacing: 1,
  },
  brandSubtitle: {
    ...FONTS.body1,
    color: 'rgba(255,255,255,0.8)',
    marginTop: SPACING.xs,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...SHADOWS.heavy,
  },
  loginTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    ...FONTS.label,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  input: {
    height: 50,
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
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    width: '100%',
    paddingHorizontal: SPACING.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.6)',
    paddingHorizontal: SPACING.md,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  signUpContainer: {
    marginTop: SPACING.sm,
  },
  signUpText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
  },
  signUpLink: {
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default SignUpScreen;
