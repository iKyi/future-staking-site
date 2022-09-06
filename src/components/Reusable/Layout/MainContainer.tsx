import { Box } from "@mui/material";
import { GENERAL_SETTINGS } from "constants/generalSettings";

export type MainContainerPropsType = {
  children?: any;
};

const MainContainer: React.VFC<MainContainerPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: GENERAL_SETTINGS.CONTENT_LIMITED_WIDTH,
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContainer;
