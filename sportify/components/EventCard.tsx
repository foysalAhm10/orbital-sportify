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
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#083344' }}>
              <View style={{ height: 100, width: 200, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
                <Text>{item.title}</Text>
                <Text style={{ textAlign: 'center' }}>
                  Work in Progress.{'\n'}More coming soon!
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={{ color: 'white', backgroundColor: 'black', padding: 8 }}>
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
});
