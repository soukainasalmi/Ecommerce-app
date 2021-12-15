import React from "react";
import { ScrollView, View } from "react-native";
import Category from "./Category";

interface CategoryProps {
  onChange: Function;
  categories: [
    {
      id: string;
      title: string;
      color: string;
      selected: boolean;
    }
  ];
}

const Categories = ({ onChange, categories }: CategoryProps) => {
  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {categories.map((category, index) => (
          <Category
            key={category.id}
            index={index}
            category={category}
            setSelected={() => onChange(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
