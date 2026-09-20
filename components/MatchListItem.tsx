import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { categoryLabel } from '../data/categories';
import { getGameById } from '../data/mockServers';
import { GameIcon } from './GameIcon';
import type { ScheduledMatch } from '../data/types';

interface MatchListItemProps {
  match: ScheduledMatch;
  onPress: () => void;
}

export function MatchListItem({ match, onPress }: MatchListItemProps) {
  const game = getGameById(match.gameId);
  const isHost = match.role === 'anfitriao';

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {game ? <GameIcon game={game} size={48} /> : null}
      <View style={styles.info}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{match.title}</Text>
          <Text style={styles.category}>{categoryLabel(match.category)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.date}>
            {match.day}/{match.month} às {match.hour}h{match.minute}
          </Text>
          <View style={styles.roleBadge}>
            <View style={[styles.dot, { backgroundColor: isHost ? colors.danger : colors.success }]} />
            <Text style={styles.roleText}>{isHost ? 'Anfitrião' : 'Visitante'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.body,
    fontWeight: '600',
  },
  category: {
    ...typography.caption,
  },
  date: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  roleText: {
    ...typography.caption,
    fontSize: 12,
  },
});
