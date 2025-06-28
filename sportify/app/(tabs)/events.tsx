import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import EventCard from '@/components/EventCard';
import EventCreationForm from '@/components/EventCreationForm'; // adjust path if needed


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

  const renderItem = ({ item }: any) => (
    <EventCard
      item={item}
      isVisible={selectedItemId === item.id && isModalVisible}
      onOpen={() => {
        setSelectedItemId(item.id);
        setIsModalVisible(true);
      }}
      onClose={() => setIsModalVisible(false)}
    />
  );

  return (
    <LinearGradient
      colors={["#A2BFCA", "#EEF2F3"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.topBarContainer}>
          <Text style={styles.eventsText}>Events</Text>
          <TouchableOpacity onPress={() => setShowForm(!showForm)} >
            <Ionicons name="add-circle-outline" size={32} color="#2685EB" />
          </TouchableOpacity>
        </View>

        {showForm && (
          <EventCreationForm
            isVisible={showForm}
            onClose={() => setShowForm(false)}
            onEventCreated={() => {
              // Optional: refresh the events list from Supabase if using dynamic data
              console.log('Event created!');
            }}
          />
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
    </LinearGradient >
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
})