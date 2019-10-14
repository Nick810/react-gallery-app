import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = props => {
  const results = props.data;
  let photos;
  let heading = '';
  let name = props.data.title;

  if (props.loading) {
    return (
      <h2>Loading...</h2>
    );
  } else if (results.length > 0) {
    heading = props.heading.toUpperCase();
    photos = results.map(photo =>
      <Photo
        farm={photo.farm}
        server={photo.server}
        id={photo.id}
        secret={photo.secret}
        title={photo.title}
        key={photo.id}
      />
    );
  } else {
    photos = <NotFound />
  }

  return (
    <div className="photo-container">
      {heading !== '' ? <h2>{heading}</h2> : null}
      <ul>
        {photos}
      </ul>
    </div>
  );
};

export default PhotoContainer;
