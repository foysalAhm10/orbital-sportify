import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#A2BFCA",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: "700",
  }
})