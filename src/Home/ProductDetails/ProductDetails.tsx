import React, { useState, useRef, useReducer, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Transitioning,
  Transition,
  TransitioningView,
} from "react-native-reanimated";
import { Box, Header, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import RoundedCheckboxGroup from "../EditProfile/RoundedCheckboxGroup";
import Footer from "./Footer";
import TopCurve from "./TopCurve";
import { Feather as Icon } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  getProductReviews,
  productAddToCart,
  removeToFavourite,
  submitReview,
} from "../../redux/actions/productActions";
import { AirbnbRating } from "react-native-ratings";
import { palette } from "../../components/Theme";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import moment from "moment";

const defaultOutfits = [
  {
    id: 1,
    color: "#BFEAF5",
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 2,
    color: "#BEECC4",
    aspectRatio: 200 / 145,
    selected: false,
  },
  {
    id: 3,
    color: "#FFE4D9",
    aspectRatio: 180 / 145,
    selected: false,
  },
  {
    id: 4,
    color: "#FFDDDD",
    aspectRatio: 180 / 145,
    selected: false,
  },
  {
    id: 5,
    color: "#BFEAF5",
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 6,
    color: "#F3F0EF",
    aspectRatio: 120 / 145,
    selected: false,
  },
  {
    id: 7,
    color: "#D5C3BB",
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 8,
    color: "#DEEFC4",
    aspectRatio: 160 / 145,
    selected: false,
  },
];

