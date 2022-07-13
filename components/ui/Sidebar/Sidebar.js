import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import CellTowerSharpIcon from '@mui/icons-material/CellTowerSharp';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
import MouseIcon from '@mui/icons-material/Mouse';
import ThermostatIcon from '@mui/icons-material/Thermostat';
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../utils/LayoutContext";

const structure = [
  { id: 22, label: "Live Dashboard", link: "/", icon: <DataObjectIcon /> },
  { id: 22, label: "Temprature", link: "/temp", icon: <ThermostatIcon /> },
  { id: 1, label: 'Devices', link: '/devices', icon: <SensorsSharpIcon /> },
  { id: 2, label: 'Gateways', link: '/gateways', icon: <CellTowerSharpIcon /> },
  { id: 3, type: 'divider' },
  { id: 4, type: "title", label: "Details" },
  {
    id: 7, label: "All Data", link: "/data", icon: <StorageSharpIcon />,
    children: [
      { label: "Temprature", link: "/data/temp-hum" },
      { label: "One Phase", link: "/data/one-phase" },
      { label: "Three Phase", link: "/data/three-phase" },
    ],
  },
  { id: 5, label: "Give Payload", link: "/buzzer-command", icon: <TouchAppSharpIcon /> },
  { id: 5, label: "Relay", link: "/relay", icon: < MouseIcon /> },
  { id: 8, type: "divider" },

];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default Sidebar;
