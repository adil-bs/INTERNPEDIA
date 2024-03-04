import { IconClasses, IconOwnProps, IconProps } from "@mui/material"

export interface SidebarOption {
  id: number
  name: string
  href: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
}