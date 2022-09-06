import { Box } from "@mui/material";
import { useAppSelector } from "app/hooks";
import ResponsiveSpace from "components/Reusable/ResponsiveSpace";
import CardGrid from "components/Stake/CardGrid";
import { getStrapiMedia } from "lib/theme/media";
import StakingHomePageHeader from "./StakingHomePageHeader";

export type StakingHomePagePropsType = {
  children?: any;
};

const StakingHomePage: React.FC<StakingHomePagePropsType> = ({ children }) => {
  const { walletBoxBg } =
    useAppSelector((state) => state.global.publicSiteData) ?? {};
  const { tokens } = useAppSelector((state) => state.user);
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
        backgroundAttachment: "fixed",
        px: [2, 2, 4],
      }}
    >
      <Box
        sx={{
          width: 1480,
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        <StakingHomePageHeader />
        <CardGrid tokens={tokens} />
        <ResponsiveSpace />
      </Box>
    </Box>
  );
};

export default StakingHomePage;
