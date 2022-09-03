import { SvgIconProps, SvgIcon } from "@mui/material";

const LogoIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 60 52" {...props}>
      <path
        fill="url(#paint0_linear_839_7517)"
        fillRule="evenodd"
        d="M17.41 30.088l3.104-5.437-4.69-8.237h9.45l3.174-5.498H12.65L9.476 5.518h22.096L34.746.02H.025L17.41 30.088zM37.9 16.424l6.277-10.906h6.347l-6.347 10.926 3.143 5.468L59.975 0H41.003l-9.451 16.424 6.347 10.915-7.864 13.745-3.174-5.498 4.69-8.247-3.103-5.427-7.934 13.674L30.035 52l14.142-24.66-6.278-10.916z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_839_7517"
          x1="5.549"
          x2="39.762"
          y1="4.028"
          y2="30.124"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B048FD"></stop>
          <stop offset="0.315" stopColor="#6216D2"></stop>
          <stop offset="0.63" stopColor="#3E4ECC"></stop>
          <stop offset="1" stopColor="#3E75D5"></stop>
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default LogoIcon;
