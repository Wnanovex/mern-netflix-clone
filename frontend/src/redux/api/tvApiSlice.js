import { TV_URL } from "../constants.js";// import the constant USERS_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const tvApiSlice = apiSlice.injectEndpoints({ // inject endpoints into the apiSlice
    endpoints: (builder) => ({
        getTrendingTv: builder.query({
            query: () => ({
                url: `${TV_URL}/trending`,
            }),
            invalidatesTags: ["Tv"]
        }),
        getTvTrailers: builder.query({
            query: (id) => ({
                url: `${TV_URL}/${id}/trailers`,
            }),
            invalidatesTags: ["Tv"]
        }),
        getTvDetails: builder.query({
            query: (tvId) => ({
                url: `${TV_URL}/${tvId}/details`,
            }),
            invalidatesTags: ["Tv"]
        }),
        getSimilarTvs: builder.query({
            query: (tvId) => ({
                url: `${TV_URL}/${tvId}/similar`,
            }),
            invalidatesTags: ["Tv"]
        }),
        getTvsByCategory: builder.query({
            query: (category) => ({
                url: `${TV_URL}/${category}`,
            }),
            invalidatesTags: ["Tv"]
        }),
    })

})

export const {useGetTrendingTvQuery, useGetTvsByCategoryQuery, useGetTvTrailersQuery, useGetTvDetailsQuery, useGetSimilarTvsQuery} = tvApiSlice