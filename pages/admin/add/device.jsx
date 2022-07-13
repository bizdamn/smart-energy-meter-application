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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
export default function Dashboard({}) {

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

    const [devType, setDeviceType] = useState('onePhase');



    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);

    useEffect(() => {
        if (userInfo?.isSuperAdmin != true) {
            enqueueSnackbar('Not Logged In as Super Admin', { variant: 'error' })
            router.push('/login');
        }
    }, [router, userInfo]);


    const submitHandler = async ({ devEUI, realName, devName, maxHumLimit, minHumLimit,maxTempLimit,minTempLimit}) => {
        closeSnackbar();
  
        try {
            const { data } = await axios.post('/api/admin/add/device', {
                devEUI: devEUI,
                realName: realName,
                devName: devName,
                maxHumLimit: maxHumLimit,
                minHumLimit: minHumLimit,
                maxTempLimit: maxTempLimit,
                minTempLimit: minTempLimit
            });
            enqueueSnackbar('Device Added Successfully', { variant: 'success' });
            router.push(redirect || '/admin/devices');
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit(submitHandler)} >
                <Typography variant='4' fontWeight={700} component="p"> Information</Typography>
                <Grid container justifyContent="center" >
                    <Grid item component={Paper} lg={6} xs={12} sx={{ p: 3, m: 1 }}>
                        {/* Device Type */}
                        <FormControl sx={{ mb: 2 }}>
                            <Typography component="p">Device Type</Typography>
                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={devType}
                                name="radio-buttons-group"
                                onChange={(e) => { setDeviceType(e.target.value) }}
                                required
                            >
                                <FormControlLabel value="onePhase" control={<Radio />} label="One Phase" />
                                <FormControlLabel value="threePhase" control={<Radio />} label="Three Phase" />
                                <FormControlLabel value="temphum" control={<Radio />} label="Temperature Humidity Meter" />
                                <FormControlLabel value="schneider" control={<Radio />} label="Schneider" />
                            </RadioGroup>
                        </FormControl>


                        {/* Device EUI */}
                        <Typography component="p">Device EUI</Typography>

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
                       
                        {/* Device realName */}
                        <Typography component="p">Real Name</Typography>
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
                        {/* Device devName */}
                        <Typography component="p">Device Name</Typography>
                        <Controller
                            name="devName"
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
                                    error={Boolean(errors.devName)}
                                    helperText={
                                        errors.devName
                                            ? errors.devName.type === 'minLength'
                                                ? 'Device Name can not be less than 3 charactes'
                                                : 'Device Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>




                    </Grid>
                    <Grid item component={Paper} lg={6} xs={12} sx={{ p: 3, m: 1 }}>
                        {devType == 'temphum' ? (<>
                            <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                                <Controller
                                    name="maxTempLimit"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Max Temperature Limit"
                                            type='number'
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                                <Controller
                                    name="maxHumLimit"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Max Humidity Limit"
                                            type='number'
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </Stack>
                            <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                                <Controller
                                    name="minTempLimit"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Min Temperature Limit"
                                            type='number'
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                                <Controller
                                    name="minHumLimit"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Min Humidity Limit"
                                            type='number'
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>

                            </Stack>

                        </>) : null}
                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Checked DeviceEUI Carefully" />
                        <FormControlLabel sx={{ my: 1 }} control={<Checkbox required />} label="Device Real Name is following the Nomenclature" />
                        <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                        </Stack>

                    </Grid>

                </Grid>
            </form>

        </AdminLayout>
    );
}



