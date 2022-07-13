import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import AdminLayout from "../../../Layout/AdminLayout"
import { DataStore } from '../../../utils/DataStore';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
export default function Dashboard({  }) {

    const router = useRouter()
    const { redirect } = router.query; 
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


    const submitHandler = async ({ devEUI,realName, relayName, machineName, areaName, deviceName, controlParameter }) => {
        closeSnackbar();
        try {
            const { data } = await axios.post('/api/admin/add/relay', {
                devEUI: devEUI,
                relayStatus: relayStatus,
                realName: realName,
                relayName: relayName,
                machineName: machineName,
                areaName: areaName,
                deviceName: deviceName,
                controlParameter: controlParameter,

            });
            enqueueSnackbar('Relay Added Successfully', { variant: 'success' });
            router.push(redirect || '/admin/relays');
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
                        <Controller
                            name="devEUI"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Device EUI"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.devEUI)}
                                    helperText={
                                        errors.devEUI
                                            ? errors.devEUI.type === 'minLength'
                                                ? 'Device EUI can not be less than 3 charactes'
                                                : 'Device EUI is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                        {/* Relay realName */}
                        <Controller
                            name="realName"
                            control={control}
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



