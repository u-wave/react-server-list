import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ServerListing from './ServerListing';
import useServers from './useServers';

function Container({ hub = 'https://announce.u-wave.net/' }) {
  const servers = useServers(hub);

  return servers == null ? (
    <Loading message="Loading available servers..." />
  ) : (
    <ServerListing servers={servers} />
  );
}

Container.propTypes = {
  /**
   * URL of the announce server to use to discover üWave servers.
   */
  hub: PropTypes.string,
};

export default Container;
