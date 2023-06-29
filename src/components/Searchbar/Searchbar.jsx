import { useState } from 'react';
import css from './Searchbar.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const notify = () => {
    toast.warn('Enter text to search, please!');
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      notify();
      return;
    }

    onSubmit(value);

    event.target.value.value = '';
    setValue('');
  };

  const handleChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.Searchbar} onSubmit={handleSubmit}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <BiSearchAlt size={20} />
        </button>

        <input
          className={css.SearchFormInput}
          name="value"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
      <ToastContainer autoClose={3000} closeOnClick />
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
