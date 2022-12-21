import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import instanse from "../../axios";
import {IUser} from "../../interfaces/user.interface";
import {RootState} from "../store";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async(params) => {
    // console.log('params', params)
    const {data} = await instanse.post('http://localhost:5000/auth', params);
    // console.log('auth user data: ', data);
    return data;
});

export const fetchUserProfileData = createAsyncThunk('auth/fetchUserProfileData', async() => {
    const {data} = await instanse.get('http://localhost:5000/profile');
    return data;
});

export const fetchUserRegistry = createAsyncThunk('auth/fetchUserRegistry', async(params) => {
    // console.log('params', params)
    const {data} = await instanse.post('http://localhost:5000/registry', params);
    // console.log('registered user data: ', data);
    return data;
});

interface IState {
    userData: IUser | null;
    status: string;
}

const initialState: IState = {
    userData: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userData = null;
            state.status = 'loaded';
        }
    },
    extraReducers: {
        [fetchUserData.pending.toString()]: (state: IState) => {
            state.status = 'loading';
            //state.userData = null;
        },
        [fetchUserData.fulfilled.toString()]: (state: IState, action: PayloadAction<IUser>) => {
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchUserData.rejected.toString()]: (state: IState) => {
            state.status = 'error';
            state.userData = null;
        },

        [fetchUserProfileData.pending.toString()]: (state: IState) => {
            state.status = 'loading';
            //state.userData = null;
        },
        [fetchUserProfileData.fulfilled.toString()]: (state: IState, action: PayloadAction<IUser>) => {
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchUserProfileData.rejected.toString()]: (state: IState) => {
            state.status = 'error';
            state.userData = null;
        },

        [fetchUserRegistry.pending.toString()]: (state: IState) => {
            state.status = 'loading';
            //state.userData = null;
        },
        [fetchUserRegistry.fulfilled.toString()]: (state: IState, action: PayloadAction<IUser>) => {
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchUserRegistry.rejected.toString()]: (state: IState) => {
            state.status = 'error';
            state.userData = null;
        },
    }
});

export const userData = (state: RootState) => state.auth.userData;
export const isAuthUser = (state: RootState) => Boolean(state.auth.userData);

export const {logoutUser} = authSlice.actions;

export const authReducer = authSlice.reducer;