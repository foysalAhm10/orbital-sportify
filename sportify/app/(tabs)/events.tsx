import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  Alert,
  KeyboardAvoidingView
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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
  const [date, setDate] = useState(new Date());
  const [datePicked, setDatePicked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sportsType, setsportsType] = useState('');
  const [showSportsPicker, setShowSportsPicker] = useState(false);
  const [skillLevel, setskillLevel] = useState('');
  const [showSkillsPicker, setShowSkillsPicker] = useState(false);
  const [location, setLocation] = useState('');
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
  }, []);


  const toggleDatepicker = () => {
    setShowDatePicker(!showDatePicker);
    if (showSportsPicker) setShowSportsPicker(false);
    if (showSkillsPicker) setShowSkillsPicker(false);
    setShowDatePicker((prev) => !prev);
    Keyboard.dismiss();

    setTimeout(() => {
      setShowDatePicker((prev) => !prev);
    }, 50);
  };

  const toggleSportspicker = () => {
    setShowSportsPicker(!showSportsPicker);
    if (showDatePicker) setShowDatePicker(false);
    if (showSkillsPicker) setShowSkillsPicker(false);
    setShowSportsPicker((prev) => !prev);
    Keyboard.dismiss();

    setTimeout(() => {
      setShowSportsPicker((prev) => !prev);
    }, 50);
  };

  const toggleSkillspicker = () => {
    setShowSkillsPicker(!showSkillsPicker);
    if (showDatePicker) setShowDatePicker(false);
    if (showSportsPicker) setShowSportsPicker(false);
    setShowSkillsPicker((prev) => !prev);
    Keyboard.dismiss();

    setTimeout(() => {
      setShowSkillsPicker((prev) => !prev);
    }, 50);
  };

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate); // not sure if needed, will check if there are edge cases.

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDate(currentDate.toDateString())
        setDatePicked(true);
      }
    } else {
      toggleDatepicker();
    }
  }

  const confirmIOSDate = () => {
    setDate(date);
    setDatePicked(true);
    toggleDatepicker();
  }

  const formatDate = (rawDate: string | number | Date) => {
    let date = new Date(rawDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let pDay = day < 10 ? `0${day}` : `${day}`;
    let pMonth = month < 10 ? `0${month}` : `${month}`;

    return `${pDay}-${pMonth}-${year}`;
  }

  const handleFieldFocus = () => {
    if (showDatePicker) setShowDatePicker(false);
    if (showSportsPicker) setShowSportsPicker(false);
    if (showSkillsPicker) setShowSkillsPicker(false);
  };

  const handleAddEvent = () => {
    if (
      title.trim() !== '' &&
      sportsType.trim() !== '' &&
      skillLevel.trim() !== '' &&
      location.trim() !== '' &&
      datePicked
    ) {
      setShowForm(false);
      clearForm();
      alert(`Event Created Successfully: \n ${title} on ${formatDate(date)} at ${location}`);
    } else {
      alert('Event Creation Unsuccesful. \n Please fill up all inputs.')
    }
  };

  const handleCancelPress = () => {
    Alert.alert(
      'Cancel Event Creation?',
      'Are you sure you want to discard this event?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            setShowForm(false);
            clearForm();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const clearForm = () => {
    setTitle(''); // to reset after closing (after adding event)
    setDate(new Date());
    setDatePicked(false);
    setsportsType('');
    setskillLevel('');
    setLocation('');
    handleFieldFocus();
  }

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
          <TouchableOpacity onPress={() => setShowForm(!showForm)} >
            <Ionicons name="add-circle-outline" size={32} color="#2685EB" />
          </TouchableOpacity>
        </View>

        {showForm && (
          <Modal visible={showForm} animationType="slide">
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.modalScreen}>
                  <View className='flex-1 justify-center'>
                    {!keyboardVisible && (
                      <View style={styles.header}>
                        <Text style={styles.headerText}>
                          Create your very own event today!
                        </Text>
                      </View>
                    )}

                    {/* ----------------------------------------------------------------------------------------------------------------------------- Event Title */}
                    <TextInput
                      style={[styles.input, { color: '#141B41' }]}
                      placeholder="Event Title"
                      placeholderTextColor="#6B7280"
                      value={title}
                      onChangeText={setTitle}
                      onFocus={handleFieldFocus}
                    />

                    {/* ----------------------------------------------------------------------------------------------------------------------------- Date Picker */}
                    <Pressable onPress={toggleDatepicker}>
                      <TextInput
                        style={styles.input}
                        placeholder="Date (e.g. 15-06-2025)"
                        placeholderTextColor="#6B7280"
                        value={date !== undefined && date !== null && datePicked ? formatDate(date) : ''}
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

                    {showDatePicker && Platform.OS === "ios" && (
                      <View style={styles.dateButtonsContainer}>
                        <TouchableOpacity
                          style={[styles.dateButton, { backgroundColor: '#999999' }]}
                          onPress={() => {
                            toggleDatepicker();
                          }}
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

                    {/* ----------------------------------------------------------------------------------------------------------------------------- Sports Type */}
                    <Pressable style={styles.fakeInput} onPress={toggleSportspicker}>
                      <Text style={[
                        styles.fakeInputText,
                        { color: sportsType ? '#141B41' : '#6B7280' }
                      ]}>
                        {sportsType || 'Sports Type (e.g. Football)'}
                      </Text>
                    </Pressable>

                    {showSportsPicker && (
                      <Picker
                        selectedValue={sportsType}
                        onValueChange={(itemValue) => {
                          setsportsType(itemValue);
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

                    {/* ----------------------------------------------------------------------------------------------------------------------------- Skill Level */}
                    <Pressable style={styles.fakeInput} onPress={toggleSkillspicker}>
                      <Text style={[
                        styles.fakeInputText,
                        { color: skillLevel ? '#141B41' : '#6B7280' }
                      ]}>
                        {skillLevel || 'Skills Level (e.g: Casual)'}
                      </Text>
                    </Pressable>

                    {showSkillsPicker && (
                      <Picker
                        selectedValue={skillLevel}
                        onValueChange={(itemValue) => {
                          setskillLevel(itemValue);
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

                    {/* ----------------------------------------------------------------------------------------------------------------------------- Location */}
                    <TextInput
                      style={styles.input}
                      placeholder="Location"
                      placeholderTextColor="#6B7280"
                      value={location}
                      onChangeText={setLocation}
                      onFocus={handleFieldFocus}
                    />

                    <Pressable style={styles.eventButton} onPress={handleAddEvent}>
                      <Text style={styles.addEventButtonText}>Add Event</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.eventButton, { backgroundColor: '#999999', marginTop: 10 }]}
                      onPress={handleCancelPress}
                    >
                      <Text style={styles.addEventButtonText}>Cancel</Text>
                    </Pressable>
                  </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
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
  addEventButtonText: {
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
  pickerContainer: {
    // marginTop: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    overflow: 'hidden',
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