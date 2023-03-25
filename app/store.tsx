
import {configureStore} from '@reduxjs/toolkit'
import walletReducer from './WalletSlice'
export const store=configureStore({
    reducer:{
        wallets:walletReducer,
    },
})
