import { Box } from "@mui/material";

export type ResponsiveSpacePropsType = {
  children?: any;
};

const ResponsiveSpace: React.FC<ResponsiveSpacePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        height: [60, 60, 120],
      }}
    />
  );
};

export default ResponsiveSpace;
