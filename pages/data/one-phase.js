import React,{useContext,useEffect} from "react";
import Box from '@mui/material/Box';
import Layout from "../../Layout/Layout"
import OnePhase01 from '../../models/OnePhase01';
import OnePhase02 from '../../models/OnePhase02';
import OnePhase03 from '../../models/OnePhase03';
import db from '../../utils/db';
import { DataStore } from '../../utils/DataStore';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
export default function OnePhase({command01, command02, command03}) {
  const { state} = useContext(DataStore);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo,router]);
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
            <Tab style={{minWidth:"20%"}}label="Frequency, Voltage, Current, KVA & KW Load" value="2" />
            <Tab style={{minWidth:"20%"}}label="Overload Check" value="3" />
          </Tabs>
          <TabPanel value="1">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device EUI Number</th>
                  <th>EB</th>
                  <th>DG</th>
                  <th>Relay Status</th>
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
                      <td>{element.RelayState}</td>
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
                  <th>Voltage</th>
                  <th>Current</th>
                  <th>Power Factor</th>
                  <th>KVA Load</th>
                  <th>KW Load</th>
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
                      <td>{parseFloat(element.voltage).toFixed(2)}</td>
                      <td>{parseFloat(element.current).toFixed(2)}</td>
                      <td>{parseFloat(element.power_factor).toFixed(2)}</td>
                      <td>{parseFloat(element.kVA_Load).toFixed(2)}</td>
                      <td>{parseFloat(element.kW_Load).toFixed(2)}</td>
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
       
        </TabContext>
      </Box>
    </Layout>
  );
}


export async function getServerSideProps() {
  await db.connect();
  const command01 = await OnePhase01.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  const command02 = await OnePhase02.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  const command03 = await OnePhase03.find({}).sort({ 'timestamp': -1 }).limit(300).lean()
  await db.disconnect();
  return {
    props: {
      command01: command01.map(db.convertDocToObj),
      command02: command02.map(db.convertDocToObj),
      command03: command03.map(db.convertDocToObj)
    },
  };
}