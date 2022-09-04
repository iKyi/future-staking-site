import { Grid, Box, CircularProgress, Tabs, Tab } from "@mui/material";
import { ITokenCustomEntry } from "providers/Solana/services/FSLService";
import { useAppSelector } from "app/hooks";
import { centerFlex } from "lib/sxUtils";
import { LOADING_KEY } from "constants/loadingKeys";
import CardEntry from "./CardEntry";
import { ReactNode, useMemo, useState } from "react";
import { FONTS } from "lib/theme";

export type CardGridPropsType = {
  tokens: ITokenCustomEntry[];
};

const TabTextElement: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        fontFamily: FONTS.MOKOTOONE,
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 300,
        fontSize: [14, 14, 18],
      }}
    >
      {children}
    </Box>
  );
};

const CardGrid: React.VFC<CardGridPropsType> = ({ tokens }) => {
  const [filterValue, setFilterValue] = useState<any>(null);

  const charsLoading = useAppSelector((state) => state.global.loaders).includes(
    LOADING_KEY.CHARS_LOADING
  );

  const showdCards = useMemo(() => {
    if (filterValue === "staked") {
      return tokens?.filter((item) => item.isStaked);
    }
    if (filterValue === "unstaked") {
      return tokens?.filter((item) => !item.isStaked);
    }
    return tokens;
  }, [filterValue, tokens]);

  // *************** RENDER *************** //
  if (charsLoading) {
    return (
      <Box sx={{ flex: 1, height: "100%", width: "100%", ...centerFlex }}>
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  const handleChange = (_: any, value2: any) => {
    setFilterValue(value2);
  };

  return (
    <Box>
      <Box
        sx={{
          pb: [3, 3, 5],
        }}
      >
        <Tabs
          value={filterValue}
          onChange={handleChange}
          aria-label="NFT filter tabs"
        >
          <Tab value={null} label={<TabTextElement>ALL NFTS</TabTextElement>} />
          <Tab
            value={"staked"}
            label={
              <TabTextElement>
                <Box
                  sx={{
                    mr: 1,
                    borderRadius: "100%",
                    width: 10,
                    height: 10,
                    bgcolor: "#67FF92",
                  }}
                />
                STAKED
              </TabTextElement>
            }
          />
          <Tab
            value={"unstaked"}
            label={
              <TabTextElement>
                <Box
                  sx={{
                    mr: 1,
                    borderRadius: "100%",
                    width: 10,
                    height: 10,
                    background: `linear-gradient(180deg, #FF591E 0%, #FFB629 100%)`,
                  }}
                />
                UNSTAKED
              </TabTextElement>
            }
          />
        </Tabs>
      </Box>
      <Grid container columnSpacing={[1]} rowSpacing={2}>
        {showdCards?.length > 0 ? (
          showdCards.map((token) => {
            return (
              <Grid item key={token.mint} xs={6} md={4} xl={3}>
                <CardEntry data={token} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                fontFamily: FONTS.MOKOTOONE,
                p: [4, 4, 6],
              }}
            >
              No results found
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CardGrid;
