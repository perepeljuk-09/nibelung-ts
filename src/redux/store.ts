import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer';
import registrationReducer from './RegistrationReducer';
import UserReducer from './UserReducer';
import PostPageReducer from './PostPageReducer';
import PostsPageReducer from './PostsPageReducer';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        registration: registrationReducer,
        user: UserReducer,
        postPage: PostPageReducer,
        postsPage: PostsPageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
