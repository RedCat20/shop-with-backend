import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
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
    }),
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductByIdMutation,
    useUploadProductImageMutation,
    useAddNewProductMutation} = productsApi