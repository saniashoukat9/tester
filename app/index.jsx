import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // loader state

  const login = async () => {
    setLoading(true); // start loader
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/tabs/dashboard");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <View style={container}>

      {/* Heading */}
      <Text style={title}>Welcome Back</Text>

      {/* Tabs */}
      <View style={tabContainer}>
        <TouchableOpacity style={activeTab}>
          <Text style={activeTabText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tab} onPress={() => router.push("/signup")}>
          <Text style={tabText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <TextInput
        placeholder="Email Address"
        style={input}
        onChangeText={setEmail}
      />

      {/* Password with Eye Icon */}
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

      {/* Login Button */}
      <TouchableOpacity style={btn} onPress={login} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={btnText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* OR */}
      <Text style={orText}>OR</Text>

      {/* Social Buttons */}
      <View style={socialRow}>
        <TouchableOpacity style={socialBtnHalf}>
          <AntDesign name="google" size={20} color="#000" />
          <Text style={socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={socialBtnHalf}>
          <AntDesign name="apple" size={22} color="#000" />
          <Text style={socialText}>Apple</Text>
        </TouchableOpacity>
      </View>

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
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
  paddingBottom: 10,
};

const subTitle = {
  color: "#777",
  marginBottom: 25,
  textAlign: "center",
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

const btn = {
  backgroundColor: "#FFC107",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
};

const btnText = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
};

const orText = {
  textAlign: "center",
  marginVertical: 15,
  color: "#777",
};

const socialRow = {
  flexDirection: "row",
  justifyContent: "space-between",
};

const socialBtnHalf = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 14,
  borderRadius: 12,
  marginHorizontal: 5,
};

const socialText = {
  marginLeft: 8,
  fontWeight: "500",
};


