import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppRoot from './src/AppRoot';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
<AppRoot/>
</PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
