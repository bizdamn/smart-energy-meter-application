import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ResponsiveContainer } from "recharts";
import moment from 'moment';
import db from "../utils/db";
import OnePhase01 from "../models/OnePhase01";
import OnePhase02 from "../models/OnePhase02";
import OnePhase03 from "../models/OnePhase03";
import ThreePhase01 from '../models/ThreePhase01';
import ThreePhase02 from '../models/ThreePhase02';
// import ThreePhase03 from '../models/ThreePhase03';
import ThreePhase04 from '../models/ThreePhase04';
import Organisation from "../models/Organisation";
import * as dfd from "danfojs";
import Layout from "../Layout/Layout"
import { DataStore } from '../utils/DataStore';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import { Grid, Box } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DatePickerComponent from "../components/DatePickerComponent/DatePickerComponent";
export default function Dashboard({
  onePhaseCommand01,
  // onePhaseCommand02,
  // onePhaseCommand03,
  threePhaseCommand01,
  // threePhaseCommand02,
  // threePhaseCommand03,
  // threePhaseCommand04,
  organisation,
}) {
  const router = useRouter()
  const { id } = router.query
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

  async function chartDataFilter() {
    closeSnackbar();
    try {
      const { data } = await axios.post(`http://127.0.0.1:5000/dashboard`,
        {
          start_date: startDate,
          end_date: endDate,
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
        data: mainData.onePhaseEBData.minArray,
        borderColor: ["red"],
        borderWidth: 1,
      },
      {
        label: "Max Energy(KWh)",
        data: mainData.onePhaseEBData.maxArray,
        borderWidth: 1,
        borderColor: ["blue"],
      },
      {
        label: "Average Energy(KWh)",
        data: mainData.onePhaseEBData.avgArray,
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };


  return (
    <Layout>

      <Stack direction="row">
        <Stack sx={{ width: "100%" }} direction="row">
          <DatePickerComponent
            startDate={startDate}
            SetStartDate={SetStartDate}
            endDate={endDate}
            SetEndDate={SetEndDate}
          />
          <Box>
            <Button onClick={() => chartDataFilter()} variant="outlined">
              Filter
            </Button>
          </Box>
        </Stack>
      </Stack>

      {/* Last Readings */}
      <Grid sx={{ my: 3 }}>
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <List>
              <ListItem style={{ backgroundColor: "#D3D3D3" }}>
                <ListItemButton component="a" href="#total-cost">
                  <ListItemText
                    primary={`Total Cost:  ₹ {}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />

              <ListItem style={{ backgroundColor: "#D3D3D3" }}>
                <ListItemButton component="a" href="#kwh">
                  <ListItemText
                    primary={`Total KWh Units Used: {}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
           

         
              <Divider />
            </List>
          </Grid>

          <Grid item lg={4} xs={12}>
            <List>
            <ListItem style={{ backgroundColor: "#D3D3D3" }}>
                <ListItemButton component="a" href="#kva">
                  <ListItemText
                    primary={`Total KVA Units Used: {}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem style={{ backgroundColor: "#D3D3D3" }}>
                <ListItemButton component="a" href="#kw">
                  <ListItemText
                    primary={`Total KW Load Used: {}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
   
            </List>
          </Grid>
          <Grid item lg={4} xs={12}>
          <List>
  
            
              <ListItem style={{ backgroundColor: "#D3D3D3" }}>
                <ListItemButton component="a" href="#dg">
                  <ListItemText
                    primary={`DG Last Reading: {}`}
                  />
                </ListItemButton>
              </ListItem>
              </List>
          </Grid>
        </Grid>
      </Grid>



      {/* Charts */}
      <Grid container spacing={4}>
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
                     <h5>Energy Trend(KWh)</h5>
              </div>
              <Line height={350} data={EB_KWHdata} />
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
  const onePhaseCommand01 = await OnePhase01.find({ devEUI: id })
    .sort({ timestamp: -1 })
    .lean();
  const onePhaseCommand02 = await OnePhase02.find({ devEUI: id })
    .sort({ timestamp: -1 })
    .lean();
  const onePhaseCommand03 = await OnePhase03.find({ devEUI: id })
    .sort({ timestamp: -1 })
    .lean();
  const threePhaseCommand01 = await ThreePhase01.find({ devEUI: id }).sort({ 'timestamp': -1 }).lean()
  const threePhaseCommand02 = await ThreePhase02.find({ devEUI: id }).sort({ 'timestamp': -1 }).lean()
  // const threePhaseCommand03 = await ThreePhase03.find({ devEUI: id }).sort({'timestamp':-1}).lean()
  const threePhaseCommand04 = await ThreePhase04.find({ devEUI: id }).sort({ 'timestamp': -1 }).lean()

  const organisation = await Organisation.find().lean();
  await db.disconnect();
  return {
    props: {
      onePhaseCommand01: onePhaseCommand01.map(db.convertDocToObj),
      // onePhaseCommand02: onePhaseCommand02.map(db.convertDocToObj),
      // onePhaseCommand03: onePhaseCommand03.map(db.convertDocToObj),
      threePhaseCommand01: threePhaseCommand01.map(db.convertDocToObj),
      // threePhaseCommand02: threePhaseCommand02.map(db.convertDocToObj),
      // threePhaseCommand03: threePhaseCommand03.map(db.convertDocToObj),
      // threePhaseCommand04: threePhaseCommand04.map(db.convertDocToObj),
      organisation: organisation.map(db.convertDocToObj),
    },
  };
}
