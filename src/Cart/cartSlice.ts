import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "../models";
import { RootState } from "../store";

const cartAdapter = createEntityAdapter<Book>({
    selectId: book => book.id,
});

export const cartSelectors = cartAdapter.getSelectors<RootState>((state) => state.cart);

interface CartState {
    loading: boolean;
    error: boolean;
}

const initialState: CartState = {
    error: false,
    loading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState(initialState),
    reducers: {
        addCart: (state, action: PayloadAction<Book>) => {
            cartAdapter.addOne(state, action.payload);
        },
        inc: (state, action: PayloadAction<Book>) => {
            cartAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    ...action.payload,
                    qt: action.payload.qt + 1
                }
            });
        },
        dec: (state, action: PayloadAction<Book>) => {
            cartAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    ...action.payload,
                    qt: action.payload.qt - 1
                }
            });
        },
        remove: (state, action: PayloadAction<Book>) => {
            cartAdapter.removeOne(state, action.payload.id);
        }
    },
});

export default cartSlice.reducer;
export const { addCart, inc, dec, remove } = cartSlice.actions;