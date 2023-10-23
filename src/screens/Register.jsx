import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  TextInput,
  useTheme,
  Title,
  HelperText,
  Menu,
  Text,
  Card,
  Divider,
  List,
  Button,
  Surface,
  RadioButton,
  IconButton,
  FAB,
  AnimatedFAB,
  MD3Colors,
} from "react-native-paper";
import useKeyboardVisible from "../functions/useKeyboardVisible";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";
const local_data = [
  {
    value: "Bangladesh",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
    },
  },
  {
    value: "Bangladesh",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
    },
  },
  {
    value: "Bangladesh",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
    },
  },
  {
    value: "Bangladesh",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
    },
  },
  {
    value: "Bangladesh",
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
    },
  },
];
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const Register = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [f_name, setFName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassoword] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [selectedGender, setSelectedGender] = useState(""); // State for selected gender
  const [menuVisible, setMenuVisible] = useState(false); // State to control the menu visibility

  const [date, setDate] = useState(new Date(null));
  const [show, setShow] = useState(false);

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const [fabExtended, setFabExtended] = useState(true);
  const [fabVisible, setFabVisible] = useState(true);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

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

  // const handlePress = () => setExpanded(!expanded);
  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const theme = useTheme();

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setFabExtended(currentScrollPosition <= 0);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"dark-content"}
        />
        <ScrollView onScroll={onScroll}>
          {/* header */}
          <View style={styles.header}>
            <View style={styles.headerImage}>
              <Image
                source={require("../../assets/icon.png")}
                contentFit="contain"
                style={StyleSheet.absoluteFill}
                //   blurRadius={50}
              />
            </View>
            <View style={styles.headerText}>
              <Title
                style={[
                  theme.fonts.headlineSmall,
                  { fontWeight: "bold", color: theme.colors.primary },
                ]}
              >
                Restart Yourself
              </Title>

              <Title
                style={[
                  theme.fonts.labelMedium,
                  { letterSpacing: 4, color: theme.colors.secondary },
                ]}
              >
                Bring a new era
              </Title>
            </View>
          </View>
          {/* body */}
          <View style={styles.body}>
            
              <View style={styles.registerextrasection}>
              <Button
                icon="google"
                iconColor={theme.colors.primary}
                size={20}
                onPress={() => console.log("Pressed")}
                mode="outlined"
              >Continue With Google</Button>
              <Button
                icon="facebook"
                iconColor={theme.colors.primary}
                size={20}
                onPress={() => console.log("Pressed")}
                mode="outlined"
              >Continue With Facebook</Button>
              <Button
                icon="twitter"
                iconColor={theme.colors.primary}
                size={20}
                onPress={() => console.log("Pressed")}
                mode="outlined"
                
              >Continue With Twitter</Button>
              
</View>

<View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={[styles.text,{backgroundColor:theme.colors.background}]}>Or</Text>
            </View>
           

            <View style={styles.row}>
              <TextInput
                label="Email"
                placeholder="xyz@xyz.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                mode="outlined"
                // right={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
                style={styles.input}
                returnKeyType="go"
              />
              <Title style={theme.fonts.labelMedium}>Or</Title>
              <TextInput
                label="Phone"
                placeholder="+8801234567899"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                mode="outlined"
                // right={<TextInput.Icon icon="phone" />}
                keyboardType="phone-pad"
                style={styles.input}
                returnKeyType="go"
              />
            </View>
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              // right={<TextInput.Icon icon="lock" />}
              style={styles.input}
              returnKeyType="go"
              secureTextEntry
            />
            <TextInput
              label="Confirm Password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassoword(text)}
              onEndEditing={() => {
                if (password != confirm_password) {
                  setErrorText("Password does not match");
                } else {
                  setErrorText(null);
                }
              }}
              mode="outlined"
              style={styles.input}
              returnKeyType="go"
              disabled={!Boolean(password)}
            />
            {Boolean(errorText) ? (
              <HelperText type="error">{errorText}</HelperText>
            ) : null}
            <Divider />
            <TextInput
              label="Full Name"
              placeholder="Captain America"
              value={f_name}
              onChangeText={(text) => setFName(text)}
              mode="outlined"
              // right={<TextInput.Icon icon="pencil" />}
              style={styles.input}
              returnKeyType="go"
            />
            <View style={styles.row}>
              <Title style={theme.fonts.labelLarge}>Date of Birth</Title>

              <Button
                icon="calendar"
                // mode="outlined"
                onPress={showDatepicker}
                textColor={"#000000b5"}
              >
                {date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}
              </Button>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <View style={styles.row}>
              <Title style={theme.fonts.labelLarge}>Gender</Title>

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genders}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Male or Female"
                // searchPlaceholder="Search..."
                value={selectedGender}
                onChange={(item) => {
                  setSelectedGender(item.value);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                // )}
              />
            </View>
            <Divider />
            <Title style={theme.fonts.titleMedium}>Where do you live?</Title>
            <View style={styles.row}>
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={500}
                value={country}
                search
                data={local_data}
                valueField="value"
                labelField="value"
                // imageField="image"
                placeholder="Bangladesh"
                searchPlaceholder="Bangladesh"
                onChange={(e) => {
                  setCountry(e.value);
                }}
              />

              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={500}
                value={country}
                search
                data={local_data}
                valueField="value"
                labelField="value"
                // imageField="image"
                placeholder="Khilgaon, Dhaka"
                searchPlaceholder="Khilgaon, Dhaka"
                onChange={(e) => {
                  setCountry(e.value);
                }}
              />
            </View>
            <TextInput
              label="Address Line 1"
              // value={}
              // onChangeText={(text) => setPassword(text)}
              mode="outlined"
              // right={<TextInput.Icon icon="google-maps" />}
              style={styles.input}
              placeholder="Wing A, Block 2, XYZ, Fifth road - Dhaka"
              returnKeyType="go"
            />
            <TextInput
              label="Address Line 2 (Optional)"
              // value={}
              // onChangeText={(text) => setPassword(text)}
              mode="outlined"
              // right={<TextInput.Icon icon="google-maps" />}
              style={styles.input}
              placeholder="XYZ, Fifth road - Dhaka"
              returnKeyType="go"
              disabled
            />
          </View>
        </ScrollView>
        <AnimatedFAB
          icon={"arrow-right"}
          label={"Register"}
          extended={fabExtended}
          onPress={() => console.log("Pressed")}
          visible={fabVisible}
          animateFrom={"right"}
          variant="primary"
          // iconMode={'static'}
          style={[styles.fabStyle, { backgroundColor: theme.colors.primary }]}
          color={theme.colors.inverseOnSurface}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT + 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 5,
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  headerText: {
    // gap:10,
    justifyContent: "flex-start",
  },
  body: {
    marginVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
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
  dropdown: {
    // margin: 16,
    // height: 50,
    width: 150,
    // borderRadius: 22,
    // borderWidth:0.5,
    // paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
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
  registerextrasection: {
    gap: 10,
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginVertical:10
    
  },
  text: {
    position: "absolute",
    backgroundColor: "white", // Set background color as needed
    paddingHorizontal: 10,
    top: "50%", // Center the text vertically
    transform: [{ translateY: -10 }], // Adjust translateY to vertically center the text
    zIndex: 1, // Place text above the divider
  },
});
