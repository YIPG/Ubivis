import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import LocationOn from '@material-ui/icons/LocationOn';


const styles = theme =>  ({
  card: {
    maxWidth: 345,
    margin: theme.spacing.unit
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  actions: {
    display: 'flex',
  },
  content: {
    display: 'flex',
  },
  name:{
    margin:'auto'
  },
  like: {
    marginRight: 'auto',
    marginLeft: '8px'
  },
  dislike: {
    marginLeft: 'auto',
    marginRight: '8px'
  },
  multiLine: {
      whiteSpace: 'pre-line',
  }
});

class UserCard extends React.Component {
  state = {
    expanded: false,
    checked: true,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleSlideClick = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  handleCallClick = () => {
  };

  render(){
    const { classes, img_src, name, profile } = this.props;

    return (
      <Grid container justify='center'>
      <Slide direction="right" in={this.state.checked} unmountOnExit>
        <Card className={classes.card}>
          <CardActionArea onClick={this.handleExpandClick}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="300"
              src= {img_src}
              title="Contemplative Reptile"
            />
            <CardContent className={classes.content}>
              <Typography className={classes.name} variant="h5" component="h2">
               {name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <LocationOn />
              <Typography className={classes.multiLine} component='p'>
                {profile}
              </Typography>
            </CardContent>
          </Collapse>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button　onClick={this.handleCallClick} className={classes.like} size="small" color="primary">
              この人を呼ぶ
            </Button>
            <Button onClick={this.handleSlideClick} className={classes.dislike} size="small" color="primary">
              違う人を呼ぶ
            </Button>
          </CardActions>
        </Card>
      </Slide>
      </Grid>
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);