import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import moment from "moment";
import OnePhase01 from "../../../models/OnePhase01";
import OnePhase02 from "../../../models/OnePhase02";
// import OnePhase03 from "../../../models/OnePhase03";
import Organisation from "../../../models/Organisation";
import Devices from "../../../models/Devices";
import db from "../../../utils/db";
import { ResponsiveContainer } from "recharts";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Layout from "../../../Layout/Layout";
import { DataStore } from "../../../utils/DataStore";
import { useSnackbar } from "notistack";
import DeviceInfo from "../../../components/Data/DeviceInfo";
import DatePickerComponent from "../../../components/DatePickerComponent/DatePickerComponent";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useRouter } from "next/router";
export default function DevicePage({
  command01,
  command02,
  // command03,
  organisation,
  device,
}) {

  const router = useRouter();
  const { id } = router.query;
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0);
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    chartDataFilter();
  }, [userInfo, router]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [startDate, SetStartDate] = useState(
    moment(currentDate, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD")
  );
  const [endDate, SetEndDate] = useState(
    moment(currentDate, "YYYY-MM-DDTHH:mm:ss")
      .add(1, "days")
      .format("YYYY-MM-DD")
  );

  const [mainData, setMainData] = useState({
    CostData: { minArray: [], maxArray: [], avgArray: [] },
    EBData: { minArray: [], maxArray: [], avgArray: [] },
    DGData: { minArray: [], maxArray: [], avgArray: [] },
    frequencyData: { minArray: [], maxArray: [], avgArray: [] },
    voltageData: { minArray: [], maxArray: [], avgArray: [] },
    currentData: { minArray: [], maxArray: [], avgArray: [] },
    powerFactorData: { minArray: [], maxArray: [], avgArray: [] },
    kWLoadData: { minArray: [], maxArray: [], avgArray: [] },
    kVALoadData: { minArray: [], maxArray: [], avgArray: [] },
  });

  async function chartDataFilter() {
    closeSnackbar();
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_Chart_API_Python_Link}/one-phase`,
        {
          start_date: startDate,
          end_date: endDate,
          deviceEUI: id,
        }
      );
      setMainData(data);
      enqueueSnackbar("Filtered", { variant: "success" });
    } catch (e) {
      console.log(e);
    }
  }

  const EB_KWHdata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Energy(KWh)",
        data: mainData.EBData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Energy(KWh)",
        data: mainData.EBData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average Energy(KWh)",
        data: mainData.EBData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const Costdata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Cost",
        data: mainData.CostData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Cost",
        data: mainData.CostData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average Cost",
        data: mainData.CostData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const KWLoaddata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min KW Load",
        data: mainData.kWLoadData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max KW Load",
        data: mainData.kWLoadData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Avearge KW Load",
        data: mainData.kWLoadData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };
  const KVALoaddata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min KVA Load",
        data: mainData.kVALoadData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max KVA Load",
        data: mainData.kVALoadData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Avearge KVA Load",
        data: mainData.kVALoadData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const Frequencydata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Frequency",
        data: mainData.frequencyData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Frequency",
        data: mainData.frequencyData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average Frequency",
        data: mainData.frequencyData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const PowerFactordata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Power Factor",
        data: mainData.powerFactorData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Power Factor",
        data: mainData.powerFactorData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average Power Factor",
        data: mainData.powerFactorData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const Voltagedata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Voltage",
        data: mainData.voltageData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Voltage",
        data: mainData.voltageData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Avearge Voltage",
        data: mainData.voltageData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const Currentdata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Current",
        data: mainData.currentData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Current",
        data: mainData.currentData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Avg Current",
        data: mainData.currentData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  const DG_KWHdata = {
    labels: [
      "12 AM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
      "5 AM",
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ],
    datasets: [
      {
        label: "Min Energy DG",
        data: mainData.DGData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Energy DG",
        data: mainData.DGData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average DG",
        data: mainData.DGData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  return (
    <Layout>

      {/* Heading */}
      <Grid style={{ backgroundColor: "#9d2eff", color: "white",borderRadius:'5rem' }}>
        <Typography sx={{ mb: 3 }} variant="h3" align="center">
          {device.devName}
        </Typography>
      </Grid>

      <Stack direction="row">
        <Stack sx={{ width: "100%" }} direction="row">
          <DatePickerComponent

            startDate={startDate}
            SetStartDate={SetStartDate}
            endDate={endDate}
            SetEndDate={SetEndDate}
          />
          <Button onClick={() => chartDataFilter()} endIcon={<FilterAltIcon />}
            style={{ backgroundColor: '#FF5C93',borderRadius:'1rem' , color: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '0.7rem' }} >
          <b>  Click To Filter</b>
          </Button>

        </Stack>
      </Stack>

      {/* Last Readings */}
      <Grid style={{ marginTop: -20 }} container spacing={1} >
        <Grid item lg={2} xs={6} >
          <List>
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#total-cost">
                <ListItemText
                  primary={`Total Cost (₹)`}
                />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#kwh">
                <ListItemText
                  primary={`KWh Units Used`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#kw">
                <ListItemText
                  primary={`KW Load Used`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#kva">
                <ListItemText
                  primary={`KVA Units Used`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item lg={2} xs={6}>
          <List>
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#total-cost">
                <ListItemText
                  primary={`: ${parseFloat(
                    command01[0]?.eb * organisation.perUnitCost
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#kwh">
                <ListItemText
                  primary={`: ${parseFloat(
                    command01[0]?.eb
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#kw">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.kW_Load
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#kva">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.kVA_Load
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Grid>

        <Grid item lg={2} xs={6}>
          <List>
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#power-factor">
                <ListItemText
                  primary={`Power Factor`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#voltage">
                <ListItemText
                  primary={`Voltage Reading`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#frequency">
                <ListItemText
                  primary={`Frequency Reading`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
              <ListItemButton component="a" href="#current">
                <ListItemText
                  primary={`Current Reading`}
                />
              </ListItemButton>
            </ListItem>

          </List>
        </Grid>
        <Grid item lg={2} xs={6}>
          <List>
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#power-factor">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.power_factor
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#voltage">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.voltage
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#frequency">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.frequency
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem style={{ backgroundColor: "#EEEEEE" }}>
              <ListItemButton component="a" href="#current">
                <ListItemText
                  primary={`: ${parseFloat(
                    command02[0]?.current
                  ).toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>

          </List>
        </Grid>
        <Grid style={{ paddingTop: '1rem' }} item lg={4} xs={12}>
          <DeviceInfo deviceEUI={id} />
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
          xs={12}
        >
          <ResponsiveContainer id="total-cost" className="p-0" width="100%">
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
                <h5>Total Cost</h5>
              </div>
              <Line data={Costdata} />
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
          <ResponsiveContainer id="dg" className="p-0" width="100%">
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
                <h5>DG</h5>
              </div>
              <Bar height={150} data={DG_KWHdata} />
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
          <ResponsiveContainer id="voltage" className="p-0" width="100%">
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
                <h5>Voltage Trend</h5>
              </div>
              <Line height={150} data={Voltagedata} />
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

      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  await db.connect();
  const command01 = await OnePhase01.find({ devEUI: id })
    .sort({ timestamp: -1 })
    .lean();
  const command02 = await OnePhase02.find({ devEUI: id })
    .sort({ timestamp: -1 })
    .lean();
  // const command03 = await OnePhase03.find({ devEUI: id })
  //   .sort({ timestamp: -1 })
  //   .lean();
  const organisation = await Organisation.find().lean();
  const device = await Devices.find({ devEUI: id }).lean();
  await db.disconnect();
  return {
    props: {
      command01: command01.map(db.convertDocToObj),
      command02: command02.map(db.convertDocToObj),
      // command03: command03.map(db.convertDocToObj),
      organisation: organisation.map(db.convertDocToObj)[0],
      device: device.map(db.convertDocToObj)[0],
    },
  };
}
