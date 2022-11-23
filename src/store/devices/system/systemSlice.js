import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const system = JSON.parse(localStorage.getItem("system"));
const resources = JSON.parse(localStorage.getItem("resources"));
const traffic = JSON.parse(localStorage.getItem("traffic"));
const logs = JSON.parse(localStorage.getItem("logs"));
const interfaces = JSON.parse(localStorage.getItem("interfaces"));


const initialState = {
    system: system ? system : null,
    resources: resources ? resources : null,
    traffic: traffic ? traffic : null,
    tx: [],
    rx: [],
    timeline: [],
    interfaces: interfaces ? interfaces : null,
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
export const getInterfaces = createAsyncThunk(
    'system/interfaces',
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

export const { reset } = systemSlice.actions
export default systemSlice.reducer