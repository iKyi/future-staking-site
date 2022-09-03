import { SvgIconProps, SvgIcon } from "@mui/material";

const DiamondIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 24 20" {...props}>
      <g clipPath="url(#clip0_839_8147)">
        <path
          fill="#fff"
          d="M2.484 7.75l7.301 7.793L6.27 7.75H2.484zM12 16.797l4.09-9.047H7.91L12 16.797zM6.305 6.25l2.39-4.5h-3.07L2.25 6.25h4.055zm7.91 9.293l7.3-7.793H17.73l-3.515 7.793zM8.004 6.25h7.992l-2.39-4.5h-3.211l-2.391 4.5zm9.691 0h4.055l-3.375-4.5h-3.07l2.39 4.5zM19.348.555l4.5 6c.109.14.16.302.152.486a.715.715 0 01-.2.475l-11.25 12a.706.706 0 01-.55.234.706.706 0 01-.55-.234L.2 7.516A.715.715 0 010 7.04a.718.718 0 01.152-.486l4.5-6A.684.684 0 015.25.25h13.5c.258 0 .457.102.598.305z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_839_8147">
          <path
            fill="#fff"
            d="M0 0H24V19.5H0z"
            transform="translate(0 .25)"
          ></path>
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default DiamondIcon;
