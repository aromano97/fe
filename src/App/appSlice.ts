import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models";
import { httpService } from "../httpService";

export const me = createAsyncThunk<User, Partial<User>>(
    'app/me',
    async (params) => {
        const { data } = await httpService.post<User>('users/login', params);
        console.log('data', data, '!data', !data);
        if (!data) throw new Error();

        return data;
    }
);

interface AppState {
    user?: User;
    loading: boolean;
}

const initialState: AppState = {
    loading: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(me.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(me.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(me.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default appSlice.reducer;
export const { logout } = appSlice.actions;