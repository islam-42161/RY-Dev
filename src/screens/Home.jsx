import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, Pressable } from 'react-native';
import MainContainer from './MainContainer';
import { getQuoteOfToday, signOut } from '../../firebase/firebaseConfig';
import { Image } from 'expo-image';
import { Avatar, Divider, useTheme } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../AuthProvider';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const Home = ({route,navigation}) => {
  const theme = useTheme()
  const [quote,setQuote] = useState();
  const fetchQuote = () => {
    getQuoteOfToday().then(quoteData => {
      console.log(quoteData);
      setQuote(quoteData);
    });
  }
  useEffect(() => {
    fetchQuote();
  }, [])
  const {user} = useContext(AuthContext)
  return (
    <MainContainer title={"Home"} navigation={navigation}>
    <View style={{marginHorizontal:20,marginTop:20,paddingTop:10,gap:10,elevation:5,backgroundColor:theme.colors.background,borderRadius:20,overflow:'hidden',alignItems:'center'}}>
      <Text style={[theme.fonts.titleMedium]}>🌞 Daily Dose of Inspiration</Text>
    {quote ?(
      <AnimatedImage
      entering={FadeIn.duration(1000)}
        source={{uri:quote.quote}}
        style={{width:"100%",aspectRatio:1}}
        contentFit='cover'
      />
    ):(
      <Text style={[{opacity:0.5,marginBottom:10},theme.fonts.bodySmall]}>No quote for today <Text onPress={fetchQuote} style={{textDecorationLine:'underline'}}>Refresh</Text></Text>
    ) 
      
    }
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, margin: 20,flex:0.6}}>
      <Pressable style={[styles.card,{backgroundColor:theme.colors.onPrimaryContainer}]} onPress={()=>navigation.navigate('notifications')}>
      <AntDesign name="notification" size={24} color="black" />
      <Text style={theme.fonts.titleMedium}>Notifications</Text>
      </Pressable>
      <Pressable style={[styles.card,{backgroundColor:theme.colors.onPrimaryContainer}]} onPress={()=>navigation.navigate('wallpapers')}>
      <AntDesign name="picture" size={24} color="black" />
      <Text style={theme.fonts.titleMedium}>Wallpapers</Text>
      </Pressable>
      </View>
      <View style={{flexDirection:'row',flex:1,marginBottom:20,marginHorizontal:20,gap:20}}>
<View style={{flex:0.6,backgroundColor:'teal',padding:16,borderRadius:20,overflow:'hidden',gap:8,justifyContent:'space-between'}}>
<Avatar.Image source={{uri:user.photoURL}} size={72}/>
<View>
<Text style={{...theme.fonts.titleMedium,color:theme.colors.onPrimary}} numberOfLines={2}>{user.displayName}</Text>
<Text style={{...theme.fonts.bodySmall,color:theme.colors.onPrimary}} numberOfLines={1}>{user.email}</Text>
</View>
</View>
<View style={{flex:0.4,borderRadius:20,overflow:'hidden',justifyContent:'space-between',gap:4}}>
<Pressable style={{flex:1,justifyContent:'space-between',padding:16,gap:8,backgroundColor:theme.colors.secondaryContainer}}>
      <AntDesign name="checkcircleo" size={24} color="black" />
      <Text style={theme.fonts.titleMedium}>Goals</Text>
      </Pressable>
      <Pressable style={{flex:1,justifyContent:'space-between',padding:16,gap:8,backgroundColor:theme.colors.errorContainer}} onPress={()=>signOut()}>
      <AntDesign name="logout" size={24} color={theme.colors.onErrorContainer} />
      <Text style={{...theme.fonts.titleMedium,color:theme.colors.onErrorContainer}}>Logout</Text>
      </Pressable>  
</View>
</View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    height:"100%",
    justifyContent:'space-between',
    gap:16
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
});


export default Home;
