import { createSlice} from "@reduxjs/toolkit";


interface IinitialRegistrationState {
    isLoading: boolean;
}

const initialState: IinitialRegistrationState = {
    isLoading: false,
}


const registrationReducer = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setLoadingOn: (state) => {
                state.isLoading = true
        },
        setLoadingOff: (state) => {
                state.isLoading = false
        },
    }
})

export const {setLoadingOff, setLoadingOn} = registrationReducer.actions;

export default registrationReducer.reducer;