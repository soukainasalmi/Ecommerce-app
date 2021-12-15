import actionsTypes from "../types";
import { db } from "../../config/firebase";

export const getOutFitIdeas = (categories) => (dispatch) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  db.collection("products")
    .where("category", "in", categories)
    .get()
    .then((response) => {
      let products = [];

      response.forEach((doc) => {
        products.push({
          docId: doc.id,
          data: doc.data(),
        });
      });

      console.log("getOutFitIdeas", { products: products?.length });

      dispatch({
        type: actionsTypes.GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          selectedCategories: categories,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionsTypes.GET_PRODUCTS_ERROR,
      });
    });
};

export const addToFavourite = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  const user = getState().userReducer.user;
  const favourites = user.favourites;
  favourites.push(productId);

  db.collection("users")
    .doc(user.uid)
    .update({
      favourites,
    })
    .then((response) => {
      console.log("addToFavourite response", response);

      dispatch({
        type: actionsTypes.ADD_TO_FAVOURITE_SUCCESS,
        payload: {
          user: {
            ...user,
            favourites,
          },
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionsTypes.ADD_TO_FAVOURITE_ERROR,
      });
    });
};

export const removeToFavourite = (productId) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  const user = getState().userReducer.user;
  const favourites = user.favourites.filter((value) => value !== productId);

  console.log("removeToFavourite favourites", {
    favourites,
  });

  db.collection("users")
    .doc(user.uid)
    .update({
      favourites,
    })
    .then((response) => {
      console.log("removeToFavourite response", response);

      dispatch({
        type: actionsTypes.ADD_TO_FAVOURITE_SUCCESS,
        payload: {
          user: {
            ...user,
            favourites,
          },
        },
      });
    })
    .catch((error) => {
      console.log("removeToFavourite error", error);

      dispatch({
        type: actionsTypes.ADD_TO_FAVOURITE_ERROR,
      });
    });
};

export const getFavouriteproducts = () => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  console.log("getFavouriteproducts called");

  let favouriteProducts = [];
  const user = getState().userReducer.user;

  let favourites = user.favourites.map((value) =>
    db.collection("products").doc(value).get()
  );

  Promise.all(favourites)
    .then((response) => {
      response.forEach((doc) => {
        favouriteProducts.push({
          docId: doc.id,
          data: doc.data(),
        });
      });

      console.log("GET_FAVOURITE_PRODUCT_SUCCESS ===>", favouriteProducts);

      dispatch({
        type: actionsTypes.GET_FAVOURITE_PRODUCT_SUCCESS,
        payload: {
          favouriteProducts,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionsTypes.GET_FAVOURITE_PRODUCT_ERROR,
      });
    });
};

export const removeFavouriteProducts = (products) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  const user = getState().userReducer.user;

  db.collection("users")
    .doc(user.uid)
    .update({
      favourites: products.map((value) => value.docId),
    })
    .then((response) => {
      console.log("removeFavouriteProducts response", response);

      dispatch({
        type: actionsTypes.GET_FAVOURITE_PRODUCT_SUCCESS,
        payload: {
          favouriteProducts: products,
        },
      });

      dispatch({
        type: actionsTypes.UPDATE_USER_INFO_SUCCESS,
        payload: {
          user: {
            ...user,
            favourites: products.map((value) => value.docId),
          },
        },
      });
    })
    .catch((error) => {
      console.log("removeFavouriteProducts error", error);

      dispatch({
        type: actionsTypes.GET_FAVOURITE_PRODUCT_ERROR,
      });
    });
};

export const productAddToCart = (item) => (dispatch, getState) => {
  const cartItems = getState().productReducer.cartItems;

  let index = cartItems.indexOf(
    (value) => value.product_id === item.product_id
  );

  if (index !== -1) {
    cartItems[index].quantity += 1;
  } else {
    cartItems.push({
      ...item,
      quantity: 1,
    });
  }

  dispatch({
    type: actionsTypes.ADD_TO_CART_SUCCESS,
    payload: {
      cartItems,
    },
  });
};

export const productRemoveFromCart = (productId) => (dispatch, getState) => {
  const cartItems = getState().productReducer.cartItems;

  dispatch({
    type: actionsTypes.LOADING_START,
  });

  let filterCartItems = cartItems.filter(
    (item) => item.product_id != productId
  );

  dispatch({
    type: actionsTypes.REMOVE_FROM_CART_SUCCESS,
    payload: {
      cartItems: filterCartItems,
    },
  });

  dispatch({
    type: actionsTypes.LOADING_END,
  });
};

export const updateProductCart = (index, quantity) => (dispatch, getState) => {
  let cartItems = getState().productReducer.cartItems;

  dispatch({
    type: actionsTypes.LOADING_START,
  });

  if (quantity) {
    cartItems[index].quantity = quantity;
  } else {
    cartItems = cartItems.filter((item, indx) => indx !== index);
  }

  dispatch({
    type: actionsTypes.UPDATE_CART_SUCCESS,
    payload: {
      cartItems,
    },
  });

  dispatch({
    type: actionsTypes.LOADING_END,
  });
};

export const submitReview =
  (data, response, reject) => (dispatch, getState) => {
    dispatch({
      type: actionsTypes.LOADING_START,
    });

    const user = getState().userReducer.user;

    db.collection("reviews")
      .add({
        ...data,
        uid: user.uid,
        name: user.name,
        date: new Date().toUTCString(),
      })
      .then((resp) => {
        console.log("submitReview resp", resp);
        alert("Review has been successfully added");
        response();
      })
      .catch((error) => {
        dispatch({
          type: actionsTypes.ADD_TO_FAVOURITE_ERROR,
        });
        reject();
      });
  };

export const getProductReviews =
  (productId, response, reject) => (dispatch, getState) => {
    dispatch({
      type: actionsTypes.LOADING_START,
    });

    let reviews = [];

    db.collection("reviews")
      .where("product_id", "==", productId)
      .get()
      .then((resp) => {
        resp.forEach((doc) => {
          reviews.push(doc.data());
        });
        response(reviews);
      })
      .catch((error) => {
        reject(error.message);
      });
  };

export const searchOutFitIdeas = (text) => (dispatch) => {
  dispatch({
    type: actionsTypes.LOADING_START,
  });

  db.collection("products")
    .get()
    .then((response) => {
      let products = [];

      response.forEach((doc) => {
        if (doc.data()?.name?.toLowerCase().indexOf(text.toLowerCase()) != -1) {
          products.push({
            docId: doc.id,
            data: doc.data(),
          });
        }
      });

      console.log("searchOutFitIdeas", {
        products,
        productCounts: products?.length,
      });

      dispatch({
        type: actionsTypes.GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          selectedCategories: [],
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: actionsTypes.GET_PRODUCTS_ERROR,
      });
    });
};
