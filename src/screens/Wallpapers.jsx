import { Dimensions, ScrollView, StyleSheet, View, FlatList, Pressable, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { listWallpapers } from '../../firebase/firebaseConfig';
import { Image } from 'expo-image';
import { FAB, IconButton, useTheme } from 'react-native-paper';
import MainContainer from './MainContainer';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useAnimatedRef,
  runOnUI,
  scrollTo,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 16 / 9; // Corrected aspect ratio for portrait mode
const containerWidth = screenWidth * 0.6; // 60% of the screen width, as per your code
const containerHeight = containerWidth * aspectRatio; // Height based on the aspect ratio
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const Wallpapers = ({ navigation, route }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const theme = useTheme();
  const scrollX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const AnimatedThumbnail = ({ index, image }) => {
    const ThumbnailStyle = useAnimatedStyle(() => {
      const width=60;
    //   const height = interpolate(
    //     scrollX.value,
    //     [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
    //     [60, 80, 60],
    //     Extrapolate.CLAMP
    //   );
      return {
        width: interpolate(
            scrollX.value,
            [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
            [width, width*1.5, width],
            Extrapolate.CLAMP
          ),
          borderWidth:interpolate(
            scrollX.value,
            [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
            [0, StyleSheet.hairlineWidth, 0],
            Extrapolate.CLAMP
          )
        // height: height,
      };
    });

    const handleThumbnailPress = () => {
        runOnUI(() => {
          scrollTo(scrollViewRef,index*containerWidth,0,true);
        })();
      };
    return (
      <AnimatedPressable style={ThumbnailStyle} onPress={handleThumbnailPress}>
        <Image source={{ uri: image }} style={StyleSheet.absoluteFillObject} />
      </AnimatedPressable>
    );
  };

  const AnimatedBackImage = ({ index, image }) => {
    const ImageStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollX.value,
        [(index - 1) * containerWidth, index * containerWidth, (index + 1) * containerWidth],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      return {
        opacity: opacity,
      };
    });
    return (
      <Animated.View
        key={index}
        style={[StyleSheet.absoluteFillObject, ImageStyle]}
      >
        <Image
          source={{ uri: image }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
      </Animated.View>
    );
  };

  useEffect(() => {
    const fetchWallpapers = async () => {
      const urls = await listWallpapers();
      setWallpapers(urls);
    };
    fetchWallpapers();
  }, []);
  

  const handleSharePress = async () => {
    try {
      const currentIndex = Math.floor(scrollX.value / containerWidth);
      const currentWallpaper = wallpapers[currentIndex];

      await Share.share({
        message: `Check out this cool wallpaper: ${currentWallpaper}`,
        url: currentWallpaper,
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  const renderThumbnail = ({ item }) => (
    <Image source={{ uri: item }} style={styles.thumbnail} />
  );

  return (
    <MainContainer title={"Wallpapers"} navigation={navigation}>
      
      <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        {wallpapers.map((wallpaper, index) => (
          <AnimatedBackImage image={wallpaper} index={index} key={index} />
        ))}
      </View>
        <View style={styles.scrollWrapper}>
          {/* <IconButton
            icon={'download'}
            style={{
              position: 'absolute',
              bottom: '-4%',
              right: '1%',
              zIndex: 10,
              backgroundColor: theme.colors.primary,
            }}
            iconColor={theme.colors.onPrimary}
            onPress={() => {
              console.log('pressed download button');
            }}
          /> */}
          <View style={{
        position: 'absolute',
    // margin: 16,
    right: '1%',
    bottom: '-4%',
    zIndex:10,
    gap:10,
    flexDirection:'row',
    alignItems:'center'
    }}>
          <FAB
    icon="download"
    style={{backgroundColor:theme.colors.tertiary}}
    onPress={()=>console.log("Pressed download button!")}
  />
          <FAB
    icon="share"
    style={{backgroundColor:theme.colors.tertiary}}
    onPress={handleSharePress}
  />
  {/* <IconButton
            icon={'share'}
            style={{
              backgroundColor: theme.colors.tertiary,
            }}
            iconColor={theme.colors.onTertiary}
            onPress={handleSharePress}
          />
  <IconButton
            icon={'download'}
            style={{
              backgroundColor: theme.colors.tertiary,
            }}
            iconColor={theme.colors.onTertiary}
            onPress={() => {
              console.log('Pressed download button!');
            }}
          /> */}
          </View>
    
          <View style={styles.scrollViewContent}>
            <Animated.ScrollView
            ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={containerWidth}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
            >
              {wallpapers.map((wallpaper, index) => (
                <View key={index} style={styles.wallpaperImage}>
                  <Image source={{ uri: wallpaper }} contentFit='contain' style={StyleSheet.absoluteFillObject} />
                </View>
              ))}
            </Animated.ScrollView>
          </View>
        </View>
        <View
          style={styles.thumbnailContainer}
        >
        <FlatList
          data={wallpapers}
          renderItem={({ item, index }) => (
              <AnimatedThumbnail image={item} index={index} />
            )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap:10}}
        />
        </View>
       </View>
    </MainContainer>
  );
};

export default Wallpapers;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    backgroundWrapper: {
      ...StyleSheet.absoluteFill,
      zIndex: -1
    },
    scrollViewContent: {
      width: containerWidth,
      height: containerHeight,
      borderRadius: 10,
      overflow: 'hidden'
    },
    scrollWrapper: {
      borderRadius: 20 / 1.5,
      backgroundColor: 'white',
      elevation: 5,
      alignSelf: 'center',
      padding: 10,
      marginVertical: 20
    },
    wallpaperImage: {
      width: containerWidth,
      height: containerHeight
    },
    thumbnailContainer: {
      alignSelf: 'center',
      marginBottom: 20,
    height:60
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: 5
    }
  });