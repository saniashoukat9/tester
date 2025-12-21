import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  const pickImage = async () => {
    // Ask for permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUserData(prev => ({ ...prev, avatar: uri }));
      // Save avatar URL to Firestore (for demo, just local URI)
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { avatar: uri });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={userData.avatar ? { uri: userData.avatar } : require("../../assets/images/profile.png")}
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
              <Feather name="edit-2" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.name}>{userData.username}</Text>

        {/* Info Rows */}
        <View style={styles.row}>
          <Feather name="mail" size={18} color="#999" />
          <Text style={styles.rowText}>{userData.email}</Text>
        </View>

        <View style={styles.row}>
          <Feather name="phone" size={18} color="#999" />
          <Text style={styles.rowText}>+92 312 3456789</Text>
        </View>

        <View style={styles.row}>
          <Feather name="globe" size={18} color="#999" />
          <Text style={styles.rowText}>www.gfx.com</Text>
        </View>

        <View style={styles.row}>
          <Feather name="lock" size={18} color="#999" />
          <Text style={styles.rowText}>********</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 6,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#FFC107",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#222",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  rowText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#555",
  },

  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#FFC107",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
};
