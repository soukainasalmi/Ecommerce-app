import actionsTypes from "../types";
import { auth, db } from "../../config/firebase";

export const userLogin = (data, response, reject) => (dispatch) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then((userCredentials) => {
      db.collection("users")
        .doc(userCredentials.user.uid)
        .get()
        .then((doc) => {
          //console.log("Login success", { doc });
          dispatch({
            type: actionsTypes.LOGIN_SUCCESS,
            payload: {
              user: {
                ...doc.data(),
                rememberMe: data.rememberMe,
              },
            },
          });
          response();
        })
        .catch((error) => {
          console.log("Login Error", { error });
          dispatch({
            type: actionsTypes.LOGIN_ERROR,
            payload: {
              user: {
                rememberMe,
              },
            },
          });
          reject(error);
        });
    })
    .catch((error) => {
      console.log("Login Error", { error });
      dispatch({
        type: actionsTypes.LOGIN_ERROR,
      });
      reject(error);
    });
};

export const userRegistration = (data, response, reject) => (dispatch) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredentials) => {
      db.collection("users")
        .doc(userCredentials.user.uid)
        .set({
          email: data.email,
          uid: userCredentials.user.uid,
          favourites: [],
        })
        .then((success) => {
          console.log("createUserWithEmailAndPassword Error", { success });
          dispatch({
            type: actionsTypes.CREATE_USER_ACCOUNT_SUCCESS,
          });
          response();
        })
        .catch((error) => {
          alert(error.message);
          console.log("createUserWithEmailAndPassword Error", { error });

          dispatch({
            type: actionsTypes.CREATE_USER_ACCOUNT_ERROR,
          });
          reject();
        });
    })
    .catch((error) => {
      alert(error.message);
      console.log("createUserWithEmailAndPassword Error", { error });

      dispatch({
        type: actionsTypes.CREATE_USER_ACCOUNT_ERROR,
      });
      reject(error);
    });
};

export const userLogout = () => (dispatch) => {
  // alert("afasfsd");
  // dispatch({
  //   type: actionsTypes.LOADING_START,
  // });

  dispatch({
    type: actionsTypes.LOGOUT_SUCCESS,
  });
};
