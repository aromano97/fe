import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../models";
import { httpService } from "../httpService";
import { RootState } from "../store";

const userAdapter = createEntityAdapter<User>({
    selectId: user => user.id,
});

export const userSelectors = userAdapter.getSelectors<RootState>((state) => state.users);

export const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetch',
    async () => {
        const { data } = await httpService.get<User[]>('users/get');
        return data;
    }
);

interface UserState {
    loading: boolean;
    error: boolean;
    open: boolean;
    selectedUser?: User;
}

const initialState: UserState = {
    error: false,
    loading: false,
    open: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: userAdapter.getInitialState(initialState),
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<User | undefined>) => {
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            userAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const { setOpen, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;