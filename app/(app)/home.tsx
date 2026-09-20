import { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';
import { Header } from '../../components/Header';
import { CategoryPicker } from '../../components/CategoryPicker';
import { MatchListItem } from '../../components/MatchListItem';
import { LogoutModal } from '../../components/LogoutModal';
import { useAuthStore } from '../../store/authStore';
import { useMatchesStore } from '../../store/matchesStore';
import { useScheduleDraftStore } from '../../store/scheduleDraftStore';
import type { MatchCategory } from '../../data/types';

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const matches = useMatchesStore((s) => s.matches);
  const resetDraft = useScheduleDraftStore((s) => s.reset);

  const [activeCategory, setActiveCategory] = useState<MatchCategory | null>(null);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const filteredMatches = useMemo(
    () => (activeCategory ? matches.filter((m) => m.category === activeCategory) : matches),
    [matches, activeCategory]
  );

  const handleSelectCategory = (category: MatchCategory) => {
    setActiveCategory((current) => (current === category ? null : category));
  };

  const handleAddPress = () => {
    resetDraft();
    router.push('/schedule');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Header
          name={user?.name ?? ''}
          avatarUrl={user?.avatarUrl ?? ''}
          subtitle="Hoje é dia de vitória"
          onAddPress={handleAddPress}
          onLogoutPress={() => setLogoutVisible(true)}
        />

        <View style={styles.categorySpacing}>
          <CategoryPicker selected={activeCategory} onSelect={handleSelectCategory} />
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Partidas agendadas</Text>
          <Text style={styles.listCount}>Total {filteredMatches.length}</Text>
        </View>

        <FlatList
          data={filteredMatches}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <MatchListItem match={item} onPress={() => router.push(`/match/${item.id}`)} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma partida agendada nessa categoria.</Text>
          }
        />
      </View>

      <LogoutModal
        visible={logoutVisible}
        onCancel={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          logout();
          router.replace('/login');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  categorySpacing: {
    marginTop: spacing.xl,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  listTitle: {
    ...typography.h3,
  },
  listCount: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  empty: {
    ...typography.bodyMuted,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
