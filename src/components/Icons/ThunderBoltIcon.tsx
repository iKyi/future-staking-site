import { SvgIconProps, SvgIcon } from "@mui/material";

const ThunderBoltIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path
        stroke="#fff"
        strokeWidth="1.5"
        d="M7.73 15.939l3-12.997v-.001a.25.25 0 01.25-.191h10.023a.25.25 0 01.195.092v.001a.25.25 0 01.05.213v.001l-1.73 7.78-.203.913h5.687a.25.25 0 01.218.127.25.25 0 01-.03.234L12.193 29.104l-.013.018-.013.019a.252.252 0 01-.177.108.25.25 0 01-.24-.287s0 0 0 0l1.82-11.848.133-.864H7.98a.25.25 0 01-.25-.307h0v-.004z"
      ></path>
    </SvgIcon>
  );
};

export default ThunderBoltIcon;
