import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ imgs }) {
  return (
    <>
      <ul className={css.ImageGallery}>
        {imgs.map(item => (
          <ImageGalleryItem
            key={item.id}
            webformatURL={item.webformatURL}
            alt={item.tags}
            largeImageURL={item.largeImageURL}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      webformatURL: PropTypes.string,
      alt: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};
