import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'

const RYDrawer = (props) => {
  const [active, setActive] = React.useState('home');
  const {navigation} = props
  useEffect(()=>{
    navigation.jumpTo(active)
  },[active])
  return (
    <DrawerContentScrollView {...props}>
    {/* <Drawer.Section title='RN-Paper Section'> */}
    <Drawer.Item {...props}
        label="Home"
        icon={'home-outline'}
        active={active === 'home'}
        onPress={() => setActive('home')}
      />
      <Drawer.Item
      {...props}
        label="Notifications"
        icon={'bell-outline'}
        active={active === 'notifications'}
        onPress={() => setActive('notifications')}
      />
      {/* <Drawer.CollapsedItem
     focusedIcon="inbox"
     onPress={() => setActive('inbox')}
     active={active === 'inbox'}
     unfocusedIcon="inbox-outline"
     label="Inbox"
   /> */}
    {/* </Drawer.Section> */}
{/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  )
}

export default RYDrawer

const styles = StyleSheet.create({})