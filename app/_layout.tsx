import { Stack } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from '../src/redux/store';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
       
        <SafeAreaView style={styles.safeArea}>
        
          <StatusBar backgroundColor="#FF9800" barStyle="light-content" />

          <Stack 
            screenOptions={{ 
              headerStyle: styles.header,
              headerTintColor: '#FFFFFF', 
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
    backgroundColor: '#FF9800', 
  },
  header: {
    backgroundColor: '#FF9800', 
    elevation: 4, 
    shadowOpacity: 0.2, 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1, 
  }
});
