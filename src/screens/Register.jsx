import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar
} from "react-native";
import {
  TextInput,
  useTheme,
  Title,
  HelperText,
  Menu,Text, Card, Divider, List, Button, Surface, RadioButton, IconButton
} from "react-native-paper";
import useKeyboardVisible from "../functions/useKeyboardVisible";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectCountry } from "react-native-element-dropdown";
const local_data = [
  {
    value: '1',
    lable: 'Country 1',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png',
    },
  },
  {
    value: '2',
    lable: 'Country 2',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png',
    },
  },
  {
    value: '3',
    lable: 'Country 3',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png',
    },
  },
  {
    value: '4',
    lable: 'Country 4',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png',
    },
  },
  {
    value: '5',
    lable: 'Country 5',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png',
    },
  },
];
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const genders = ['Male', 'Female', 'Other'];
const Register = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [f_name, setFName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setConfirmPassoword] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [selectedGender, setSelectedGender] = useState(''); // State for selected gender
  const [menuVisible, setMenuVisible] = useState(false); // State to control the menu visibility
 
 
  const [date, setDate] = useState(new Date(null));
  const [show, setShow] = useState(false);



  const [country,setCountry] = useState('1')


  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };





  // const handlePress = () => setExpanded(!expanded);
  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const theme = useTheme();
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
          <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>

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
          <Title style={[theme.fonts.titleMedium, { fontWeight: "bold" }]}>
            Register
          </Title>
          <TextInput
            label="Full Name"
            placeholder="Captain America"
            value={f_name}
            onChangeText={(text) => setFName(text)}
            mode="outlined"
            right={<TextInput.Icon icon="pencil" />}
            style={styles.input}
            returnKeyType="go"
          />
          <TextInput
            label="Email"
            placeholder="xyz@xyz.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            right={<TextInput.Icon icon="email" />}
            keyboardType="email-address"
            style={styles.input}
            returnKeyType="go"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            right={<TextInput.Icon icon="lock" />}
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
            <HelperText type="error">
            {errorText}
          </HelperText>):null}
<Divider/>

          <View style={styles.row}>
          <Title style={theme.fonts.labelLarge}>Date of Birth</Title>

          <Button
        icon='calendar'
        // mode="outlined"
        onPress={showDatepicker}
      >{date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}
      </Button>
          {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
      )}
      </View>
      <View style={styles.row}>
      <Title style={theme.fonts.labelLarge}>Select your gender</Title>
        <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Button
          // mode="outlined"
            style={{ color: selectedGender ? 'black' : 'gray'}}
            onPress={openMenu}
            icon='chevron-down'>{selectedGender || 'Select Gender'}</Button>

        }>
      

            <RadioButton.Group
              onValueChange={(value) => {
                setSelectedGender(value);
                closeMenu();
              }}
              value={selectedGender}
            >
            {genders.map((value,index)=>(

              <RadioButton.Item key={index} label={value} value={value} />
            ))}
            </RadioButton.Group>
   </Menu>
</View>
<Divider/>
<Title style={theme.fonts.titleMedium}>Where do you live?</Title>
<View style={styles.row}>
<Title style={theme.fonts.labelMedium}>Country</Title>
<SelectCountry
style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
maxHeight={200}
        value={country}
        search
        data={local_data}
        valueField="value"
        labelField="lable"
        imageField="image"
        placeholder="Select country"
        searchPlaceholder="Search..."
        onChange={e => {
          setCountry(e.value);
        }}
/>
</View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT * 1.5,
    padding: 20,
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
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // borderWidth:1,
    borderRadius:5,paddingHorizontal:15,paddingVertical:5
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
});
