import React, { useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import Layout from "../../Layout/Layout"
import ThreePhase01 from '../../models/ThreePhase01';
import ThreePhase02 from '../../models/ThreePhase02';
import ThreePhase03 from '../../models/ThreePhase03';
import ThreePhase04 from '../../models/ThreePhase04';
import db from '../../utils/db';
import { DataStore } from '../../utils/DataStore';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
export default function OnePhase({ command01, command02, command03, command04 }) {
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);


  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout>


      <Box style={{ overflowX: 'scroll' }} sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab style={{minWidth:"20%"}}label="EB & DG" value="1" />
            <Tab style={{minWidth:"20%"}}label="Frequency, Voltage & Current" value="2" />
            <Tab style={{minWidth:"20%"}}label="Overload Check" value="3" />
            <Tab style={{minWidth:"20%"}}label="KW, KVAR & KVA" value="4" />
          </Tabs>
          <TabPanel value="1">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device EUI Number</th>
                  <th>EB</th>
                  <th>DG</th>
                  <th>Date-Time</th>
                </tr>
              </thead>
              <tbody>
                {command01.map((element) => {
                  var date = new Date(element.timestamp);
                  var formattted_time = date.toLocaleString()
                  return (
                    <tr key={element.deviceName} >
                      <td>{element.deviceName}</td>
                      <td>{element.devEUI}</td>
                      <td>{parseFloat(element.eb).toFixed(2)}</td>
                      <td>{parseFloat(element.dg).toFixed(2)}</td>
                      <td>{formattted_time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value="2">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device EUI Number</th>
                  <th>Frequency</th>
                  <th>Voltage Red</th>
                  <th>Voltage Yellow</th>
                  <th>Voltage Blue</th>
                  <th>Current Red</th>
                  <th>Current Yellow</th>
                  <th>Current Blue</th>
                  <th>Power Factor</th>
                  <th>Date-Time</th>
                </tr>
              </thead>
              <tbody>
                {command02.map((element) => {
                  var date = new Date(element.timestamp);
                  var formattted_time = date.toLocaleString()
                  return (
                    <tr key={element.deviceName} >
                      <td>{element.deviceName}</td>
                      <td>{element.devEUI}</td>
                      <td>{parseFloat(element.frequency).toFixed(2)}</td>
                      <td>{parseFloat(element.voltage_red).toFixed(2)}</td>
                      <td>{parseFloat(element.voltage_yellow).toFixed(2)}</td>
                      <td>{parseFloat(element.voltage_blue).toFixed(2)}</td>
                      <td>{parseFloat(element.current_red).toFixed(2)}</td>
                      <td>{parseFloat(element.current_yellow).toFixed(2)}</td>
                      <td>{parseFloat(element.current_blue).toFixed(2)}</td>
                      <td>{parseFloat(element.power_factor).toFixed(2)}</td>
                      <td>{formattted_time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value="3">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device EUI Number</th>
                  <th>No. of Overload Check</th>
                  <th>Overload Delay</th>
                  <th>Date-Time</th>
                </tr>
              </thead>
              <tbody>
                {command03.map((element) => {
                  var date = new Date(element.timestamp);
                  var formattted_time = date.toLocaleString()
                  return (
                    <tr key={element.deviceName} >
                      <td>{element.deviceName}</td>
                      <td>{element.devEUI}</td>
                      <td>{parseFloat(element.No_of_overload_check).toFixed(2)}</td>
                      <td>{parseFloat(element.Overload_delay_between_2_attempts).toFixed(2)}</td>
                      <td>{formattted_time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value="4">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device EUI Number</th>
                  <th>kW Load Red</th>
                  <th>kW Load Yellow</th>
                  <th>kW Load Blue</th>
                  <th>kVA Load Red</th>
                  <th>kVA Load Yellow</th>
                  <th>kVA Load Blue</th>
                  <th>kVAR Load Red</th>
                  <th>kVAR Load Yellow</th>
                  <th>kVAR Load Blue</th>

                  <th>Date-Time</th>
                </tr>
              </thead>
              <tbody>
                {command04.map((element) => {
                  var date = new Date(element.timestamp);
                  var formattted_time = date.toLocaleString()
                  return (
                    <tr key={element.deviceName} >
                      <td>{element.deviceName}</td>
                      <td>{element.devEUI}</td>
                      <td>{parseFloat(element.kW_Load_red).toFixed(2)}</td>
                      <td>{parseFloat(element.kW_Load_yellow).toFixed(2)}</td>
                      <td>{parseFloat(element.kW_Load_blue).toFixed(2)}</td>
                      <td>{parseFloat(element.kVA_Load_red).toFixed(2)}</td>
                      <td>{parseFloat(element.kVA_Load_yellow).toFixed(2)}</td>
                      <td>{parseFloat(element.kVA_Load_blue).toFixed(2)}</td>
                      <td>{parseFloat(element.kVAR_Load_red).toFixed(2)}</td>
                      <td>{parseFloat(element.kVAR_Load_yellow).toFixed(2)}</td>
                      <td>{parseFloat(element.kVAR_Load_blue).toFixed(2)}</td>

                      <td>{formattted_time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
        </TabContext>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const command01 = await ThreePhase01.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  const command02 = await ThreePhase02.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  const command03 = await ThreePhase03.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  const command04 = await ThreePhase04.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  await db.disconnect();
  return {
    props: {
      command01: command01.map(db.convertDocToObj),
      command02: command02.map(db.convertDocToObj),
      command03: command03.map(db.convertDocToObj),
      command04: command04.map(db.convertDocToObj),
    },
  };
}
