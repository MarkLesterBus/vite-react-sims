import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const users = localStorage.getItem("users");
const user_profile = localStorage.getItem("user_profile");

const initialState = {

    users: users ? JSON.parse(users) : null,
    user_profile: user_profile ? JSON.parse(user_profile) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getUsers = createAsyncThunk(
    'users/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.users(token, uuid)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createUser = createAsyncThunk(
    'users/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.add_user(token, payload.uuid, payload.data)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const removeUser = createAsyncThunk(
    'users/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_user(token, payload.uuid, payload.id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getUserProfile = createAsyncThunk(
    'users/profile/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.user_profile(token, uuid)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createUserProfile = createAsyncThunk(
    'users/profile/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.add_user_profile(token, payload.uuid, payload.data,)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const removeUserProfile = createAsyncThunk(
    'users/profile/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_user_profile(token, payload.uuid, payload.id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const voucher = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        reset: (state) => {

            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.interfaces = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.interfaces = action.payload
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(removeUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeUserProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeUserProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = voucher.actions
export default voucher.reducer