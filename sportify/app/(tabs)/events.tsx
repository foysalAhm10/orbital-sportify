import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from '@/lib/supabase';
import EventCard from '@/components/EventCard';
import EventCreationForm from '@/components/EventCreationForm';

const Events = () => {
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    if (error) {
      console.error('Error fetching events:', error);
    } else if (data) {
      
      const formatted = data.map(ev => ({
        id: ev.id.toString(),
        title: ev.Title,
        description: `${ev['Skill Level']} ${ev['Sports Type']} match at ${ev.Location}!`,
      }));
      setEventsList(formatted);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


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
              fetchEvents();  
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