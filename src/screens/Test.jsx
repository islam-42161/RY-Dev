import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const Test = () => {
  // ref
  const bottomSheetModalRef = useRef(null);

  // state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    console.log('Modal: ',isModalVisible)
    setIsModalVisible(true);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleDismiss = useCallback(()=>{
setIsModalVisible(false)
  },[])

  // effect to present the modal when isModalVisible changes to true
  useEffect(() => {
    if (isModalVisible) {
      bottomSheetModalRef.current?.present();
    }
  }, [isModalVisible]);

  // effect to dismiss the modal when isModalVisible changes to false
  useEffect(() => {
    if (!isModalVisible) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isModalVisible]);

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={isModalVisible ? 0 : -1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onDismiss={handleDismiss}
          backdropComponent={BottomSheetBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Test;
