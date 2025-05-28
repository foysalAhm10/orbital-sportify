import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

const Events = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topBarContainer}>
        <Text style={styles.eventsText}>Events</Text>
        <Pressable /*onPress={() => setShowForm(!showForm)}*/
          onPress={() => alert("You have pressed the Add Event Button!")}>
          <Ionicons name="add-circle-outline" size={32} color="#2563EB" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default Events

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#A2BFCA",
    paddingHorizontal: 20,
  },
  topBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  eventsText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: "700",
  }
})