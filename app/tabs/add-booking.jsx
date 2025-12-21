import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";

export default function AddBooking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(null); // initially null
  const [showDate, setShowDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!pickup || !dropoff || !date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        pickup,
        dropoff,
        date: date.toISOString().split("T")[0],
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      router.back();
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Booking</Text>

        {/* Pickup */}
        <Text style={styles.label}>Pick-up Location</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pickup}
            onValueChange={(val) => setPickup(val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Pick-up Location" value="" />
            <Picker.Item label="Airport" value="Airport" />
            <Picker.Item label="Hotel" value="Hotel" />
            <Picker.Item label="Station" value="Station" />
          </Picker>
        </View>

        {/* Dropoff */}
        <Text style={styles.label}>Drop-off Location</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={dropoff}
            onValueChange={(val) => setDropoff(val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Drop-off Location" value="" />
            <Picker.Item label="Airport" value="Airport" />
            <Picker.Item label="Hotel" value="Hotel" />
            <Picker.Item label="Station" value="Station" />
          </Picker>
        </View>

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDate(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="calendar" size={22} color="#777" style={{ marginRight: 10 }} />
            <Text style={[styles.dateText, !date && { color: "#999" }]}>
              {date ? date.toISOString().split("T")[0] : "Select Date"}
            </Text>
          </View>
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="calendar"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.btn} onPress={submit} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.btnText}>Submit Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "#f9f9f9",
    paddingInline: 25,
    paddingBlock: 35,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    paddingVertical: Platform.OS === "ios" ? 5 : 0,
  },
  picker: {
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 30,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  btn: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
});

