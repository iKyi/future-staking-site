import { ListItem, SvgIconProps } from "@mui/material";
import { VFC } from "react";

export type MenuItemEntryPropsType = {
  active?: boolean;
  url?: string;
  icon: VFC<SvgIconProps<"svg", {}>>;
  tooltip?: string;
  allDisabled?: boolean;
};

const MenuItemEntry: React.FC<MenuItemEntryPropsType> = ({
  active = false,
  url,
  icon,
}) => {
  const ElementIcon = icon;
  // *************** RENDER *************** //
  return (
    <ListItem>
      <ElementIcon />
    </ListItem>
  );
};

export default MenuItemEntry;
