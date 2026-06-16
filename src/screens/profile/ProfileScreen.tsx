import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../theme/colors';
import {useAuthStore} from '../../store/useAuthStore';

export const ProfileScreen = () => {
  const {user, signOut} = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.username}>
          {user?.user_metadata?.username || 'User'}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  header: {alignItems: 'center', padding: 30},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    marginBottom: 15,
  },
  username: {fontSize: 24, fontWeight: 'bold', color: colors.text},
  email: {fontSize: 14, color: colors.textSecondary, marginTop: 5},
  actions: {padding: 20},
  button: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {color: colors.error, fontWeight: 'bold', fontSize: 16},
});
