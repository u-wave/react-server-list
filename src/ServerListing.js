import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ServerThumbnail from './ServerThumbnail';

const enhance = withStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

const ServerListing = ({
  classes,
  servers,
}) => (
  <div className={classes.root}>
    {servers.length === 0 ? (
      <Typography>No servers are currently available.</Typography>
    ) : servers.map(server => (
      <ServerThumbnail
        key={server.url}
        server={server}
        media={server.booth && server.booth.media}
      />
    ))}
  </div>
);

ServerListing.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  servers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default enhance(ServerListing);
