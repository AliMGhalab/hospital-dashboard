// app/_layout.tsx
import { Slot } from 'expo-router';
import { useEffect } from 'react';

// Tell TypeScript about webpack variable
declare let __webpack_public_path__: string;

export default function Layout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      __webpack_public_path__ = '/hospital-dashboard/';
    }
  }, []);

  return <Slot />;
}
