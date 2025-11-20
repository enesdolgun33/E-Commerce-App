import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import basketSlice from './basketSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        basket: basketSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch