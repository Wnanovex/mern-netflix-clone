import { AUTH_URL } from "../constants.js";// import the constant USERS_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const authApiSlice = apiSlice.injectEndpoints({ // inject endpoints into the apiSlice
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logoutApiCall: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
    })

})

export const { useSignupMutation, useLoginMutation, useLogoutApiCallMutation } = authApiSlice