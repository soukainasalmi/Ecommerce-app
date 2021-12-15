import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Header,
  Text,
  makeStyles,
  ScrollableContent,
} from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";
import { userLogout } from "../../redux/actions/authActions";
import { getTransactionHistory } from "../../redux/actions/userActions";
import Graph, { DataPoint } from "./Graph";
import Transaction from "./Transaction";

const footerHeight = Dimensions.get("window").width / 3;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

let startDate = new Date("2019-10-01").getTime();
const numberOfMonths = 6;

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { payments, graphData } = useSelector((state) => state.userReducer);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleOnGetTransactionHistory();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("{ payments, graphData }", { payments, graphData });

  const handleOnGetTransactionHistory = () => {
    dispatch(getTransactionHistory());
  };

  const getTotal = () => {
    let total = 0;
    payments?.forEach((payment) => {
      total += Number(payment.total);
    });

    return total;
  };

  if (graphData?.length) {
    startDate = graphData[0].date;
  }

  return (
    <ScrollableContent>
      <Box flex={1} backgroundColor="background">
        <Header
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          title="Transaction History"
        />
        {!isLoading && (
          <Box padding="m" flex={1}>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Box>
                <Text variant="header" color="secondary" opacity={0.3}>
                  TOTAL SPENT
                </Text>
                <Text variant="title1">${getTotal()}</Text>
              </Box>
            </Box>
            <Graph
              data={graphData?.length ? graphData : []}
              startDate={startDate}
              numberOfMonths={numberOfMonths}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {payments?.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ScrollView>
          </Box>
        )}
      </Box>
    </ScrollableContent>
  );
};

export default TransactionHistory;
