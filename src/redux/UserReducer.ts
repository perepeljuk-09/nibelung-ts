import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserDataInitialState } from "../types/types";
import { userApi } from "../api/axiosApi";

export const getUserData = createAsyncThunk(
    'get/userdata',
    async (id: number, ThunkAPI) => {
        try {
            const response = await userApi.getUserData(id)
            if(response.status !== 200) {
                throw new Error("ne segodnja")
            }
            return response.data
        } catch (e) {
            return ThunkAPI.rejectWithValue(e)
        }
        
    })

const initialState: IUserDataInitialState = {
    id: null,
    firstName: null,
    lastName: null,
    lastActivity: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // this code is working
        // setUserData: (state, action: PayloadAction<IUserDataInitialState>) => {
        //     state = action.payload
        // }
    },
    extraReducers: {
        [getUserData.pending.type]: (state) => {
            state.isLoading = true
        }, 
        [getUserData.rejected.type]: (state, action) => {
            state.isLoading = false
            state.errorMessage = action.payload
        }, 
        [getUserData.fulfilled.type]: (state, action: PayloadAction<IUserDataInitialState>) => {
            state.isLoading = false
            console.log(action.payload, " <<< userDATA")
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.lastActivity = action.payload.lastActivity
            
            // why is don't working
            //state = action.payload
        } 
    }
})

// const { } = userSlice.actions;

export default userSlice.reducer;