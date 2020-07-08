import React from 'react';
import PropTypes from 'prop-types';
import './CurrentMedia.css';

function CurrentMedia({ media }) {
  if (!media) {
    return <span />;
  }

  return (
    <div className="usl-CurrentMedia">
      <div
        className="usl-CurrentMedia-image"
        style={{ backgroundImage: `url(${JSON.stringify(media.thumbnail)})` }}
      />

      <div className="usl-CurrentMedia-nowPlaying">
        <p className="usl-CurrentMedia-title">
          {media.title}
        </p>
        <p className="usl-CurrentMedia-artist">
          {media.artist}
        </p>
      </div>
    </div>
  );
}

CurrentMedia.propTypes = {
  media: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
  }),
};

export default CurrentMedia;
