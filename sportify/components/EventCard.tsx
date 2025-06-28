import React from 'react';
import {
  View,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type EventCardProps = {
  item: any;
  isVisible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const EventCard = ({ item, isVisible, onOpen, onClose }: EventCardProps) => {
  return (
    <View>
      <Pressable
        style={styles.eventsCard}
        onPress={onOpen}
      >
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <Text style={styles.eventsCardTitle}>{item.title}</Text>
          <Text style={styles.eventsCardTitle}>{item.description}</Text>
        </View>
      </Pressable>

      {isVisible && (
        <Modal visible={true} animationType="slide">
          <SafeAreaView style={styles.modalScreen}>
            <View className="flex-1 justify-center items-center bg-cyan-950 my-1 mx-3">
              <View style={styles.modalContentContainer}>
                <Text style={styles.modalTitle}>{item.title}</Text>
                <Text style={styles.modalSubtitle}>{item.description}</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.modalCloseButtonText}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  eventsCard: {
    height: 250,
    padding: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#2685EB"
  },
  eventsCardTitle: {
    color: "#0B2233",
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: "600",
  },
  eventsCardSubtitle: {
    color: "#0B2233",
    fontFamily: 'Inter',
    fontSize: 16,
  },
  modalScreen: {
    flex: 1,
    backgroundColor: "#8EA4D2",
    paddingHorizontal: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
   modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
  },
  modalCloseButtonText: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Inter',
    padding: 8,
  },
});
