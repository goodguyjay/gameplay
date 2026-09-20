import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../theme';

export function DiscordLoginModal({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Ionicons name="logo-discord" size={40} color={colors.discord} />
          <Text style={styles.text}>Conectando ao Discord...</Text>
          <ActivityIndicator color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.lg,
    width: '75%',
  },
  text: {
    ...typography.body,
  },
});
