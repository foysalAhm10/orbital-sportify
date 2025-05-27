import React from "react";
import { Text, View, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const events = [
  {
    id: "1",
    title: "Football \nFiesta",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/376x376", // 1:1 ratio
    dateMonth: "MAY",
    dateDay: "21",
  },
  {
    id: "2",
    title: "Tennis \nwith Antor",
    description: "",
    imageUrl: "https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/376x376", // 1:1 ratio
    dateMonth: "JUN",
    dateDay: "18",
  },
];

const Index = () => {
  const renderItem = ({ item }: any) => (
    <Pressable
    onPress={() => alert(`You tapped on ${item.title}`)}
    style={styles.card}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.image} />
    <View style={styles.overlay}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
    <View style={styles.dateCircle}>
      <View style={styles.dateTextContainer}>
        <Text style={styles.dateMonth}>{item.dateMonth}</Text>
        <Text style={styles.dateDay}>{item.dateDay}</Text>
      </View>
    </View>
  </Pressable>
  );

  return (
    <LinearGradient
      colors={["#A2BFCA", "#EEF2F3"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.screen}>
        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>WELCOME BACK, FOYSAL</Text>
        </View>

        {/* Locker Room Update Button */}
        <Pressable
          style={styles.lockerButton}
          onPress={() => { alert("Locker Room Update Pressed"); }}
        >
          <Text style={[styles.lockerButtonText, { letterSpacing: 0.5 }]}>Locker Room Update</Text>
        </Pressable>

        {/* Upcoming Events Label */}
        <View style={styles.upcomingEventsLabel}>
          <Text style={styles.upcomingEventsText}>Upcoming Events</Text>
        </View>

        {/* Horizontal Event Slider */}
        <FlatList
          className="mt-safe-offset-52"
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Index

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "transparent",
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  welcomeText: {
    color: "#F4F4F4",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Montserrat",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  lockerButton: {
    backgroundColor: "rgba(8, 23, 34, 0.9)",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  lockerButtonText: {
    color: "#F4F4F4",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  upcomingEventsLabel: {
    justifyContent: "center",
    // marginBottom: "6%",
    top: 240,
  },
  upcomingEventsText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#081722",
    fontFamily: "Inter",
  },
  flatList: {
    flexGrow: 0,
  },
  flatListContent: {
    paddingRight: 16,
  },
  card: {
    width: 250,
    height: 250,
    marginTop: "2%",
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#F4F4F4",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter",
  },
  dateCircle: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  dateTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dateMonth: {
    fontSize: 10,
    color: "rgba(0,0,0,0.5)",
    fontWeight: "400",
    fontFamily: "Inter",
    letterSpacing: 1,
  },
  dateDay: {
    fontSize: 22,
    color: "#000",
    fontWeight: "700",
    fontFamily: "Inter",
  },
});
