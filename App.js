import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppRoot from './src/AppRoot';
import { MD3LightTheme as DefaultTheme,PaperProvider } from 'react-native-paper';

const customColors = {
  primary: '#197b45',
  primaryDark: '#71a586',
  primaryLight: '#e8f6ee',
  secondary: '#468460',
  secondaryDark: '#3ca46c',
  secondaryLight: '#7bc498',
  background: 'white',
  textPrimary: '#8ad3ad',
  textSecondary: '#54a27c',
  error: '#FF5722',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#03A9F4',
};




export default function App() {
  
  
  const theme = {
  ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: customColors.primary,
      // accent: customColors.secondary,
      // background: customColors.background,
      // text: customColors.textPrimary,
      // error: customColors.error,
      // success: customColors.success,
      // warning: customColors.warning,
      // info: customColors.info,
      ...customColors,
    },
  }
  return (
    <PaperProvider theme={theme}>
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
