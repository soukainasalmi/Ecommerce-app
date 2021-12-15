import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Text } from "../../components";
import CheckboxGroup from "./CheckboxGroup";
import RoundedCheckboxGroup from "./RoundedCheckboxGroup";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUserInfo } from "../../redux/actions/userActions";

const outfitType = [
  { value: "men", label: "For men" },
  { value: "women", label: "For women" },
  { value: "both", label: "For both" },
];

const sizes = [
  { value: "s" },
  { value: "m" },
  { value: "l" },
  { value: "xl" },
  { value: "xxl" },
];

const colors = [
  { value: "#0C0D34" },
  { value: "#FF0058" },
  { value: "#50B9DE" },
  { value: "#00D99A" },
  { value: "#FE5E33" },
];

const preferredBrands = [
  { value: "adidas", label: "Adidas" },
  { value: "nike", label: "Nike" },
  { value: "converse", label: "Converse" },
  { value: "tommy-hilfiger", label: "Tommy Hilfiger" },
  { value: "billionaire-boys-club", label: "Billionaire Boys Club" },
  { value: "jordan", label: "Jordan" },
  { value: "le-coq-sportif", label: "Le Coq Sportif" },
];

const InfoSchema = Yup.object().shape({
  preferred_wear: Yup.string().required("Required"),
  preferred_colors: Yup.array().required("Required"),
  preferred_brands: Yup.array().required("Required"),
  preferred_sizes: Yup.array().required("Required"),
});

const Configuration = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const { handleSubmit, errors, values, setValues, setFieldValue } = useFormik({
    validationSchema: InfoSchema,
    initialValues: {
      preferred_wear: "",
      preferred_colors: [],
      preferred_brands: [],
      preferred_sizes: [],
    },
    onSubmit: () => {
      dispatch(
        updateUserInfo(
          values,
          (success) => {
            alert("Successfully updated");
          },
          (error) => {
            alert("An error occured. Please try again later");
          }
        )
      );
    },
  });

  useEffect(() => {
    setValues({
      preferred_wear: user?.preferred_wear ? user?.preferred_wear : [],
      preferred_colors: user?.preferred_colors ? user?.preferred_colors : [],
      preferred_brands: user?.preferred_brands ? user?.preferred_brands : [],
      preferred_sizes: user?.preferred_sizes ? user?.preferred_sizes : [],
    });
  }, [user]);

  console.log("errors", errors);

  return (
    <ScrollView >
      <Box padding="m">
        <Text variant="body">What type of outfit you usually wear?</Text>
        <CheckboxGroup
          radio
          options={outfitType}
          selectedValues={[values.preferred_wear]}
          onChange={(value) => setFieldValue("preferred_wear", value[0])}
        />
        <Text variant="body">What is your clothing size?</Text>
        <RoundedCheckboxGroup
          options={sizes}
          selectedValues={values.preferred_sizes}
          onChange={(value) => setFieldValue("preferred_sizes", value)}
        />
        <Text variant="body">My preferred clothing colors</Text>
        <RoundedCheckboxGroup
          options={colors}
          valueIsColor
          selectedValues={values.preferred_colors}
          onChange={(value) => setFieldValue("preferred_colors", value)}
        />
        <Text variant="body">My preferred brands</Text>
        <CheckboxGroup
          options={preferredBrands}
          selectedValues={values.preferred_brands}
          onChange={(value) => setFieldValue("preferred_brands", value)}
        />
      </Box>

      <Box alignItems="center" marginTop="m" marginBottom="m">
        <Button label="Update" variant="primary" onPress={handleSubmit} />
      </Box>
    </ScrollView>
  );
};

export default Configuration;
