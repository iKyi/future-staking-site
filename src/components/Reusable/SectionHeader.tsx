import { Typography, SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { FONTS } from "lib/theme";
import { ReactNode } from "react";
import MarkdownParser from "./MarkdownParser";
import sectionTitleLeft from "assets/images/sectionTitle/sectionTitleLeft.png";
import sectionTitleRight from "assets/images/sectionTitle/sectionTitleRight.png";

export type SectionHeaderPropsType = {
  preTitle?: string;
  title?: string;
  sx?: SxProps;
  description?: string;
  children?: ReactNode;
  disableHeaderBars?: boolean;
};

const SectionHeader: React.FC<SectionHeaderPropsType> = ({
  title,
  preTitle,
  sx,
  description,
  children,
  disableHeaderBars,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: [4, 4, 7],
        px: [2, 2, 6],
        ...sx,
      }}
    >
      {preTitle && preTitle.length > 0 && (
        <Typography
          component="span"
          sx={{
            color: "common.gray",
            fontSize: [10, 12, 12],
            fontWeight: 300,
            lineHeight: "17px",
            letterSpacing: "5px",
            m: 0,
            textTransform: "uppercase",
          }}
        >
          {preTitle}
        </Typography>
      )}

      {title && (
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {!disableHeaderBars && (
            <Box
              sx={{
                background: `url('${sectionTitleLeft}')`,
                backgroundSize: "100% auto",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                flex: 1,
                minHeight: "60px",
              }}
            />
          )}

          <Typography
            variant="h3"
            sx={{
              fontSize: [26, 26, 40],
              mt: [0.85, 0.85, 1.8],
              mb: [1.5, 1.5, 2],
              fontFamily: FONTS.MOKOTO,
              px: 3,
            }}
          >
            <MarkdownParser>{title}</MarkdownParser>
          </Typography>
          {!disableHeaderBars && (
            <Box
              sx={{
                background: `url('${sectionTitleRight}')`,
                backgroundSize: "100% auto",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                flex: 1,
                minHeight: "60px",
              }}
            />
          )}
        </Box>
      )}

      {children && <Box>{children}</Box>}
      {description && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            component="div"
            sx={{
              fontWeight: 300,
              fontSize: 14,
              lineHeight: "22px",
              letterSpacing: 0.5,
              color: "common.lightGray",
              m: 0,
              width: 600,
              maxWidth: "100%",
            }}
          >
            <MarkdownParser>{description}</MarkdownParser>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SectionHeader;
