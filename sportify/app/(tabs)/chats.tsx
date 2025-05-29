import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Chats = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.chatsContainer}>
        <Text style={styles.chatsText}>Chats</Text>
      </View>
    </SafeAreaView>
  )
}

export default Chats

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#A2BFCA",
    paddingHorizontal: 20,
  },
  chatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatsText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: "700",
  }
})