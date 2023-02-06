import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import registrationReducer from "./RegistrationReducer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        registration: registrationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
