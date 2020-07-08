import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ServerThumbnail from './ServerThumbnail';
import './ServerListing.css';

function ServerListing({ servers }) {
  return (
    <div className="usl-ServerListing">
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
