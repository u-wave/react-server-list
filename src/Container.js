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
    if (!this.state.servers) {
      this.update();
    }
    this.events = announceEvents(this.props.hub, this.handleUpdate);
  }

  componentWillUnmount() {
    this.events.remove();
  }

  update() {
    loadServers(this.props.hub).then((servers) => {
      this.setState({ servers });
    });
  }

  handleUpdate(update) {
    this.setState(({ servers }) => ({
      servers: addServer(servers, update),
    }));
  }

  render() {
    return this.state.servers == null ? (
      <Loading message="Loading available servers..." />
    ) : (
      <ServerListing servers={this.state.servers} />
    );
  }
}

Container.propTypes = {
  hub: PropTypes.string,
};

Container.defaultProps = {
  hub: 'https://announce.u-wave.net/',
};

