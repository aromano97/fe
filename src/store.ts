import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './Users/usersSlice';
import booksReducer from './HandleBooks/booksSlice';
import cartReducer from './Cart/cartSlice';
import appReducer from './App/appSlice';

export const root = combineReducers({
    app: appReducer,
    books: booksReducer,
    users: userReducer,
    cart: cartReducer,
});

const store = configureStore({
    reducer: root
});

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;