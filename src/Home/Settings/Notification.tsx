import React from "react";
import { Box, Text, useTheme } from "../../components";
import { Switch } from "react-native";

interface NotificationProps {
  title: string;
  description: string;
  value: boolean;
  onChange: Function;
}

const Notification = ({
  title,
  description,
  value,
  onChange,
}: NotificationProps) => {
  const theme = useTheme();

  const handelOnChange = (val) => {
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Box flexDirection="row" marginBottom="m">
      <Box flex={1} justifyContent="center">
        <Text variant="title3">{title}</Text>
        <Text variant="body">{description}</Text>
      </Box>
      <Box paddingVertical="m">
        <Switch
          value={value}
          onValueChange={handelOnChange}
          trackColor={{
            true: theme.colors.primary,
            false: theme.colors.background2,
          }}
        />
      </Box>
    </Box>
  );
};

export default Notification;
