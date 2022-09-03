import { Box } from "@mui/material";

export type MainContainerPropsType = {
  children?: any;
};

const MainContainer: React.VFC<MainContainerPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1480px",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContainer;
