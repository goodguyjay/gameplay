import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../theme';
import { getGameById } from '../data/mockServers';
import { GameIcon } from './GameIcon';
import type { Server } from '../data/types';

interface ServerListItemProps {
  server: Server;
  onPress: () => void;
}

export function ServerListItem({ server, onPress }: ServerListItemProps) {
  const game = getGameById(server.gameId);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {game ? <GameIcon game={game} size={44} /> : null}
      <View style={styles.info}>
        <Text style={styles.name}>{server.name}</Text>
        <Text style={styles.role}>
          {server.role === 'administrador' ? 'Administrador' : 'Convidado'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
  },
  role: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
});
