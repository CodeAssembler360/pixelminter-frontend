import { createSlice } from "@reduxjs/toolkit";

const initialState={
    wallet:{},
}

export const walletDetail=createSlice({
    name:'wallets',
    initialState,
   reducers:{
    walletRequest:(state,action)=>{
        state.wallet=action.payload;
    }
   }
})
export const {walletRequest} =walletDetail.actions;
export default walletDetail.reducer;