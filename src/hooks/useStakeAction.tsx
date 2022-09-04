import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { LOADING_KEY } from "constants/loadingKeys";
import {
  addBlockingSnackbar,
  addLoader,
  removeBlockingSnackbar,
  removeLoader,
  startSnackbar,
} from "features/global/globalSlice";
import {
  setdataFSLBalance,
  setSolana,
  writeUserNftData,
} from "features/user/userSlice";
import axiosInstance from "lib/axios/axiosInstance";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import { NFTNameTypes } from "utils/NFTutils";
import { useDebouncedCallback } from "use-debounce";
import getApiBase from "lib/axios/getApiBase";
import { FSLServiceProviderContext } from "providers/AuthFSLClassWrapper";

const useStakeAction = () => {
  const { fslService } = useContext(FSLServiceProviderContext);
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { publicKey } = wallet;
  const navigate = useNavigate();

  const UPDATE_AUTORHITY = process.env.REACT_APP_UPDATE_AUTHORITY;
  if (!UPDATE_AUTORHITY) {
    throw new Error("UPDATE_AUTORHITY missing");
  }
  const NFT_SYMBOL = process.env.REACT_APP_NFT_SYMBOL;
  if (!NFT_SYMBOL) {
    throw new Error("NFT_SYMBOL missing");
  }
  const STAKING_ACCOUNT_PUBLIC_KEY =
    process.env.REACT_APP_STAKING_ACCOUNT_PUBLIC_KEY;
  if (!STAKING_ACCOUNT_PUBLIC_KEY) {
    throw new Error("STAKING_ACCOUNT_PUBLIC_KEY missing");
  }
  const DTAC_TOKEN_ADDRESS = process.env.REACT_APP_DTAC_TOKEN_ADDRESS;
  if (!DTAC_TOKEN_ADDRESS) {
    throw new Error("DTAC_TOKEN_ADDRESS missing");
  }

  const refreshNfts = useCallback(async () => {
    dispatch(writeUserNftData([]));
    dispatch(setSolana(null));
    dispatch(setdataFSLBalance(null));
    if (publicKey && fslService) {
      try {
        dispatch(addLoader(LOADING_KEY.CHARS_LOADING));

        const [nftsGetterResponse] = await Promise.all([
          fslService.getNFTs(
            publicKey.toBase58(),
            UPDATE_AUTORHITY,
            NFT_SYMBOL
          ),
          // fslService.getSolanaBalance(publicKey),
          // fslService.getTokenBalance(
          //   publicKey,
          //   new PublicKey(DTAC_TOKEN_ADDRESS ?? "")
          // ),
          // axiosInstance.post(
          //   `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.LOGIN}${publicKey}`
          // ),
        ]);
        const { nfts } = nftsGetterResponse;
        // dispatch(setRedeemableSol(totalClaimableSOL));
        // dispatch(setRedeemableDtac(totalClaimableDTAC));
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        // dispatch(setSolana(solana));
        // dispatch(setdataFSLBalance(dtac));
        dispatch(writeUserNftData(nfts));
      } catch (err) {
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        throw new Error((err as any).toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fslService, publicKey]);

  const debouncedRefreshNfts = useDebouncedCallback(refreshNfts, 1000);

  const stakeAction = useCallback(
    async (mint: string, nameType: NFTNameTypes | string) => {
      if (fslService) {
        dispatch(addLoader(LOADING_KEY.STAKING));
        try {
          // transfer action
          const txId = await fslService.transferNft(
            new PublicKey(mint),
            wallet,
            new PublicKey(STAKING_ACCOUNT_PUBLIC_KEY || "")
          );
          // posts the transaction to local backend
          dispatch(
            addBlockingSnackbar({
              id: "transactionConfirming",
              state: "loading",
              text: "Validating transactions... This might take up to 2 minutes, please do not close this window ...",
            })
          );
          await axiosInstance.post(
            `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.STAKE_NFT}${publicKey}`,
            {
              mintID: mint,
              txID: txId,
              nftType: nameType,
            }
          );
          dispatch(removeBlockingSnackbar("transactionConfirming"));
          dispatch(removeLoader(LOADING_KEY.STAKING));
          dispatch(
            startSnackbar({
              variant: "success",
              content: `Transaction successful !`,
              id: "stake_action_outcome" + Math.random(),
            })
          );

          refreshNfts();
          navigate("/stake");
        } catch (err) {
          dispatch(removeLoader(LOADING_KEY.STAKING));
          dispatch(
            startSnackbar({
              variant: "error",
              content: `Transaction failed ! ${(err as any)?.message ?? err}`,
              id: "stake_action_outcome_bad" + Math.random(),
            })
          );
          throw new Error(err as string);
        }
      }

      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fslService, wallet, publicKey]
  );

  const unstakeAction = useCallback(
    async (mint: string) => {
      if (fslService) {
        try {
          dispatch(
            addBlockingSnackbar({
              id: "unstakeNft",
              state: "loading",
              text: "Validating transactions... This might take up to 2 minutes, please do not close this window ...",
            })
          );
          await axiosInstance.post(
            `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.UNSATKE_NFT}/${publicKey}`,
            {
              mintid: mint,
            }
          );
          setTimeout(() => {
            refreshNfts();
            navigate("/stake");
            dispatch(removeBlockingSnackbar("unstakeNft"));
          }, 1000);
        } catch (err) {
          dispatch(removeBlockingSnackbar("unstakeNft"));
          dispatch(
            startSnackbar({
              variant: "error",
              content: `Transaction failed ! ${(err as any)?.message ?? err}`,
              id: "unstake" + Math.random(),
            })
          );
          throw new Error(err as string);
        }
      }

      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fslService, wallet, publicKey]
  );

  const claimFSL = useCallback(
    async (mintId: string) => {
      try {
        dispatch(
          addBlockingSnackbar({
            id: "FSLClaimTransacation",
            state: "loading",
            text: "Validating transactions... This might take up to 2 minutes, please do not close this window ...",
          })
        );
        await axiosInstance.put(
          `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.CLAIM_DTAC}/${publicKey}`,
          {
            mintID: mintId,
          }
        );
        dispatch(removeBlockingSnackbar("FSLClaimTransacation"));
        refreshNfts();
      } catch (err) {
        startSnackbar({
          variant: "error",
          content: `Transaction failed ! ${(err as any)?.message ?? err}`,
          id: "claim-fslc-" + Math.random(),
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publicKey]
  );

  const claimSOL = useCallback(
    async (mintId: string) => {
      try {
        dispatch(
          addBlockingSnackbar({
            id: "SOLClaimtransaction",
            state: "loading",
            text: "Processing transaction, please do not close this window ...",
          })
        );
        await axiosInstance.put(
          `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.CLAIM_SOL}/${publicKey}`,
          {
            mintID: mintId,
          }
        );
        dispatch(removeBlockingSnackbar("SOLClaimtransaction"));
        refreshNfts();
      } catch (err) {
        startSnackbar({
          variant: "error",
          content: `Transaction failed ! ${(err as any)?.message ?? err}`,
          id: "claim-sol-error-" + Math.random(),
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publicKey]
  );

  const refreshBalance = useCallback(async () => {
    dispatch(setSolana(null));
    dispatch(setdataFSLBalance(null));
    if (publicKey && fslService) {
      try {
        dispatch(addLoader(LOADING_KEY.CHARS_LOADING));
        const [solana, dtac] = await Promise.all([
          fslService.getSolanaBalance(publicKey),
          fslService.getTokenBalance(
            publicKey,
            new PublicKey(DTAC_TOKEN_ADDRESS ?? "")
          ),
          axiosInstance.post(
            `${getApiBase()}${REST_ENDPOINTS.LOGIN}${publicKey}`
          ),
        ]);
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        dispatch(setSolana(solana));
        dispatch(setdataFSLBalance(dtac));
      } catch (err) {
        dispatch(removeLoader(LOADING_KEY.CHARS_LOADING));
        throw new Error((err as any).toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fslService, publicKey]);

  return {
    stakeAction,
    refreshNfts,
    debouncedRefreshNfts,
    claimFSL,
    claimSOL,
    refreshBalance,
    unstakeAction,
  };
};
export default useStakeAction;
