import { Drawer } from "@mui/material";
import { mainDarkBackground } from "lib/theme/pallette";
import AppLeftMenu from "../AppLeftMenu";

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
          bgcolor: mainDarkBackground,
          py: 3,
          px: 1.5,
        },
      }}
    >
      <AppLeftMenu />
    </Drawer>
  );
};

export default MobileMenu;
