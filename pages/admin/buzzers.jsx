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
export default function RelaysList({  }) {

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

        </AdminLayout>
    );
}




