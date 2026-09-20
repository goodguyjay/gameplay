import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../../theme';
import { PlayerListItem } from '../../../components/PlayerListItem';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { GameIcon } from '../../../components/GameIcon';
import { useMatchesStore } from '../../../store/matchesStore';
import { getGameById, getServerById } from '../../../data/mockServers';

export default function MatchDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getMatchById = useMatchesStore((s) => s.getMatchById);
  const match = getMatchById(id);
  const [joining, setJoining] = useState(false);

  if (!match) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Partida não encontrada.</Text>
      </SafeAreaView>
    );
  }

  const game = getGameById(match.gameId);
  const server = getServerById(match.serverId);

  const handleShare = () => {
    try {
      Share.share({
        message: `Partida "${match.title}" agendada no GamePlay para ${match.day}/${match.month} às ${match.hour}h${match.minute}.`,
      })?.catch(() => {});
    } catch {
      // Share não é suportado nesta plataforma (ex.: web)
    }
  };

  const handleJoin = () => {
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      Alert.alert('Discord', 'Isso abriria o Discord para entrar na partida.');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <Pressable onPress={handleShare} style={styles.iconButton}>
          <Ionicons name="share-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      <FlatList
        data={server?.players ?? []}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View style={[styles.banner, { backgroundColor: game?.color ?? colors.surface }]}>
              {game ? <GameIcon game={game} size={72} /> : null}
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{match.title}</Text>
              <Text style={styles.description}>{match.description}</Text>
            </View>
            <View style={styles.playersHeader}>
              <Text style={styles.playersTitle}>Jogadores</Text>
              <Text style={styles.playersCount}>Total {server?.players.length ?? 0}</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PlayerListItem player={item} />}
      />

      <View style={styles.footer}>
        <PrimaryButton
          label="Entrar na partida"
          onPress={handleJoin}
          loading={joining}
          icon={<Ionicons name="logo-discord" size={20} color={colors.text} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
  },
  banner: {
    width: '100%',
    height: 160,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.h2,
  },
  description: {
    ...typography.bodyMuted,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  playersTitle: {
    ...typography.h3,
  },
  playersCount: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
