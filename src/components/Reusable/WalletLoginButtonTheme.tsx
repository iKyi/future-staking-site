import { FiberManualRecord } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FONTS } from "lib/theme";
import { CSSProperties } from "react";
import lightBlueFslButton from "assets/images/buttons/lightBlue.png";

export type WalletLoginButtonThemePropsType = {
  propStyles?: CSSProperties;
};

const StyledLoginButton = styled(WalletMultiButton, {
  name: "StyledLoginButton",
  slot: "Root",
})<WalletLoginButtonThemePropsType & { connected: boolean }>(
  ({ theme, propStyles, connected }) => ({
    height: "34px",
    lineHeight: 1,
    borderRadius: 6,
    display: "inline-flex",
    fontWeight: 400,
    fontFamily: FONTS.LATO,
    background: `url('${lightBlueFslButton}')`,
    backgroundSize: "100% 100%",
    color: "#fff",
    backgroundRepeat: "no-repeat",
    padding: "20px 25px 20px 25px",
    ".wallet-adapter-button-start-icon": {
      width: 16,
      height: 16,
    },
    ...propStyles,
  })
);

const WalletLoginButtonTheme: React.VFC<WalletLoginButtonThemePropsType> = ({
  propStyles,
}) => {
  const { connected } = useWallet();
  // *************** RENDER *************** //
  return (
    <StyledLoginButton
      propStyles={propStyles}
      connected={connected}
      startIcon={
        connected ? (
          <Box
            sx={{
              fontSize: "12px",
            }}
          >
            <FiberManualRecord
              fontSize="inherit"
              color={connected ? "primary" : "error"}
            />
          </Box>
        ) : undefined
      }
    />
  );
};

export default WalletLoginButtonTheme;
