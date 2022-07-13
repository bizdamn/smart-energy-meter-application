import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import db from "../../../../utils/db";
import Gateways from "../../../../models/Gateways";
import AdminLayout from "../../../../Layout/AdminLayout"
import { DataStore } from '../../../../utils/DataStore';
import ButtonSaveProgress from '../../../../components/admin/ui/ButtonSaveProgress'
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
export default function Dashboard({ gateway }) {

    const router = useRouter()
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


    const submitHandler = async ({ realName, gatewayName}) => {
        closeSnackbar();
        try {
            const { data } = await axios.put('/api/admin/edit/gateway', {
                gatewayID: gateway?.gatewayID,
                realName: realName,
                gatewayName: gatewayName
            });
            enqueueSnackbar('Gateway Updated Successfully', { variant: 'success' });

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
                        <Typography component="p" style={{ marginBottom: '0.7rem' }}>{gateway?.gatewayID}</Typography>



                        {/* Gateway realName */}
                        <Controller
                            name="realName"
                            control={control}
                            defaultValue={gateway?.realName}
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
                            defaultValue={gateway?.gatewayName}
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



export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    await db.connect();
    const gateway = await Gateways.find({ gatewayID: id }).lean();
    await db.disconnect();
    return {
        props: {
            gateway: gateway.map(db.convertDocToObj)[0],
        },
    };
}
