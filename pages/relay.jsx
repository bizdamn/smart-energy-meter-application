import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ResponsiveContainer } from "recharts";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../Layout/Layout"
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useSnackbar } from 'notistack';
import axios from 'axios'
import db from '../utils/db';
import Relays from '../models/Relays';
import TextField from '@mui/material/TextField';
export default function LiveData({ relays }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();



    // On Relay using Chirpstack API
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
            `${process.env.NEXT_PUBLIC_CHIRPSTACK_URL}/api/devices/${dev_eui}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.fCnt) {
                    async function run() {
                        try {
                            const a = await axios.post(`/api/setDeviceRelayStatus`, {
                                relayStatus: true,
                                device_eui: dev_eui
                            });
                            window.location.reload(1);

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


    // Off Relay using Chirpstack API
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
            `${process.env.NEXT_PUBLIC_CHIRPSTACK_URL}/api/devices/${dev_eui}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.fCnt) {
                    async function run() {
                        try {
                            const a = await axios.post(`/api/setDeviceRelayStatus`, {
                                relayStatus: false,
                                device_eui: dev_eui
                            });
                            window.location.reload(1);

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


    // Check status and on /off relay
    async function OnOffRelay(status, dev_eui) {
        if (status == true) {
            console.log(dev_eui, 'Turneing Off', 'Current Status', status)
            OffRelay(dev_eui)
        }
        else {
            console.log(dev_eui, 'Turneing On', 'Current Status', status)
            OnRelay(dev_eui)
        }
    }



    // Relay Data Update Functions
    async function setRelayName(devEUI, relayName) {
        closeSnackbar();

        try {
            const { data } = await axios.put('/api/set-relay-name', {
                devEUI: devEUI,
                relayName: relayName
            });
            enqueueSnackbar('Relay Name Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    }
    async function setRelayMachine(devEUI, machineName) {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/relays/set-machine-name', {
                machineName: machineName,
                devEUI: devEUI
            });
            enqueueSnackbar('Machine Name Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    }
    async function setRelayArea(devEUI, areaName) {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/relays/set-area-name', {
                areaName: areaName,
                devEUI: devEUI
            });
            enqueueSnackbar('Area Name Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    }
    async function setRelayDevice(devEUI, deviceName) {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/relays/set-device-name', {
                deviceName: deviceName,
                devEUI: devEUI
            });
            enqueueSnackbar('Device Name Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    }
    async function setRelayControlParameter(devEUI, controlParameter) {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/relays/set-control-parameter', {
                controlParameter: controlParameter,
                devEUI: devEUI
            });
            enqueueSnackbar('Control Parameter Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    }


    return (
        <Layout>
            <Grid container>


                {relays?.map((element) => {
                    return (<>
                        <Grid
                            component={Paper}
                            style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
                            className="p-0"
                            item
                            lg={4}
                            md={4}
                            sm={6}
                            xs={12}
                        >
                            <ResponsiveContainer className="p-0" width="100%">
                                <>
                                    <div
                                        className="p-1"
                                        style={{
                                            backgroundColor: "#9013FE",
                                            borderRadius: "1rem",
                                            color: "#fff",
                                            textAlign: "center",
                                        }}>

                                        <h5>{element.relayName}</h5>
                                    </div>


                                    <Grid container spacing={1}>
                                        <Grid item lg={6} xs={6}>
                                            <List>
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>
                                                    <ListItemText
                                                        primary={`Relay EUI`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>
                                                    <ListItemText
                                                        primary={`Relay Name`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>
                                                    <ListItemText
                                                        primary={`Machine Name`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>
                                                    <ListItemText
                                                        primary={`Area Name`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>
                                                    <ListItemText
                                                        primary={`Device Name`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 7, backgroundColor: "#D3D3D3" }}>

                                                    <ListItemText
                                                        primary={`Control Parameter`}
                                                    />

                                                </ListItem>
                                                <Divider />
                                            </List>
                                        </Grid>
                                        <Grid item lg={6} xs={6}>
                                            <List>

                                                <ListItem style={{ padding: 4, backgroundColor: "#EEEEEE" }}>
                                                    <ListItemText
                                                        primary={element.devEUI}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem style={{ padding: 5, backgroundColor: "#EEEEEE" }}>
                                                    <TextField
                                                        size="small"
                                                        defaultValue={element.relayName}
                                                        onBlur={(e) => {
                                                            setRelayName(element.devEUI, e.target.value);
                                                        }}
                                                        type="text"
                                                        fullWidth
                                                        variant="outlined"
                                                    />
                                                </ListItem>
                                                <Divider />

                                                <ListItem style={{ padding: 5, backgroundColor: "#EEEEEE" }}>

                                                    <TextField
                                                        size="small"
                                                        defaultValue={element.machineName}
                                                        onBlur={(e) => {
                                                            setRelayMachine(element.devEUI, e.target.value);
                                                        }}
                                                        type="text"
                                                        fullWidth
                                                        variant="outlined"
                                                    />


                                                </ListItem>

                                                <Divider />

                                                <ListItem style={{ padding: 4, backgroundColor: "#EEEEEE" }}>

                                                    <TextField
                                                        size="small"
                                                        defaultValue={element.areaName}
                                                        onBlur={(e) => {
                                                            setRelayArea(element.devEUI, e.target.value);
                                                        }}
                                                        type="text"
                                                        fullWidth
                                                        variant="outlined"
                                                    />

                                                </ListItem>
                                                <Divider />

                                                <ListItem style={{ padding: 4, backgroundColor: "#EEEEEE" }}>

                                                    <TextField
                                                        size="small"
                                                        defaultValue={element.deviceName}
                                                        onBlur={(e) => {
                                                            setRelayDevice(element.devEUI, e.target.value);
                                                        }}
                                                        type="text"
                                                        fullWidth
                                                        variant="outlined"
                                                    />


                                                </ListItem>
                                                <Divider />

                                                <ListItem style={{ padding: 4, backgroundColor: "#EEEEEE" }}>
                                                    <TextField
                                                        size="small"
                                                        defaultValue={element.controlParameter}
                                                        onBlur={(e) => {
                                                            setRelayControlParameter(element.devEUI, e.target.value);
                                                        }}
                                                        type="text"
                                                        fullWidth
                                                        variant="outlined"
                                                    />


                                                </ListItem>
                                                <Divider />
                                            </List>
                                        </Grid>
                                    </Grid>




                                    <Grid item sx={{ p: 1 }} xs={12}>




                                        <Box sx={{ "& > :not(style)": { m: 1 } }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    onChange={() => OnOffRelay(element.relayStatus, element.devEUI)}
                                                    control={<Switch size="large" color="warning" checked={element.relayStatus === true ? true : false} />}
                                                    label={element.relayStatus === true ? 'On' : 'Off'} />
                                            </FormGroup>
                                        </Box>
                                    </Grid>
                                </>
                            </ResponsiveContainer>
                        </Grid>



                    </>)
                })}

            </Grid>
        </Layout>
    );
}




export async function getServerSideProps() {
    await db.connect();
    const relays = await Relays.find({}).lean()
    await db.disconnect();
    return {
        props: {
            relays: relays.map(db.convertDocToObj),
        },
    };
}

