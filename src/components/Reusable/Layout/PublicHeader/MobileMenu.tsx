import { Box, Drawer } from "@mui/material";
import LogoIcon from "components/Icons/LogoIcon";
import AppLeftMenu from "../AppLeftMenu";
import { StyledLinkForHeaderLogo } from "./PublicHeader";

export type MobileMenuPropsType = {
  open: boolean;
  closeMobileMenu: any;
};

const MobileMenu: React.VFC<MobileMenuPropsType> = ({
  open,
  closeMobileMenu,
}) => {
  // *************** RENDER *************** //
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={closeMobileMenu}
      PaperProps={{
        sx: {
          bgcolor: "common.black",
          py: 3,
          px: 1.5,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <StyledLinkForHeaderLogo to="/">
          <LogoIcon color="inherit" fontSize="inherit" />
        </StyledLinkForHeaderLogo>
      </Box>

      <AppLeftMenu />
    </Drawer>
  );
};

export default MobileMenu;
