import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const vlans = localStorage.getItem("vlans");

const initialState = {

    vlans: vlans ? JSON.parse(vlans) : null,
    vlan: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getVlans = createAsyncThunk(
    'vlan/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.vlans(token, uuid)
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
export const createVlans = createAsyncThunk(
    'vlan/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_vlans(token, payload.uuid, payload.data)
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
export const removeVlans = createAsyncThunk(
    'vlan/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_vlans(token, payload.uuid, payload.id)
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

export const vlan = createSlice({
    name: 'vlan',
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
            .addCase(getVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vlans = action.payload
            })
            .addCase(getVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vlan = action.payload
            })
            .addCase(createVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeVlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeVlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeVlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = vlan.actions
export default vlan.reducer