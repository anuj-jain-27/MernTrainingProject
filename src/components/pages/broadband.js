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



function Broadband() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId_broadband, setCurrentId_broadband] = useState(0);
  const [currentId_blocation, setCurrentId_blocation] = useState(0);
  const [value, setValue] = React.useState('move');
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
  useEffect(() => {
    if(searchterm)
    {dispatch(search(searchterm))}
    else
      dispatch(getbroadbands());
}, [searchterm,currentId, dispatch]);
  console.log(datas)
  console.log(blocations)
    return (
     
      <Container maxWidth="lg">
         <Scroll showBelow={50} />
         <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Broadband Plans" />
      <FormControlLabel value="view" control={<Radio color="primary" />} label="ViewCurrent Broadband Plans" />
      <FormControlLabel value="prev" control={<Radio color="primary" />} label="View Previous Plans" />
      </RadioGroup>
      </FormControl>
      <Typography>BROADBAND PLANS</Typography>
      {value==="view" ?
         <>
          <>
         
         <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item xs={12} sm={7}>
             <Table_broadband data={broadbands} />
             </Grid>
             <Grid item xs={12} sm={5}>
             <BroadbandCurrent/>
             </Grid>
             </Grid>
          
      
           <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
             <Grid item xs={12} sm={6}>
             <BPosts currentId_broadband={currentId_broadband}  setCurrentId_broadband={setCurrentId_broadband} searchterm={searchterm} />
             </Grid>
             <Grid item xs={12} sm={6}>
             <BroadbandMUsagePlans/>
             </Grid>
           </Grid>
           <Typography>SEARCH PLAN BASED ON SUBURBS, CITIES, STATES</Typography>
           <Searchbar searchterm={searchterm} setSearch={setSearchterm}  />
           <Blocations currentId_blocation={currentId_blocation} setCurrentId_blocation={setCurrentId_blocation} searchterm={searchterm} />
           </>
           </>
          : 
          <>
          {value==="add" ?
          <>
              <BroadbandForm currentId_broadband={currentId_broadband} setCurrentId_broadband={setCurrentId_broadband} /> 
            </>
             :    <> {value==="prev" ?
             <>
                <><BPlansHistory/></> 
               </>
                :    <></> 
             }</> 
          }
          </>
     }
       </Container>
    )}
    
  

  export default Broadband;