import { Box } from "@mui/material";
import { useAppSelector } from "app/hooks";
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
        px: [2, 2, 4],
      }}
    >
      <StakingHomePageHeader />
      <CardGrid tokens={tokens} />
    </Box>
  );
};

export default StakingHomePage;
