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
  Alert,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  Checkbox,
  Divider,
  Card,
} from "react-native-paper";
import useKeyboardVisible from "../functions/useKeyboardVisible";
import { signInWithGoogle } from "../../firebase/firebaseConfig";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from '@react-native-firebase/auth';


const { height, width } = Dimensions.get("screen");

const LoginPhone = ({ navigation }) => {

  const [phone, setPhone] = useState("");
  const theme = useTheme();
  const handleLogin = () => {
    // Implement your login logic here
  };


  const handleGoogleLogin = () => {
    // signInWithGoogle().then((e)=>{
    //   navigation.navigate('home',{
    //     name:e.displayName
    //   })
    // })
    signInWithGoogle().then((e)=>{
      console.log('logged in')
    })
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
          <TextInput
            label="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            mode="outlined"
            returnKeyType="next"
            // right={<TextInput.Icon icon="phone" />}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Button icon={"arrow-right"} mode="contained" onPress={handleLogin}>
            Continue
          </Button>

          <Text onPress={() => navigation.navigate("loginemail")}
          variant="labelMedium" style={{ alignSelf: "center" }}>
            Sign in using{" "}
            <Text
              
              variant="labelMedium"
              style={{ color: theme.colors.primary, alignSelf: "flex-start" }}
            >
              email address
            </Text>
          </Text>
          {/* <Button onPress={() => navigation.navigate("loginemail")} mode="text">Sign in with email address</Button> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:height
  },
  top: {
    flexGrow: 1,
  },
  bottom: {
    gap: 20,
    padding: 40,
    justifyContent: "center",
  },
  rememberme: { gap: 5, flexDirection: "row", alignItems: "center" },
  dividerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  divider: {
    // height:StyleSheet.hairlineWidth,
    flex: 1,
    // backgroundColor:'lightgray'
  },
  input: {},
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
