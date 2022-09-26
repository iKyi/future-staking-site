import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Lock, SubdirectoryArrowLeftSharp } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import FourOhFourComp from "components/FourOhFour/FourOhFourComp";
import { setInfoModal } from "features/global/globalSlice";
import { centerFlex } from "lib/sxUtils";
import { ReactNode } from "react";
import { SxProps } from "@mui/system";
import useStakeAction from "hooks/useStakeAction";
import SeoComp from "../Reusable/Seo";
import { LOADING_KEY } from "constants/loadingKeys";
import { DateTime } from "luxon";
import { FONTS } from "lib/theme";
import StakePageStatusWrapper from "./subcomponents/StakePageStatusWrapper";
import { getStrapiMedia } from "lib/theme/media";
import ResponsiveSpace from "components/Reusable/ResponsiveSpace";
import boxBackground from "./boxBackground.png";

export type StakeCardEntryPropsType = {
  children?: any;
};

const boxStyles: SxProps = {
  p: [2, 2, 2.3, 2.5],
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  background: `url('${boxBackground}')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundPosition: "center center",
};

const parentBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-Start",
  width: "100%",
  img: {
    width: "auto",
    mb: 0.8,
  },
};

const colmunFullHeightSize: SxProps = {
  display: "flex",
};

const ElemTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        fontSize: ["1.1rem", "1.1rem", "1.2rem"],
        mb: [1.5, 1.5, 2, 2],
        fontWeight: 300,
      }}
    >
      {children}
    </Box>
  );
};

const bigTextStyles: SxProps = {
  fontSize: ["1.3rem", "1.3rem", "2rem"],
};

const StakeCardEntry: React.VFC<StakeCardEntryPropsType> = ({ children }) => {
  const { stakeAction, claimFSL, unstakeAction } = useStakeAction();
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams();
  const charsLoading = useAppSelector((state) => state.global.loaders).includes(
    LOADING_KEY.CHARS_LOADING
  );
  const data = useAppSelector((state) => state.user.tokens).find(
    (tkn) => tkn.mint === paramId
  );

  const { walletBoxBg } =
    useAppSelector((state) => state.global.publicSiteData) ?? {};
  // *************** RENDER *************** //
  const bgImg = walletBoxBg ? getStrapiMedia(walletBoxBg) : "";

  const {
    dtacRedeemValue,
    solRedeemValue,
    name,
    typeId,
    image,
    mint,
    isStaked,
    isLocked,
    stakeEndDate,
  } = data || {};

  const loadingInProgres = useAppSelector(
    (state) => state.global.loaders
  ).includes(LOADING_KEY.STAKING);

  const staked = isStaked ? true : false;

  const hasBalance: boolean =
    (dtacRedeemValue && dtacRedeemValue > 0) ||
    (solRedeemValue && solRedeemValue > 0)
      ? true
      : false;
  // *************** METHODS  *************** //

  const localDoStake = () => {
    if (data) {
      if (!staked) {
        stakeAction(mint!, name!);
      } else {
        // this is where unstake takes place
        unstakeAction(mint!);
      }
    } else {
      throw new Error("Error 5231");
    }
  };

  const localDoClaimFSL = () => {
    if (dtacRedeemValue === 0) {
      dispatch(setInfoModal("No FSL to claim"));
    } else if (staked) {
      claimFSL(mint ?? "");
    } else {
      dispatch(
        setInfoModal(
          <Box sx={{ color: "error.main" }}>
            NFT needs to be staked in order to claim
          </Box>
        )
      );
    }
  };

  const seo = data
    ? {
        metaTitle: `${name} NFT ${typeId ? "#" + typeId : ""}`,
      }
    : null;

  // *************** RENDER *************** //
  if (!data && !charsLoading) return <FourOhFourComp />;
  if (charsLoading) {
    return (
      <Box sx={{ flex: 1, height: "100%", width: "100%", ...centerFlex }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        px: [2, 2, 4, 6],
        pb: [3, 3, 5],
        background: `url('${bgImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "repeat-y",
      }}
    >
      <ResponsiveSpace />
      <SeoComp seo={seo} />
      <Box sx={{ mb: [3, 3, 5] }}>
        <Button
          size="small"
          color="secondary"
          variant="fsl"
          component={RouterLink}
          to="/"
          startIcon={<SubdirectoryArrowLeftSharp />}
        >
          Back
        </Button>
      </Box>
      <Box>
        <Grid
          container
          rowSpacing={[3, 2, 2, 0, 0]}
          columnSpacing={[0, 0, 3, 3]}
        >
          <Grid item xs={12} md={6} xl={8}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: ["1rem", "1.3rem", "1.5rem"],
                  mb: [2, 2, 3, 3],
                }}
              >
                <Typography
                  component={"div"}
                  sx={{
                    fontFamily: FONTS.MOKOTOONE,
                    fontSize: [22, 22, 28],
                    fontWeight: 300,
                  }}
                >
                  {name} {`${typeId ? "#" + typeId : ""}`}
                </Typography>
              </Box>
              <StakePageStatusWrapper data={data} />
              {/* BUTTON BOX */}
              <Box>
                <Button
                  variant="fsl"
                  color={staked ? "secondary" : "primary"}
                  startIcon={<Lock color={staked ? "primary" : "secondary"} />}
                  fullWidth
                  onClick={localDoStake}
                  disabled={loadingInProgres || isLocked || hasBalance}
                  sx={{
                    fontWeight: 300,
                  }}
                >
                  {isLocked
                    ? `Unstake locked until ${DateTime.fromISO(
                        stakeEndDate!
                      ).toLocaleString(DateTime.DATETIME_SHORT)} `
                    : hasBalance
                    ? `Please claim all balances before unstaking`
                    : staked
                    ? "UNSTAKE"
                    : "STAKE NOW"}
                </Button>
              </Box>
              <Box sx={{ mt: [2, 2, 5] }}>
                <Grid
                  container
                  rowSpacing={[2, 2, 0, 0]}
                  columnSpacing={[0, 0, 2, 2]}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    xl={4}
                    sx={{ ...colmunFullHeightSize }}
                  >
                    <Box sx={parentBoxStyles}>
                      <Box
                        sx={{
                          ...boxStyles,
                        }}
                      >
                        <ElemTitle>FSL Token</ElemTitle>
                        <Box
                          sx={{
                            mb: [3, 3, 4],
                          }}
                        >
                          <Typography
                            component="span"
                            sx={{ ...bigTextStyles }}
                          >
                            {dtacRedeemValue}
                          </Typography>{" "}
                          <Typography component="span">FSL</Typography>
                        </Box>
                        <Box sx={{ mt: "auto" }}>
                          <Button
                            fullWidth
                            variant="fsl"
                            color="info"
                            onClick={localDoClaimFSL}
                            sx={{
                              width: "100%",
                            }}
                          >
                            CLAIM NOW
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* INNER ENDS HERe */}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <Box sx={{ position: "relative" }}>
              <img
                src={image}
                alt="Nyx nft"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StakeCardEntry;
