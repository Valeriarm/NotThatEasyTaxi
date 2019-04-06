import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

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
          title="Profile Pic"
        />
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
