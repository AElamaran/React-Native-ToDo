import { Stack } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from '../src/redux/store';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        {/* Ensures the background color covers the status bar */}
        <SafeAreaView style={styles.safeArea}>
          {/* StatusBar ensures no extra gap appears */}
          <StatusBar backgroundColor="#FF9800" barStyle="light-content" />

          <Stack 
            screenOptions={{ 
              headerStyle: styles.header,
              headerTintColor: '#FFFFFF', // White text for contrast
              headerTitleAlign: 'center',
              headerTitle: () => <Text style={styles.headerTitle}>📋 MY TO-DO LIST</Text>, 
            }} 
          />
        </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FF9800', // Extends the green header to the top
  },
  header: {
    backgroundColor: '#FF9800', // Green header color
    elevation: 4, // Adds shadow for Android
    shadowOpacity: 0.2, // Soft shadow for iOS
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1, 
  }
});
