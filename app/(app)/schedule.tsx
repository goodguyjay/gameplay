import { useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../../theme';
import { CategoryPicker } from '../../components/CategoryPicker';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useScheduleDraftStore } from '../../store/scheduleDraftStore';
import { useMatchesStore } from '../../store/matchesStore';
import { getServerById } from '../../data/mockServers';

export default function Schedule() {
  const draft = useScheduleDraftStore();
  const addMatch = useMatchesStore((s) => s.addMatch);

  const server = draft.serverId ? getServerById(draft.serverId) : undefined;

  const isValid = useMemo(
    () =>
      !!draft.category &&
      !!draft.serverId &&
      draft.day.length > 0 &&
      draft.month.length > 0 &&
      draft.hour.length > 0 &&
      draft.minute.length > 0,
    [draft.category, draft.serverId, draft.day, draft.month, draft.hour, draft.minute]
  );

  const handleSchedule = () => {
    if (!isValid || !server || !draft.category) return;
    addMatch({
      title: server.name,
      category: draft.category,
      gameId: server.gameId,
      serverId: server.id,
      day: draft.day.padStart(2, '0'),
      month: draft.month.padStart(2, '0'),
      hour: draft.hour.padStart(2, '0'),
      minute: draft.minute.padStart(2, '0'),
      description: draft.description,
      role: 'anfitriao',
    });
    draft.reset();
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Agendar partida</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <CategoryPicker selected={draft.category} onSelect={draft.setCategory} />

          <Pressable
            style={styles.serverButton}
            onPress={() => router.push('/select-server')}
          >
            <Text style={server ? styles.serverButtonTextFilled : styles.serverButtonText}>
              {server ? server.name : 'Selecione um servidor'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </Pressable>

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={draft.day}
                  onChangeText={(v) => draft.setField('day', v.replace(/\D/g, '').slice(0, 2))}
                  placeholder="00"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.smallInput}
                />
                <Text style={styles.separator}>/</Text>
                <TextInput
                  value={draft.month}
                  onChangeText={(v) => draft.setField('month', v.replace(/\D/g, '').slice(0, 2))}
                  placeholder="00"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.smallInput}
                />
              </View>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Hora e minuto</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={draft.hour}
                  onChangeText={(v) => draft.setField('hour', v.replace(/\D/g, '').slice(0, 2))}
                  placeholder="00"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.smallInput}
                />
                <Text style={styles.separator}>:</Text>
                <TextInput
                  value={draft.minute}
                  onChangeText={(v) => draft.setField('minute', v.replace(/\D/g, '').slice(0, 2))}
                  placeholder="00"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.smallInput}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={styles.descriptionHeader}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.charCount}>{draft.description.length}/100</Text>
            </View>
            <TextInput
              value={draft.description}
              onChangeText={(v) => draft.setField('description', v.slice(0, 100))}
              placeholder="Max 100 caracteres"
              placeholderTextColor={colors.textFaint}
              multiline
              maxLength={100}
              style={styles.textarea}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label="Agendar" onPress={handleSchedule} disabled={!isValid} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  serverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  serverButtonText: {
    ...typography.body,
    color: colors.textFaint,
  },
  serverButtonTextFilled: {
    ...typography.body,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  rowItem: {
    flex: 1,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  smallInput: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    textAlign: 'center',
    color: colors.text,
    fontSize: 16,
  },
  separator: {
    ...typography.body,
    color: colors.textFaint,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  charCount: {
    ...typography.caption,
  },
  textarea: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 100,
    color: colors.text,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
