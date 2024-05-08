import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  Modal,
  Portal,
  ProgressBar,
  RadioButton,
  Snackbar,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { Image } from "expo-image";

import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import StepOne from './StepOne'
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";




const { height, width } = Dimensions.get("window");
const SCROLL_WIDTH = width - 80;
const progerssSnapPoints = [0.25,0.5,0.75,1]



const Register = ({ navigation }) => {
  const theme = useTheme();
  
  
  
  const [terms, setTerms] = useState(false);



  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setShowDate(false);
  //   setDate(currentDate);
  // };

  // const showDatepicker = () => {
  //   setShowDate(true);
  // };

  // // gender picker
  // const [genderModalVisible, setGenderModalVisible] = React.useState(false);

  const showModal = () => setGenderModalVisible(true);
  const hideModal = () => setGenderModalVisible(false);

  const [registerDisabled, setRegisterDisabled] = useState(true);

  ////// reanimated //////

  const progressVal = useSharedValue(0.25);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      progressVal.value = interpolate(
        event.contentOffset.x,
        [0 * SCROLL_WIDTH, 3 * SCROLL_WIDTH],
        [0.25, 1],
        Extrapolate.CLAMP
      );
    },
  });
  const progressbarStyle = useAnimatedStyle(() => ({
    width: SCROLL_WIDTH * progressVal.value,
    height: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 2.5,
  }));

  const [complete, setComplete] = useState(false);


  // registration error
  const [error,setError] = useState({status:false,message:'ok'})
  const onDismissSnackBar = () => setError({status:false,message:'ok'});





  // values: step one
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [r_password, setRPassword] = useState("");

  // step 2
  const [f_name,setFname] = useState('')
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState(null);

  // step 3
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const setCountryData = useCallback((text) => setCountry(text), [setCountry]);
  const setCityData = useCallback((text) => setCity(text), [setCity]);


  // step 4
  const [adl1,setadl1] = useState('')
  const [adl2,setadl2] = useState('')
  

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
            {/* <ProgressBar progress={0.25} /> */}
            <View
              style={{
                width: SCROLL_WIDTH,
                height: 5,
                borderRadius: 2.5,
                overflow: "hidden",
                backgroundColor: theme.colors.surfaceVariant,
              }}
            >
              <Animated.View style={progressbarStyle} />
            </View>

            <Animated.Text
              style={{
                position: "absolute",
                left: "20%",
                top: "-50%",
                backgroundColor: theme.colors.primary,
                color: theme.colors.onPrimary,
                elevation: 1,
                height: 20,
                width: 20,
                borderRadius: 10,
                fontSize: 10,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              1
            </Animated.Text>
            <Animated.Text
              style={{
                position: "absolute",
                left: "45%",
                top: "-50%",
                backgroundColor: theme.colors.primary,
                color: theme.colors.onPrimary,
                elevation: 1,
                height: 20,
                width: 20,
                borderRadius: 10,
                fontSize: 10,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              2
            </Animated.Text>
            <Animated.Text
              style={{
                position: "absolute",
                left: "70%",
                top: "-50%",
                backgroundColor: theme.colors.primary,
                color: theme.colors.onPrimary,
                elevation: 1,
                height: 20,
                width: 20,
                borderRadius: 10,
                fontSize: 10,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              3
            </Animated.Text>
            <Animated.Text
              style={{
                position: "absolute",
                left: "95%",
                top: "-50%",
                backgroundColor: theme.colors.primary,
                color: theme.colors.onPrimary,
                elevation: 1,
                height: 20,
                width: 20,
                borderRadius: 10,
                fontSize: 10,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              4
            </Animated.Text>
          </View>
          {/* scrollview */}
          <View>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
            >
            {/* step 1 */}
              {/* <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 1: Account Information
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodySmall]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                  />
                  <Divider />
                  <TextInput
                    placeholder="Repeat Password"
                    value={r_password}
                    onChangeText={(text) => setRPassword(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                    onEndEditing={() =>
                      validateRegistration(email, password, r_password)
                    }
                  />
                </View>
              </View> */}
              <StepOne email={email} setEmail={setEmail} password={password} setPassword={setPassword} r_password={r_password} setRPassword={setRPassword} setError={setError}/>

              {/* step 2 */}
              {/* <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 2: Personal Details
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Full Name"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="default"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodySmall]}
                  />
                  <Divider />
                  <Pressable
                    onPress={showDatepicker}
                    style={[styles.row, styles.input]}
                  >
                    <Text style={theme.fonts.bodySmall}>Date of Birth</Text>
                    <Text style={theme.fonts.bodySmall}>
                      {date.getDate()}-{months[date.getMonth()]}-
                      {date.getFullYear()}
                    </Text>
                    {showdate && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        onChange={onChange}
                      />
                    )}
                  </Pressable>
                  <Divider />
                  <Pressable
                    onPress={showModal}
                    style={[styles.row, styles.input]}
                  >
                    <Text style={theme.fonts.bodySmall}>Gender</Text>
                    <Text style={theme.fonts.bodySmall}>{gender}</Text>
                    <Portal>
                      <Modal
                        visible={genderModalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={styles.genderPicker}
                      >
                        <Text
                          style={[theme.fonts.titleMedium, { padding: 16 }]}
                        >
                          Gender
                        </Text>
                        <Divider />
                        <Pressable
                          onPress={() => setGender("Male")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Male"
                            status={gender === "Male" ? "checked" : "unchecked"}
                          />
                          <Text style={theme.fonts.bodyMedium}>Male</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Female")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Female"
                            status={
                              gender === "Female" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Female</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Other")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Other"
                            status={
                              gender === "Other" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Other</Text>
                        </Pressable>
                      </Modal>
                    </Portal>
                  </Pressable>
                </View>
              </View> */}
              <StepTwo date={date} setDate={setDate} f_name={f_name} setFname={setFname} gender={gender} setGender={setGender}/>

              {/* step 3 */}
              {/* <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>Step 3: Location</Text>
                <View style={styles.input_block}>
                <Pressable
                    onPress={showModal}
                    style={[styles.row, styles.input]}
                  >
                    <Text style={theme.fonts.bodySmall}>Country</Text>
                    <Text style={theme.fonts.bodySmall}>{gender}</Text>
                    <Portal>
                      <Modal
                        visible={genderModalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={styles.genderPicker}
                      >
                        <Text
                          style={[theme.fonts.titleMedium, { padding: 16 }]}
                        >
                          Gender
                        </Text>
                        <Divider />
                        <Pressable
                          onPress={() => setGender("Male")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Male"
                            status={gender === "Male" ? "checked" : "unchecked"}
                          />
                          <Text style={theme.fonts.bodyMedium}>Male</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Female")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Female"
                            status={
                              gender === "Female" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Female</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Other")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Other"
                            status={
                              gender === "Other" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Other</Text>
                        </Pressable>
                      </Modal>
                    </Portal>
                  </Pressable>
                  <Divider/>
                  <Pressable
                    onPress={showModal}
                    style={[styles.row, styles.input]}
                  >
                    <Text style={theme.fonts.bodySmall}>State/City</Text>
                    <Text style={theme.fonts.bodySmall}>{gender}</Text>
                    <Portal>
                      <Modal
                        visible={genderModalVisible}
                        onDismiss={hideModal}
                        contentContainerStyle={styles.genderPicker}
                      >
                        <Text
                          style={[theme.fonts.titleMedium, { padding: 16 }]}
                        >
                          Gender
                        </Text>
                        <Divider />
                        <Pressable
                          onPress={() => setGender("Male")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Male"
                            status={gender === "Male" ? "checked" : "unchecked"}
                          />
                          <Text style={theme.fonts.bodyMedium}>Male</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Female")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Female"
                            status={
                              gender === "Female" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Female</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setGender("Other")}
                          style={[
                            styles.row,
                            { padding: 8, justifyContent: "flex-start" },
                          ]}
                        >
                          <RadioButton
                            value="Other"
                            status={
                              gender === "Other" ? "checked" : "unchecked"
                            }
                          />
                          <Text style={theme.fonts.bodyMedium}>Other</Text>
                        </Pressable>
                      </Modal>
                    </Portal>
                  </Pressable>
                </View>
              </View> */}
              <StepThree country={country} city={city} setCityData={setCityData} setCountryData={setCountryData}/>

              {/* step 4 */}
              {/* <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>Step 4: Address</Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Address Line 1"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    // keyboardType="default"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodySmall]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Address Line 2 (Optional)"
                    // value={email}
                    // onChangeText={(text) => setEmail(text)}
                    // keyboardType={null}

                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                  />
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Checkbox
                    status={terms ? "checked" : "unchecked"}
                    onPress={() => {
                      setTerms(!terms);
                    }}
                  />
                  <Text style={theme.fonts.labelMedium}>
                    Agree to{" "}
                    <Text style={{ color: theme.colors.primary }}>
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
              </View> */}
              <StepFour adl1={adl1} adl2={adl2} setadl1={setadl1} setadl2={setadl2} terms={terms} setTerms={setTerms}/>

            </Animated.ScrollView>
          </View>


          <Button mode="contained" onPress={()=>{
            
          }} disabled={!terms}>
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
        {/* <Snackbar
        visible={error.status}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
          },
        }}>
        {error.message}
      </Snackbar> */}
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
    width: SCROLL_WIDTH,
  },
  progressBar: {
    // flexDirection:'row',
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    // borderWidth:1,
    // borderRadius:5,
    // paddingHorizontal:15,
    // paddingVertical:5
  },
  genderPicker: {
    backgroundColor: "white",
    margin: 16,
    // padding: 16,
    overflow: "hidden",
    borderRadius: 16,
  },
});
