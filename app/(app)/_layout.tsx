import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { colors } from '../../theme';
import { useAuthStore } from '../../store/authStore';

export default function AppLayout() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.replace('/login');
    }
  }, [hasHydrated, isLoggedIn]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
