import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  Divider,
  Modal,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");
const SCROLL_WIDTH = width - 80;

const StepTwo = ({ f_name, setFname, setDate, date, setGender, gender }) => {
  const theme = useTheme();

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
  const [showdate, setShowDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  // gender picker
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const showModal = () => setGenderModalVisible(true);
  const hideModal = () => setGenderModalVisible(false);

  return (
    <View style={styles.step}>
      <Text style={theme.fonts.titleSmall}>Step 2: Personal Details</Text>
      <View style={styles.input_block}>
        <TextInput
          placeholder="Full Name"
          value={f_name}
          onChangeText={(text) => setFname(text)}
          // mode="flat"
          // right={<TextInput.Icon icon="phone" />}
          keyboardType="default"
          returnKeyType="next"
          style={[styles.input, theme.fonts.bodySmall]}
        />
        <Divider />
        <Pressable onPress={showDatepicker} style={[styles.row, styles.input]}>
          <Text style={theme.fonts.bodySmall}>Date of Birth</Text>
          <Text style={theme.fonts.bodySmall}>
            {date
              ? `${date.getDate()}-${
                  months[date.getMonth()]
                }-${date.getFullYear()}`
              : "D-M-Y"}
          </Text>
          {showdate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? date : new Date()}
              mode="date"
              onChange={onChange}
            />
          )}
        </Pressable>
        <Divider />
        <Pressable onPress={showModal} style={[styles.row, styles.input]}>
          <Text style={theme.fonts.bodySmall}>Gender</Text>
          <Text style={theme.fonts.bodySmall}>{gender}</Text>
          <Portal>
            <Modal
              visible={genderModalVisible}
              onDismiss={hideModal}
              contentContainerStyle={styles.genderPicker}
            >
              <Text style={[theme.fonts.titleMedium, { padding: 16 }]}>
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
                  status={gender === "Female" ? "checked" : "unchecked"}
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
                  status={gender === "Other" ? "checked" : "unchecked"}
                />
                <Text style={theme.fonts.bodyMedium}>Other</Text>
              </Pressable>
            </Modal>
          </Portal>
        </Pressable>
      </View>
    </View>
  );
};

export default StepTwo;

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
