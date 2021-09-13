import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './mobilestyles';
import BPosts from "../BPosts/BPosts"
import Blocations from "../BPosts/Blocations";
import Form from "../Form/Form"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../../actions/dataconsump";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BroadbandMUsagePlans from "../BroadbandUsagePlans";
import BroadbandCurrent from '../BroadbandCurrent';
import { makeStyles } from '@material-ui/core/styles';
import {Switch} from  '@material-ui/core';
import BroadbandForm from '../Form/Broadbandform';
import Table_broadband from '../Table_broadband';
import { getbroadbands } from '../../actions/broadband';
import {getblocations} from "../../actions/broadbandlocations";
import Searchbar from "./searchbar"
import {search} from '../../actions/search';
import Scroll from "./Scroll";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import BPlansHistory from '../bplanshistory';
import broadbandpic from '../../images/Broadband.png';
import {getbroadbandhistory} from "../../actions/broadbandhis";
import pic4 from '../../images/five.png';
import pic5 from '../../images/four.jpg';
import pic6 from '../../images/six.jpg';
import { CardMedia } from '@material-ui/core/';
import Line from "../Line";

function Broadband() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId_broadband, setCurrentId_broadband] = useState(0);
  const [currentId_blocation, setCurrentId_blocation] = useState(0);
  const [BUpgrade, setBUpgrade] = useState(true);
  const [value, setValue] = React.useState('move');
  var profile=JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (broadbandhistory.length == 0)
      dispatch(getbroadbandhistory(profile?.user?._id));
  }, [dispatch])

  const broadbandhistory = useSelector((state) => state.broadbandhistory);
  console.log(broadbandhistory)
 
  var user= profile?.user?._id
  console.log(user)
  if (user == undefined){
    console.log(true)
  }
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };


  useEffect(() => {
    if (datas.length == 0)
      dispatch(getdataconsump());
  }, [dispatch])
  const [currentId, setCurrentId] = useState(0);
  
  useEffect(() => {
    if (blocations.length == 0)
      dispatch(getblocations());
  }, [dispatch])
  
  useEffect(() => {
    if (broadbands.length == 0)
      dispatch(getbroadbands());
  }, [dispatch])
  
  const [searchterm,setSearchterm]=useState(null);
  const blocations = useSelector((state) => state.blocations);
  const broadbands = useSelector((state) => state.broadbands);
  const datas = useSelector((state) => state.datas);
  const [toggle, setToggle]=useState(false);
  const toggler=()=>{
    toggle? setToggle(false): setToggle(true);
  }
  useEffect(() => {
    if(searchterm)
    {dispatch(search(searchterm))}
    else
      dispatch(getbroadbands());
}, [searchterm,currentId, dispatch]);
  console.log(datas)
  console.log(blocations)
  
  const [elevated, setElevated]=useState(2);
    return (
     
      <Container maxWidth="lg">
         <Scroll showBelow={50} />
         <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
      {profile?.user?.role===1?<>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Broadband Plans" /></>:<></>}
      <FormControlLabel value="view" control={<Radio color="primary" />} label="ViewCurrent Broadband Plans" />
      {profile?.user?._id!=null?<>
      <FormControlLabel value="prev" control={<Radio color="primary" />} label="View Previous Plans" /></>:<></>}
      </RadioGroup>
      </FormControl>
   
      {value==="view" ?
         <>
          <>
         <Grid container style={{marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ display: 'flex',flexDirection: 'row', alignItems:"center"}} >
              <span  STYLE="color:black;font-weight:400;font-size:14px"> Switch to view different layout </span> <Switch color="primary" style={{Bottom:"20px"}} onClick={toggler} alignItems="center" /> 
            </div>
            {toggle ?<> <Table_broadband data={broadbands} /></>:<><Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item xs={12} sm={12} md={10}>
             <Typography >SEARCH PLAN BASED ON LOCATION</Typography>
              <Searchbar style={{marginBottom:"20px"}} searchterm={searchterm} setSearch={setSearchterm}  />
              {!searchterm?<> <BPosts  currentId_broadband={currentId_broadband}  setCurrentId_broadband={setCurrentId_broadband} searchterm={searchterm} /></>:<>  <Blocations currentId_blocation={currentId_blocation} setCurrentId_blocation={setCurrentId_blocation} searchterm={searchterm} /></>}
             </Grid></Grid></>}
             </Grid>
             <Grid item xs={12} sm={8} md={6}>
             <BroadbandCurrent BUpgrade={BUpgrade} setBUpgrade={setBUpgrade}/>
             {user!==undefined && broadbandhistory.length!=0?<> <BroadbandMUsagePlans/></>:<></>}
             </Grid>
             </Grid>
           </>
           </>
          : 
          <>
          {value==="add" ?
          <>
          <div  style={{
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)', marginTop:"10px"
    }}>
              <BroadbandForm currentId_broadband={currentId_broadband} setCurrentId_broadband={setCurrentId_broadband} /> 
              </div>
            </>
             :    <> {value==="prev" ?
             <>
                <><BPlansHistory/></> 
               </>
                :    <> 
                <div><span  STYLE="color:black;font-weight:600;font-size:38px">BROADBAND PLANS</span></div>
                <Line color="#3f51b5"/> 
                <Grid className={classes.container} style={{marginRight:"5px"}} container alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic4}/>
            <CardContent>
            Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
            </CardContent>
          </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic5}/>
            <CardContent>
            Home phone service
+ unlimited standard Australian mobile calls + 100 GBs of Data Consumption
Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.
            </CardContent>
          </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                <Card  className={classes.card}  elevation={elevated}  
          onMouseOver={() => setElevated(10)} 
          onMouseOut={() => setElevated(2)} >
            <CardMedia className={classes.media} image={pic6}/>
            <CardContent>
            Broadband Protect
Cyber threat protection for your family
With parental controls, social network protection and device protection to help keep everyone at home safe online.
Ability to stream movies, play games and lots more
            </CardContent>
          </Card>
                </Grid>
                </Grid></> 
             }</> 
          }
          </>
     }
     
       </Container>
    )}
    
  

  export default Broadband;