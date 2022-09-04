import { Button, CardActionArea, Grid, Typography } from "@mui/material";
import { ITokenCustomEntry } from "providers/Solana/services/FSLService";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/system";
import getMineSpeed from "utils/getMineSpeed";

export type CardEntryPropsType = {
  data: ITokenCustomEntry;
};

const StakedStatusBox: React.FC<{ status: boolean }> = ({ status }) => {
  return status ? (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mr: 1,
          borderRadius: "100%",
          width: 10,
          height: 10,
          bgcolor: "#67FF92",
        }}
      />
      <Box
        sx={{
          fontWeight: 300,
          fontSize: 15,
        }}
      >
        Staked
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mr: 1,
          borderRadius: "100%",
          width: 10,
          height: 10,
          background: `linear-gradient(180deg, #FF591E 0%, #FFB629 100%)`,
        }}
      />
      <Box
        sx={{
          color: "common.gray",
          fontWeight: 300,
          fontSize: 15,
        }}
      >
        Unstaked
      </Box>
    </Box>
  );
};

const CardEntry: React.VFC<CardEntryPropsType> = ({ data }) => {
  const { image, mint, dtacRedeemValue, isStaked } = data;

  const staked = isStaked ? true : false;

  // const mainColor = staked ? "error.main" : "primary.main";

  // *************** RENDER *************** //
  return (
    <CardActionArea
      component={RouterLink}
      to={`/stake/${mint}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        backdropFilter: `blur(649.821px)`,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <img
          src={image}
          alt="nft public display"
          style={{ width: "100%", height: "auto" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url('')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center center",
          }}
        />
      </Box>
      <Box sx={{ py: 1.5, width: "100%" }}>
        <Grid
          container
          sx={{
            px: 1.5,
            py: 1,
          }}
          rowSpacing={0.6}
        >
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "common.white",
                fontWeight: 300,
              }}
            >
              Status
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography
              component={Box}
              sx={{
                fontSize: "0.75rem",
                color: staked ? "error.main" : "primary.main",
              }}
            >
              <StakedStatusBox status={staked} />
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "common.white",
                fontWeight: 300,
              }}
            >
              Mining
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                color: "common.gray",
                fontWeight: 300,
              }}
            >
              {getMineSpeed(dtacRedeemValue)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="fsl" color="secondary" size="small">
          SEE MORE
        </Button>
      </Box>
    </CardActionArea>
  );
};

export default CardEntry;
