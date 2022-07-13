import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from "../../Layout/Layout"

export default function FolderList() {
  return (
    <Layout>



      <Grid container justifyContent='space-around'>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={3}
          sm={6}
          xs={12}
        >
          <Link href='/data/temp-hum'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                <div  className="glassBox">
                    <div  className="glassBox__imgBox">
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Temperature Humidity Data</h5>
                  </div>
                  <Grid container justifyContent='center'>
                      <Image alt={'Temp'} src={'/images/temp.png'} width={250} height={250} />
                      </Grid>
                    </div>
                  </div>


                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={3}
          sm={6}
          xs={12}
        >
          <Link href='/data/one-phase'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                <div  className="glassBox">
                    <div  className="glassBox__imgBox">
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>One Phase Meter Data</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'OnePhase'} src={'/images/onephase.png'} width={250} height={250} />
                  </Grid></div>
                  </div>

                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={3}
          sm={6}
          xs={12}
        >
          <Link href='/data/three-phase'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                <div  className="glassBox">
                    <div  className="glassBox__imgBox">
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Three Phase Meter Data</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'ThreePhase'} src={'/images/threephase.png'} width={250} height={250} />
                  </Grid>   </div>
                  </div>

                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>
      </Grid>





      {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
      </List> */}
    </Layout>
  );
}
