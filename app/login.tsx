import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { DiscordLoginModal } from '../components/DiscordLoginModal';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [connecting, setConnecting] = useState(false);
  const login = useAuthStore((s) => s.login);

  const handleLogin = () => {
    setConnecting(true);
    setTimeout(() => {
      login();
      setConnecting(false);
      router.replace('/home');
    }, 1100);
  };

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.spacer} />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se e organize suas jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games favoritos com seus amigos
          </Text>
          <PrimaryButton
            label="Entrar com Discord"
            onPress={handleLogin}
            icon={<Ionicons name="logo-discord" size={20} color={colors.text} />}
          />
        </View>
      </SafeAreaView>
      <DiscordLoginModal visible={connecting} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.bodyMuted,
    marginBottom: spacing.lg,
  },
});
