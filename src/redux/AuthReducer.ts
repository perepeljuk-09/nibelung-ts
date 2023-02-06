import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import { authApi } from "../api/axiosApi";

type responseType = {
        accessToken: string;
        refreshToken: string;
}

interface IinitialState {
    accessToken: string;
    refreshToken: string;
    isLoading: boolean;
}

export const logOutAsync = createAsyncThunk(
    'auth/logout',
    async (refreshToken: string, ThunkAPI) => {
        try {
            const res = await authApi.logout(refreshToken);
            return res.data
        } catch (e) {
            return ThunkAPI.rejectWithValue("Beda")
        }
    }
)

const initialState: IinitialState = {
    accessToken: '',
    refreshToken: '',
    isLoading: false,
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
            // setAuth: (state, action: PayloadAction<responseType> | PayloadAction<string>) => {
            //     if(action.payload.data.accessToken) {
            //         state.accessToken = action.payload.data.accessToken
            //         state.refreshToken = action.payload.data.refreshToken
            //     }
            // },
            setTokens: (state, action: PayloadAction<responseType>) => {
                    state.accessToken = action.payload.accessToken
                    state.refreshToken = action.payload.refreshToken
            },
            setLoadingOn: (state) => {
                state.isLoading = true
            },
            setLoadingOff: (state) => {
                state.isLoading = false
            }
    },
    extraReducers: {
        [logOutAsync.fulfilled.type]: (state) => {
            state.accessToken = ''
            state.refreshToken = ''
        }
    }
})

export const { setTokens, setLoadingOn, setLoadingOff } = authReducer.actions;

export default authReducer.reducer;
