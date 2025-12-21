import { router } from "expo-router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function AllBookings() {
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

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>

      {/* ===== Image Header ===== */}
      <View style={headerContainer}>
        <Image
          source={require("../assets/images/coni.png")}
          style={headerImage}
        />
      </View>

      {/* ===== Title OUTSIDE image (PRO style) ===== */}
      <View style={titleWrapper}>
        <Text style={pageTitle}>My Bookings</Text>
        <View style={titleUnderline} />
      </View>

      {/* ===== Booking List ===== */}
      <View style={{ padding: 20 }}>
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
      </View>

      {/* Back Button */}
      <TouchableOpacity style={backBtn} onPress={() => router.back()}>
        <Text style={backBtnText}>← Back to Dashboard</Text>
      </TouchableOpacity>

    </View>
  );
}

/* ================= STYLES ================= */

const headerContainer = {
  height: 200,
};

const headerImage = {
  width: "100%",
  height: "100%",
};

const titleWrapper = {
  alignItems: "center",
  marginTop: 20,
  marginBottom: 25,
};

const pageTitle = {
  fontSize: 28,
  fontWeight: "800",
  color: "#151A2D",
  letterSpacing: 1,
};

const titleUnderline = {
  width: 60,
  height: 4,
  backgroundColor: "#FFC107",
  borderRadius: 10,
  marginTop: 6,
};

const bookingCard = {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 15,
  marginBottom: 15,
};

const bookingCardText = {
  fontSize: 18,
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

const backBtn = {
  position: "absolute",
  bottom: 30,
  left: 20,
  right: 20,
  backgroundColor: "#000",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
};

const backBtnText = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
};
