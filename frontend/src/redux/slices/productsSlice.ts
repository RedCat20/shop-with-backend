// @ts-nocheck

import {createSlice} from "@reduxjs/toolkit";

interface IState {
    products: any[];
    status: string;
}

const initialState: IState = {
    products: [],
    status: 'loading'
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: { },
    extraReducers: { }
});

export const productsReducer = productsSlice.reducer;