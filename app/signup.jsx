import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false); // loader state

  const signup = async () => {
    if (!username || !email || !password || !phone || !country) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true); // start loader
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        phone,
        country,
      });

      router.replace("/tabs/dashboard");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <View style={container}>

      {/* Welcome Text */}
      <Text style={title}>Signup</Text>
      <Text style={subTitle}>Create your account</Text>

      {/* Login / Signup Tabs */}
      <View style={tabContainer}>
        <TouchableOpacity style={tab} onPress={() => router.replace("/")}>
          <Text style={tabText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={activeTab}>
          <Text style={activeTabText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <TextInput
        placeholder="Username"
        style={input}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Email Address"
        style={input}
        onChangeText={setEmail}
      />

      {/* Password field with show/hide */}
      <View style={passwordBox}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={{ flex: 1 }}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Phone Number"
        style={input}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={12}
      />

      <Text style={{ marginBottom: 5, fontWeight: "500" }}>Country</Text>
      <View style={pickerWrapper}>
        <Picker
          selectedValue={country}
          onValueChange={(value) => setCountry(value)}
        >
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="Pakistan" value="Pakistan" />
          <Picker.Item label="United States" value="USA" />
          <Picker.Item label="United Kingdom" value="UK" />
          <Picker.Item label="India" value="India" />
        </Picker>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={btn} onPress={signup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={btnText}>Sign Up</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

/* ================= STYLES ================= */

const container = {
  flex: 1,
  backgroundColor: "#fff",
  padding: 20,
  justifyContent: "center",
};

const title = {
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center",
  paddingBottom: 10,
};

const subTitle = {
  color: "#777",
  textAlign: "center",
  marginBottom: 25,
};

const tabContainer = {
  flexDirection: "row",
  backgroundColor: "#F2F2F2",
  borderRadius: 12,
  marginBottom: 20,
};

const activeTab = {
  flex: 1,
  backgroundColor: "#151A2D",
  padding: 12,
  borderRadius: 12,
  alignItems: "center",
};

const tab = {
  flex: 1,
  padding: 12,
  alignItems: "center",
};

const activeTabText = {
  fontWeight: "bold",
  color: "white",
};

const tabText = {
  color: "#555",
};

const input = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  padding: 14,
  marginBottom: 12,
};

const passwordBox = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginBottom: 12,
};

const pickerWrapper = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  marginBottom: 15,
  overflow: "hidden",
};

const btn = {
  backgroundColor: "#FFC107",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 5,
};

const btnText = {
  fontWeight: "bold",
  color: "#000",
  fontSize: 16,
};
