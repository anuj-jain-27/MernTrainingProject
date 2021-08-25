import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './mobilestyles';

function Mobile() {
  const classes = useStyles();
    return (
      <div>
        Mobile
        <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               DATA USAGE
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               4.9/20 GB
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
    </Card>
      </div>
    );
  }
  
  export default Mobile;