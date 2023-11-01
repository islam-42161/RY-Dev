import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
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

import { Client, Avatars } from "appwrite";

const client = new Client();

const avatars = new Avatars(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6538a2b56adb2f28e075"); // Your project ID

const result = avatars.getBrowser("aa");

console.log(result); // Resource URL

const { height, width } = Dimensions.get("screen");

const LoginEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
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
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"light-content"}
        />
        {/* { isKeyboardVisible ? null : ( */}

        <View style={styles.top}>
          <Image
            source={require("../../assets/icon.png")}
            contentFit="cover"
            style={[
              StyleSheet.absoluteFill,
              // {
              //   transform:[
              //     {translateY:15},
              //     {scale:0.8}
              //   ]
              // }
            ]}
            // blurRadius={50}
          />
        </View>
        {/* )} */}
        {/* bottom view */}
        <View style={[styles.bottom]}>
          {/* { isKeyboardVisible ? null : ( */}
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
            <Button
              mode="outlined"
              onPress={handleFacebookLogin}
              style={styles.button}
              icon="twitter"
            >
              Login with Twitter
            </Button>
          </View>
          {/* ) } */}
          {/* { isKeyboardVisible ? null : ( */}

          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text
              style={[
                styles.text,
                { backgroundColor: theme.colors.background },
              ]}
            >
              Or
            </Text>
          </View>
          {/* )} */}
          <View style={styles.logincreds}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              returnKeyType="next"
              // right={<TextInput.Icon icon="phone" />}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              mode="outlined"
              // right={<TextInput.Icon icon="lock" />}
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
          </View>

          <View style={styles.row}>
          <View>
              <Text
                variant="labelMedium"
                // style={{ alignSelf: "center"}}
              >
                Continue With
              </Text>
              <Text
                onPress={() => navigation.navigate("loginphone")}
                variant="labelMedium"
                style={{ color: theme.colors.primary, alignSelf: "flex-start" }}
              >
                Phone
              </Text>
            </View>

            <View>
              <Text
                variant="labelMedium"
                // style={{ alignSelf: "center"}}
              >
                Don't have an account?
              </Text>
              <Text
                onPress={() => navigation.navigate("register")}
                variant="labelMedium"
                style={{ color: theme.colors.primary, alignSelf: "flex-end" }}
              >
                Sign Up
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:height
  },
  top: {
    // height:height*0.4,
    // overflow:'hidden'
    flex: 0.4,
  },
  bottom: {
    // height: height*0.5,
    flex: 0.6,
    // flex: 1,
    gap: 10,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 40,
    justifyContent: "flex-start",
  },
  loginextra: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  rememberme: { gap: 5, flexDirection: "row", alignItems: "center" },
  dividerContainer: {
    // flex: 1,
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
  input: {
    marginBottom: 5,
  },
  text: {
    position: "absolute",
    // backgroundColor: "white", // Set background color as needed
    paddingHorizontal: 10,
    top: "50%", // Center the text vertically
    transform: [{ translateY: -10 }], // Adjust translateY to vertically center the text
    zIndex: 1, // Place text above the divider
  },
  forgotpass: {},
  loginextrasection: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
  },
});
