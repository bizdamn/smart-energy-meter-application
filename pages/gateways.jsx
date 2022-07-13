import React, { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Gateways from "../models/Gateways";
import db from "../utils/db";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios'
export default function DevicePage({gateways}) {
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function setGatewayName(gatewayID, gatewayName) {
    closeSnackbar();

    try {
        const { data } = await axios.put('/api/set-gateway-name', {
            gatewayID: gatewayID,
            gatewayName: gatewayName
        });
        enqueueSnackbar('Gateway Name Updated Successfully', { variant: 'success' });
    } catch (err) {
        enqueueSnackbar(err, { variant: 'error' });
    }
}


  return (
    <Layout>
      <Typography sx={{ mb: 3 }} variant="h4">Gateways</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ overflowX: 'scroll' }}
          >

            <table className="table">
              <thead>
                <tr>
                  <th>Gateway ID</th>
                  <th>Gateway Name</th>
                  <th>Real Name</th>
                </tr>
              </thead>
              <tbody>
                {gateways?.map((element) => {
                  // if (element.lastSeenAt !== null) {
                  //   var date = new Date(element.lastSeenAt);
                  //   var formattted_last_seen = date.toLocaleString()
                  // }
                  // else if (element.lastSeenAt === null) {
                  //   formattted_last_seen = 'Never Seen';
                  // }

                  return (

                    <tr key={element.gatewayID}>
                      <td>
                        <Link href={`/gateway-info/${element.gatewayID}`} style={{ color: 'black' }}><a>
                          {element.gatewayID}
                        </a></Link>
                      </td>
                      <td>
                        <TextField
                         size="small"
                          defaultValue={element.gatewayName}
                          onBlur={(e) => {
                            setGatewayName(element.gatewayID, e.target.value);
                          }}
                          type="text"
                          fullWidth
                          label="Device Name"
                          variant="outlined"
                        />
                        
                         
                      </td>
                      <td>
                        <Link href={`/gateway-info/${element.gatewayID}`} style={{ color: 'black' }}><a>
                          {element.realName}
                        </a></Link>
                      </td>
                    </tr>

                  );
                })}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}


export async function getServerSideProps({ req, res }) {
  await db.connect();
  const gateways = await Gateways.find().lean();
  await db.disconnect();
  return {
    props: {
      gateways: gateways.map(db.convertDocToObj),
    },
  };
}
