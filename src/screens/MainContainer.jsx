import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import { useTheme } from "react-native-paper";
import RYUserProfileModal from "../components/RYUserProfileModal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const MainContainer = ({navigation, route, title,titleBadge, children}) => {
    const theme = useTheme()
  return (
    <BottomSheetModalProvider>
    <View style={[styles.root,{backgroundColor:theme.colors.background}]}>
    <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <Header title={title} navigation={navigation} titleBadge={titleBadge}/>
      {children}
      <RYUserProfileModal/>
    </View>
    </BottomSheetModalProvider>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
    root:{
        flex:1
    }
});
