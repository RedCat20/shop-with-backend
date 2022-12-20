import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces/product.interface";
// import store from "../store";

interface IState {
    products: IProduct[];
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

// export type RootState = ReturnType<typeof store.getState>;