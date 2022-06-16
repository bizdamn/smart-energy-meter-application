import * as React from 'react';
import Link from 'next/link'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import Layout from "../../Layout/Layout"
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AdjustIcon from '@mui/icons-material/Adjust';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function FolderList() {
  return (
    <Layout>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DeviceThermostatIcon />
          </Avatar>
        </ListItemAvatar>
        <Link href='/data/temp-hum'>
          <a>
        <ListItemText primary="Temprature Humidity Sensors Data" secondary="" />
          </a>
        </Link>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AdjustIcon />
          </Avatar>
        </ListItemAvatar>
        <Link href='/data/one-phase'>
          <a>
        <ListItemText primary="One Phase Sensors Data" secondary="" />
        </a>
        </Link>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MoreHorizIcon />
          </Avatar>
        </ListItemAvatar>
        <Link href='/data/three-phase'>
          <a>
        <ListItemText primary="Three Phase Sensors Data" secondary="" />
        </a>
        </Link>
      </ListItem>
    </List>
    </Layout>
  );
}
