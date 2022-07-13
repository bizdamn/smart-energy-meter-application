import React, { useState, useEffect } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import db from "../../utils/db";
import AdminLayout from "../../Layout/AdminLayout"
import { useSnackbar } from 'notistack';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import Relays from "../../models/Relays";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
export default function RelaysList({ relays }) {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    return (
        <AdminLayout>
            <ChakraProvider>
                <Link href='/admin/add/relay'>
                    <a>
                        <Button style={{ color: '#008060', marginBottom: '1rem' }} variant="outline">
                            Add Relay
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
                            <th>Relay EUI Number</th>
                            <th>Relay Name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>

                        
                        {relays?.map((element) => {

                            return (
                                <>
                                        <tr key={element.devEUI}>
                                            <td >
                                                {element.devEUI}
                                            </td>
                                            <td style={{ padding: '5px' }} >
                                                <TextField
                                                    size="small"
                                                    defaultValue={element.relayName}
                                                    onBlur={(e) => {
                                                        setRelayName(element.devEUI, e.target.value);
                                                    }}
                                                    type="text"
                                                    fullWidth
                                                    label="Relay Name"
                                                    variant="outlined"
                                                />
                                            </td>
                                            <td >
                                                <Link href={`/admin/edit/relay/${element.devEUI}`} style={{ color: 'black' }}><a>
                                                    <EditIcon />
                                                </a></Link>
                                            </td>

                                        </tr>
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
    const relays = await Relays.find({}).lean();
    await db.disconnect();
    return {
        props: {
            relays: relays.map(db.convertDocToObj),
        },
    };
}

