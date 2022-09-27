import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import DiamondIcon from "components/Icons/DiamondIcon";
import HomeIcon from "components/Icons/HomeIcon";
import JoystickIcon from "components/Icons/JoystickIcon";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { useContext } from "react";
import { centerFlex } from "utils/sxUtils";
import SocialList from "../SocialList";
import { MenuItemEntryPropsType } from "./MenuItemEntry";
import LogoIcon from "components/Icons/LogoIcon";
import { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import StakingIcon from "components/Icons/StakingIcon";
import menuItemActiveBackground from "assets/images/backgrounds/menuItemActiveBackground.png";

export type AppLeftMenuPropsType = {};

const StyledLinkForHeaderLogo = styled(NavLink)(({ theme }) => ({
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

const AppLeftMenu: React.VFC<AppLeftMenuPropsType> = () => {
  const GlobalData = useContext(StrapiContext);
  const { landingMenuLink, gamesMenuLink, mintMenuLink, stakingMenuLink } =
    GlobalData ?? {};

  const { socialLinks } = GlobalData ?? {};
  const twitterUrl =
    socialLinks?.find((item: any) => item.name === "twitter")?.url ?? null;
  const discordUrl =
    socialLinks?.find((item: any) => item.name === "discord")?.url ?? null;

  const LeftMenuItems: MenuItemEntryPropsType[] = [
    {
      icon: HomeIcon,
      url: landingMenuLink?.url ?? "/",

      tooltip: landingMenuLink?.tooltipText ?? null,
      allDisabled: landingMenuLink?.allDisabled ?? false,
    },
    {
      icon: JoystickIcon,
      url: gamesMenuLink?.url ?? "/",
      tooltip: gamesMenuLink?.tooltipText ?? null,
      allDisabled: gamesMenuLink?.allDisabled ?? false,
    },
    {
      icon: StakingIcon,
      active: true,
      url: stakingMenuLink?.url ?? "/",
      tooltip: stakingMenuLink?.tooltipText ?? null,
      allDisabled: stakingMenuLink?.allDisabled ?? false,
    },
    {
      icon: DiamondIcon,
      url: mintMenuLink?.url ?? "/",
      tooltip: mintMenuLink?.tooltipText ?? null,
      allDisabled: mintMenuLink?.allDisabled ?? false,
    },
  ];

  // *************** RENDER *************** //
  if (!GlobalData) return null;
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: `100vh`,
        maxHeight: "100vh",
        overflow: "auto",
        px: "14px",
        borderRight: [0, 0, `1px solid rgba(255, 255, 255, 0.05)`],
      }}
    >
      <StyledLinkForHeaderLogo
        to="/"
        sx={{
          fontSize: 65,
          textAlign: "center",
          px: [0, 0, 2],
          my: 2,
          color: "#fff",
        }}
      >
        <LogoIcon key="logoIconAppMenu" color="inherit" fontSize="inherit" />
      </StyledLinkForHeaderLogo>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {LeftMenuItems.map((item, index: number) => {
          const { allDisabled } = item;

          return (
            <ListItem
              key={index}
              button
              component={Link}
              href={item.url}
              disabled={item.active || allDisabled}
              target="_blank"
              rel="noopener"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid transparent",
                height: "60px",
                maxWidth: "100%",
                borderRadius: "3px",
                background: item.active
                  ? `url('${menuItemActiveBackground}')`
                  : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              <ListItemIcon
                sx={{ fontSize: "24px", minWidth: "0", mr: 1.4, ...centerFlex }}
              >
                <item.icon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText>
                <Box
                  sx={{
                    fontWeight: 300,
                    fontSize: 13,
                  }}
                >
                  {item.tooltip}
                </Box>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>

      <Box
        sx={{
          mt: "auto",
        }}
      >
        <Box
          sx={{
            fontSize: 13,
            fontWeight: 300,
            opacity: 0.8,
            pb: 1.5,
            ...centerFlex,
          }}
        >
          Social media
        </Box>
        <SocialList
          discord={discordUrl}
          twitter={twitterUrl}
          sx={{
            pb: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default AppLeftMenu;
