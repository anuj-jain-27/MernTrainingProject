import React, { useState, useEffect, useRef } from 'react';
// import {Carousel} from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './mobilestyles';
import pic1 from '../../images/one.jpg';
import pic2 from '../../images/two.jpg';
import pic3 from '../../images/three.jpg';
import pic4 from '../../images/five.png';
import pic5 from '../../images/four.jpg';
import pic6 from '../../images/six.jpg';
import { CardMedia } from '@material-ui/core/';
import Line from "../Line";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



function ImageSlider(props) {
    const classes = useStyles();
    const [elevated, setElevated]=useState(2);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 900 },
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
          partialVisibilityGutter: 40
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <div class="carousel-inner"  >
           <Carousel
  swipeable={false}
  draggable={false}
//   showDots={true}
partialVisible={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
  deviceType={props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  <div>
  <Card  className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic1}/>
                <CardContent>
                Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
                </CardContent>
                </Card>
  </div>
  <div><Card  className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic2}/>
                <CardContent>
                Home phone service
                + unlimited standard Australian mobile calls + 100 GBs of Data Consumption
                Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.
                </CardContent>
                </Card></div>
  <div>
  <Card   className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic3}/>
                <CardContent>
                Broadband Protect
                Cyber threat protection for your family
                With parental controls, social network protection and device protection to help keep everyone at home safe online.
                Ability to stream movies, play games and lots more
                </CardContent>
                </Card>
  </div>
  <div><Card  className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic4}/>
                <CardContent>
                Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
                </CardContent>
                </Card>
                </div>
  <div>  <Card  className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic5}/>
                <CardContent>
                Home phone service
                + unlimited standard Australian mobile calls + 100 GBs of Data Consumption
                Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.
                </CardContent>
                </Card>
                </div>
  <div> <Card   className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic6}/>
                <CardContent>
                Broadband Protect
                Cyber threat protection for your family
                With parental controls, social network protection and device protection to help keep everyone at home safe online.
                Ability to stream movies, play games and lots more
                </CardContent>
                </Card>
                </div>
</Carousel>
        </div>
    )}
    
  

  export default ImageSlider;