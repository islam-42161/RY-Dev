import {
  Dimensions,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import {
  Button,
  Card,
  Divider,
  IconButton,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const Register = ({ navigation }) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"light-content"}
        />
        <View style={styles.top}>
          <Image
            source={require("../../../assets/icon.png")}
            contentFit="cover"
            style={[StyleSheet.absoluteFill]}
          />
        </View>
        <View style={styles.bottom}>
          <Card mode="contained">
            <Card.Content>
              <View style={styles.loginextrasection}>
                <IconButton
                  mode="outlined"
                  // onPress={handleGoogleLogin}
                  style={styles.button}
                  icon="google"
                />
                <IconButton
                  mode="outlined"
                  // onPress={handleFacebookLogin}
                  style={styles.button}
                  icon="facebook"
                />
                <IconButton
                  mode="outlined"
                  // onPress={handleFacebookLogin}
                  style={styles.button}
                  icon="twitter"
                />
              </View>
            </Card.Content>
          </Card>
  <View style={styles.progressBar}>
    <ProgressBar progress={0.25}/>
    
    <Text style={{position:'absolute',left:"20%",top:"-50%",backgroundColor:theme.colors.primary,color:theme.colors.onPrimary,elevation:1,height:20,width:20,borderRadius:10,fontSize:10,textAlign:'center',textAlignVertical:'center'}}>1</Text>
    <Text style={{position:'absolute',left:"45%",top:"-50%",backgroundColor:theme.colors.primary,color:theme.colors.onPrimary,elevation:1,height:20,width:20,borderRadius:10,fontSize:10,textAlign:'center',textAlignVertical:'center'}}>2</Text>
    <Text style={{position:'absolute',left:"70%",top:"-50%",backgroundColor:theme.colors.primary,color:theme.colors.onPrimary,elevation:1,height:20,width:20,borderRadius:10,fontSize:10,textAlign:'center',textAlignVertical:'center'}}>3</Text>
    <Text style={{position:'absolute',left:"95%",top:"-50%",backgroundColor:theme.colors.primary,color:theme.colors.onPrimary,elevation:1,height:20,width:20,borderRadius:10,fontSize:10,textAlign:'center',textAlignVertical:'center'}}>4</Text>
    
  </View>
          {/* scrollview */}
          <View>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 1: Account Information
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Email"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodyMedium]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                  <TextInput
                    placeholder="Repeat Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                </View>
              </View>
              <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 2: Personal Details
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Email"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodyMedium]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                  <TextInput
                    placeholder="Repeat Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                </View>
              </View>
              <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 1: Account Information
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Email"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodyMedium]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                  <TextInput
                    placeholder="Repeat Password"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodyMedium]}
                    returnKeyType="go"
                  />
                  <Divider />
                </View>
              </View>
            </Animated.ScrollView>
          </View>
          <Button mode="contained" disabled>
            Register
          </Button>
          <Text
            onPress={() => navigation.navigate("loginphone")}
            style={{ alignSelf: "center" }}
          >
            Already registered?{" "}
            <Text style={{ color: theme.colors.primary }}>Login</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    // height: height*0.4,
    flex: 0.4,
  },
  bottom: {
    padding: 40,
    flex: 0.6,
    gap: 16,
    // backgroundColor:'red'
  },
  loginextrasection: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input_block: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    backgroundColor: "white",
  },
  input: {
    padding: 16,
  },
  step: {
    // width:width,
    // paddingHorizontal:20,
    gap: 16,
    // backgroundColor:'red',
    width: width - 80,
  },
  progressBar:{
    // flexDirection:'row',
    paddingVertical:5
  }
});
