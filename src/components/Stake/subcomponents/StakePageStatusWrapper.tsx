import { ITokenCustomEntry } from "providers/Solana/services/FSLService";
import { ReactNode } from "react";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import getMineSpeed from "utils/getMineSpeed";
import ThunderBoltIcon from "components/Icons/ThunderBoltIcon";
import smallBoxBackground from "./smallBoxBackground.png";

const IconedValueBox: React.FC<{
  name: string;
  value: string;
  icon: ReactNode;
  sx?: SxProps<Theme>;
}> = ({ name, value, icon, sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 4,
        pr: 4,
        ...sx,
      }}
    >
      <Box
        sx={{
          background: `url('${smallBoxBackground}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          width: [40, 40, 70],
          height: [40, 40, 70],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "3px",
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Stack spacing={[1]}>
          <Box
            sx={{
              color: "common.gray",
              fontWeight: 300,
              letterSpacing: "5px",
            }}
          >
            {name}
          </Box>
          <Box
            sx={{
              fontWeight: 300,
            }}
          >
            {value}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export type StakePageStatusWrapperPropsType = {
  data?: ITokenCustomEntry;
};

const StakePageStatusWrapper: React.FC<StakePageStatusWrapperPropsType> = ({
  data,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconedValueBox
        name="STATUS"
        value={data?.isStaked ? "STAKED" : "UNSTAKED"}
        icon={
          <Box
            sx={{
              borderRadius: "100%",
              width: 20,
              height: 20,
              background: data?.isStaked
                ? "#67FF92"
                : `linear-gradient(180deg, #FF591E 0%, #FFB629 100%)`,
            }}
          />
        }
      />
      <IconedValueBox
        name="MINING"
        value={getMineSpeed(data?.dtacRedeemValue)}
        icon={<ThunderBoltIcon />}
      />
    </Box>
  );
};

export default StakePageStatusWrapper;
