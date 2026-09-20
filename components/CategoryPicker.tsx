import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { categories } from '../data/categories';
import type { MatchCategory } from '../data/types';
import { colors, radius, spacing, typography } from '../theme';

interface CategoryPickerProps {
  selected: MatchCategory | null;
  onSelect: (category: MatchCategory) => void;
  label?: string;
}

export function CategoryPicker({ selected, onSelect, label = 'Categoria' }: CategoryPickerProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {categories.map((category) => {
          const isSelected = selected === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelect(category.id)}
              style={[styles.item, isSelected && styles.itemSelected]}
            >
              <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={26}
                  color={isSelected ? colors.text : colors.textMuted}
                />
              </View>
              <Text style={[styles.itemLabel, isSelected && styles.itemLabelSelected]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  itemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  itemLabel: {
    ...typography.caption,
    fontSize: 13,
  },
  itemLabelSelected: {
    color: colors.text,
    fontWeight: '600',
  },
});
