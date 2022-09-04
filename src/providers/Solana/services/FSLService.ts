import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { MetadataKey } from "@nfteyez/sol-rayz/dist/config/metaplex";
import {
  convertToFrontendObjectNftStyle,
  massExtractNftIds,
  NFTNameTypes,
} from "utils/NFTutils";
import { WalletContextState } from "@solana/wallet-adapter-react";
import axiosGetter from "lib/axios/axiosGetter";
import { REST_ENDPOINTS } from "lib/axios/endpoints";
import { web3 } from "@project-serum/anchor";

export interface ITokenCustomEntry {
  mint: string;
  updateAuthority: string;
  data: {
    creators: any[];
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
  };
  key: MetadataKey;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  masterEdition?: string | undefined;
  edition?: string | undefined;
  image?: string;
  typeId?: number;
  name?: NFTNameTypes | string;
  solRedeemValue?: number;
  dtacRedeemValue?: number;
  isStaked?: boolean;
  isLocked?: boolean;
  stakeEndDate?: string;
}

export interface IFslServiceClass {
  connection: Connection;
  hasToken: (walletPublicKey: PublicKey, mintId: PublicKey) => Promise<boolean>;
  getNFTs: (
    walletPublicKey: string,
    updateAuthority: string,
    symbol: string
  ) => Promise<{
    nfts: ITokenCustomEntry[];
    totalClaimableDTAC: number;
    totalClaimableSOL: number;
  }>;
  transferNft: (
    mint: PublicKey,
    wallet: any,
    stakingAccount: PublicKey
  ) => Promise<string>;
  getSolanaBalance: (walletPublicKey: PublicKey) => Promise<number>;
  getTokenBalance: (
    walletPublicKey: PublicKey,
    tokenAddress: PublicKey
  ) => Promise<number>;
  depositSol: (
    fromWallet: WalletContextState | any,
    amount: number
  ) => Promise<string>;
}

export default class FslService implements IFslServiceClass {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async hasToken(walletPublicKey: PublicKey, mintId: PublicKey) {
    const tokenAccounts = await this.connection.getTokenAccountsByOwner(
      walletPublicKey,
      {
        mint: mintId,
      }
    );

    for (let i = 0; i < tokenAccounts.value.length; i++) {
      let tokenAccount = tokenAccounts.value[i];
      let accountInfo = await this.connection.getParsedAccountInfo(
        tokenAccount.pubkey
      );

      if (
        (accountInfo as any)?.value?.data?.parsed?.info.mint ===
        mintId.toBase58()
      ) {
        if (
          (accountInfo as any).value.data.parsed.info.tokenAmount.amount > 0
        ) {
          return true;
        }
      }
    }

    return false;
  }

  async depositSol(fromWallet: WalletContextState | any, amount: number) {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: new PublicKey(process.env.REACT_APP_SOL_GAME_WALLET ?? ""),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    // get recent blockhash for faster confirmation and set fee payer for transfer
    transaction.feePayer = fromWallet.publicKey;
    transaction.recentBlockhash = (
      await this.connection.getLatestBlockhash()
    ).blockhash;

    const signature = await fromWallet.sendTransaction(
      transaction,
      this.connection
    );
    return signature;
  }

  async getNFTs(
    walletPublicKey: string,
    _updateAuthority: string,
    symbol: string
  ) {
    let allTokens: ITokenCustomEntry[] = await getParsedNftAccountsByOwner({
      publicAddress: walletPublicKey,
      connection: this.connection,
    });

    let stakedItems = await axiosGetter(
      `${REST_ENDPOINTS.BASE}${REST_ENDPOINTS.GET_NFTS}/${walletPublicKey}`
    );
    let { stakedNFTs, totalClaimableDTAC, totalClaimableSOL } = stakedItems;
    stakedNFTs = stakedNFTs.map((item: any) =>
      convertToFrontendObjectNftStyle(item)
    );
    allTokens = [...stakedNFTs, ...allTokens];
    const filteredItems = allTokens.filter((token: ITokenCustomEntry) => {
      return true;
      // if (
      //   token.updateAuthority === _updateAuthority &&
      //   token.data.symbol === symbol
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    });

    for (let i = 0; i < filteredItems.length; i++) {
      const token: ITokenCustomEntry = filteredItems[i];
      const result = await fetch(token.data.uri);
      const metadata = await result.json();
      token.image = metadata.image;
      filteredItems[i] = token;
    }

    return {
      nfts: massExtractNftIds(filteredItems),
      totalClaimableDTAC,
      totalClaimableSOL,
    };
  }

  async transferNft(
    mintId: PublicKey,
    wallet: WalletContextState | any,
    stakingAccount: PublicKey
  ) {
    const mintPublicKey = new web3.PublicKey(mintId);
    const mintToken = new splToken.Token(
      this.connection,
      mintPublicKey,
      splToken.TOKEN_PROGRAM_ID,
      wallet.payer // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
    );

    const myToken = new splToken.Token(
      this.connection,
      mintId,
      splToken.TOKEN_PROGRAM_ID,
      wallet
    );

    const associatedDestinationTokenAddr =
      await splToken.Token.getAssociatedTokenAddress(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        stakingAccount
      );

    // Create associated token accounts for my token if they don't exist yet
    const fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    );

