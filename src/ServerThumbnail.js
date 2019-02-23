import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Menu';
import MuiWarningIcon from '@material-ui/icons/Warning';
import ms from 'ms';
import DescriptionDialog from './DescriptionDialog';
import CurrentMedia from './ServerMedia';

const downTimeout = ms('10 minutes');

const enhance = compose(
  withState('isOpen', 'setDescriptionOpen', false),
  withProps(({ setDescriptionOpen }) => ({
    onOpenDescription: (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDescriptionOpen(true);
    },
    onCloseDescription: () => setDescriptionOpen(false),
  })),
  withStyles({
    root: {
      width: 360,
      margin: '0 20px 20px 20px',
      position: 'relative',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    link: {
      textDecoration: 'none',
    },
    nobodyPlaying: {
      background: 'black',
      color: 'white',
      textDecoration: 'none',
    },
    actions: {
      justifyContent: 'end',
    },
  }, { name: 'ServerThumbnail' }),
);

const WarningIcon = withProps({
  style: {
    height: 16,
    width: 16,
    verticalAlign: 'sub',
  },
})(MuiWarningIcon);
const WarningText = withProps({
  type: 'body1',
  style: {
    color: '#ed404f',
  },
})(Typography);

const timedOutMessage = since => (
  ` This server may be down. It has not responded for ${since}.`
);

const ServerThumbnail = ({
  classes,
  server,
  media,
  isOpen,
  onOpenDescription,
  onCloseDescription,
}) => (
  <div className={classes.root}>
    <Card>
      <CardContent>
        <div className={classes.header}>
          <div>
            <Typography variant="h5">
              {server.name}
            </Typography>
            <Typography variant="body2">
              {server.subtitle}
            </Typography>
          </div>
          {server.description && (
            <IconButton onClick={onOpenDescription}>
              <DescriptionIcon />
            </IconButton>
          )}
        </div>
      </CardContent>

      {media ? (
        <a href={server.url} className={classes.link}>
          <CurrentMedia media={media} />
        </a>
      ) : (
        <React.Fragment>
          <a href={server.url} className={classes.link}>
            <CardContent className={classes.nobodyPlaying}>
              <Typography>Nobody is playing!</Typography>
            </CardContent>
          </a>
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              href={server.url}
            >
              Join
            </Button>
          </CardActions>
        </React.Fragment>
      )}

      {server.timeSincePing >= downTimeout && (
        <CardContent>
          <WarningText>
            <WarningIcon />
            {timedOutMessage(ms(server.timeSincePing, { long: true }))}
          </WarningText>
        </CardContent>
      )}

      {server.description && (
        <DescriptionDialog
          server={server}
          isOpen={isOpen}
          onCloseDescription={onCloseDescription}
        />
      )}
    </Card>
  </div>
);

ServerThumbnail.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    nobodyPlaying: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
  }).isRequired,
  server: PropTypes.shape({
    name: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    timeSincePing: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
  media: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isOpen: PropTypes.bool.isRequired,
  onOpenDescription: PropTypes.func.isRequired,
  onCloseDescription: PropTypes.func.isRequired,
};

export default enhance(ServerThumbnail);
