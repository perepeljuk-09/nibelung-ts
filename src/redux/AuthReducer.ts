import { createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IinitialState {
    token: string;
    refreshToken: string;
    isLoading: boolean;
}

const initialState: IinitialState = {
    token: 's',
    refreshToken: '',
    isLoading: false,
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
            setAuth: (state, action: PayloadAction<string>) => {
                state.token = action.payload
            },
            setLoadingOn: (state) => {
                state.isLoading = true
            },
            setLoadingOff: (state) => {
                state.isLoading = false
            }
    }
})

export const { setAuth, setLoadingOn, setLoadingOff } = authReducer.actions;

export default authReducer.reducer;
