import { SvgIconProps, SvgIcon } from "@mui/material";

const SolIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon fill="none" viewBox="0 0 15 14" {...props}>
      <path
        fill="url(#paint0_linear_839_8288)"
        d="M14.819 11.038l-2.46 2.771a.57.57 0 01-.416.191H.286a.276.276 0 01-.157-.05.297.297 0 01-.105-.13.315.315 0 01.052-.325l2.457-2.77a.57.57 0 01.416-.191h11.657a.273.273 0 01.16.046.294.294 0 01.107.131.313.313 0 01-.054.327zm-2.46-5.58a.575.575 0 00-.416-.192H.286a.276.276 0 00-.157.05.297.297 0 00-.105.13.314.314 0 00.052.325l2.457 2.772a.576.576 0 00.416.191h11.657c.056 0 .11-.018.156-.05a.298.298 0 00.105-.13.314.314 0 00-.052-.325L12.36 5.457zM.287 3.465h11.657a.545.545 0 00.417-.19L14.819.504a.313.313 0 00.054-.327.294.294 0 00-.108-.131.274.274 0 00-.159-.047H2.95a.546.546 0 00-.416.191L.076 2.961a.314.314 0 00-.052.324c.022.055.059.1.105.132.047.032.101.05.157.05z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_839_8288"
          x1="1.257"
          x2="14.163"
          y1="14.334"
          y2="0.488"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.08" stopColor="#9945FF"></stop>
          <stop offset="0.3" stopColor="#8752F3"></stop>
          <stop offset="0.5" stopColor="#5497D5"></stop>
          <stop offset="0.6" stopColor="#43B4CA"></stop>
          <stop offset="0.72" stopColor="#28E0B9"></stop>
          <stop offset="0.97" stopColor="#19FB9B"></stop>
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default SolIcon;
