import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const enhance = withStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
}, { name: 'Loading' });

const Loading = ({ classes, message }) => (
  <div className={classes.root}>
    <CircularProgress size={300} mode="indeterminate" />
    <Typography>
      {message}
    </Typography>
  </div>
);

Loading.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.string,
};

export default enhance(Loading);
