import { Box, Grid, Typography } from "@mui/material";
import { FONTS } from "lib/theme";

export type StakingHomePageHeaderPropsType = {
  children?: any;
};

const StakingHomePageHeader: React.FC<StakingHomePageHeaderPropsType> = ({
  children,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        py: [3, 3, 6],
      }}
    >
      <Grid
        container
        spacing={[2, 2, 4]}
        sx={{
          minHeight: 200,
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color: "common.gray",
              fontSize: [10, 12, 12],
              fontWeight: 300,
              lineHeight: "17px",
              letterSpacing: "5px",
              m: 0,
              textTransform: "uppercase",
              mb: [1, 1, 2],
            }}
          >
            FSL
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: [22, 22, 32],
              fontFamily: FONTS.MOKOTO,
            }}
          >
            STAKING
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StakingHomePageHeader;
