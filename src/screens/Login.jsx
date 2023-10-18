import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Pressable,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Checkbox,
  Divider,
} from "react-native-paper";
import useKeyboardVisible from "../functions/useKeyboardVisible";

const Login = ({navigation}) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  const handleLogin = () => {
    // Implement your login logic here
  };
  const handleGoogleLogin = () => {
    // Implement your login logic here
  };
  const handleTwitterLogin = () => {
    // Implement your login logic here
  };
  const handleFacebookLogin = () => {
    // Implement your login logic here
  };
  const isKeyboardVisible = useKeyboardVisible()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
    <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'}/>
        <View style={styles.top}>
        <Image
          source={require("../../assets/icon.png")}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
          // blurRadius={50}
        />

        </View>

        {/* bottom view */}
        <View
          style={[styles.bottom, { backgroundColor: theme.colors.background }]}
        >
        { isKeyboardVisible ? null : (
          <View style={styles.loginextrasection}>
            <Button
              mode="outlined"
              onPress={handleGoogleLogin}
              style={styles.button}
              icon="google"
            >
              Login with Google
            </Button>
            <Button
              mode="outlined"
              onPress={handleFacebookLogin}
              style={styles.button}
              icon="facebook"
            >
              Login with Facebook
            </Button>
            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.text}>Or</Text>
            </View>
          </View>
        ) }

          <TextInput
            label="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            mode="outlined"
            returnKeyType="next"
            right={<TextInput.Icon icon="phone" />}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            mode="outlined"
            right={<TextInput.Icon icon="lock" />}
            style={styles.input}
            returnKeyType="go"
          />
          <View style={styles.loginextra}>
            <Pressable
              style={styles.rememberme}
              onPress={() => {
                setChecked(!checked);
              }}
            >
              <Checkbox status={checked ? "checked" : "unchecked"} />
              <Text variant="labelMedium">Remember Me</Text>
            </Pressable>
            <Text variant="labelMedium">Forgot Password?</Text>
          </View>
          <Button mode="contained" onPress={handleLogin} style={styles.input}>
            Log In
          </Button>
          <Text
            variant="labelMedium"
            style={{ alignSelf: "center", marginVertical: 10 }}
          >
            Don't have an account?{" "}
            <Text onPress={()=>navigation.navigate('register')} variant="labelMedium" style={{ color: theme.colors.primary }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.4,
  },
  bottom: {
    flex: 0.6,
    gap: 10,
    padding: 40,
    justifyContent: "space-evenly",
  },
  loginextra: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  rememberme: { gap: 5, flexDirection: "row", alignItems: "center" },
  dividerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  divider: {
    // height:StyleSheet.hairlineWidth,
    flex: 1,
    // backgroundColor:'lightgray'
  },
  input:{
    marginBottom:5
  },
  text: {
    position: "absolute",
    backgroundColor: "white", // Set background color as needed
    paddingHorizontal: 10,
    top: "50%", // Center the text vertically
    transform: [{ translateY: -10 }], // Adjust translateY to vertically center the text
    zIndex: 1, // Place text above the divider
  },
  forgotpass: {},
  loginextrasection:{
    gap:10
  }
});
