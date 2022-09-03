import { Button, Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

export type StrapiLinkButtonPropsType = {
  variant?: "primary" | "secondary" | "info" | "error";
  link?: string;
  text?: string;
  url?: string;
  disabled?: boolean;
};

const StrapiLinkButton: React.FC<StrapiLinkButtonPropsType> = ({
  variant,
  link,
  text,
  url,
  disabled,
}) => {
  // *************** RENDER *************** //
  const LinkComponent = link === "external" ? MUILink : Link;
  const linkProps =
    link === "external"
      ? {
          href: url,
          rel: "noreferrer",
          target: "_blank",
          style: { textDecoration: "none" },
        }
      : {
          to: url,
        };
  return (
    <Button
      variant="fsl"
      color={variant ?? "primary"}
      disabled={disabled}
      component={LinkComponent}
      {...linkProps}
    >
      {text}
    </Button>
  );
};

export default StrapiLinkButton;
