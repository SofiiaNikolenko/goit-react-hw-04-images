import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL =
  'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&per_page=12';
const KEY = '&key=35832176-d501674701625dd971676e287';

export default function App() {
  const [value, setValue] = useState('');
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(1);
  const [disabledButton, setDisabledButton] = useState(false);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (value !== '' || page !== 1) {
      getImg(value, page);
    }
  }, [value, page]);

  const getImg = (value, page) => {
    fetch(URL + KEY + `&q=${value}&page=${page}`)
      .then(response => {
        return response.json();
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          setDisabledButton(false);
          setNoResults(true);
          notify();
          return;
        }
        setImgs(prevImgs => [...prevImgs, ...hits]);
        setDisabledButton(true);
      })
      .catch(error => {
        setError(error);
        setDisabledButton(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const formValue = value => {
    setValue(value);
    setImgs([]);
    setPage(1);
    setDisabledButton(false);
    setLoader(true);
    setNoResults(false);
  };

  const handleMoreImgs = () => {
    setPage(prevPage => prevPage + 1);
  };

  const notify = () => {
    toast.error('No results found! Please try again!');
  };

  return (
    <>
      <Searchbar onSubmit={formValue} />
      <ImageGallery imgs={imgs} />
      {loader && <Loader />}
      {disabledButton && <Button onClick={handleMoreImgs} />}
      {noResults && <ToastContainer autoClose={3000} />}
    </>
  );
}
