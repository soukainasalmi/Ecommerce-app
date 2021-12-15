import React from "react";
import { Image, View } from "react-native";

import { Box, Text } from "../../components";

import CardLayout from "./CardLayout";

export enum CardType {
  VISA,
  MASTERCARD,
}

export interface CardModel {
  id: number;
  type: CardType;
  last4Digits: number;
  expiration: string;
}

interface CardProps {
  card: {
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
  };
  selected: boolean;
  onSelect: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const visaLogo = require("./assets/visa-logo.png");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const masterCardLogo = require("./assets/mastercard-logo.png");

const Card = ({ card, selected, onSelect }: CardProps) => {
  const getCardNumber = () => {
    let cardNumber = "****";
    cardNumber += card?.cardNumber?.substring(card?.cardNumber.length - 4);
    return cardNumber;
  };

  return (
    <CardLayout
      onPress={onSelect}
      backgroundColor={selected ? "primary" : "background"}
    >
      {/* <View style={{ height: 20 }}>
        <Image
          style={
            card.type === CardType.VISA
              ? { width: 39, height: 13 }
              : { width: 32.5, height: 20 }
          }
          source={card.type === CardType.VISA ? visaLogo : masterCardLogo}
        />
      </View> */}
      <Text
        variant="title3"
        marginTop="s"
        // marginBottom="s"
        color={selected ? "background" : "text"}
      >
        {card.cardHolderName}
      </Text>
      <Text variant="title3" color={selected ? "background" : "text"}>
        {getCardNumber()}
      </Text>
      <Box>
        <Text opacity={0.5}>Expiration</Text>
        <Text color={selected ? "background" : "text"}>{card.expiryDate}</Text>
      </Box>
    </CardLayout>
  );
};

export default Card;
