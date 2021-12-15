import actionsTypes from "../types";
import { db } from "../../config/firebase";
import moment from "moment";

let graphColors = [
  "primary",
  "primaryLight",
  "secondary",
  "danger",
  "info",
  "background",
  "graph1",
  "graph2",
  "drawer1",
  "drawer2",
  "drawer3",
  "drawer4",
];

export const updateUserInfo =
  (data, response, reject) => (dispatch, getState) => {
    const user = getState().userReducer.user;

    dispatch({
      type: actionsTypes.LOADING_START,
    });

    db.collection("users")
      .doc(user.uid)
      .update(data)
      .then((success) => {
        dispatch({
          type: actionsTypes.UPDATE_USER_INFO_SUCCESS,
          payload: {
            user: {
              ...user,
              ...data,
            },
          },
        });
        response();
      })
      .catch((error) => {
        alert(error.message);
        dispatch({
          type: actionsTypes.UPDATE_USER_INFO_ERROR,
        });
        reject();
      });
  };

export const getNotificationsSettings = () => (dispatch, getState) => {
  const user = getState().userReducer.user;

  dispatch({
    type: actionsTypes.LOADING_START,
  });

  db.collection("notifications")
    .doc(user.uid)
    .get()
    .then((doc) => {
      dispatch({
        type: actionsTypes.GET_NOTICATION_SETTING_SUCCESS,
        payload: {
          notifications: doc.data(),
        },
      });
    })
    .catch((error) => {
      alert(error.message);
      dispatch({
        type: actionsTypes.GET_NOTICATION_SETTING_ERROR,
        payload: {
          notifications: null,
        },
      });
    });
};

export const updateNotificationsSettings =
  (data, response, reject) => (dispatch, getState) => {
    const user = getState().userReducer.user;

    console.log("updateNotificationsSettings", { data, user });

    dispatch({
      type: actionsTypes.LOADING_START,
    });

    db.collection("notifications")
      .doc(user.uid)
      .set(data)
      .then((success) => {
        dispatch({
          type: actionsTypes.UPDATE_NOTICATION_SETTING_SUCCESS,
        });
        response();
      })
      .catch((error) => {
        alert(error.message);
        dispatch({
          type: actionsTypes.UPDATE_NOTICATION_SETTING_ERROR,
        });
        reject();
      });
  };

export const userLogout = (response, reject) => (dispatch) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  dispatch({
    type: actionsTypes.LOGOUT_SUCCESS,
  });
};

export const getTransactionHistory = () => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  const user = getState().userReducer.user;

  db.collection("payments")
    .where("uid", "==", user.uid)
    .orderBy("date", "asc")
    .get()
    .then((resp) => {
      //console.log("getTransactionHistory ===>", resp);

      let dates = [];
      let payments = [];
      let graphData = [];

      resp.forEach((element, index) => {
        let data = element.data();
        console.log("here the data : " + data);
        let date = moment(data.date).format("YYYY-MM-DD");

        dates.push(moment(date).format("YYYY-MM-DD"));
        payments.push({
          ...data,
          color: graphColors[Math.round(Math.random() * graphColors.length)],
        });
      });

      dates = [...new Set(dates)];

      dates.forEach((date, index) => {
        let data = {
          date: new Date(date).getTime(),
          value: 0,
          color: graphColors[Math.round(index % graphColors.length)],
          id: index,
        };

        payments.forEach((payment) => {
          if (moment(payment.date).format("YYYY-MM-DD") == date) {
            data.value += Number(payment.total);
          }
        });

        graphData.push(data);
      });

      dispatch({
        type: actionsTypes.GET_TRANSACTION_HISTORY_SUCCESS,
        payload: {
          payments,
          graphData,
        },
      });
    })
    .catch((error) => {
      //console.log("getTransactionHistory ===>", error);
      dispatch({
        type: actionsTypes.LOADING_END,
      });
    });
};

export const addPaymentCard = (item, response) => (dispatch, getState) => {
  const paymentCards = getState().userReducer.paymentCards;
  paymentCards.push(item);

  dispatch({
    type: actionsTypes.ADD_PAYMENT_CARD_SUCCESS,
    payload: {
      paymentCards,
    },
  });

  response();
};

export const changeDeliveryAddress = (address, response) => (dispatch) => {
  dispatch({
    type: actionsTypes.CHANGE_DELIVERY_ADDRESS_SUCCESS,
    payload: {
      deliveryAddress: address,
    },
  });

  response();
};

export const AddPayment = (data, response) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  const user = getState().userReducer.user;

  db.collection("payments")
    .add({
      ...data,
      uid: user.uid,
      order_id: id.random,
    })
    .then((resp) => {
      console.log("AddPayment resp", resp);
      alert("Payment has been successfully added");
      response();
    })
    .catch((error) => {
      dispatch({
        type: actionsTypes.ADD_TO_PAYMENTS_ERROR,
      });
    });
};