const ProductDetails = ({
  navigation,
  route,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const isFocused = useIsFocused();
  const transition = (
    <Transition.Together>
      <Transition.Out type="fade" />
      <Transition.In type="fade" />
    </Transition.Together>
  );
  const list = useRef<TransitioningView>(null);
  const [outfits, setOutfits] = useState(defaultOutfits);
  const theme = useTheme();
  //const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isFavourite: false,
      selectedColor: "",
      selectedSize: "",
      productDetail: null,
      rating: 0,
      review: "",
      reviews: [],
    }
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleOnGetUserReview();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   handleOnGetUserReview();
  // }, [isFocused]);

  useEffect(() => {
    const { productDetail } = route.params;

    setState({
      productDetail,
      isFavourite: user?.favourites?.some(
        (value) => value == productDetail?.docId
      ),
    });
  }, [route.params, user]);

  const handleOnGetUserReview = () => {
    const { productDetail } = route.params;

    dispatch(
      getProductReviews(
        productDetail?.docId,
        (reviews) => {
          console.log("Reviews", reviews);
          setState({
            reviews,
          });
        },
        (error) => {
          alert(error.message);
        }
      )
    );
  };

  const handleFavourite = () => {
    if (state.isFavourite) {
      dispatch(removeToFavourite(state.productDetail.docId));
    } else {
      dispatch(addToFavourite(state.productDetail.docId));
    }
  };

  const handleOnAddToCart = () => {
    const { productDetail } = state;

    if (!state.selectedSize) {
      alert("Please selected size");
    } else if (!state.selectedColor) {
      alert("Please selected color");
    } else {
      dispatch(
        productAddToCart({
          product_id: productDetail.docId,
          image: productDetail.data?.image,
          name: productDetail.data?.name,
          price: productDetail.data?.price,
          size: state.selectedSize,
          color: state.selectedColor,
        })
      );
      alert("Successfully add to cart");
    }
  };

  const handleOnSubmitReview = () => {
    const { rating, review } = state;

    if (review.trim() == "") {
      alert("Please enter a review");
    } else {
      dispatch(
        submitReview(
          {
            product_id: state.productDetail.docId,
            rating,
            review,
          },
          () => {
            handleOnGetUserReview();
            setState({
              rating: 0,
              review: "",
            });
          },
          () => {
            alert("An error occured. Please try again later");
          }
        )
      );
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Product Details"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-bag",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.m,
            paddingBottom: footerHeight,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Transitioning.View ref={list} transition={transition}>
            <Image
              style={styles.image}
              source={{
                uri: state.productDetail?.data?.image,
              }}
            />
            {/* <Slide
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={(position) => this.setState({ position })}
            /> */}
            <View style={styles.infoContainer}>
              <View style={styles.favouriteContainer}>
                <View>
                  <Text style={styles.name}>
                    {state.productDetail?.data?.name}
                  </Text>
                  <Text style={styles.price}>
                    ${state.productDetail?.data?.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addFavBtn}
                  onPress={() => handleFavourite()}
                >
                  {state.isFavourite ? (
                    <Image
                      source={require("../../../assets/favourite.png")}
                      style={styles.favIcon}
                    />
                  ) : (
                    <Icon name="heart" color="#FE5E33" size={35} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>
                {state.productDetail?.data?.description}
              </Text>
            </View>
            <Text>What is your clothing size?</Text>
            <RoundedCheckboxGroup
              options={
                state.productDetail?.data?.sizes
                  ? state.productDetail?.data?.sizes?.map((value) => ({
                      value,
                    }))
                  : []
              }
              selectedValues={[state.selectedSize]}
              onChange={(values) => {
                setState({
                  selectedSize: values[values.length - 1],
                });
              }}
            />
            <Text>My preferred clothing colors</Text>
            <RoundedCheckboxGroup
              options={
                state.productDetail?.data?.colors
                  ? state.productDetail?.data?.colors?.map((value) => ({
                      value,
                    }))
                  : []
              }
              valueIsColor
              selectedValues={[state.selectedColor]}
              onChange={(values) => {
                setState({
                  selectedColor: values[values.length - 1],
                });
              }}
            />
          </Transitioning.View>
          <View style={styles.reviewSection}>
            <Text style={styles.titleText}>Ratings & Reviews</Text>

            {state.reviews?.map((value, index) => {
              return (
                <View style={styles.reviewContainer} key={index}>
                  <View style={styles.headerContainer}>
                    <View>
                      <Text style={styles.nameText}>{value?.name}</Text>
                      <AirbnbRating
                        size={15}
                        isDisabled={true}
                        showRating={false}
                        style={styles.rating}
                        halfStarEnabled={true}
                        defaultRating={value?.rating ? value?.rating : 0}
                        ratingContainerStyle={styles.ratingContainerStyle}
                      />
                    </View>
                    <Text style={styles.date}>
                      {moment(value?.date)
                        .utc()
                        .local()
                        .format("MMMM DD, YYYY")}
                    </Text>
                  </View>
                  <View style={styles.reviewTextContainer}>
                    <Text style={styles.reviewText}>{value?.review}</Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.reviewContainer}>
              <View style={styles.headerContainer}>
                <AirbnbRating
                  size={20}
                  showRating={false}
                  onFinishRating={(rating) =>
                    setState({
                      rating,
                    })
                  }
                  starContainerStyle={styles.starContainerStyle}
                  defaultRating={state.rating}
                  ratingContainerStyle={styles.userRatingContainerStyle}
                />
              </View>
              <View style={styles.reviewInputContainer}>
                <TextInput
                  multiline
                  value={state.review}
                  placeholder="Enter your review"
                  style={styles.inputField}
                  onChangeText={(text) =>
                    setState({
                      review: text,
                    })
                  }
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text
                    style={styles.btnTextStyle}
                    onPress={handleOnSubmitReview}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer label="Add to Cart" onPress={handleOnAddToCart} />
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    width: "99%",
    height: 500,
    borderRadius: 25,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  favouriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  addFavBtn: {},
  favIcon: {
    width: 35,
    height: 35,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
  titleText: {
    fontSize: 25,
    marginVertical: 20,
  },
  reviewContainer: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 15,
  },
  rating: {
    // marginHorizontal: 20,
  },
  reviewInputContainer: {
    marginVertical: 10,
  },
  inputField: {
    height: 150,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "gray",
    textAlignVertical: "top",
  },
  starContainerStyle: {
    width: "65%",
    justifyContent: "space-between",
  },
  userRatingContainerStyle: {
    // backgroundColor: "red",
    marginLeft: -35,
  },
  date: {
    fontSize: 12,
  },
  reviewTextContainer: {},
  reviewText: {
    width: "100%",
    fontSize: 14,
    marginTop: 5,
    textAlign: "justify",
  },
  reviewSection: {
    marginBottom: 200,
  },
  ratingContainerStyle: {
    width: 100,
    marginVertical: 2,
  },
  btnContainer: {
    width: "95%",
    alignItems: "flex-end",
  },
  btnStyle: {
    width: 50,
    height: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.green,
  },
  btnTextStyle: {
    color: "#FFF",
  },
});
export default ProductDetails;
