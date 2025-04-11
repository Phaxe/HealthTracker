import { configureStore } from '@reduxjs/toolkit'
import { habitsApi } from './slices/habitApiSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [habitsApi.reducerPath]: habitsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(habitsApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']