import { MOVIES_URL } from "../constants.js";// import the constant USERS_URL
import { apiSlice } from "./apiSlice.js";// import apiSlice

export const movieApiSlice = apiSlice.injectEndpoints({ // inject endpoints into the apiSlice
    endpoints: (builder) => ({
        getTrendingMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/trending`,
            }),
            invalidatesTags: ["Movie"]
        }),
        getMovieTrailers: builder.query({
            query: (id) => ({
                url: `${MOVIES_URL}/${id}/trailers`,
            }),
            invalidatesTags: ["Movie"]
        }),
        getMovieDetails: builder.query({
            query: (movieId) => ({
                url: `${MOVIES_URL}/${movieId}/details`,
            }),
            invalidatesTags: ["Movie"]
        }),
        getSimilarMovies: builder.query({
            query: (movieId) => ({
                url: `${MOVIES_URL}/${movieId}/similar`,
            }),
            invalidatesTags: ["Movie"]
        }),
        getMoviesByCategory: builder.query({
            query: (category) => ({
                url: `${MOVIES_URL}/${category}`,
            }),
            invalidatesTags: ["Movie"]
        }),
    })

})

export const { useGetTrendingMoviesQuery, useGetMovieTrailersQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery, useGetMoviesByCategoryQuery } = movieApiSlice