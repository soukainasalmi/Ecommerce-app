import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Box, Button, Content, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Notification from "./Notification";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsSettings,
  updateNotificationsSettings,
} from "../../redux/actions/userActions";
import { isEmpty } from "../../utils/helper";

const SettingsSchema = Yup.object().shape({
  stock: Yup.boolean().default(false).required("Required"),
  new_stuff: Yup.boolean().default(false).required("Required"),
  outfit_ideas: Yup.boolean().default(false).required("Required"),
  discounts_sales: Yup.boolean().default(false).required("Required"),
});

const Settings = ({ navigation }: HomeNavigationProps<"Settings">) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.userReducer.notifications);

  const { handleSubmit, values, setFieldValue, setValues } = useFormik({
    validationSchema: SettingsSchema,
    initialValues: {
      stock: false,
      new_stuff: false,
      outfit_ideas: false,
      discounts_sales: false,
    },
    onSubmit: () => {
      dispatch(
        updateNotificationsSettings(
          values,
          () => {
            alert("Successfully Updated");
          },
          () => {
            alert("An error occured. Please try again later");
          }
        )
      );
    },
  });

  useEffect(() => {
    dispatch(getNotificationsSettings());
  }, [navigation]);

  useEffect(() => {
    if (!isEmpty(notifications)) {
      setValues({
        ...notifications,
      });
    }
  }, [notifications]);

  return (
    <Content>
      <Box backgroundColor="background">
        <Header
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          title="Notifications"
        />
        <Box padding="m">
          <Notification
            title="Discounts & Sales"
            value={values.discounts_sales}
            description="Buy the stuff you love for less"
            onChange={(value) => setFieldValue("discounts_sales", value)}
          />
          <Notification
            title="New Stuff"
            value={values.new_stuff}
            description="Hear it first, wear it first"
            onChange={(value) => setFieldValue("new_stuff", value)}
          />
        </Box>
        <Box alignItems="center" marginTop="m" marginBottom="m">
          <Button label="Update" variant="primary" onPress={handleSubmit} />
        </Box>
      </Box>
    </Content>
  );
};

export default Settings;
