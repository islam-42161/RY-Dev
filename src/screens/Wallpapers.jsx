import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import { listWallpapers } from "../../firebase/firebaseConfig";
import { Image } from "expo-image";
import { ActivityIndicator, FAB, IconButton, Text, useTheme } from "react-native-paper";
import MainContainer from "./MainContainer";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useAnimatedRef,
  runOnUI,
  scrollTo,
  Extrapolation,
} from "react-native-reanimated";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const screenWidth = Dimensions.get("window").width;
const aspectRatio = 16 / 9; // Corrected aspect ratio for portrait mode
// const containerWidth = screenWidth * 0.8; // 60% of the screen width, as per your code
const containerWidth = screenWidth - 60; // 60% of the screen width, as per your code
const containerHeight = containerWidth * aspectRatio; // Height based on the aspect ratio
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Wallpapers = ({ navigation, route }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
      const width = 60;
      return {
        width: interpolate(
          scrollX.value,
          [
            (index - 1) * containerWidth,
            index * containerWidth,
            (index + 1) * containerWidth,
          ],
          [width, width * 1.5, width],
          Extrapolation.CLAMP
        ),
        borderWidth: interpolate(
          scrollX.value,
          [
            (index - 1) * containerWidth,
            index * containerWidth,
            (index + 1) * containerWidth,
          ],
          [0, 2, 0],
          Extrapolation.CLAMP
        ),
        borderColor:'white'
      };
    });

    const handleThumbnailPress = () => {
      runOnUI(() => {
        scrollTo(scrollViewRef, index * containerWidth, 0, true);
      })();
    };

    return (
      <AnimatedPressable style={ThumbnailStyle} onPress={handleThumbnailPress}>
        <Image source={image} style={StyleSheet.absoluteFillObject} />
      </AnimatedPressable>
    );
  };

  const AnimatedBackImage = ({ index, image }) => {
    const ImageStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollX.value,
        [
          (index - 1) * containerWidth,
          index * containerWidth,
          (index + 1) * containerWidth,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
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
          source={image}
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
        />
      </Animated.View>
    );
  };

  const fetchWallpapers = async () => {
    const urls = await listWallpapers();
    setWallpapers(urls);
    setLoaded(true);
  };
  useEffect(() => {
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
      console.error("Error sharing image:", error);
    }
  };

  const downloadWallpaper = async () => {
    try {
      const currentIndex = Math.round(scrollX.value / containerWidth);
      const currentWallpaper = wallpapers[currentIndex];

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Camera roll permission is required to download the image.");
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}wallpaper.jpg`;
      await FileSystem.downloadAsync(currentWallpaper, fileUri);
      await MediaLibrary.saveToLibraryAsync(fileUri);

      alert("Wallpaper downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Error downloading the wallpaper. Please try again later.");
    }
  };

  return (
    <MainContainer title={"Wallpapers"} navigation={navigation}>
      {loaded === false ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : wallpapers.length ? (
        <View style={styles.container}>
          <View style={styles.backgroundWrapper}>
            {wallpapers.map((wallpaper, index) => (
              <AnimatedBackImage image={wallpaper} index={index} key={index} />
            ))}
          </View>

          <View style={styles.scrollWrapper}>
          {/* action buttons */}
            <View
              style={{
                position: "absolute",
                // margin: 16,
                right: "4%",
                bottom: "2%",
                zIndex: 10,
                // gap:10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                icon={"share"}
                mode="outlined"
                // style={{
                //   backgroundColor: theme.colors.tertiary,
                // }}
                iconColor={theme.colors.onTertiary}
                onPress={handleSharePress}
              />
              <IconButton
                icon={"download"}
                mode="outlined"
                // style={{
                //   backgroundColor: theme.colors.tertiary,
                // }}
                iconColor={theme.colors.onTertiary}
                onPress={downloadWallpaper}
              />
            </View>

            <View style={styles.scrollViewContent}>
              <Animated.FlatList
                ref={scrollViewRef}
                // ref={scrollViewRef}
                data={wallpapers}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={containerWidth}
                decelerationRate="fast"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.wallpaperImage}>
                    <Image source={item} style={StyleSheet.absoluteFillObject} />
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.thumbnailContainer}>
            <FlatList
              data={wallpapers}
              renderItem={({ item, index }) => (
                <AnimatedThumbnail image={item} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          </View>
        </View>
      ) : (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={theme.fonts.bodyMedium}>No wallpapers available</Text>
      </View>)}

    </MainContainer>
  );
};

export default Wallpapers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
  },
  scrollViewContent: {
    // width: containerWidth,
    // height: containerHeight,
    borderRadius: 10,
    overflow: "hidden",
    flex:1
  },
  scrollWrapper: {
    borderRadius: 20 / 1.5,
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
    margin: 20,
    flex:0.9,
  },
  wallpaperImage: {
    width: containerWidth,
    // height: containerHeight,
    // ...StyleSheet.absoluteFill,
    // flex:1
  },
  thumbnailContainer: {
    alignItems: "center",
    padding:20,
    backgroundColor:'rgba(0,0,0,0.2)',
    flex:0.1,
    width:"100%"
    // height: 60,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});

