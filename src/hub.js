import 'event-source-polyfill';
import fetch from 'node-fetch';
import ms from 'ms';

const downTimeout = ms('10 minutes');

export function loadServers(hubServer) {
  return fetch(hubServer)
    .then((response) => response.json())
    .then((state) => (
      state.servers.sort((a, b) => {
        if (a.timeSincePing >= downTimeout) {
          return 1;
        }
        if (b.timeSincePing >= downTimeout) {
          return -1;
        }
        return 0;
      })
    ));
}

export function announceEvents(hubServer, notify) {
  const source = new EventSource(`${hubServer.replace(/\/$/, '')}/events`);

  const listener = (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (err) {
      return;
    }

    notify(data);
  };
  source.addEventListener('message', listener);

  const remove = () => {
    source.removeEventListener('message', listener);
    source.close();
  };

  return { remove };
}
