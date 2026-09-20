import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, typography } from '../theme';
import { useAuthStore } from '../store/authStore';

export default function Splash() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    const timer = setTimeout(() => {
      router.replace(isLoggedIn ? '/home' : '/login');
    }, 1200);
    return () => clearTimeout(timer);
  }, [hasHydrated, isLoggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.logo}>
          Game<Text style={styles.logoAccent}>Play</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    ...typography.h1,
    fontSize: 32,
  },
  logoAccent: {
    color: colors.primary,
  },
});
