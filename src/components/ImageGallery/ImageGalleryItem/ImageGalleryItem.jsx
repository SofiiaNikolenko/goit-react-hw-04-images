import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ webformatURL, alt, largeImageURL }) {
  const [modal, setModal] = useState(false);

  const onShowModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <li className={css.ImageGalleryItem} onClick={onShowModal}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={alt}
        />
      </li>

      {modal && (
        <Modal largeImageURL={largeImageURL} alt={alt} onClose={onCloseModal} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
