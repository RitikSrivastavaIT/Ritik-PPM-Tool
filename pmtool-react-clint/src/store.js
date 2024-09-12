// import { applyMiddleware, compose } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
// import rootReducer from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers"; // Adjust the path as needed

const initialState = {};

const store = configureStore({
  reducer: rootReducer, // Use the root reducer
  preloadedState: initialState, // Set the initial state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
  devTools: window.navigator.userAgent.includes("Chrome"), // Enable Redux DevTools only for Chrome
});

export default store;

// const initialState = {};
// const middleware = [thunk];
// let store;
// if (window.navigator.userAgent.includes("Chrome")) {
//   store = configureStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(...middleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// } else {
//   store = configureStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//   );
// }
// export default store;
