import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import registrationReducer from "./RegistrationReducer";
import UserReducer from "./UserReducer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        registration: registrationReducer,
        user: UserReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
