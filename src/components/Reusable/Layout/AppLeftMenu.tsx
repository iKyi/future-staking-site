import {
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import DiamondIcon from "components/Icons/DiamondIcon";
import HomeIcon from "components/Icons/HomeIcon";
import JoystickIcon from "components/Icons/JoystickIcon";
import PersonIcon from "components/Icons/PersonIcon";
import { StrapiContext } from "providers/StrapiPublicProvider";
import { Fragment, useContext } from "react";
import { centerFlex } from "utils/sxUtils";
import { MenuItemEntryPropsType } from "./MenuItemEntry";

export type AppLeftMenuPropsType = {};

const AppLeftMenu: React.VFC<AppLeftMenuPropsType> = () => {
  const GlobalData = useContext(StrapiContext);
  const { landingMenuLink, gamesMenuLink, mintMenuLink, stakingMenuLink } =
    GlobalData ?? {};

  const LeftMenuItems: MenuItemEntryPropsType[] = [
    {
      icon: HomeIcon,
      url: landingMenuLink?.url ?? "/",
      tooltip: landingMenuLink?.tooltipText ?? null,
      allDisabled: landingMenuLink?.allDisabled ?? false,
    },
    {
      active: true,
      icon: PersonIcon,
      url: stakingMenuLink?.url ?? "/",
      tooltip: stakingMenuLink?.tooltipText ?? null,
      allDisabled: stakingMenuLink?.allDisabled ?? false,
    },
    {
      icon: JoystickIcon,
      url: gamesMenuLink?.url ?? "/",
      tooltip: gamesMenuLink?.tooltipText ?? null,
      allDisabled: gamesMenuLink?.allDisabled ?? false,
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
    <Box>
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
          const Element = (
            <ListItem
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
                width: "60px",
                height: "60px",
                maxWidth: "100%",
                borderRadius: "6px",
                background: item.active
                  ? `linear-gradient(123.49deg, rgba(176, 72, 253, 0.15) 8.63%, rgba(98, 22, 210, 0.15) 25.73%, rgba(62, 78, 204, 0.15) 42.83%, rgba(62, 117, 213, 0.15) 62.96%)`
                  : undefined,
                ...(item.active
                  ? {
                      border: "1px solid",
                      borderImageSlice: 1,
                      borderImageSource:
                        "linear-gradient(123.49deg, #B048FD 8.63%, #6216D2 25.73%, #3E4ECC 42.83%, #3E75D5 62.96%)",
                      borderRadius: "6px",
                    }
                  : {}),
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              <ListItemIcon sx={{ fontSize: "24px", ...centerFlex }}>
                <item.icon fontSize="inherit" />
              </ListItemIcon>
            </ListItem>
          );

          if (item.tooltip) {
            return (
              <Tooltip title={item.tooltip} placement="right" key={index}>
                <Box>{Element}</Box>
              </Tooltip>
            );
          } else {
            return <Fragment key={index}>Element</Fragment>;
          }
        })}
      </List>
    </Box>
  );
};

export default AppLeftMenu;
