import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { ITokenCustomEntry } from "providers/Solana/services/FSLService";

export interface UserState {
  tokens: ITokenCustomEntry[];
  solanaBalance: number | null;
  datacBalance: number | null;
  redeemableDtac: number | null;
  redeemableSol: number | null;
  depositedSolanaBalance: number | null;
  canWidthdrawSolana: boolean;
  solanaWidthdrawMaxAmount: number;
}

const initialState: UserState = {
  tokens: [],
  solanaBalance: null,
  datacBalance: null,
  redeemableDtac: null,
  redeemableSol: null,
  depositedSolanaBalance: null,
  canWidthdrawSolana: false,
  solanaWidthdrawMaxAmount: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setTokens: (state, action: PayloadAction<ITokenCustomEntry[]>) => {
      state.tokens = action.payload;
    },
    setSolana: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? payload : null;
      state.solanaBalance = value;
    },
    setdataFSLBalance: (state, action: PayloadAction<number | null>) => {
      const { payload } = action;
      const value = payload ? payload : null;
      state.datacBalance = value;
    },
    setRedeemableSol: (state, action: PayloadAction<number | null>) => {
      state.redeemableSol = action.payload;
    },
    setRedeemableDtac: (state, action: PayloadAction<number | null>) => {
      state.redeemableDtac = action.payload;
    },
    setCanWidthdawSolana: (state, action: PayloadAction<boolean>) => {
      state.canWidthdrawSolana = action.payload;
    },
    setSolanaMaxWidthdrawAmount: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.solanaWidthdrawMaxAmount = payload;
    },
    setDepositedSolanaBalance: (
      state,
      { payload }: PayloadAction<number | null>
    ) => {
      state.depositedSolanaBalance = payload;
    },
  },
});

export const writeUserNftData =
  (nfts: ITokenCustomEntry[]): AppThunk =>
  (dispatch) => {
    if (nfts.length === 0) {
      dispatch(setTokens([]));
    } else {
      dispatch(setTokens(nfts));
    }
  };

export const {
  setTokens,
  setSolana,
  setdataFSLBalance,
  setRedeemableSol,
  setRedeemableDtac,
  setCanWidthdawSolana,
  setDepositedSolanaBalance,
  setSolanaMaxWidthdrawAmount,
} = userSlice.actions;

export default userSlice.reducer;
