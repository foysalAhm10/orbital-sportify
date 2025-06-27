import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Modal,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from '@/context/authContext';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';


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

const { width, height } = Dimensions.get("window");

const Index = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Failed to fetch username:", error.message);
        return;
      }

      setUsername(data.username);
    };

    fetchUsername();
  }, [user]);

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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={["#A2BFCA", "#EEF2F3"]}
      style={styles.gradientBackground}
    >
      <View style={styles.screen}>
        {/* Welcome Text */}
        <SafeAreaView style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            WELCOME BACK, {username?.toUpperCase() || "..."}
          </Text>
        </SafeAreaView>

        {/* Locker Room Update Button */}
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="#6498BF"
          style={styles.lockerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.lockerButtonText}>
            Locker Room Update
          </Text>
        </TouchableHighlight>

        {/* Modal with Blur Background */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Updates</Text>
              <Text style={styles.modalContent}>
                • You have 2 new invites!{"\n"}
                • New football session added on July 18.
              </Text>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="#6498BF"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </BlurView>
        </Modal>


        {/* Upcoming Events Label */}
        <SafeAreaView style={styles.upcomingEventsLabel}>
          <Text style={styles.upcomingEventsText}>Upcoming Events</Text>
        </SafeAreaView>

        {/* Horizontal Event Slider */}
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
        />
      </View>
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
    paddingBottom: 25,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
  },
  welcomeText: {
    color: "#F4F4F4",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Montserrat",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  lockerButton: {
    backgroundColor: "rgba(8, 23, 34, 0.9)",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    bottom: 200,
  },
  lockerButtonText: {
    color: "#F4F4F4",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Inter",
    letterSpacing: 0.5,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#F4F4F4",
    width: width * 0.8,
    borderRadius: 20,
    padding: 24,
    marginBottom: 260
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter",
    color: "#0B2233",
    marginBottom: 12,
  },
  modalContent: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Inter",
    color: "#0B2233",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#0B2233",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#F4F4F4",
    fontSize: 16,
    fontFamily: "Inter",
    textAlign: "center"
  },
  upcomingEventsLabel: {
    justifyContent: "center",
    top: 20,
  },
  upcomingEventsText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0B2233",
    fontFamily: "Inter",
    letterSpacing: 0.41,
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
    // marginTop: "20%",
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 75,
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
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Inter",
    letterSpacing: -0.41,
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
