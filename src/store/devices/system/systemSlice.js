import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ResourceService from './SystemResource'

const initialState = {
    resource: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new goal
export const getResource = createAsyncThunk(
    'system/resource',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await ResourceService.resource(uuid, token)
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

// Get user devices
export const getDevices = createAsyncThunk(
    'devices/get_all',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await DeviceService.get_all(token)
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


export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDevice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDevice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.devices = action.payload
            })
            .addCase(createDevice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDevices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.devices = action.payload
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDevice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDevice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.device = action.payload
            })
            .addCase(getDevice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(updateDevice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.device = action.payload
            })
            .addCase(updateDevice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(deleteDevice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDevice.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.devices = state.devices.filter(
                    (device) => device.id !== action.payload.id
                )
            })
            .addCase(deleteDevice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = deviceSlice.actions
export default deviceSlice.reducer