import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import db from "../../utils/db";
import Organisation from "../../models/Organisation";
import AdminLayout from "../../Layout/AdminLayout"
import { DataStore } from '../../utils/DataStore';
import ButtonSaveProgress from '../../components/admin/ui/ButtonSaveProgress'
import UploadImage from '../../components/admin/ui/UploadImage'
import TextEditor from '../../components/admin/ui/TextEditor'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
export default function Dashboard({
    organisation,
}) {
    const router = useRouter()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state } = useContext(DataStore);
    const { userInfo } = state;

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [name, setName] = useState(organisation.name);
    // const [logo, setLogo] = useState(organisation.logo);
    const [tagline, setTagline] = useState(organisation.tagline);
    const [perUnitCost, setPerUnitCost] = useState(organisation.perUnitCost);

    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);

    useEffect(() => {
        if (userInfo?.isSuperAdmin != true) {
            enqueueSnackbar('Not Logged In as Super Admin', { variant: 'error' })
            router.push('/login');
        }

    }, [router, userInfo]);


    const submitHandler = async ({ name,perUnitCost }) => {
        closeSnackbar();

  
        try {

            setButtonProgressLoading(true);
            const { data } = await axios.put('/api/admin/organisation', {
                name: name,
                perUnitCost: perUnitCost,
                tagline: tagline,
            });
            setButtonProgressLoading(false);
            enqueueSnackbar('Updated Successfully', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit(submitHandler)} >
                        <Typography variant='4' fontWeight={700} sx={{my:3}} component="p">Organisation Information</Typography>
                <Grid container justifyContent="center" >
                    <Grid  item component={Paper} lg={7} xs={12} sx={{ p: 3, m: 1 }}>
                        {/* Organisation Name */}
                        <Typography sx={{my:3}} component="p">Name</Typography>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={name}
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id=""
                                    label="Name"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'Name can not be less than 3 charactes'
                                                : 'Name is required'
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>

                        {/* Organisation Tagline */}
                        <Typography sx={{my:3}} component="p">Tagline</Typography>
                        <TextEditor text={tagline} setText={setTagline} />

                    </Grid>
                    <Grid  item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                        
                        {/* Organisation Price Per Unit */}
                        <Typography sx={{my:3}} component="p">Company Per Unit Cost</Typography>
                        <Controller
                            name="perUnitCost"
                            control={control}
                            defaultValue={perUnitCost}
                            render={({ field }) => (
                                <TextField
                                sx={{my:1}}
                                    variant="outlined"
                                    fullWidth
                                    label="Per Unit Cost"
                                    type='number'
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller> 
                        <Stack sx={{ mb: 3 }} spacing={2} direction="row">
                            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                        </Stack>

                    </Grid>
                    {/* <Grid order={{ xs: 4 }} item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                        <Typography variant='h6' fontWeight={700} sx={{my:3}} component="p">Media</Typography>
                        <Grid sx={{ width: '100%' }} container justifyContent='center'>
                            <UploadImage image={logo} setImage={setLogo} />
                        </Grid>
                    </Grid>
                    <Grid order={{ xs: 7 }} item component={Paper} lg={4} xs={12} sx={{ p: 3, m: 1 }}>
                       
                    </Grid> */}

                </Grid>
            </form>

        </AdminLayout>
    );
}



export async function getServerSideProps(ctx) {
    await db.connect();
    const organisation = await Organisation.find().lean();
    await db.disconnect();
    return {
        props: {
            organisation: organisation.map(db.convertDocToObj)[0],
        },
    };
}
