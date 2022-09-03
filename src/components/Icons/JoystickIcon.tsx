import { SvgIconProps, SvgIcon } from "@mui/material";

const JoystickIcon: React.VFC<SvgIconProps> = (props) => {
  // *************** RENDER *************** //
  return (
    <SvgIcon viewBox="0 0 32 32" {...props}>
      <path
        fill="#fff"
        d="M20.571 18.857a1.714 1.714 0 11-3.428 0 1.714 1.714 0 013.428 0zM22.286 16a1.713 1.713 0 100-3.427 1.713 1.713 0 000 3.427zm-16-.286a.857.857 0 01.857-.857h2v-2a.857.857 0 111.714 0v2h2a.857.857 0 110 1.714h-2v2.002a.857.857 0 01-1.714 0V16.57h-2a.857.857 0 01-.857-.857zm-4 .286A9.714 9.714 0 0112 6.286h8a9.714 9.714 0 010 19.428h-8A9.714 9.714 0 012.286 16zM12 8a8 8 0 100 16h8a8 8 0 100-16h-8z"
      ></path>
    </SvgIcon>
  );
};

export default JoystickIcon;
