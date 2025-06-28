import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import toggleSinglePicker from '@/utilities/toggleSinglePicker';
import { supabase } from '@/lib/supabase';

type EventCreationFormProps = {
  isVisible: boolean;
  onClose: () => void;
  onEventCreated: () => void;
};

const EventCreationForm = ({ isVisible, onClose, onEventCreated }: EventCreationFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [datePicked, setDatePicked] = useState(false);
  const [sportsType, setSportsType] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSportsPicker, setShowSportsPicker] = useState(false);
  const [showSkillsPicker, setShowSkillsPicker] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // Detects when to close keyboard

  // the following are pickers for the respective pickers
  const toggleDatepicker = () => {
    toggleSinglePicker(setShowDatePicker, [setShowSportsPicker, setShowSkillsPicker]);
  };

  const toggleSportspicker = () => {
    toggleSinglePicker(setShowSportsPicker, [setShowDatePicker, setShowSkillsPicker]);
  };

  const toggleSkillspicker = () => {
    toggleSinglePicker(setShowSkillsPicker, [setShowDatePicker, setShowSportsPicker]);
  };

  const handleFieldFocus = () => {
    setShowDatePicker(false);
    setShowSportsPicker(false);
    setShowSkillsPicker(false);
  };

  const formatDate = (rawDate: string | number | Date) => {
    let date = new Date(rawDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let pDay = day < 10 ? `0${day}` : `${day}`;
    let pMonth = month < 10 ? `0${month}` : `${month}`;

    return `${pDay}-${pMonth}-${year}`;
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker();
        setDatePicked(true);
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setDatePicked(true);
    toggleDatepicker();
  };

  const clearForm = () => {
    setTitle('');
    setDate(new Date());
    setDatePicked(false);
    setSportsType('');
    setSkillLevel('');
    setLocation('');
    handleFieldFocus();
  };

  const handleCancelPress = () => {
    Alert.alert(
      'Cancel Event Creation?',
      'Are you sure you want to discard this event?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            onClose();
            clearForm();
          },
        },
      ],
      { cancelable: true }
    );
  };


  const handleSubmit = async () => {
    if (
      title.trim() !== '' &&
      sportsType.trim() !== '' &&
      skillLevel.trim() !== '' &&
      location.trim() !== '' &&
      datePicked
    ) {
      // ② insert into Supabase
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            Title: title,
            Date: date,                      // JS Date will be converted to SQL DATE
            "Sports Type": sportsType,
            "Skill Level": skillLevel,
            Location: location,
          }
        ]);

      if (error) {
        console.error('Error creating event:', error);
        Alert.alert('Error', 'Could not create event. Please try again.');
        return;
      }

      // on success, clear + notify + close
      clearForm();
      onEventCreated();
      onClose();
      Alert.alert('Success', `Event Created Successfully:\n${title} on ${formatDate(date)} at ${location}`);
    } else {
      Alert.alert('Incomplete Form', 'Please fill up all fields before submitting.');
    }
  };


  return (
    <Modal visible={isVisible} animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <SafeAreaView style={styles.modalScreen}>
          <View className="flex-1 justify-center">
            {!keyboardVisible && (
              <View style={styles.header}>
                <Text style={styles.headerText}>Create your very own event today!</Text>
              </View>
            )}

            <TextInput
              style={[styles.input, { color: '#141B41' }]}
              placeholder="Event Title"
              placeholderTextColor="#6B7280"
              value={title}
              onChangeText={setTitle}
              onFocus={handleFieldFocus}
            />

            <Pressable onPress={toggleDatepicker}>
              <TextInput
                style={styles.input}
                placeholder="Date (e.g. 15-06-2025)"
                placeholderTextColor="#6B7280"
                value={datePicked ? formatDate(date) : ''}
                editable={false}
                onPressIn={toggleDatepicker}
              />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                style={styles.datePicker}
                minimumDate={new Date()}
              />
            )}

            {showDatePicker && Platform.OS === 'ios' && (
              <View style={styles.dateButtonsContainer}>
                <TouchableOpacity
                  style={[styles.dateButton, { backgroundColor: '#999999' }]}
                  onPress={toggleDatepicker}
                >
                  <Text style={styles.dateButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.dateButton, { backgroundColor: '#141B41' }]}
                  onPress={confirmIOSDate}
                >
                  <Text style={styles.dateButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            <Pressable style={styles.fakeInput} onPress={toggleSportspicker}>
              <Text style={[styles.fakeInputText, { color: sportsType ? '#141B41' : '#6B7280' }]}>
                {sportsType || 'Sports Type (e.g. Football)'}
              </Text>
            </Pressable>

            {showSportsPicker && (
              <Picker
                selectedValue={sportsType}
                onValueChange={(itemValue) => {
                  setSportsType(itemValue);
                  toggleSportspicker();
                }}
                mode="dropdown"
                style={styles.picker}
              >
                <Picker.Item label="Select A Sport..." value="" />
                <Picker.Item label="Badminton" value="Badminton" />
                <Picker.Item label="Basketball" value="Basketball" />
                <Picker.Item label="Football" value="Football" />
                <Picker.Item label="Tennis" value="Tennis" />
              </Picker>
            )}

            <Pressable style={styles.fakeInput} onPress={toggleSkillspicker}>
              <Text style={[styles.fakeInputText, { color: skillLevel ? '#141B41' : '#6B7280' }]}>
                {skillLevel || 'Skills Level (e.g: Casual)'}
              </Text>
            </Pressable>

            {showSkillsPicker && (
              <Picker
                selectedValue={skillLevel}
                onValueChange={(itemValue) => {
                  setSkillLevel(itemValue);
                  toggleSkillspicker();
                }}
                mode="dropdown"
                style={styles.picker}
              >
                <Picker.Item label="Select Your Desired Level..." value="" />
                <Picker.Item label="Casual" value="Casual" />
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Advanced" value="Advanced" />
              </Picker>
            )}

            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#6B7280"
              value={location}
              onChangeText={setLocation}
              onFocus={handleFieldFocus}
            />

            <Pressable style={styles.eventButton} onPress={handleSubmit}>
              <Text style={styles.eventButtonText}>Add Event</Text>
            </Pressable>

            <Pressable
              style={[styles.eventButton, { backgroundColor: '#999999', marginTop: 10 }]}
              onPress={handleCancelPress}
            >
              <Text style={styles.eventButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EventCreationForm;


const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    backgroundColor: "#8EA4D2",
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '500',
    color: "0B2233",
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Inter'
  },
  fakeInput: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center', // vertical centering 
    marginBottom: 15,
  },
  fakeInputText: {
    fontSize: 16,
    textAlign: 'left', // horizontal left...couldn't do it together with above lol
    fontFamily: 'Inter'
  },
  eventButton: {
    backgroundColor: '#141B41',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  datePicker: {
    marginTop: -20,
    alignSelf: 'center',
  },
  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  dateButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: "500",
  },
  picker: {
    height: 100,
    width: '100%',
    // backgroundColor: 'black',
    justifyContent: 'center',
    overflow: 'scroll',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
})