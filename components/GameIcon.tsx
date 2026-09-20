import { View, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Game } from '../data/types';

interface GameIconProps {
  game: Game;
  size?: number;
}

export function GameIcon({ game, size = 48 }: GameIconProps) {
  const glyphSize = size * 0.55;
  return (
    <View
      style={[
        styles.wrap,
        { width: size, height: size, borderRadius: size / 3.2, backgroundColor: game.color },
      ]}
    >
      {game.icon.type === 'svg' ? (
        <SvgUri uri={game.icon.uri} width={glyphSize} height={glyphSize} />
      ) : (
        <MaterialCommunityIcons name={game.icon.name as any} size={glyphSize} color="#FFFFFF" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