    const receiverAccount = await this.connection.getAccountInfo(
      associatedDestinationTokenAddr
    );

    const instructions: web3.TransactionInstruction[] = [];

    if (receiverAccount === null) {
      instructions.push(
        splToken.Token.createAssociatedTokenAccountInstruction(
          mintToken.associatedProgramId,
          mintToken.programId,
          mintPublicKey,
          associatedDestinationTokenAddr,
          stakingAccount,
          wallet.publicKey
        )
      );
    }

    instructions.push(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        associatedDestinationTokenAddr,
        wallet.publicKey,
        [],
        1
      )
    );

    const transaction = new web3.Transaction().add(...instructions);
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await this.connection.getRecentBlockhash()
    ).blockhash;

    const transactionId = await wallet.sendTransaction(
      transaction,
      this.connection
    );

    return transactionId;
  }

  async transferToken(
    fromWallet: Keypair,
    toWallet: PublicKey,
    mintId: PublicKey,
    amount: number
  ) {
    var myToken = new splToken.Token(
      this.connection,
      mintId,
      splToken.TOKEN_PROGRAM_ID,
      fromWallet
    );

    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      fromWallet.publicKey
    );
    var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      toWallet
    );

    var transaction = new Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        0
      )
    );

    // Sign transaction, broadcast, and confirm
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [fromWallet]
    );
  }

  async validateStakeTransaction(
    publicKey: PublicKey,
    mintId: PublicKey,
    stakingAccount: PublicKey,
    txId: string
  ): Promise<boolean> {
    // this will return null if called right immediately
    const transaction = await this.connection.getTransaction(txId);

    let preTokenBalancesValidation = 0;
    let postTokenBalancesValidation = 0;

    if (transaction?.meta?.preTokenBalances) {
      for (let i = 0; i < transaction.meta.preTokenBalances.length; i++) {
        const balance = transaction.meta.preTokenBalances[i];

        // Incorrect mint
        if (balance.mint !== mintId.toBase58()) {
          return false;
        }

        // Checks that user had the token in wallet before transaction
        if (balance.owner === publicKey.toBase58()) {
          if (parseInt(balance.uiTokenAmount.amount) === 1) {
            preTokenBalancesValidation++;
          }
        }

        // Checks that owner didn't have the token in wallet before transaction
        if (balance.owner === stakingAccount.toBase58()) {
          if (parseInt(balance.uiTokenAmount.amount) === 0) {
            preTokenBalancesValidation++;
          }
        }
      }
    } else {
      throw new Error("Error code 6782");
    }

    if (transaction?.meta?.postTokenBalances) {
      for (let i = 0; i < transaction.meta.postTokenBalances.length; i++) {
        const balance = transaction.meta.postTokenBalances[i];
        // Incorrect mint
        if (balance.mint !== mintId.toBase58()) {
          return false;
        }

        // Checks that user didn't have the token in wallet after transaction
        if (balance.owner === publicKey.toBase58()) {
          if (parseInt(balance.uiTokenAmount.amount) === 0) {
            postTokenBalancesValidation++;
          }
        }

        // Checks that owner had the token in wallet after transaction
        if (balance.owner === stakingAccount.toBase58()) {
          if (parseInt(balance.uiTokenAmount.amount) === 1) {
            postTokenBalancesValidation++;
          }
        }
      }

      return (
        preTokenBalancesValidation === 2 && postTokenBalancesValidation === 2
      );
    } else {
      throw new Error("Error code 6783");
    }
  }

  async determineNftExchangeToken(mintId: PublicKey): Promise<PublicKey> {
    // map each NFT type exchange token to its mintId
    const exchangeTokensMintIds = {
      nyx: process.env.NYX_EXCHANGE_TOKEN_MINT_ID,
    };

    // map each mintId to a NFT type
    const exchangeTokens = {
      nyx: [
        "GypyGXbG7s2FMPVpTK1jHuP6FktZET2o22qq39pz3h69",
        "GypyGXbG7s2FMPVpTK1jHuP6FktZET2o22qq39pz3h68",
        "GypyGXbG7s2FMPVpTK1jHuP6FktZET2o22qq39pz3h62",
      ],
    };

    // return according exchange token mintId
    switch (true) {
      case exchangeTokens.nyx.includes(mintId.toBase58()):
        return new PublicKey(exchangeTokensMintIds.nyx!);
    }

    // not found
    return new PublicKey("Not found");
  }

  async getSolanaLamportBalance(walletPublicKey: PublicKey): Promise<number> {
    return await this.connection.getBalance(walletPublicKey);
  }

  async getSolanaBalance(walletPublicKey: PublicKey): Promise<number> {
    return (
      (await this.getSolanaLamportBalance(walletPublicKey)) / LAMPORTS_PER_SOL
    );
  }

  async getTokenBalance(
    walletPublicKey: PublicKey,
    tokenAddress: PublicKey
  ): Promise<number> {
    const response = await this.connection.getTokenAccountsByOwner(
      walletPublicKey,
      {
        mint: tokenAddress,
      }
    );

    let balance = 0;

    for (let i = 0; i < response.value.length; i++) {
      const accountBalance = await this.connection?.getTokenAccountBalance(
        response?.value[i].pubkey
      );
      balance += parseFloat(accountBalance.value.amount);
    }

    return balance / LAMPORTS_PER_SOL;
  }
}
