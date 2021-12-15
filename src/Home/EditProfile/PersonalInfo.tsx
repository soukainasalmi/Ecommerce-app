import React, { useRef, useEffect } from "react";
import { Box, Button, Text } from "../../components";
import { TextInput as RNTextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { updateUserInfo } from "../../redux/actions/userActions";
import TextInput from "../../components/Form/TextInput";
import CheckboxGroup from "./CheckboxGroup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const InfoSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
});

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const address = useRef<RNTextInput>(null);
  const user = useSelector((state) => state.userReducer.user);

  const {
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    validationSchema: InfoSchema,
    initialValues: { name: "", email: "", address: "", gender: "" },
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
      name: user?.name ? user?.name : "",
      email: user?.email ? user?.email : "",
      address: user?.address ? user?.address : "",
      gender: user?.gender ? user?.gender : "",
    });
  }, [user]);

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Account Information
        </Text>
        <Box marginBottom="m">
          <TextInput
            icon="user"
            placeholder="Name"
            autoCapitalize="none"
            error={errors.name}
            touched={touched.name}
            value={values.name}
            onChangeText={(text) => setFieldValue("name", text)}
            onBlur={handleBlur("name")}
            onSubmitEditing={() => address.current?.focus()}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Email"
            autoCapitalize="none"
            editable={false}
            value={values.email}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            ref={address}
            icon="map-pin"
            placeholder="Address"
            error={errors.address}
            value={values.address}
            onChangeText={(text) => setFieldValue("address", text)}
          />
        </Box>
        <CheckboxGroup
          radio
          selectedValues={[values.gender]}
          options={genders}
          onChange={(text) => setFieldValue("gender", text[0])}
        />
      </Box>
      <Box alignItems="center" marginTop="m" marginBottom="m">
        <Button label="Update" variant="primary" onPress={handleSubmit} />
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
