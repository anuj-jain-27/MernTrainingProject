import React, { useState, useEffect, useRef } from 'react';
import BroadbandCurrent from "../BroadbandCurrent";
import MobileCurrent from "../MobileCurrentPlan";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

function Profile() {
  const [BUpgrade, setBUpgrade] = useState(false);
    return (
      <div>
        Profile
        <Container style={{justifyContent:"center"}}>
        <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item >
             <MobileCurrent/>
             </Grid>
             <Grid item >
             <BroadbandCurrent BUpgrade={BUpgrade} setBUpgrade={setBUpgrade}/>
             </Grid>
          </Grid>
        </Container>
       
      
      </div>
    );
  }
  
  export default Profile;