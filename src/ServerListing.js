import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ServerThumbnail from './ServerThumbnail';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}, { name: 'ServerListing' });

function ServerListing({ servers }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {servers.length === 0 ? (
        <Typography>
          No servers are currently available.
        </Typography>
      ) : servers.map((server) => (
        <ServerThumbnail
          key={server.url}
          server={server}
          media={server.booth && server.booth.media}
        />
      ))}
    </div>
  );
}

ServerListing.propTypes = {
  servers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ServerListing;
