import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors, radius, spacing, typography } from '../theme';
import type { Player } from '../data/types';

export function PlayerListItem({ player }: { player: Player }) {
  const isAvailable = player.status === 'disponivel';
  return (
    <View style={styles.container}>
      <Image source={{ uri: player.avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: isAvailable ? colors.success : colors.danger }]} />
          <Text style={styles.status}>{isAvailable ? 'Disponível' : 'Ocupado'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
  },
  info: {
    gap: 2,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
  },
  status: {
    ...typography.caption,
  },
});
