import React, { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Gateways from "../../models/Gateways";
import db from "../../utils/db";
import AdminLayout from "../../Layout/AdminLayout"
import { useSnackbar } from 'notistack';
import EditIcon from '@mui/icons-material/Edit';
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from 'axios'
export default function GatewayPage({ gateways }) {



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
        <AdminLayout>
            <ChakraProvider>
                <Link href='/admin/add/gateway'>
                    <a>
                        <Button style={{ color: '#008060', marginBottom: '1rem' }} variant="outline">
                            Add Gateway
                        </Button>
                    </a>
                </Link>
            </ChakraProvider>
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
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gateways?.map((element) => {

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
                                                        label="Gateway Name"
                                                        variant="outlined"
                                                    />


                                            </td>
                                        
                                            <td >
                                                <Link href={`/admin/edit/gateway/${element.gatewayID}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
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
        </AdminLayout>
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
