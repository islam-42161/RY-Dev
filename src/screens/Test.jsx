import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import MainContainer from './MainContainer';

const Test = ({ navigation, route }) => {
  // refs
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);

  // renders
  return (
    <MainContainer>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        // snapPoints={snapPoints}
        enableDynamicSizing
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Pressable onPress={handleCloseBottomSheet}>
            <Text style={styles.closeButton}>Close</Text>
          </Pressable>
        </View>
      </BottomSheet>
      </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleIndicator: {
    backgroundColor: 'grey',
    width: 50,
    height: 5,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'blue',
  },
});

export default Test;