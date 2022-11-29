import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const bridges = JSON.parse(localStorage.getItem("bridges"));

const initialState = {

    bridges: bridges ? bridges : null,
    bridge: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getBridges = createAsyncThunk(
    'bridge/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.bridges(token, uuid)
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
export const createBridges = createAsyncThunk(
    'bridge/create',
    async (uuid, data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_bridges(token, uuid, data)
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

export const bridge = createSlice({
    name: 'bridge',
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
            .addCase(getBridges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBridges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bridges = action.payload
            })
            .addCase(getBridges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createBridges.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBridges.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bridge = action.payload
            })
            .addCase(createBridges.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = bridge.actions
export default bridge.reducer