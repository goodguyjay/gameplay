import { Modal, View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { colors, radius, spacing, typography } from '../theme';

interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ visible, onCancel, onConfirm }: LogoutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Deseja sair do <Text style={styles.brand}>GamePlay</Text>?
          </Text>
          <View style={styles.actions}>
            <View style={styles.actionItem}>
              <PrimaryButton label="Não" variant="outline" onPress={onCancel} />
            </View>
            <View style={styles.actionItem}>
              <PrimaryButton label="Sim" onPress={onConfirm} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  title: {
    ...typography.h3,
    textAlign: 'center',
  },
  brand: {
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionItem: {
    flex: 1,
  },
});
