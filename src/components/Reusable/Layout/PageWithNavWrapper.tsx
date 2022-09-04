import { Box, styled } from "@mui/material";
import { GENERAL_SETTINGS } from "constants/generalSettings";
import AppLeftMenu from "components/Reusable/Layout/AppLeftMenu";
import PublicHeader, { PublicHeaderHeight } from "./PublicHeader/PublicHeader";

export const LeftNavDesktopWidth = 110;

const DesktopLeftMenuWrapper = styled(Box)(({ theme }) => ({
  width: LeftNavDesktopWidth,
  position: "sticky",
  top: PublicHeaderHeight + 20,
  left: 0,
  alignSelf: "flex-start",
  [theme.breakpoints.up("md")]: {
    maxHeight: `calc(100vh - ${PublicHeaderHeight + 40}px)`,
  },
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.75)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.75)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.background.default,
    outline: "1px solid #000",
  },
}));

const MainWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  margin: "0 auto",
  minHeight: `calc(100% - ${PublicHeaderHeight}px)`,
  display: "flex",
  maxWidth: GENERAL_SETTINGS.CONTENT_LIMITED_WIDTH,
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: `calc(100% - ${LeftNavDesktopWidth}px)`,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  marginLeft: "auto",
}));

export type PageWithNavWrapperPropsType = {
  children?: any;
};

const PageWithNavWrapper: React.VFC<PageWithNavWrapperPropsType> = ({
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <>
      <PublicHeader />
      <MainWrapper>
        <DesktopLeftMenuWrapper>
          <AppLeftMenu />
        </DesktopLeftMenuWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </MainWrapper>
    </>
  );
};

export default PageWithNavWrapper;
