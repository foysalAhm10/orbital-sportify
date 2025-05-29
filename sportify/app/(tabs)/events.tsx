import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const eventsList = [
  {
    id: "1",
    title: "Football Fiesta",
    description: "Fast-paced games, good vibes, and plenty of goals. All skill levels welcome!",
    imageUrl: "",
    dateMonth: "MAY",
    dateDay: "21",
  },
  {
    id: "2",
    title: "Tennis with Antor",
    description: "Hit the court with Antor for some fun, friendly rallies. Racquets ready!",
    imageUrl: "",
    dateMonth: "JUN",
    dateDay: "18",
  },
  {
    id: "3",
    title: "Badminton with Besties",
    description: "Smash, rally, and laugh it out with your besties on the court!",
    imageUrl: "",
    dateMonth: "AUG",
    dateDay: "20",
  }
];

const Events = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const renderItem = ({ item }: any) => (
    <View>
      <Pressable
        style={styles.eventsCard}
        onPress={() => {
          setSelectedItemId(item.id);
          setIsModalVisible(true);
        }}
      >
        <View className="flex-1 bg-slate-600">
          <Text style={styles.eventsCardTitle}>{item.title}</Text>
        </View>
        <View className="flex-1">
          <Text style={styles.eventsCardTitle}>{item.description}</Text>
        </View>
      </Pressable>

      {isModalVisible && selectedItemId === item.id && (
        <Modal visible={true} animationType="slide">
          <SafeAreaView style={styles.modalScreen}>
            <View className="flex-1 justify-center items-center bg-cyan-950">
              <View style={styles.modalContentContainer}>
                <Text>{item.title}</Text>
                <Text style={{ textAlign: 'center' }}>
                  Work in Progress.{'\n'}More coming soon!
                </Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );


  return (
    <LinearGradient
      colors={["#A2BFCA", "#EEF2F3"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.topBarContainer}>
          <Text style={styles.eventsText}>Events</Text>
          <Pressable /*onPress={() => setShowForm(!showForm)}*/
            onPress={() => alert("You have pressed the Add Event Button!")}>
            <Ionicons name="add-circle-outline" size={32} color="#2685EB" />
          </Pressable>
        </View>
        <FlatList
          data={eventsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.flatListArea}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Events

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  modalScreen: {
    flex: 1,
    backgroundColor: "#1B2432",
    paddingHorizontal: 16,
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "0B2233",
    marginBottom: 15,
  },
  flatListArea: {
    // backgroundColor: "black",
    marginBottom: 65,
  },
  eventsText: {
    color: "0B2233",
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: "700",
  },
  eventsCard: {
    flex: 1,
    height: 250,
    // marginTop: 10,
    padding: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#2685EB"
  },
  eventsCardTitle: {
    color: "0B2233",
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: "600",
  },
  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 100,
    width: 200,
  },
  modalCloseButtonText: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Inter',
    padding: 8,
  }
})