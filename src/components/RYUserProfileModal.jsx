import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useMemo } from 'react';
import { Avatar, MD3Colors, useTheme } from 'react-native-paper';
import { AuthContext } from '../../AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signOut } from '../../firebase/firebaseConfig';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const RYUserProfileModal = () => {
  const { profileModalVisible, setProfileModalVisible, user } = useContext(AuthContext);
  const hideModal = () => setProfileModalVisible(false);
  const theme = useTheme();
  const bottomSheetRef = React.useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onClose = useCallback(() => {
    console.log('Bottom Sheet closed');
    hideModal();
  }, [hideModal]);

  const onCollapse = useCallback(() => {
    console.log('Bottom Sheet collapsed');
    hideModal();
  }, [hideModal]);

  return (
    <BottomSheet
    ref={bottomSheetRef}
    index={profileModalVisible ? 1 : -1}
    enableDynamicSizing
    snapPoints={["30%"]}
    onChange={handleSheetChanges}
    enablePanDownToClose
    backdropComponent={BottomSheetBackdrop}
    handleComponent={()=>null}
    onClose={onClose}
    onCollapse={onCollapse}
    backgroundStyle={{backgroundColor:theme.colors.background,borderRadius:18}}
    >
      <BottomSheetView style={[styles.containerStyle]}>
        <Pressable style={styles.profileRow}>
          <View>
            <Text style={theme.fonts.bodyLarge}>{user.displayName}</Text>
            <Text style={[theme.fonts.bodySmall, { opacity: 0.5 }]}>{user.email}</Text>
          </View>
          <Avatar.Image size={46} source={{ uri: user.photoURL }} />
        </Pressable>
        <View style={styles.extra1}>
          <TouchableOpacity style={{ flexDirection: 'row', gap: 20, padding: 10, alignItems: 'center',backgroundColor:'white' }}>
            <MaterialCommunityIcons name="account-circle-outline" size={theme.fonts.bodyLarge.fontSize * 1.5} color="black" />
            <Text style={theme.fonts.bodyLarge}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', gap: 20, padding: 10, alignItems: 'center',backgroundColor:'white' }}>
            <MaterialCommunityIcons name="target" size={theme.fonts.bodyLarge.fontSize * 1.5} color="black" />
            <Text style={theme.fonts.bodyLarge}>My Goals</Text>
          </TouchableOpacity>
        </View>
        {user.password && (
          <TouchableOpacity style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
            <MaterialCommunityIcons name="form-textbox-password" size={theme.fonts.bodyLarge.fontSize * 1.5} color="black" />
            <Text style={theme.fonts.bodyLarge}>Change Password</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            hideModal();
            signOut();
          }}
          style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', marginBottom: 20 }}
        >
          <MaterialCommunityIcons name="logout" size={theme.fonts.bodyLarge.fontSize * 1.5} color={MD3Colors.error60} />
          <Text style={[theme.fonts.bodyLarge, { color: MD3Colors.error60 }]}>Logout</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RYUserProfileModal;

const styles = StyleSheet.create({
  containerStyle: {
  },
  profileRow: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  extra1: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    gap:2
  },
});