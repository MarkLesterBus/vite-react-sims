import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const interfaces = localStorage.getItem("interfaces");

const initialState = {

    interfaces: interfaces ? JSON.parse(interfaces) : null,
    intface: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getInterfaces = createAsyncThunk(
    'interface/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.interfaces(token, uuid)
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
export const changeDisabledInterfaces = createAsyncThunk(
    'interface/disabled/update',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.change_disable_interfaces(token, payload.uuid, payload.id, payload.data)
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

export const changeRunningInterfaces = createAsyncThunk(
    'interface/running/update',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.change_running_interfaces(token, payload.uuid, payload.id, payload.data)
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

export const _interface = createSlice({
    name: 'interface',
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
            .addCase(getInterfaces.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInterfaces.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.interfaces = action.payload
            })
            .addCase(getInterfaces.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })




    },
})

export const { reset } = _interface.actions
export default _interface.reducer