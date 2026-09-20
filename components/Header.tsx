import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, typography } from '../theme';

interface HeaderProps {
  name: string;
  avatarUrl: string;
  subtitle?: string;
  onAddPress: () => void;
  onLogoutPress?: () => void;
}

export function Header({ name, avatarUrl, subtitle, onAddPress, onLogoutPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.userRow} onPress={onLogoutPress}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.greeting}>Olá, {name}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </Pressable>
      <View style={styles.actions}>
        {onLogoutPress ? (
          <Pressable style={styles.iconButton} onPress={onLogoutPress}>
            <Ionicons name="log-out-outline" size={22} color={colors.textMuted} />
          </Pressable>
        ) : null}
        <Pressable style={styles.addButton} onPress={onAddPress}>
          <Ionicons name="add" size={24} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
  },
  greeting: {
    ...typography.h3,
  },
  subtitle: {
    ...typography.bodyMuted,
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
