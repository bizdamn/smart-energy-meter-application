import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import db from "../../utils/db";
import Organisation from "../../models/Organisation";
import AdminLayout from "../../Layout/AdminLayout"
import { DataStore } from '../../utils/DataStore';
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { ResponsiveContainer } from "recharts";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';
export default function Dashboard({
  organisation,
}) {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state } = useContext(DataStore);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo?.isSuperAdmin != true) {
      enqueueSnackbar('Not Logged In as Super Admin', { variant: 'error' })
      router.push('/login');
    }

  }, [router, userInfo]);

  return (
    <AdminLayout>

      <Grid container justifyContent='space-around'>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}
          item
          lg={4}
          sm={6}
          xs={12}
        >
          <Link href='/admin/organisation'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Organisation</h5>
                  </div>
                  <Grid container justifyContent='center'>
                    <Image alt={'Temp'} src={'/admin/organisation.jpg'} width={250} height={250} />
                  </Grid>
                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={4}
          sm={6}
          xs={12}
        >
          <Link href='/admin/gateways'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Gateways</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'Gateways'} src={'/admin/gateway.jpg'} width={250} height={250} />
                  </Grid>
                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={4}
          sm={6}
          xs={12}
        >
          <Link href='/admin/devices'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Devices</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'OnePhase'} src={'/admin/device.jpg'} width={250} height={250} />
                  </Grid>
                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>

        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={4}
          sm={6}
          xs={12}
        >
          <Link href='/admin/relays'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Relays</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'Relays'} src={'/admin/relay.jpg'} width={250} height={250} />
                  </Grid>
                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>
        <Grid
          component={Paper}
          style={{ border: "2px solid #9013FE", borderRadius: "1rem" }}

          item
          lg={4}
          sm={6}
          xs={12}
        >
          <Link href='/admin/buzzers'>
            <a>
              <ResponsiveContainer width="100%">
                <>
                  <div
                    className="p-1"
                    style={{
                      backgroundColor: "#9013FE",
                      borderRadius: "1rem",
                      color: "#fff",
                      textAlign: "center",
                    }}>
                    <h5>Three Phase Meter Data</h5>
                  </div>
                  <Grid container justifyContent='center'>
                  <Image alt={'ThreePhase'} src={'/admin/buzzer.jpg'} width={250} height={250} />
                  </Grid>
                </>
              </ResponsiveContainer>
            </a>
          </Link>
        </Grid>
      </Grid>

    </AdminLayout>
  );
}



export async function getServerSideProps(ctx) {
  await db.connect();
  const organisation = await Organisation.find().lean();
  await db.disconnect();
  return {
    props: {
      organisation: organisation.map(db.convertDocToObj),
    },
  };
}
