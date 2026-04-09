import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// Declare webpack path for TypeScript
declare let __webpack_public_path__: string;

import { Slot } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This makes your web app work on GitHub Pages under /hospital-dashboard/
      __webpack_public_path__ = '/hospital-dashboard/';
    }
  }, []);

  return <Slot />;
}