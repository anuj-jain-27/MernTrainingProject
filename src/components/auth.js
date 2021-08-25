import React, {useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles"
import Input from "./Input"

function Auth() {
    const classes = useStyles();
    const [showPassword, setShowPassword]= useState(false);
    const isSignup=true;
    const handleShowPassword=()=>{
        setShowPassword(()=>(prevShowPassword)=>!prevShowPassword)
    }

    const handleSubmit=()=>{

    }
    const handleChange=()=>{

    }
    return (
      <div>
       HELOOOOOOOOOOO from auth
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
                </Avatar>
                   <Typography variant="h5">{isSignup? "Sign Up": "Sign in"}</Typography>
                   <form className={classes.form} onSubmit={handleSubmit}>
                       <Grid container spacing={2}>
                           {
                       isSignup && (
                           <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half/>
                           </>
                       )}
                       <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                       <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                    {isSignup&&<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullwidth variant="contained" color="primary" className={classes.submit} >
                        {isSignup?"Sign up":"Sign in"}
                    </Button>
                    </form>
           </Paper>
       </Container>
      </div>
    );
  }
  
  export default Auth;