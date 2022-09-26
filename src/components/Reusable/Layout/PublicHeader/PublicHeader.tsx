import { MenuOpenOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import SocialList from "components/Reusable/SocialList";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";
import { GENERAL_SETTINGS } from "constants/generalSettings";
import useScrollPosition from "hooks/useScrollPosition";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { CSSProperties, useContext, useState } from "react";
import { LeftNavDesktopWidth } from "../PageWithNavWrapper";
import MobileMenu from "./MobileMenu";
import LogoIcon from "components/Icons/LogoIcon";
import { NavLink } from "react-router-dom";
import { centerFlex } from "utils/sxUtils";

export type PublicHeaderPropsType = {
  children?: any;
};

const PublicHeaderLogoWrapper = styled(NavLink)(({ theme }) => ({
  ...(centerFlex as CSSProperties),
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
}));

export const PublicHeaderHeight = 100;

const PublicHeader: React.VFC<PublicHeaderPropsType> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolledDown = scrollPosition > 10;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const GlobalData = useContext(StrapiContext);
  const { socialLinks } = GlobalData ?? {};
  const twitterUrl =
    socialLinks?.find((item: any) => item.name === "twitter")?.url ?? null;
  const discordUrl =
    socialLinks?.find((item: any) => item.name === "discord")?.url ?? null;

  const openMobileMenu = () => {
    setMobileOpen(true);
  };
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        sx={{
          bgcolor: !isScrolledDown ? "transparent" : "rgba(0, 5, 11, 0.8)",
          position: "fixed",
          top: 0,
          left: !isMobile ? `${LeftNavDesktopWidth}px` : 0,
          right: 0,
          width: !isMobile ? `calc(100% - ${LeftNavDesktopWidth}px)` : "100%",
          zIndex: (theme) => theme.zIndex.appBar,
          backdropFilter: "blur(2px)",
        }}
      >
        <Box
          sx={{
            maxWidth: GENERAL_SETTINGS.CONTENT_LIMITED_WIDTH,
            m: "0 auto",
            py: 1.5,
            px: 1.3,
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMobile && (
            <PublicHeaderLogoWrapper
              to="/"
              sx={{
                fontSize: 65,
                textAlign: "center",
                px: [0, 0, 2],
              }}
            >
              <LogoIcon
                key="logoIconPublicHeader"
                color="inherit"
                fontSize="inherit"
              />
            </PublicHeaderLogoWrapper>
          )}

          <Box
            sx={{
              ml: "auto",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {children}
            <SocialList
              sx={{ display: ["flex", "flex", "none"] }}
              discord={discordUrl}
              twitter={twitterUrl}
            />
            <WalletLoginButtonTheme propStyles={{ margin: "0 10px 0 10px" }} />
            <IconButton
              sx={{
                borderRadius: 0,
                display: ["inline-flex", "inline-flex", "none"],
              }}
              onClick={openMobileMenu}
            >
              <MenuOpenOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <MobileMenu open={mobileOpen} closeMobileMenu={closeMobileMenu} />
    </>
  );
};

export default PublicHeader;
