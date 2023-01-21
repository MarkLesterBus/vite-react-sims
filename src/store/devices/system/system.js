import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const system = localStorage.getItem("system");
const resources = localStorage.getItem("resources");
const traffic = localStorage.getItem("traffic");
const logs = localStorage.getItem("logs");



const initialState = {
    system: system ? JSON.parse(system) : null,
    resources: resources ? JSON.parse(resources) : null,
    traffic: traffic ? JSON.parse(traffic) : null,
    tx: [],
    rx: [],
    timeline: [],
    logs: logs ? logs : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


// Create new goal
export const getSystem = createAsyncThunk(
    'system/system',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.system(token, uuid)
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
export const getResources = createAsyncThunk(
    'system/resources',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.resources(token, uuid)
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
export const getTraffic = createAsyncThunk(
    'system/traffic',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.traffic(token, data)
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
export const getLogs = createAsyncThunk(
    'system/logs',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.logs(token, uuid)
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



export const systemSlice = createSlice({
    name: 'system',
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
            .addCase(getSystem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSystem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.system = action.payload
            })
            .addCase(getSystem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getResources.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getResources.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.resources = action.payload
            })
            .addCase(getResources.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTraffic.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTraffic.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.traffic = action.payload
                const today = new Date();

                state.tx.push(action.payload['tx-bits-per-second'])
                state.rx.push(action.payload['rx-bits-per-second'])
                state.timeline.push(`${today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}`)
            })
            .addCase(getTraffic.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getLogs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLogs.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.logs = action.payload
            })
            .addCase(getLogs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const { reset } = systemSlice.actions
export default systemSlice.reducer