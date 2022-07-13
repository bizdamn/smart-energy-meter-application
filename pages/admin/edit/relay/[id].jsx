import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import db from "../../../../utils/db";
import Relays from "../../../../models/Relays";
import AdminLayout from "../../../../Layout/AdminLayout"
import { DataStore } from '../../../../utils/DataStore';
import ButtonSaveProgress from '../../../../components/admin/ui/ButtonSaveProgress'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
export default function Dashboard({ relay }) {

    const router = useRouter()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state } = useContext(DataStore);
    const { userInfo } = state;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [relayStatus, setRelayStatus] = useState(false);
    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);

    useEffect(() => {
        if (userInfo?.isSuperAdmin != true) {
            enqueueSnackbar('Not Logged In as Super Admin', { variant: 'error' })
            router.push('/login');
        }
    }, [router, userInfo]);


    const submitHandler = async ({ realName, relayName, machineName, areaName, deviceName, controlParameter }) => {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/admin/edit/relay', {
                devEUI: relay?.devEUI,
                relayStatus: relayStatus,
                realName: realName,
                relayName: relayName,
                machineName: machineName,
                areaName: areaName,
                deviceName: deviceName,
                controlParameter: controlParameter,

            });
            enqueueSnackbar('Relay Updated Successfully', { variant: 'success' });

        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit(submitHandler)} >
                <Typography variant='4' fontWeight={700} component="p" sx={{ my: 3 }}> Information</Typography>
                <Grid container justifyContent="center" >
                    <Grid item component={Paper} lg={6} xs={12} sx={{ p: 3, m: 1 }}>

                        {/* Relay EUI */}
                        <Typography component="p" style={{ marginBottom: '0.7rem' }}>Relay EUI</Typography>
                        <Typography component="p" style={{ marginBottom: '0.7rem' }}>{relay?.devEUI}</Typography>



                        {/* Relay realName */}
                        <Controller
                            name="realName"
                            control={control}
                            defaultValue={relay?.realName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Real Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.realName)}
                                    helperText={
                                        errors.realName
                                            ? errors.realName.type === 'minLength'
                                                ? 'Real Name can not be less than 3 charactes'
                                                : 'Real Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                        {/* Relay relayName */}
                        <Controller
                            name="relayName"
                            control={control}
                            defaultValue={relay?.relayName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Relay Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.relayName)}
                                    helperText={
                                        errors.relayName
                                            ? errors.relayName.type === 'minLength'
                                                ? 'Relay Name can not be less than 3 charactes'
                                                : 'Relay Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                        <FormControlLabel control={<Switch checked={relayStatus} onClick={() => setRelayStatus(relayStatus == true ? false : true)} />} label="Relay Status" />

                        {/* Relay Machine Name */}
                        <Controller
                            name="machineName"
                            control={control}
                            defaultValue={relay?.machineName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Machine Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.machineName)}
                                    helperText={
                                        errors.machineName
                                            ? errors.machineName.type === 'minLength'
                                                ? 'Machine Name can not be less than 3 charactes'
                                                : 'Machine Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>




                    </Grid>
                    <Grid item component={Paper} lg={6} xs={12} sx={{ p: 3, m: 1 }}>
                        {/* Relay Area Name */}
                        <Controller
                            name="areaName"
                            control={control}
                            defaultValue={relay?.areaName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Area Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.areaName)}
                                    helperText={
                                        errors.areaName
                                            ? errors.areaName.type === 'minLength'
                                                ? 'Area Name can not be less than 3 charactes'
                                                : 'Area Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                        {/* Relay Device Name */}
                        <Controller
                            name="deviceName"
                            control={control}
                            defaultValue={relay?.deviceName}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Device Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.deviceName)}
                                    helperText={
                                        errors.deviceName
                                            ? errors.deviceName.type === 'minLength'
                                                ? 'Device Name can not be less than 3 charactes'
                                                : 'Device Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                        {/* Relay Control Parameter */}
                        <Controller
                            name="controlParameter"
                            control={control}
                            defaultValue={relay?.controlParameter}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Control Parameter"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.controlParameter)}
                                    helperText={
                                        errors.controlParameter
                                            ? errors.controlParameter.type === 'minLength'
                                                ? 'Control Parameter can not be less than 3 charactes'
                                                : 'Control Parameter is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Checked RelayEUI Carefully" />
                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Relay Real Name is following the Nomenclature" />
                        <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                        </Stack>

                    </Grid>

                </Grid>
            </form>

        </AdminLayout>
    );
}



export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    await db.connect();
    const relay = await Relays.find({ devEUI: id }).lean();
    await db.disconnect();
    return {
        props: {
            relay: relay.map(db.convertDocToObj)[0],
        },
    };
}
