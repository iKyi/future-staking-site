import { useConnection } from "@solana/wallet-adapter-react";
import { createContext, useEffect, useState } from "react";
import fslService, {
  IFslServiceClass,
} from "providers/Solana/services/FSLService";

export type AuthFSLClassWrapperPropsType = {
  children?: any;
};

export const FSLServiceProviderContext = createContext<{
  fslService: IFslServiceClass | null;
}>({ fslService: null });

const AuthFSLClassWrapper: React.VFC<AuthFSLClassWrapperPropsType> = ({
  children,
}) => {
  const { connection } = useConnection();

  //state values
  const [FSLService, setFSLService] = useState<IFslServiceClass>(
    new fslService(connection)
  );

  // event watchers
  useEffect(() => {
    console.log(connection);
    if (connection) {
      const newTerminal = new fslService(connection);
      setFSLService(newTerminal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  // *************** RENDER *************** //
  return (
    <FSLServiceProviderContext.Provider value={{ fslService: FSLService }}>
      {children}
    </FSLServiceProviderContext.Provider>
  );
};

export default AuthFSLClassWrapper;
