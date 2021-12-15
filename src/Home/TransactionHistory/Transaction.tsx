import React from "react";
import moment from "moment";
import { Box, Text } from "../../components";
import { DataPoint } from "./Graph";

interface TransactionProps {
  transaction: DataPoint;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <Box
      marginTop="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Box
            backgroundColor={transaction.color}
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          />
          <Text variant="title3">{`#${transaction.order_id}`}</Text>
        </Box>
        <Text color="info">{`$${transaction.total} - ${moment(
          transaction.date
        ).format("DD MMMM, YYYY")}`}</Text>
      </Box>
    </Box>
  );
};

export default Transaction;
