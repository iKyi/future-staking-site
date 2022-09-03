import { Box, SxProps, Theme } from "@mui/material";
import SquareBorderImage from "assets/layout/squareBorder.png";

export type SquareBorderBoxPropsType = {
  children?: any;
  sx?: SxProps<Theme>;
  darkborder?: boolean;
};

const SquareBorderBox: React.VFC<SquareBorderBoxPropsType> = ({
  children,
  sx,
  darkborder,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        border: "12px solid",
        borderImage: `url(${SquareBorderImage})`,
        borderImageSlice: "12 12 12 12",
        borderImageWidth: "20px 20px 20px 20px",
        borderImageOutset: "0px 0px 0px 0px",
        borderImageRepeat: "stretch stretch",
        bgcolor: darkborder ? "rgba(0,0,0,0.18)" : undefined,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default SquareBorderBox;
