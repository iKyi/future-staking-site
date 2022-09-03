import { SvgIconProps, SvgIcon } from "@mui/material";

const PersonIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 20 26" {...props}>
      <path
        stroke="#B048FD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 17.421c-4.854 0-9 .755-9 3.776S5.12 25 10 25c4.855 0 9-.756 9-3.776 0-3.02-4.118-3.803-9-3.803z"
        clipRule="evenodd"
        fill="transparent"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.358 12.368c3.195 0 5.785-2.545 5.785-5.684 0-3.14-2.59-5.684-5.785-5.684-3.195 0-5.786 2.544-5.786 5.684-.011 3.128 2.562 5.674 5.745 5.684h.04z"
        clipRule="evenodd"
        fill="transparent"
      ></path>
    </SvgIcon>
  );
};

export default PersonIcon;
