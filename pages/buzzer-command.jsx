import React, { useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataStore } from "../utils/DataStore";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
export default function Payload() {
    const { state } = useContext(DataStore);
    const { userInfo } = state;
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [tempBuzzerStatus, setTempBuzzerStatus] = useState(null);
    const [humBuzzerStatus, setHumBuzzerStatus] = useState(null);
    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }

        async function fetch() {
            const { data } = await axios.get(`/api/getBuzzerStatus`);
            await setTempBuzzerStatus(data.FF01_I04_status);
            await setHumBuzzerStatus(data.FF01_I05_status);
        }
        fetch();

    }, [userInfo, router]);


    async function OnOffTempBuzzer() {
        if (tempBuzzerStatus == true) {
            OffBuzzerIO4()
        }
        else {
            OnBuzzerIO4()
        }
    }

    async function OnOffHumBuzzer() {
        if (humBuzzerStatus == true) {
            OffBuzzerIO5()
        }
        else {
            OnBuzzerIO5()
        }
    }







    async function OnBuzzerIO4() {

        closeSnackbar();
        const requestOptions = {
            method: "POST",
            headers: {
                "Grpc-Metadata-Authorization":
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
            },
            body: JSON.stringify({
                deviceQueueItem: {
                    confirmed: true,
                    data: process.env.NEXT_PUBLIC_On_Buzzer_IO4,
                    devEUI: process.env.NEXT_PUBLIC_Buzzer_DevEUI,
                    fCnt: 0,
                    fPort: 7,
                },
            }),
        };
        fetch(
            `https://chirpstack1.igscsi4server.com/api/devices/${process.env.NEXT_PUBLIC_Buzzer_DevEUI}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.fCnt) {
                    const downlinkTime = new Date()
                    async function run() {
                        try {
                            await axios.post(`/api/setTempBuzzerStatus`, {
                                buzzerStatus: true,
                            });
                            setTempBuzzerStatus(true)
                            enqueueSnackbar("Temprature Buzzer On ", { variant: "success" });
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

    async function OffBuzzerIO4() {

        closeSnackbar();
        const requestOptions = {
            method: "POST",
            headers: {
                "Grpc-Metadata-Authorization":
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
            },
            body: JSON.stringify({
                deviceQueueItem: {
                    confirmed: true,
                    data: process.env.NEXT_PUBLIC_Off_Buzzer_IO4,
                    devEUI: process.env.NEXT_PUBLIC_Buzzer_DevEUI,
                    fCnt: 0,
                    fPort: 7,
                },
            }),
        };
        fetch(
            `https://chirpstack.igscsi4server.com/api/devices/${process.env.NEXT_PUBLIC_Buzzer_DevEUI}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.fCnt) {
                    async function run() {
                        try {

                            await axios.post(`/api/setTempBuzzerStatus`, {
                                buzzerStatus: false,
                            });
                            setTempBuzzerStatus(false)
                            enqueueSnackbar("Temprature Buzzer Off ", { variant: "success" });
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



    async function OnBuzzerIO5() {

        closeSnackbar();
        const requestOptions = {
            method: "POST",
            headers: {
                "Grpc-Metadata-Authorization":
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
            },
            body: JSON.stringify({
                deviceQueueItem: {
                    confirmed: true,
                    data: process.env.NEXT_PUBLIC_On_Buzzer_IO5,
                    devEUI: process.env.NEXT_PUBLIC_Buzzer_DevEUI,
                    fCnt: 0,
                    fPort: 7,
                },
            }),
        };
        fetch(
            `https://chirpstack.igscsi4server.com/api/devices/${process.env.NEXT_PUBLIC_Buzzer_DevEUI}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.fCnt) {

                    async function run() {
                        try {
                            await axios.post(`/api/setHumBuzzerStatus`, {
                                buzzerStatus: true,
                            });
                            setHumBuzzerStatus(true)
                            enqueueSnackbar("Humidity Buzzer On ", { variant: "success" });
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


    async function OffBuzzerIO5() {

        closeSnackbar();
        const requestOptions = {
            method: "POST",
            headers: {
                "Grpc-Metadata-Authorization":
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5X2lkIjoiNTUyNzc0ZWEtMjJlNS00YzY1LWFhMjAtN2Y4NzU0Y2E5NjFkIiwiYXVkIjoiYXMiLCJpc3MiOiJhcyIsIm5iZiI6MTYzNzY1MTgwNSwic3ViIjoiYXBpX2tleSJ9._2OFZ7tfw6GYSbYk94M5RM17BwUGQB3IoGRZdqoGd_4",
            },
            body: JSON.stringify({
                deviceQueueItem: {
                    confirmed: true,
                    data: process.env.NEXT_PUBLIC_Off_Buzzer_IO5,
                    devEUI: process.env.NEXT_PUBLIC_Buzzer_DevEUI,
                    fCnt: 0,
                    fPort: 7,
                },
            }),
        };
        fetch(
            `https://chirpstack.igscsi4server.com/api/devices/${process.env.NEXT_PUBLIC_Buzzer_DevEUI}/queue`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.fCnt) {
                    async function run() {
                        try {
                            await axios.post(`/api/setHumBuzzerStatus`, {
                                buzzerStatus: false,
                            });
                            setHumBuzzerStatus(false)
                            enqueueSnackbar("Humidity Buzzer Off ", { variant: "success" });
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


    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography sx={{ mb: 3 }} variant="h5">
                        Temperature Buzzer
                    </Typography>
                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
                        <FormGroup>
                            {process.env.NEXT_PUBLIC_BUZZER_AVAILABLE ? (
                                <FormControlLabel
                                    onChange={() => OnOffTempBuzzer()}
                                    control={<Switch size="large" color="warning" checked={tempBuzzerStatus === true ? true : false} />}
                                    label={tempBuzzerStatus === true ? 'On' : 'Off'}
                                />
                            ) : (
                                <FormControlLabel disabled control={<Switch />} label={tempBuzzerStatus === true ? 'On' : 'Off'} />
                            )}
                        </FormGroup>
                    </Box>
                </Grid>



                <Grid item xs={12}>
                    <Typography sx={{ mb: 3 }} variant="h5">
                        Humidity Buzzer
                    </Typography>
                    <Box sx={{ "& > :not(style)": { m: 1 } }}>
                        <FormGroup>
                            {process.env.NEXT_PUBLIC_BUZZER_AVAILABLE ? (
                              <FormControlLabel
                              onChange={() => OnOffHumBuzzer()}
                              control={<Switch size="large" color="warning" checked={humBuzzerStatus === true ? true : false} />}
                              label={humBuzzerStatus === true ? 'On' : 'Off'}
                          />
                        ):(
                            <FormControlLabel disabled control={<Switch />} label={humBuzzerStatus === true ? 'On' : 'Off'} />
                        )}
                        </FormGroup>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}
