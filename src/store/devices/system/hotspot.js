import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SystemService from './SystemService'

const hotspots = JSON.parse(localStorage.getItem("hotspots"));
const hotspot_profiles = JSON.parse(localStorage.getItem("hotspot_profiles"));

const initialState = {

    hotspots: hotspots ? hotspots : null,
    hotspot_profiles: hotspot_profiles ? hotspot_profiles : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getHotspot = createAsyncThunk(
    'hotspot/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.hotspots(token, uuid)
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

export const createHotspot = createAsyncThunk(
    'hotspot/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_hotspot(token, payload.uuid, payload.data)
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
export const removeHotspot = createAsyncThunk(
    'hotspot/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_hotspot(token, payload.uuid, payload.id)
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


export const getHotspotProfiles = createAsyncThunk(
    'hotspot/profile/get',
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.hotspot_profiles(token, uuid)
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
export const createHotspotProrile = createAsyncThunk(
    'hotspot/profile/create',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.create_profile(token, payload.uuid, payload.data)
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
export const removeHotspotProfile = createAsyncThunk(
    'hotspot/profile/remove',
    async (payload, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.access_token
            return await SystemService.remove_profile(token, payload.uuid, payload.id)
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



export const _hotspot = createSlice({
    name: 'hotspot',
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
            .addCase(getHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspots = action.payload
            })
            .addCase(getHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getHotspotProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHotspotProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(getHotspotProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(createHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
            .addCase(removeHotspot.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeHotspot.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(removeHotspot.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(createHotspotProrile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHotspotProrile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(createHotspotProrile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeHotspotProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeHotspotProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.hotspot_profiles = action.payload
            })
            .addCase(removeHotspotProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })




    },
})

export const { reset } = _hotspot.actions
export default _hotspot.reducer