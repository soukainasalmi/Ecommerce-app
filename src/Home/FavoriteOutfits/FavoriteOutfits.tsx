import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  Transitioning,
  Transition,
  TransitioningView,
} from "react-native-reanimated";
import { Box, Header, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import {
  getFavouriteproducts,
  removeFavouriteProducts,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import TopCurve from "./TopCurve";
import Outfit from "./Outfit";
import Footer from "./Footer";
import { isEmpty } from "../../utils/helper";

const { width: wWidth } = Dimensions.get("window");

const aspectRatios = [
  1,
  210 / 145,
  160 / 145,
  200 / 145,
  1,
  180 / 145,
  180 / 145,
  120 / 145,
];

const FavoritesOutfits = ({
  navigation,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const transition = (
    <Transition.Together>
      <Transition.Out type="fade" />
      <Transition.In type="fade" />
    </Transition.Together>
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const list = useRef<TransitioningView>(null);
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);
  const [products, setProducts] = useState([]);
  const favouriteProducts = useSelector(
    (state) => state.productReducer.favouriteProducts
  );

  useEffect(() => {
    dispatch(getFavouriteproducts());
  }, [navigation]);

  useEffect(() => {
    if (!isEmpty(favouriteProducts)) {
      setProducts(
        favouriteProducts?.map((value, index) => ({
          ...value,
          isSelected: false,
          aspectRatio: aspectRatios[index % aspectRatios.length],
        }))
      );
    }
  }, [favouriteProducts]);

  const handleOnSelect = (index, isSelected) => {
    const favProducts = [...products];
    favProducts[index].isSelected = !isSelected;

    setProducts(favProducts);
  };

  const handleOnRemove = () => {
    const productToUpdate = products.filter((item) => !item?.isSelected);
    dispatch(removeFavouriteProducts(productToUpdate));
  };
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Favorite Outfits"
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
        >
          <Transitioning.View ref={list} transition={transition}>
            <Box flexDirection="row">
              <Box marginRight="m">
                {products
                  ?.filter((_, i) => i % 2 !== 0)
                  ?.map((item, index) => (
                    <Outfit
                      key={index}
                      index={index * 2 + 1}
                      outfit={item}
                      width={width}
                      handleOnSelect={handleOnSelect}
                    />
                  ))}
              </Box>
              <Box>
                {products
                  ?.filter((_, i) => i % 2 === 0)
                  ?.map((item, index) => (
                    <Outfit
                      key={index}
                      index={index * 2}
                      outfit={item}
                      width={width}
                      handleOnSelect={handleOnSelect}
                    />
                  ))}
              </Box>
            </Box>
          </Transitioning.View>
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
          <Footer
            label="Remove from Favorites"
            onPress={() => {
              list.current?.animateNextTransition();
              handleOnRemove();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FavoritesOutfits;
