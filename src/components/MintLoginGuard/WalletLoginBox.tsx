import { Box } from "@mui/material";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";
import { centerFlex } from "lib/sxUtils";

export type WalletLoginBoxPropsType = {
  children?: any;
};

const WalletLoginBox: React.FC<WalletLoginBoxPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        widht: "100%",
        minHeight: "100%",
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))`,
          border: "1px solid",
          borderImageSlice: 1,
          borderImageSource:
            "linear-gradient(123.49deg, #B048FD 8.63%, #6216D2 25.73%, #3E4ECC 42.83%, #3E75D5 62.96%)",
          minHeight: "25vh",
          width: "20vw",
          maxWidth: `calc(100% - 40px)`,
          ...centerFlex,
        }}
      >
        <WalletLoginButtonTheme />
      </Box>
    </Box>
  );
};

export default WalletLoginBox;
