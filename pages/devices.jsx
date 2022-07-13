import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Devices from "../models/Devices";
import db from "../utils/db";
import Layout from "../Layout/Layout"
import { useSnackbar } from 'notistack';
import axios from 'axios'
export default function DevicesList({ devices }) {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  async function setDeviceName(devEUI, devName) {
    closeSnackbar();
    try {
      const { data } = await axios.put('/api/set-device-name', {
        devName: devName,
        devEUI: devEUI
      });
      enqueueSnackbar('Device Name Updated Successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  }

  return (
    <Layout>

      <Grid
        container
        spacing={0}
        direction="column"
        style={{ overflowX: 'scroll' }}
      >
        <table className="table table-striped  table-hover">
          <thead style={{ backgroundColor: '#38B6FF', fontSize: '1.3rem', color: '#fff' }}>
            <tr>
              <th>Device EUI Number</th>
              <th>Device Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {devices?.map((element) => {
              // if (element.lastSeenAt !== null) {
              //   var date = new Date(element.lastSeenAt);
              //   var formattted_last_seen = date.toLocaleString()
              // }
              // else if (element.lastSeenAt === null) {
              //   formattted_last_seen = 'Never Seen';
              // }
              return (
                <>
                   {/* One Phase Meters */}
                  {element.realName.substring(0, 3) == '1p_' ? (<>
                    <tr  key={element.devEUI}>
                      <td >
                        <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td style={{padding:'5px' }} >
                        <TextField
                         size="small"
                          defaultValue={element.devName}
                          onBlur={(e) => {
                            setDeviceName(element.devEUI, e.target.value);
                          }}
                          type="text"
                          fullWidth
                          label="Device Name"
                          variant="outlined"
                        />
                      </td>
                      <td >
                        <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          One Phase
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}

                    {/* Three Phase Meters */}
                  {element.realName.substring(0, 3) == '3p_' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/three-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>

                      <td style={{padding:'5px' }} >
                        <TextField
                         size="small"
                          defaultValue={element.devName}
                          onBlur={(e) => {
                            setDeviceName(element.devEUI, e.target.value);
                          }}
                          type="text"
                          fullWidth
                          label="Device Name"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        <Link href={`/device-info/three-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                          Three Phase
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}

                    {/* Temerature Humidity Meters */}
                  {element.realName.substring(0, 3) == 'th_' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/temp-hum/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td style={{padding:'5px' }} >
                        <TextField
                         size="small"
                          defaultValue={element.devName}
                          onBlur={(e) => {
                            setDeviceName(element.devEUI, e.target.value);
                          }}
                          type="text"
                          fullWidth
                          label="Device Name"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        <Link href={`/device-info/temp-hum/${element.devEUI}`} style={{ color: 'black' }}><a>
                          Temperature Humidity Meter
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}

                  {/* Schneider Electric Meters */}
                  {element.realName.substring(0, 3) == 'sch' ? (<>
                    <tr key={element.devEUI}>
                      <td>
                        <Link href={`/device-info/schneider/${element.devEUI}`} style={{ color: 'black' }}><a>
                          {element.devEUI}
                        </a></Link>
                      </td>
                      <td>
                        <TextField
                          defaultValue={element.devName}
                          onBlur={(e) => {
                            setDeviceName(element.devEUI, e.target.value);
                          }}
                          type="text"
                          fullWidth
                          label="Device Name"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        <Link href={`/device-info/schneider/${element.devEUI}`} style={{ color: 'black' }}><a>
                        Schneider
                        </a></Link>
                      </td>

                    </tr>
                  </>) : null}

                </>
              );
            })}

          </tbody>
        </table>

      </Grid>

    </Layout>
  );
}





export async function getServerSideProps({ req, res }) {
  await db.connect();
  const devices = await Devices.find().lean();
  await db.disconnect();
  return {
    props: {
      devices: devices.map(db.convertDocToObj),
    },
  };
}

