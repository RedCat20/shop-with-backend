import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {basePath} from "../../data/paths";

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: basePath+'/'
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<any, string>({
            query: () => `products`,
            providesTags: ['Product'],
        }),
        getProductById: builder.query<any, string>({
            query: (id) => `products/${id}`,
            providesTags: ['Product'],
        }),
        removeProductById: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (formData) => ({
                url: `/upload`,
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        addNewProduct: builder.mutation({
            query: (product) => ({
                url: `/products`,
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        changeSelectedProduct: builder.mutation({
            // @ts-ignore
            query: ({id, product}) => {
                console.log('query', id, product);
                return ({
                    url: `/products/${id}`,
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: product
                    //credentials: 'include',
                })
            },
            invalidatesTags: ['Product'],
            // Pick out data and prevent nested properties in a hook or selector
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductByIdMutation,
    useUploadProductImageMutation,
    useAddNewProductMutation,
    useChangeSelectedProductMutation
} = productsApi