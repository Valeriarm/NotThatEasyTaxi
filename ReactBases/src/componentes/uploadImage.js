import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import user from './images/descarga.png';

const styles = {
  card: {
    minWidth: 167,
  },

  title: {
    fontSize: 14,
  },

  media: {
    height: 150,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
     <CardMedia
          className={classes.media}
          image={user}
          title="Profile Pic"
        />
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
