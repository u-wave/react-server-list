import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const enhance = withStyles({
  image: {
    width: '100%',
    paddingBottom: '75%',
    backgroundColor: 'black',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  nowPlaying: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    color: 'white',
    background: 'rgba(0, 0, 0, 0.75)',
    padding: 16,
    paddingTop: 24,
  },
  title: {
    margin: 0,
    fontSize: '150%',
  },
  artist: {
    margin: 0,
  },
}, { name: 'CurrentMedia' });

const CurrentMedia = ({
  classes,
  media,
}) => (media ? (
  <div>
    <div
      className={classes.image}
      style={{ backgroundImage: `url(${JSON.stringify(media.thumbnail)})` }}
    />

    <div className={classes.nowPlaying}>
      <p className={classes.title}>{media.title}</p>
      <p className={classes.artist}>{media.artist}</p>
    </div>
  </div>
) : (
  <span />
));

CurrentMedia.propTypes = {
  classes: PropTypes.shape({
    image: PropTypes.string.isRequired,
    nowPlaying: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  media: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
  }),
};

export default enhance(CurrentMedia);
