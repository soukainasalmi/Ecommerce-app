import React, { useEffect, useReducer } from "react";
import { HomeNavigationProps } from "../../components/Navigation";
import {
  getOutFitIdeas,
  searchOutFitIdeas,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, Text } from "react-native";
import { useTiming } from "react-native-redash";
import { Box, Header } from "../../components";
import { isEmpty } from "../../utils/helper";
import Background from "./Background";
import Categories from "./Categories";
import { Searchbar } from "react-native-paper";
import Card from "./Card";

const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const dispatch = useDispatch();
  const { products, selectedCategories } = useSelector(
    (state) => state.productReducer
  );
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      categories: [
        {
          id: "newin",
          title: "New In",
          color: "#FFDDDD",
          selected: false,
        },
        {
          id: "summer",
          title: "Summer",
          color: "#BEECC4",
          selected: false,
        },
        {
          id: "activewear",
          title: "Active Wear",
          color: "#BFEAF5",
          selected: false,
        },
        {
          id: "outlet",
          title: "Outlet",
          color: "#F1E0FF",
          selected: false,
        },
        {
          id: "accesories",
          title: "Accesories",
          color: "#FFE8E9",
          selected: false,
        },
      ],
      products: [],
      selectedCategories: ["newin"],
      currentIndex: 0,
    }
  );

  const aIndex = useTiming(state.currentIndex);

  useEffect(() => {
    if (selectedCategories?.length) {
      dispatch(getOutFitIdeas(selectedCategories));
    } else {
      dispatch(getOutFitIdeas(state.selectedCategories));
    }
  }, []);

  useEffect(() => {
    setState({
      currentIndex: 0,
      products: !isEmpty(products) ? products : [],
      selectedCategories: !isEmpty(selectedCategories)
        ? selectedCategories
        : [],
      categories: state.categories.map((value) => {
        if (selectedCategories?.indexOf(value.id) !== -1) {
          return {
            ...value,
            selected: true,
          };
        }

        return value;
      }),
    });
  }, [products, selectedCategories]);

  const handleOnChangeCategory = (index) => {
    const _categories = [...state.categories];
    _categories[index].selected = !_categories[index].selected;
    let _selectedCategory = _categories
      .filter((value) => value.selected)
      .map((value) => value.id);

    if (_selectedCategory.length) {
      dispatch(getOutFitIdeas(_selectedCategory));
    }
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const handleOnSearch = () => {
    dispatch(searchOutFitIdeas(searchQuery));
  };

  return (
    <Box backgroundColor="background">
      <Header
        title="Outfit Ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-bag",
          onPress: () => navigation.navigate("Cart"),
        }}
      />

      <Categories
        categories={state.categories}
        onChange={handleOnChangeCategory}
      />
      <Box>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={handleOnSearch}
        />
      </Box>
      <Box>
        <Background />
        {state.products?.map(
          (item, index) =>
            state.currentIndex < index  && (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productDetail: item,
                  });
                }}
                style={{ backgroundColor: "white", width: 420, height: 700 }}
              >
                <Card
                  index={index}
                  aIndex={aIndex}
                  //step={step}
                  //onSwipe={() => {}}
                  onSwipe={(index) => setState({ currentIndex: index })}
                  source={{ uri: item.data?.image }}
                />
                <Box alignSelf={"center"} alignItems={"center"}>
                  <Text>{item.data?.name}</Text>
                  <Text>{item.data?.price}</Text>
                </Box>
              </TouchableOpacity>
            )
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;