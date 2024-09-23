import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
   type: localStorage.getItem('contentType') ? localStorage.getItem('contentType') : "Movies"
}

const contentTypeSlice = createSlice({
    name: "contentType",
    initialState,
    reducers: {
        changeContentType: (state, action) => {
            state.type = action.payload;
            localStorage.setItem("contentType", action.payload);
        },
    },
});

export const { changeContentType } = contentTypeSlice.actions;

export default contentTypeSlice.reducer;