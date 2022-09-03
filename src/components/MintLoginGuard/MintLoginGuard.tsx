import { useWallet } from "@solana/wallet-adapter-react";
import WalletLoginBox from "./WalletLoginBox";

export type MintLoginGuardPropsType = {
  children?: any;
};

const MintLoginGuard: React.FC<MintLoginGuardPropsType> = ({ children }) => {
  const { connected } = useWallet();
  // *************** RENDER *************** //
  if (!connected) {
    return <WalletLoginBox />;
  }
  return children;
};

export default MintLoginGuard;
