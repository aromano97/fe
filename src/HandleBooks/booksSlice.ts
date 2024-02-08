import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Book } from "../models";
import { httpService } from "../httpService";
import { RootState } from "../store";

const booksAdapter = createEntityAdapter<Book>({
    selectId: book => book.id,
});

export const bookSelectors = booksAdapter.getSelectors<RootState>((state) => state.books);

export const fetchBooks = createAsyncThunk<Book[], void>(
    'books/fetch',
    async () => {
        const { data } = await httpService.get<Book[]>('books/get');
        return data;
    }
);

export const updateBook = createAsyncThunk<Book, Partial<Book>>(
    'books/update',
    async (book) => {
        const { data } = await httpService.put<Book>('books/update', book);
        return data;
    }
);

interface HandleBooksState {
    loading: boolean;
    error: boolean;
    open: boolean;
    selectedBook?: Book;
}

const initialState: HandleBooksState = {
    error: false,
    loading: false,
    open: false
}

const booksSlice = createSlice({
    name: 'books',
    initialState: booksAdapter.getInitialState(initialState),
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setSelectedBook: (state, action: PayloadAction<Book | undefined>) => {
            state.selectedBook = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
            booksAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchBooks.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
            booksAdapter.updateOne(state, {
                changes: action.payload,
                id: action.payload.id
            });
        });
    }
});

export default booksSlice.reducer;
export const { setOpen, setSelectedBook } = booksSlice.actions;