import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ServerListing from './ServerListing';
import { loadServers, announceEvents } from './hub';

const {
  useCallback,
  useEffect,
  useState,
} = React;

function addServer(list, update) {
  const servers = list.map((server) => (server.publicKey === update.publicKey ? update : server));
  if (servers.indexOf(update) === -1) {
    servers.unshift(update);
  }
  return servers;
}

function Container({ hub = 'https://announce.u-wave.net/' }) {
  const [servers, setServers] = useState(null);

  const handleUpdate = useCallback((update) => {
    setServers((existingServers) => addServer(existingServers, update));
  }, []);

  useEffect(() => {
    loadServers(hub).then((newServers) => {
      setServers(newServers);
    });

    const events = announceEvents(hub, handleUpdate);
    return () => events.remove();
  }, [hub]);

  return servers == null ? (
    <Loading message="Loading available servers..." />
  ) : (
    <ServerListing servers={servers} />
  );
}

Container.propTypes = {
  hub: PropTypes.string,
};

export default Container;
