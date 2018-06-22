import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ServerListing from './ServerListing';
import { loadServers, announceEvents } from './hub';

function addServer(list, update) {
  const servers = list.map(server => (server.publicKey === update.publicKey ? update : server));
  if (servers.indexOf(update) === -1) {
    servers.unshift(update);
  }
  return servers;
}

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      servers: null,
    };

    this.update = this.update.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { hub } = this.props;
    const { servers } = this.state;

    if (!servers) {
      this.update();
    }
    this.events = announceEvents(hub, this.handleUpdate);
  }

  componentWillUnmount() {
    this.events.remove();
  }

  update() {
    const { hub } = this.props;

    loadServers(hub).then((servers) => {
      this.setState({ servers });
    });
  }

  handleUpdate(update) {
    this.setState(({ servers }) => ({
      servers: addServer(servers, update),
    }));
  }

  render() {
    const { servers } = this.state;

    return servers == null ? (
      <Loading message="Loading available servers..." />
    ) : (
      <ServerListing servers={servers} />
    );
  }
}

Container.propTypes = {
  hub: PropTypes.string,
};

Container.defaultProps = {
  hub: 'https://announce.u-wave.net/',
};
