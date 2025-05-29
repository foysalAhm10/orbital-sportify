import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Friends = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.friendsContainer}>
        <Text style={styles.friendsText}>Friends</Text>
      </View>
    </SafeAreaView>
  )
}

export default Friends

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#A2BFCA",
    paddingHorizontal: 20,
  },
  friendsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  friendsText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: "700",
  }
})