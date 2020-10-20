// #region Global Imports
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// #endregion Global Imports

// #region Local Imports

import Reducers from "./Reducers";
// #endregion Local Imports

export const makeStore = (initialState: {}) => {
    // const { pathname } = window.location;
    // const businessSlug = pathname.split("/")[1];
    const persistConfig = {
        key: `anar:state`,
        storage,
    };
    const store = createStore(
        persistReducer(persistConfig, Reducers),
        initialState,
        compose(applyMiddleware(thunkMiddleware))
    );

    return store;
};
