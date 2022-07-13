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
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
export default function Dashboard({ }) {

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

    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);

    useEffect(() => {
        if (userInfo?.isSuperAdmin != true) {
            enqueueSnackbar('Not Logged In as Super Admin', { variant: 'error' })
            router.push('/login');
        }
    }, [router, userInfo]);


    const submitHandler = async ({ gatewayID, realName, gatewayName}) => {
        closeSnackbar();

 
        try {
            const { data } = await axios.post('/api/admin/add/gateway', {
                gatewayID: gatewayID,
                realName: realName,
                gatewayName: gatewayName
            });
            enqueueSnackbar('Gateway Added Successfully', { variant: 'success' });
            router.push(redirect || '/admin/gateways');
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

                        {/* Gateway EUI */}
                        <Typography component="p" style={{ marginBottom: '0.7rem' }}>Gateway ID</Typography>
                       {/* Gateway ID*/}
                       <Controller
                            name="gatewayID"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Gateway ID"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors. gatewayID)}
                                    helperText={
                                        errors. gatewayID
                                            ? errors. gatewayID.type === 'minLength'
                                                ? 'Gateway ID can not be less than 3 charactes'
                                                : 'Gateway ID is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>



                        {/* Gateway realName */}
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
                        {/* Gateway gatewayName */}
                        <Controller
                            name="gatewayName"
                            control={control}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Gateway Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.gatewayName)}
                                    helperText={
                                        errors.gatewayName
                                            ? errors.gatewayName.type === 'minLength'
                                                ? 'Gateway Name can not be less than 3 charactes'
                                                : 'Gateway Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>






                    </Grid>
                    <Grid item component={Paper} lg={6} xs={12} sx={{ p: 3, m: 1 }}>
                       

                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Checked GatewayEUI Carefully" />
                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Gateway Real Name is following the Nomenclature" />
                        <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                        </Stack>

                    </Grid>

                </Grid>
            </form>

        </AdminLayout>
    );
}


