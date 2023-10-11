import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/axiosApi';
import { isAxiosError } from 'axios';

interface IinitialState {
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

export const logOutAsync = createAsyncThunk(
    'auth/logout',
    async (refreshToken: string, ThunkAPI) => {
        try {
            const res = await authApi.logout(refreshToken);
            return res.data;
        } catch (e) {
            if (isAxiosError(e)) console.log('e >>>', e);
            return ThunkAPI.rejectWithValue('Beda');
        }
    }
);

const initialState: IinitialState = {
    isAuth: false,
    isLoading: false,
    error: '',
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setLoadingOn: (state) => {
            state.isLoading = true;
        },
        setLoadingOff: (state) => {
            state.isLoading = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
    }
});

export const { setLoadingOn, setLoadingOff, setError, setAuth } = authReducer.actions;

export default authReducer.reducer;
