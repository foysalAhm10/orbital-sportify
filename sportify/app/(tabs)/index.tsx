import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Index() {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text className="text-3xl text-blue-500 font-semibold font-mono">WELCOME BACK, FOYSAL</Text>
      </View>
      <View style={styles.container} className="bg-[#081722E6]">
        <Pressable
          onPress={() => { alert("Locker Room Update") }}
        >
          <Text>Locker Room Update</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text className="text-3xl text-blue-500 font-semibold font-mono">Upcoming Events</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A2BFCA",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,

  },

})
