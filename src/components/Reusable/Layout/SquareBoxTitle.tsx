import { Typography } from "@mui/material";
import MarkdownParser from "../MarkdownParser";

export type SquareBoxTitlePropsType = {
  children: string;
};

const SquareBoxTitle: React.VFC<SquareBoxTitlePropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <Typography
      variant="h2"
      sx={{ fontSize: [16, 16, 17], mb: [1.7, 1.7, 2.5] }}
    >
      <MarkdownParser>{children}</MarkdownParser>
    </Typography>
  );
};

export default SquareBoxTitle;
