import { createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setPublicSiteData } from "../features/global/globalSlice";
import axiosGetter from "lib/axios/axiosGetter";
import { getStrapiURL } from "lib/theme/api";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export type StrapiPublicProviderPropsType = {
  children?: any;
};

export const StrapiContext = createContext<Record<any, any>>({});

const StrapiPublicProvider: React.VFC<StrapiPublicProviderPropsType> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const PublicSiteData = useAppSelector((state) => state.global.publicSiteData);

  useEffect(() => {
    if (!PublicSiteData) {
      Promise.all([
        axiosGetter(getStrapiURL("staking-page-data?populate=*")),
        axiosGetter(getStrapiURL("all-global?populate=*")),
      ])
        .then((datas) => {
          const localData = datas[0].data.attributes;
          const globalData = datas[1].data.attributes;

          dispatch(
            setPublicSiteData({
              ...localData,
              ...globalData,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PublicSiteData]);

  // *************** RENDER *************** //
  if (!PublicSiteData) {
    return (
      <Box
        sx={{
          background: "colors.primary",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <StrapiContext.Provider value={PublicSiteData}>
      {children}
    </StrapiContext.Provider>
  );
};

export default StrapiPublicProvider;
