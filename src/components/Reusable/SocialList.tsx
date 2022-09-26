import { IconButton, Stack, Link, Theme, SxProps, Box } from "@mui/material";
import { Twitter, LinkedIn, Facebook } from "@mui/icons-material";
import DiscordIcon from "components/Icons/DiscordIcon";

const SocialIconButton: React.FC<{
  children: any;
  url: string;
}> = ({ children, url }) => {
  return (
    <IconButton
      component={Link}
      href={url}
      sx={{
        fontSize: 12,
        width: 22,
        height: 22,
        color: "secondary.contrastText",
        borderRadius: 0,
        transition: "all .2s",
        border: "1px solid",
        backgroundColor: "colors.black",
        transform: "rotate(45deg)",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(123.49deg, #fff 8.63%, #fff 25.73%, #fff 42.83%, #fff 62.96%)",
        "&:hover": {
          border: "1px solid",
          borderImageSlice: 1,
          borderImageSource:
            "linear-gradient(123.49deg, #B048FD 8.63%, #6216D2 25.73%, #3E4ECC 42.83%, #3E75D5 62.96%)",
          color: "primary.main",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      target="_blank"
      rel="noopener"
    >
      <Box
        sx={{
          transform: "rotate(-45deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </IconButton>
  );
};

export type SocialListPropsType = {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  discord?: string;
  sx?: SxProps<Theme>;
};

const SocialList: React.VFC<SocialListPropsType> = ({
  facebook,
  twitter,
  linkedin,
  discord,
  sx: importedSx,
}) => {
  // *************** RENDER *************** //
  return (
    <Stack
      direction="row"
      spacing={2.5}
      sx={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        px: 1,
        ...importedSx,
      }}
    >
      {facebook && (
        <SocialIconButton url={facebook}>
          <Facebook color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
      {twitter && (
        <SocialIconButton url={twitter}>
          <Twitter color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
      {linkedin && (
        <SocialIconButton url={linkedin}>
          <LinkedIn color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
      {discord && (
        <SocialIconButton url={discord}>
          <DiscordIcon color="inherit" fontSize="inherit" />
        </SocialIconButton>
      )}
    </Stack>
  );
};

export default SocialList;
