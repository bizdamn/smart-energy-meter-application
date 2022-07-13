import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import db from "../../utils/db";
import AdminLayout from "../../Layout/AdminLayout"
import { useSnackbar } from 'notistack';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import Devices from "../../models/Devices";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
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
        <AdminLayout>
     <ChakraProvider>
        <Link href='/admin/add/device'>
          <a>
            <Button style={{ color: '#008060', marginBottom: '1rem' }} variant="outline">
              Add Device
            </Button>
          </a>
        </Link>
      </ChakraProvider>
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
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices?.map((element) => {

                            return (
                                <>
                                    {/* One Phase Meters */}
                                    {element.realName.substring(0, 3) == '1p_' ? (<>
                                        <tr key={element.devEUI}>
                                            <td >
                                                <Link href={`/device-info/one-phase/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    {element.devEUI}
                                                </a></Link>
                                            </td>
                                            <td style={{ padding: '5px' }} >
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
                                            <td >
                                                <Link href={`/admin/edit/device/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
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

                                            <td style={{ padding: '5px' }} >
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
                                            <td >
                                                <Link href={`/admin/edit/device/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
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
                                            <td style={{ padding: '5px' }} >
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
                                            <td >
                                                <Link href={`/admin/edit/device/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
                                                </a></Link>
                                            </td>
                                        </tr>
                                    </>) : null}

                                    {/* Schneider Electric Meters */}
                                    {element.realName.substring(0, 3) == 'schneider_' ? (<>
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
                                            <td >
                                                <Link href={`/admin/edit/device/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
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

        </AdminLayout>
    );
}





export async function getServerSideProps({ req, res }) {
    await db.connect();
    const devices = await Devices.find({}).lean();
    await db.disconnect();
    return {
        props: {
            devices: devices.map(db.convertDocToObj),
        },
    };
}

