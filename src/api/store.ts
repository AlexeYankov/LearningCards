import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './cards.api'
import { decksService } from '@/api/decks/decks.api.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksService.reducerPath]: decksService.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
