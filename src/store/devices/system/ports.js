import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const ports = localStorage.getItem("ports");

const initialState = {

    ports: ports ? JSON.parse(ports) : null,
    port: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getPorts = createAsyncThunk(
    'port/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.ports(token, uuid)
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
export const createPorts = createAsyncThunk(
    'port/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_ports(token, payload.uuid, payload.data)
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
export const removePorts = createAsyncThunk(
    'port/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_ports(token, payload.uuid, payload.id)
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

export const port = createSlice({
    name: 'port',
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
            .addCase(getPorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ports = action.payload
            })
            .addCase(getPorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createPorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.port = action.payload
            })
            .addCase(createPorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removePorts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removePorts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.port = action.payload
            })
            .addCase(removePorts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = port.actions
export default port.reducer