import { MenuOpenOutlined } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import LogoIcon from "components/Icons/LogoIcon";
import SocialList from "components/Reusable/SocialList";
import WalletLoginButtonTheme from "components/Reusable/WalletLoginButtonTheme";
import { GENERAL_SETTINGS } from "constants/generalSettings";
import useScrollPosition from "hooks/useScrollPosition";
import { centerFlex } from "lib/sxUtils";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { CSSProperties, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export const StyledLinkForHeaderLogo = styled(NavLink)(({ theme }) => ({
  fontSize: "44px",
  ...(centerFlex as CSSProperties),
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.error.main,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
}));

export type PublicHeaderPropsType = {
  children?: any;
};

export const PublicHeaderHeight = 100;

const PublicHeader: React.VFC<PublicHeaderPropsType> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolledDown = scrollPosition > 10;
  const { socialLinks } = useContext(StrapiContext);

  const openMobileMenu = () => {
    setMobileOpen(true);
  };
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const twitterUrl =
    socialLinks.find((item: any) => item.name === "twitter")?.url ?? null;
  const discordUrl =
    socialLinks.find((item: any) => item.name === "discord")?.url ?? null;

  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        sx={{
          width: "100%",
          bgcolor: !isScrolledDown
            ? "background.default"
            : "rgba(15, 15, 20, 0.8)",
          position: "sticky",
          top: 0,
          left: 0,
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
          <StyledLinkForHeaderLogo
            to="/"
            sx={{ fontSize: 65, textAlign: "center", px: [0, 0, 2] }}
          >
            <LogoIcon color="inherit" fontSize="inherit" />
          </StyledLinkForHeaderLogo>
          <Box
            sx={{
              ml: "auto",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {children}
            <SocialList discord={discordUrl} twitter={twitterUrl} />
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
