import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, AppBar, Typography,  Fab, Grow, Grid } from '@material-ui/core';
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
import ImageSlider from './imageSlider';
import { Add } from "@material-ui/icons";
import { History } from '@material-ui/icons';
import {CircularProgress,Paper,  Modal, Fade, Backdrop } from '@material-ui/core';
import "./PaymentForm.css";
import CloseIcon from '@material-ui/icons/Cancel';

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
  const [open_his, setOpen_his] = React.useState(false);
  const handleHis = () => {
    setOpen_his(true);
  };
  const handleClose_his = () => {
    setOpen_his(false);
    
  };
  const [open, setOpen] = React.useState(false);
  const handleAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    
  };
    return (
     
      <Container maxWidth="lg">
         <Scroll showBelow={50} />
      <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
     
        <FormControlLabel value="view" control={<Radio color="primary" />} label="ViewCurrent Broadband Plans" />
        {profile?.user?.role===1?<>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Broadband Plans" /></>:<></>}
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
             {user!==undefined && broadbandhistory.length!=0?<> <BroadbandMUsagePlans/></>:<></>}
             <BroadbandCurrent BUpgrade={BUpgrade} setBUpgrade={setBUpgrade}/>
             <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              >
              <Fade in={open}>
              <div className={classes.paper}style={{
              position: 'absolute', left: '50%', top:'50%',
              transform: 'translate(-50%, -50%)', marginTop:"10px"
              }}>
              <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose}>Close</Button>
             <BroadbandForm currentId_broadband={currentId_broadband} setCurrentId_broadband={setCurrentId_broadband} /> 
              </div>
              </Fade>
              </Modal>
            { profile?.user?.role==1?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "142px", right: "44px" }}>
            <Add  onClick={handleAdd}  />
            </Fab>):<></>}
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open_his}
            onClose={handleClose_his}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            >
            <Fade in={open_his}>
            <div className={classes.paper}style={{
            position: 'absolute', left: '50%', top:'50%',
            transform: 'translate(-50%, -50%)', marginTop:"10px"
            }}>
               <div class="wrapperone">
               <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose_his}>Close</Button>
                   <><BPlansHistory/></>  
              </div>          
            </div>
            </Fade>
            </Modal>


            { profile?.user ?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "86px", right: "44px" }}>
            <History  onClick={handleHis} />
            </Fab>):<></>}
             </Grid>
             </Grid>
           </>
           </>
          : 
          <>
          {value==="add" ?
          <>
          <div  >
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
                <ImageSlider/>
               </> 
             }</> 
          }
          </>
     }
     
       </Container>
    )}
    
  

  export default Broadband;