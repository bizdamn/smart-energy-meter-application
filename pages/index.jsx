import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ResponsiveContainer } from "recharts";
import moment from 'moment';
import db from "../utils/db";
import Organisation from "../models/Organisation";
import OnePhase01 from "../models/OnePhase01";
import OnePhase02 from "../models/OnePhase02";
import ThreePhase01 from "../models/ThreePhase01";
// Giving ERROR: Cannot read properties of undefined (reading 'split')
// import ThreePhase02 from "../models/ThreePhase02";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import { Grid, Box } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
import BoxComponent from "../components/Dashboard/BoxComponent";
import RYB from "../components/Dashboard/ryb/RYB";
import MonthPickerComponent from "../components/DatePickerComponent/MonthPickerComponent";
export default function Dashboard({
    command01,
    command02,
    // unitsUsedArray,
    organisation
}) {


    const router = useRouter()
    const { state } = useContext(DataStore);
    const { userInfo } = state;
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0);


    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [costPerUnit, setCostPerUnit] = useState(null)

    const [startDate, SetStartDate] = useState(
        moment(currentDate, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")
    );
    const [endDate, SetEndDate] = useState(
        moment(currentDate, "YYYY-MM-DDTHH:mm:ss")
            .add(1, "days")
            .format("YYYY-MM-DD")
    );

    useEffect(() => {
        async function fetch() {
            const costPU = await axios.get(`/api/setPerUnitCost`);
            setCostPerUnit(costPU)
        }
        fetch()

        chartDataFilter()
    }, [userInfo, router]);



    async function update() {
        closeSnackbar();
        await axios.post(`/api/setPerUnitCost`, {
            perUnitCost: costPerUnit,
        });
        enqueueSnackbar("Cost Updated ", { variant: "success" });
    };

    const [mainData, setMainData] = useState({
        onePhaseEBData: { minArray: [], maxArray: [], avgArray: [] },
        threePhaseEBData: { minArray: [], maxArray: [], avgArray: [] },
    });
    const [mainMeterData, setMainMeterData] = useState({ "CostData": { "minArray": [], "maxArray": [], "avgArray": [] }, "EBData": { "minArray": [], "maxArray": [], "avgArray": [] }, "DGData": { "minArray": [], "maxArray": [], "avgArray": [] }, "frequencyData": { "minArray": [], "maxArray": [], "avgArray": [] }, "voltageRedData": { "minArray": [], "maxArray": [], "avgArray": [] }, "voltageYellowData": { "minArray": [], "maxArray": [], "avgArray": [] }, "voltageBlueData": { "minArray": [], "maxArray": [], "avgArray": [] }, "currentRedData": { "minArray": [], "maxArray": [], "avgArray": [] }, "currentYellowData": { "minArray": [], "maxArray": [], "avgArray": [] }, "currentBlueData": { "minArray": [], "maxArray": [], "avgArray": [] }, "powerFactorData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVALoadRedData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVALoadYellowData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVALoadBlueData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVARLoadRedData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVARLoadYellowData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kVARLoadBlueData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kWLoadRedData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kWLoadYellowData": { "minArray": [], "maxArray": [], "avgArray": [] }, "kWLoadBlueData": { "minArray": [], "maxArray": [], "avgArray": [] } })


    async function chartDataFilter() {
        closeSnackbar();
        try {
        
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_Chart_API_Python_Link}/three-phase`,
            {
              start_date: startDate,
              end_date: endDate,
              deviceEUI:  organisation?.mainMeterEUI
            }
          );
          setMainMeterData(data);

            // const { data } = await axios.post(`http://127.0.0.1:5000/dashboard`,
            //   {
            //     start_date: startDate,
            //     end_date: endDate,
            //   }
            // );
            // setMainData(data);
            enqueueSnackbar("Filtered", { variant: "success" });
        } catch (e) {
            console.log(e);
        }
    }




    const EB_KWHdata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Min Energy(KWh)",
                data: mainMeterData.EBData.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Max Energy(KWh)",
                data: mainMeterData.EBData.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Average Energy(KWh)",
                data: mainMeterData.EBData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };


    const Costdata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Min Cost",
                data: mainMeterData.CostData.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Max Cost",
                data: mainMeterData.CostData.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Average Cost",
                data: mainMeterData.CostData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };

    const KWLoaddata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "R Phase KW Load",
                data: mainMeterData.kWLoadRedData.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Y Phase KW Load",
                data: mainMeterData.kWLoadYellowData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],
            },
            {
                label: "B Phase KW Load",
                data: mainMeterData.kWLoadBlueData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };
    const KVALoaddata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "R Phase KVA Load",
                data: mainMeterData.kVALoadRedData.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Y Phase KVA Load",
                data: mainMeterData.kVALoadYellowData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "B Phase KVA Load",
                data: mainMeterData.kVALoadBlueData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };
    const KVARLoaddata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "R Phase KVAR Load",
                data: mainMeterData.kVARLoadRedData.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Y Phase KVAR Load",
                data: mainMeterData.kVARLoadYellowData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "B Phase KVAR Load",
                data: mainMeterData.kVARLoadBlueData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };


    const Frequencydata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Min Frequency",
                data: mainMeterData.frequencyData.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Max Frequency",
                data: mainMeterData.frequencyData.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Average Frequency",
                data: mainMeterData.frequencyData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };

    const PowerFactordata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Min Power Factor",
                data: mainMeterData.powerFactorData.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Max Power Factor",
                data: mainMeterData.powerFactorData.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Average Power Factor",
                data: mainMeterData.powerFactorData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };


    const Voltagedata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "R Phase Voltage",
                data: mainMeterData.voltageRedData.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Y Phase Voltage",
                data: mainMeterData.voltageYellowData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "B Phase Voltage",
                data: mainMeterData.voltageBlueData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };

    const Currentdata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "R Phase Current",
                data: mainMeterData.currentRedData.avgArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Y Phase Current",
                data: mainMeterData.currentYellowData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "B Phase Current",
                data: mainMeterData.currentBlueData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };


    const DG_KWHdata = {
        labels: ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"],
        datasets: [
            {
                label: "Min Energy DG",
                data: mainMeterData.DGData.minArray,
                borderColor: [
                    "red",
                ],
                borderWidth: 1,
            },
            {
                label: "Max Energy DG",
                data: mainMeterData.DGData.maxArray,
                borderWidth: 1,
                borderColor: [
                    "blue",
                ],

            },
            {
                label: "Average DG",
                data: mainMeterData.DGData.avgArray,
                borderWidth: 1,
                borderColor: [
                    "black",
                ],
            },
        ],

    };


    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // console.log({ startDate, endDate })
    // console.log(unitsUsedArray)
    return (
        <Layout>

            {/* <BoxComponent/> */}

            <TabContext value={value}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab style={{ minWidth: "20%" }} label="Daily" value="1" />
                    <Tab style={{ minWidth: "20%" }} label="Monthly" value="2" />
                    {/* <Tab style={{ minWidth: "20%" }} label="Any Range" value="3" /> */}
                </Tabs>

                <TabPanel value="1">
                    <Grid container>

                        <Grid order={{ xs: 1 }} style={{ padding: '1rem' }} item lg={7} sm={12}>
                            <Grid container spacing={2} >
                                <Grid item lg={6}>
                                    <ListItem style={{ backgroundColor: "#e0e5ec", borderRadius: '1rem' }}>
                                        <ListItemButton component="a" href="#total-cost">
                                            <ListItemText
                                                primary={`Total Cost:  ₹  ${parseFloat(
                                                    command01[0]?.eb * organisation.perUnitCost
                                                ).toFixed(2)}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Grid>
                                <Grid item lg={6}>
                                    <ListItem style={{ backgroundColor: "#e0e5ec", borderRadius: '1rem' }}>
                                        <ListItemButton component="a" href="#kwh">
                                            <ListItemText
                                                primary={`Total KWh Units Used:  ${parseFloat(
                                                    command01[0]?.eb).toFixed(2)}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>

                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid item lg={5} sm={12}>

                            <Stack direction="row">
                                <DatePickerComponent
                                    startDate={startDate}
                                    SetStartDate={SetStartDate}
                                    endDate={endDate}
                                    SetEndDate={SetEndDate}
                                />

                                <Box>
                                    <Button onClick={() => chartDataFilter()} endIcon={<FilterAltIcon />}
                                        style={{ backgroundColor: '#FF5C93', borderRadius: '1rem', color: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '0.7rem' }} >
                                        <b>  Click To Filter</b>
                                    </Button>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="2">

                    <Stack direction="row">
                        <Stack sx={{ width: "100%" }} direction="row">
                            <MonthPickerComponent
                                startDate={startDate}
                                SetStartDate={SetStartDate}
                                endDate={endDate}
                                SetEndDate={SetEndDate}
                            />
                            <Box>
                                <Button onClick={() => chartDataFilter()} endIcon={<FilterAltIcon />}
                                    style={{ backgroundColor: '#FF5C93', borderRadius: '1rem', color: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '0.7rem' }} >
                                    <b>  Click To Filter</b>
                                </Button>
                            </Box>


                        </Stack>
                    </Stack>
                </TabPanel>


            </TabContext>

            <RYB frequency={ command02[0]?.frequency} voltage={ command02[0]?.voltage} current={ command02[0]?.current} />


            {/* Last Readings */}
            <Grid sx={{ my: 3 }}>
                <Grid container spacing={2}>


                
                    <Grid item lg={4} xs={12}>
                        <List>


                            <ListItem style={{ backgroundColor: "#e0e5ec", borderRadius: '1rem' }}>
                                <ListItemButton component="a" href="#dg">
                                    <ListItemText
                                        primary={`DG Last Reading:  ${parseFloat(
                                            command01[0]?.dg
                                        ).toFixed(2)}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <List>

                            <ListItem style={{ backgroundColor: "#e0e5ec", borderRadius: '1rem' }}>
                                <ListItemButton component="a" href="#kw">
                                    <ListItemText
                                        primary={`Total KW Load Used:  ${parseFloat(
                                            command02[0]?.kW_Load
                                        ).toFixed(2)}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <List>
                            <ListItem style={{ backgroundColor: "#e0e5ec", borderRadius: '1rem' }}>
                                <ListItemButton component="a" href="#kva">
                                    <ListItemText
                                        primary={`Total KVA Units Used:${parseFloat(
                                            command02[0]?.kVA_Load
                                        ).toFixed(2)} `}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider />


                        </List>
                    </Grid>
                </Grid>
            </Grid>





            {/* Charts */}

            <Grid style={{ marginTop: 0 }} container spacing={4}>
                <Grid
                    style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}>

                    <ResponsiveContainer id="total-cost" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#9013FE",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}>
                                <h5>Total Cost</h5>
                            </div>
                            <Line height={150} data={Costdata} />

                        </>
                    </ResponsiveContainer>
                </Grid>

                <Grid
                    style={{ border: "2px solid #3CD4A0", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="kwh" className="p-0" width="100%">
                        <><div
                            className="p-1"
                            style={{
                                backgroundColor: "#3CD4A0",
                                borderRadius: "1rem",
                                color: "#fff",
                                textAlign: "center",
                            }}>
                            <h5>Energy Trend(KWh)</h5>
                        </div>
                            <Line height={150} data={EB_KWHdata} />

                        </>
                    </ResponsiveContainer>
                </Grid>
                <Grid
                    style={{ border: "2px solid #FFC260", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="kw" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#FFC260",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>KW Load Trend</h5>

                            </div>
                            <Line height={150} data={KWLoaddata} />

                        </>
                    </ResponsiveContainer>
                </Grid>
                <Grid
                    style={{ border: "2px solid #FF5C93", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="kva" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#FF5C93",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >

                                <h5>KVA Load Trend</h5>
                            </div>
                            <Line height={150} data={KVALoaddata} />

                        </>
                    </ResponsiveContainer>
                </Grid>


                <Grid
                    style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="kvar" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#9013FE",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>KVAR Trend</h5>


                            </div>
                            <Line height={150} data={KVARLoaddata} />

                        </>
                    </ResponsiveContainer>
                </Grid>

                <Grid
                    style={{ border: "2px solid #3CD4A0", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="power-factor" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#3CD4A0",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>Power Factor</h5>
                            </div>
                            <Line height={150} data={PowerFactordata} />

                        </>
                    </ResponsiveContainer>
                </Grid>
                <Grid
                    style={{ border: "2px solid #FFC260", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="dg" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#FFC260",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>DG</h5>
                            </div>
                            <Bar height={150} data={DG_KWHdata} />
                        </>
                    </ResponsiveContainer>
                </Grid>
                <Grid
                    style={{ border: "2px solid #FF5C93", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="frequency" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#FF5C93",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>Frequency Trend</h5>
                            </div>
                            <Line height={150} data={Frequencydata} />
                        </>
                    </ResponsiveContainer>
                </Grid>


                <Grid
                    style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="current" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#9013FE",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>Daily Current Trend</h5>

                            </div>
                            <Line height={150} data={Currentdata} />
                        </>
                    </ResponsiveContainer>
                </Grid>

                <Grid
                    style={{ border: "2px solid #3CD4A0", borderRadius: "1rem" }}
                    className="p-0"
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                >
                    <ResponsiveContainer id="voltage" className="p-0" width="100%">
                        <>
                            <div
                                className="p-1"
                                style={{
                                    backgroundColor: "#3CD4A0",
                                    borderRadius: "1rem",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                <h5>Voltage Trend</h5>
                            </div>
                            <Line height={150} data={Voltagedata} />
                        </>
                    </ResponsiveContainer>
                </Grid>




            </Grid>



        </Layout>
    );
}



export async function getServerSideProps(ctx) {

    await db.connect();
    const organisation = await Organisation.find().lean();


    const command01 = await OnePhase01.find({ devEUI: '506f9800000064a0' })
        .sort({ timestamp: -1 })
        .lean();
    const command02 = await OnePhase02.find({ devEUI: '506f9800000064a0' })
        .sort({ timestamp: -1 })
        .lean();
        // const command01 = await ThreePhase01.find({ devEUI: '506f980000006193' }).sort({ 'timestamp': -1 }).lean()
        // const command02 = await ThreePhase02.find({ devEUI: '506f980000006193' }).sort({ 'timestamp': -1 }).lean()

    const onephaseDevices = await OnePhase01.find({}).distinct('devEUI').lean()

    const threephaseDevices = await ThreePhase01.find({}).distinct('devEUI').lean()

    var array = new Array();
    for (const item of onephaseDevices) {
        // finding last entries of all devices and pushing in an Array

        let x = await OnePhase01.find({ devEUI: item }).sort({ _id: -1 }).limit(1).lean()

        array.push(x.map(db.convertDocToObj)[0])
    }
    for (const item of threephaseDevices) {
        // finding last entries of all devices and pushing in an Array

        let x = await ThreePhase01.find({ devEUI: item }).sort({ _id: -1 }).limit(1).lean()
        await db.disconnect();
        array.push(x.map(db.convertDocToObj)[0])
    }
    return {
        props: {
            command01: command01.map(db.convertDocToObj),
            command02: command02.map(db.convertDocToObj),
            // unitsUsedArray:array,
            organisation: organisation.map(db.convertDocToObj)[0],
        },
    };
}
