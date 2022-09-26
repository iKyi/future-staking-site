import { Box, Stack } from "@mui/material";
import { useAppSelector } from "app/hooks";
import SectionHeader from "components/Reusable/SectionHeader";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";
import { centerFlex } from "lib/sxUtils";
import { getStrapiMedia } from "lib/theme/media";
import boxBg from "./boxBg.png";

export type WalletLoginBoxPropsType = {
  children?: any;
};

const WalletLoginBox: React.FC<WalletLoginBoxPropsType> = ({ children }) => {
  const { walletBoxPretitle, walletBoxTitle, walletBoxSubtitle, walletBoxBg } =
    useAppSelector((state) => state.global.publicSiteData) ?? {};
  // *************** RENDER *************** //
  const bgImg = walletBoxBg ? getStrapiMedia(walletBoxBg) : "";
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        background: `url('${bgImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))`,
          background: `url('${boxBg}')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "25vh",
          width: "40vw",
          maxWidth: `calc(100% - 40px)`,
          p: [4, 4, 6],
          ...centerFlex,
        }}
      >
        <Stack spacing={[2, 2, 4]}>
          {walletBoxPretitle || walletBoxTitle || walletBoxSubtitle ? (
            <SectionHeader
              disableHeaderBars
              description={walletBoxSubtitle}
              title={walletBoxTitle}
              preTitle={walletBoxPretitle}
              sx={{
                m: [0, 0, 0, 0, 0],
              }}
            />
          ) : null}
          <Box
            sx={{
              ...centerFlex,
            }}
          >
            <WalletLoginButtonTheme />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default WalletLoginBox;
