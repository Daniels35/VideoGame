import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, searchVideogames, clearSearchResults, changeSearchInputValue } from '../../actions/index';
import './SearchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchInputValue = useSelector((state) => state.searchInputValue);

    const handleInputChange = (event) => {
        dispatch(changeSearchInputValue(event.target.value));
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchInputValue !== '') {
            dispatch(searchVideogames(searchInputValue));
        }
    };

    const handleClearInput = () => {
        dispatch(changeSearchInputValue(''));
        dispatch(getVideogames());
        dispatch(clearSearchResults());
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                value={searchInputValue} 
                onChange={handleInputChange} 
                placeholder="BUSCAR VIDEOJUEGO POR NOMBRE" 
                className="search-input"
                />
                {searchInputValue && (
                    <p 
                    type="button" 
                    onClick={handleClearInput} 
                    className="close-search-buttonBar"
                    >
                    X
                    </p>
                )}
            <button type="submit" className="search-button">Buscar</button>
        </form>
    );
};

export default SearchBar;
