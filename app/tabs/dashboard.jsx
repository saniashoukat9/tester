import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/"); // login page
  };

  return (
    <View style={container}>

      {/* Header Section */}
      <View style={header}>
        <Text style={heading}>Good Afternoon,</Text>
        <Text style={email}>{auth.currentUser.email}</Text>
      </View>

      {/* Stats Card */}
      <View style={card}>
        <View style={cardRow}>
          <Text style={cardText}>Total Bookings</Text>
          <Text style={count}>{bookings.length}</Text>
        </View>
      </View>
      {/* Booking List Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Recent Bookings</Text>

        <TouchableOpacity onPress={() => router.push("/all-bookings")}>
          <Text style={{ color: "#000", fontWeight: "600" }}>See All ›</Text>
        </TouchableOpacity>
      </View>



      {/* Booking List */}
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={bookingCard}>
            <Text style={bookingCardText}>
              {item.pickup} → {item.dropoff}
            </Text>
            <Text style={bookingCardDate}>{item.date}</Text>
            <Text style={bookingCardStatus}>{item.status}</Text>
          </View>
        )}
      />

      {/* Bottom Buttons */}
      <View style={bottomActions}>
        <TouchableOpacity
          style={btn}
          onPress={() => router.push("/tabs/add-booking")}
        >
          <Text style={btnText}>+ Create New Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  backgroundColor: "#F5F5F5",
  paddingHorizontal: 20,
};

const header = {
  marginTop: 50,
  marginBottom: 15,
};

const heading = {
  fontSize: 32, // slightly bigger
  fontWeight: "bold",
};

const email = {
  color: "#555",
  fontSize: 18, // larger
};

const card = {
  backgroundColor: "#FFC107",
  padding: 25, // bigger padding
  borderRadius: 18, // larger radius
  marginBottom: 20, // more spacing
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 4,
};

const cardRow = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const cardText = {
  fontSize: 20, // bigger
  fontWeight: '600',
  color: '#000',
};

const count = {
  fontSize: 32, // bigger
  fontWeight: "bold",
};

const bookingCard = {
  backgroundColor: "#fff",
  padding: 20, // bigger
  borderRadius: 15,
  marginBottom: 15,
};

const bookingCardText = {
  fontSize: 18, // bigger
  fontWeight: "bold",
  marginBottom: 5,
};

const bookingCardDate = {
  fontSize: 16,
  color: "#555",
  marginBottom: 5,
};

const bookingCardStatus = {
  fontSize: 16,
  color: "#FFC107",
  fontWeight: "bold",
};

const bottomActions = {
  position: "absolute",
  bottom: 70,
  left: 20,
  right: 20,
};

const btn = {
  backgroundColor: "#000",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
};

const btnText = {
  color: "#fff",
  fontWeight: "bold",
};

const logoutText = {
  textAlign: "center",
  marginTop: 10,
  color: "#555",
};
const seeAllText = {
  color: "#000",
  fontWeight: "bold",
  fontSize: 16,
};
