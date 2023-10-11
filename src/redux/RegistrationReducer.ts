import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface IinitialRegistrationState {
    isLoading: boolean;
    error: string;
}

const initialState: IinitialRegistrationState = {
    isLoading: false,
    error: '',
};


const registrationReducer = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setLoadingOn: (state) => {
            state.isLoading = true;
        },
        setLoadingOff: (state) => {
            state.isLoading = false;
        },
        setError: (state, value: PayloadAction<string>) => {
            state.error = value.payload;
        },
        cleanError: (state) => {
            state.error = '';
        },
    }
});

export const { setLoadingOff, setLoadingOn, setError, cleanError } = registrationReducer.actions;

export default registrationReducer.reducer;