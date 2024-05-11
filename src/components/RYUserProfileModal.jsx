import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Avatar, MD3Colors, useTheme } from 'react-native-paper';
import { AuthContext } from '../../AuthProvider';
import { signOut } from '../../firebase/firebaseConfig';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

const RYUserProfileModal = () => {
  const { profileModalVisible, setProfileModalVisible, user } = useContext(AuthContext);
  const hideModal = () => setProfileModalVisible(false);
  const theme = useTheme();
  const bottomSheetRef = React.useRef(null);

  const snapPoints = useMemo(() => ['1%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleDismiss = useCallback(()=>{
    hideModal()
      },[])

// useEffect(()=>{
//   bottomSheetRef.current?.close();
// },[])
  useEffect(() => {
    if (profileModalVisible) {
      bottomSheetRef.current?.present();
    }
    else{
      bottomSheetRef.current?.dismiss();
    }
  }, [profileModalVisible]);


  return (
    <BottomSheetModal
    ref={bottomSheetRef}
    index={profileModalVisible ? 1 : -1}
    snapPoints={snapPoints}
    enableDynamicSizing
    onChange={handleSheetChanges}
    onDismiss={handleDismiss}
    handleComponent={()=>null}
    backdropComponent={BottomSheetBackdrop}

      backgroundStyle={{ backgroundColor: theme.colors.background, borderRadius: 18 }}
      // backgroundStyle={{ backgroundColor: theme.colors.error, borderRadius: 18 }}
    >
      <BottomSheetView style={styles.containerStyle}>
        <Pressable style={styles.profileRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <Avatar.Image size={46} source={{ uri: user.photoURL }} />
            <View>
              <Text style={theme.fonts.titleMedium} numberOfLines={1}>
                {user.displayName}
              </Text>
              <Text style={[theme.fonts.bodyMedium, { opacity: 0.5 }]} numberOfLines={1}>
                {user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              hideModal();
              signOut();
            }}
            style={{
              height: theme.fonts.bodyLarge.fontSize * 2,
              width: theme.fonts.bodyLarge.fontSize * 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.error,
              borderRadius: 30,
            }}
          >
            <AntDesign name="logout" size={theme.fonts.bodyLarge.fontSize} color={theme.colors.onError} />
          </TouchableOpacity>
        </Pressable>
        {/* <View style={styles.extra1}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 20,
              padding: 20,
              alignItems: 'center',
              backgroundColor: theme.colors.onPrimaryContainer,
            }}
          >
            <AntDesign name="profile" size={theme.fonts.bodyLarge.fontSize * 1.5} color="black" />
            <Text style={theme.fonts.bodyLarge}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 20,
              padding: 20,
              alignItems: 'center',
              backgroundColor: theme.colors.onPrimaryContainer,
            }}
          >
            <AntDesign name="checkcircleo" size={theme.fonts.bodyLarge.fontSize * 1.5} color="black" />
            <Text style={theme.fonts.bodyLarge}>My Goals</Text>
          </TouchableOpacity>
        </View> */}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default RYUserProfileModal;

const styles = StyleSheet.create({
  containerStyle: {},
  profileRow: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  extra1: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    gap: 2,
  },
});