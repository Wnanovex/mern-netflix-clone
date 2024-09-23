import { configureStore } from "@reduxjs/toolkit";// import { configureStore } 
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js"; // import authReducer
import contentTypeReducer  from "./features/contentType/contentTypeSlice.js"; // import contentTypeReducer

const store = configureStore({ // create a store
    reducer: { // create a reducer function or define a reducers functions
        [apiSlice.reducerPath]: apiSlice.reducer,// apiSlice.reducerPath === apiSlice.reducer
        auth: authReducer,
        contentType: contentTypeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),// use middleware to manages cache lifetimes and expiration.
    devTools: true,// Starting the redux extension in browser \\ false-> interdictions to access the redux extension in browser because anyone can see my data
});


export default store;// export store