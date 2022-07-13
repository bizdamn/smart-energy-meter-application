import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box  from '@mui/material/Box';

export default function RYB({ frequency,voltage,current}) {

    return (
        <>
            <Grid container justifyContent={'center'} spacing={2}>
                <Grid item lg={4}>
                    <h4 style={{ textAlign: 'center' }}>Frequency</h4>
                    <Grid className="frame" sx={{ py: 1 }}>
                        <Box justifyContent={'center'} >
                            <span style={{ color: '#FF0000' }} className="rybBtn">
                                R
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{frequency} Hz</h6>
                        </Box>
                        <div>
                            <span style={{ color: '#FFD700' }} className="rybBtn">
                                Y
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{frequency} Hz</h6>
                        </div>
                        <div>
                            <span style={{ color: '#0B70B6' }} className="rybBtn">
                                B
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{frequency} Hz</h6>
                        </div>

                    </Grid>
                </Grid>
                <Grid item lg={4}>
                    <h4 style={{ textAlign: 'center' }}>Voltage</h4>
                    <Grid className="frame" sx={{ py: 1 }}>
                        <div>
                            <span style={{ color: '#FF0000' }} className="rybBtn">
                                R
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{voltage} V</h6>
                        </div>
                        <div>
                            <span style={{ color: '#FFD700' }} className="rybBtn">
                                Y
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{voltage} V</h6>
                        </div>
                        <div>
                            <span style={{ color: '#0B70B6' }} className="rybBtn">
                                B
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{voltage} V</h6>
                        </div>

                    </Grid>
                </Grid>
                <Grid item lg={4}>
                    <h4 style={{ textAlign: 'center' }}>Current</h4>
                    <Grid className="frame" sx={{ py: 1 }}>
                        <div>
                            <span style={{ color: '#FF0000' }} className="rybBtn">
                                R
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{current} AM</h6>
                        </div>
                        <div>
                            <span style={{ color: '#FFD700' }} className="rybBtn">
                                Y
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{current} AM</h6>
                        </div>
                        <div>
                            <span style={{ color: '#0B70B6' }} className="rybBtn">
                                B
                            </span>
                            <h6 style={{ textAlign: 'center', margin: 3 }}>{current} AM</h6>
                        </div>

                    </Grid>
                </Grid>
            </Grid>


        </>
    );
}
