import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeviceRelayStatus from '../models/DeviceRelayStatus';
import { DataStore } from '../utils/DataStore';
import Layout from "../Layout/Layout"
import db from '../utils/db';
import { useSnackbar } from 'notistack';

export default function LoraRelay({ deviceRelayStatus }) {
  const { state } = useContext(DataStore);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { userInfo } = state;
  const [relay79B6Status, setRelay79B6Status] = useState(null);
  const [relayA448Status, setRelayA448Status] = useState(null);


  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    async function fetch() {
      const { data } = await axios.get(`/api/getRelayStatus`);
      await setRelay79B6Status(data.Relay79B6_status);
      await setRelayA448Status(data.RelayA448_status);
      
  }
  fetch();
  console.log('relay79B6Status',relay79B6Status)
  console.log('relayA448Status',relayA448Status)
  }, [router, userInfo]);




  async function OnRelay(dev_eui) {
    closeSnackbar();
    const requestOptions = {
      method: "POST",
      headers: {
        "Grpc-Metadata-Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiZjYwMGZlNTItZTEwNi00MzNiLTllZmYtMmMyMTM0YWFlZjFmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1NTAyOTI5OCwic3ViIjoiYXBpX2tleSJ9.yB2Tok8PtYJwASWcjszQ0WuPk0-kScpZIUujgWsS8Ns",
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: "MTExMQ==",
          devEUI: dev_eui,
          fCnt: 0,
          fPort: 7,
        },
      }),
    };
    fetch(
      `https://chirpstack.igscsi4server.com/api/devices/${dev_eui}/queue`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.fCnt) {
          async function run() {
            try {
              if (dev_eui === '506f9800000079b6') {
                setRelay79B6Status(true)
              }
              if (dev_eui === '506f98000000a448') {
                setRelayA448Status(true)
              }
            const a=await axios.post(`/api/setDeviceRelayStatus`, {
                relayStatus: true,
                device_eui: dev_eui
              });
             
              enqueueSnackbar(`Relay On`, { variant: "success" });
            } catch (e) {
              console.log(e);
            }
          }
          run()
        }
        else {
          enqueueSnackbar(data.error, { variant: "error" });
        }

      });
  }

  async function OffRelay(dev_eui) {

    closeSnackbar();
    const requestOptions = {
      method: "POST",
      headers: {
        "Grpc-Metadata-Authorization":
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiZjYwMGZlNTItZTEwNi00MzNiLTllZmYtMmMyMTM0YWFlZjFmIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTY1NTAyOTI5OCwic3ViIjoiYXBpX2tleSJ9.yB2Tok8PtYJwASWcjszQ0WuPk0-kScpZIUujgWsS8Ns",
      },
      body: JSON.stringify({
        deviceQueueItem: {
          confirmed: true,
          data: "ICAgIA==",
          devEUI: dev_eui,
          fCnt: 0,
          fPort: 7,
        },
      }),
    };
    fetch(
      `https://chirpstack.igscsi4server.com/api/devices/${dev_eui}/queue`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.fCnt) {
          async function run() {
            try {
              if (dev_eui === '506f9800000079b6') {
                setRelay79B6Status(false)
              }
              if (dev_eui === '506f98000000a448') {
                setRelayA448Status(false)
              }

              const a=await axios.post(`/api/setDeviceRelayStatus`, {
                relayStatus: false,
                device_eui: dev_eui
              });

              enqueueSnackbar("Relay Off ", { variant: "success" });
            } catch (e) {
              console.log(e);
            }
          }
          run()
        }
        else {
          enqueueSnackbar(data.error, { variant: "error" });
        }

      });

  }


  async function OnOffRelay(status, dev_eui) {
    if (status == true) {
      console.log(dev_eui,'Turneing Off','Current Status',status)
      OffRelay(dev_eui)
    }
    else {
      console.log(dev_eui,'Turneing On','Current Status',status)
      OnRelay(dev_eui)
    }
  }

  // console.log('relay79B6Status',relay79B6Status)
  // console.log('relayA448Status',relayA448Status)

  return (
    <Layout >
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Typography sx={{ mb: 3 }} variant="h5">
            Lora_Relay_79B6_2
          </Typography>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormGroup>
              <FormControlLabel
                onChange={() => OnOffRelay(relay79B6Status, '506f9800000079b6')}
                control={<Switch size="large" color="warning" checked={relay79B6Status === true ? true : false} />}
                label={relay79B6Status === true ? 'On' : 'Off'} />
            </FormGroup>
          </Box>
        </Grid>


        <Grid item xs={12}>
          <Typography sx={{ mb: 3 }} variant="h5">
            Lora_Relay_A448_1
          </Typography>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormGroup>
              <FormControlLabel
                onChange={() => OnOffRelay(relayA448Status, '506f98000000a448')}
                control={<Switch size="large" color="warning" checked={relayA448Status === true ? true : false} />}
                label={relayA448Status === true ? 'On' : 'Off'} />
            </FormGroup>
          </Box>
        </Grid>

   


      </Grid>
    </Layout>
  );
}



export async function getServerSideProps() {
  await db.connect();
  const deviceRelayStatus = await DeviceRelayStatus.find({}).lean()
  await db.disconnect();
  return {
    props: {
      deviceRelayStatus: deviceRelayStatus.map(db.convertDocToObj),
    },
  };
}

