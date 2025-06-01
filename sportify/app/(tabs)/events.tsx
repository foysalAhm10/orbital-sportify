import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
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
  const [showForm, setShowForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [sportsType, setsportsType] = useState('');
  const [skillLevel, setskillLevel] = useState('');
  const [location, setLocation] = useState('');

  const handleAddEvent = () => {
    alert(`Event Created: ${title} on ${date} at ${location}`);
    setShowForm(false);
    setTitle(''); //to reset after closing (after adding event)
    setDate('');
    setLocation('');
  };

  const renderItem = ({ item }: any) => (
    <View>
      <Pressable
        style={styles.eventsCard}
        onPress={() => {
          setSelectedItemId(item.id);
          setIsModalVisible(true);
        }}
      >
        <View className="flex-1 justify-evenly">
          <Text style={styles.eventsCardTitle}>{item.title}</Text>
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
          <TouchableOpacity onPress={() => setShowForm(!showForm)}
            /*onPress={() => alert("You have pressed the Add Event Button!")}*/>
            <Ionicons name="add-circle-outline" size={32} color="#2685EB" />
          </TouchableOpacity>
        </View>

        {showForm && (
          <Modal style={styles.form}>
            <SafeAreaView style={styles.modalScreen}>
              <View className='flex-1 justify-center'>
                <TextInput
                  style={styles.input}
                  placeholder="Event Title"
                  placeholderTextColor="#141B41"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Date (e.g. 15-06-2025)"
                  placeholderTextColor="#141B41"
                  value={date}
                  onChangeText={setDate}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Sports Type (e.g. Football)"
                  placeholderTextColor="#141B41"
                  value={sportsType}
                  onChangeText={setsportsType}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Skill Level"
                  placeholderTextColor="#141B41"
                  value={skillLevel}
                  onChangeText={setskillLevel}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  placeholderTextColor="#141B41"
                  value={location}
                  onChangeText={setLocation}
                />
                <Pressable style={styles.addEventButton} onPress={handleAddEvent}>
                  <Text style={styles.addEventButtonText}>Add Event</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </Modal>
        )}
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
    backgroundColor: "#8EA4D2",
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
    height: 250,
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
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addEventButton: {
    backgroundColor: '#141B41',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addEventButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
})