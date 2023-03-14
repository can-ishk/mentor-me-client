import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider as PaperProvider } from 'react-native-paper';
import { Index } from './src/index';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Index />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
