import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, setGenreFilter, setSortOrder, setRatingFilter, resetAll, setSourceFilter } from '../../actions/index';
import './FilterData.css';
const FilterData = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const filterBy = useSelector((state) => state.filterBy);
    const orderBy = useSelector((state) => state.orderBy);
    const ratingFilter = useSelector((state) => state.ratingFilter);
    const sourceFilter = useSelector((state) => state.sourceFilter);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const handleGenreChange = (event) => {
        dispatch(setGenreFilter(event.target.value));
    };

    const handleSortChange = (event) => {
        dispatch(setSortOrder(event.target.value));
    };

    const handleRatingChange = (event) => {
        dispatch(setRatingFilter(event.target.value));
    };

    const handleReset = () => {
        dispatch(resetAll());
    };

    const handleSourceChange = (event) => {
        dispatch(setSourceFilter(event.target.value));
      };

    return (
        <div className='filter-container-1'>
            <h1>Filtros</h1>
        <div className="filter-container">
            <select value={filterBy} onChange={handleGenreChange}>
                <option value="All">All Genres</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>

            <select value={orderBy} onChange={handleSortChange}>
                <option value="Select">Order</option>
                <option value="asc_name">Ascending</option>
                <option value="desc_name">Descending</option>
            </select>

            <select value={ratingFilter} onChange={handleRatingChange}>
                <option value="All">All Ratings</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
            
            <select value={sourceFilter} onChange={handleSourceChange}>
                <option value="All">All Sources</option>
                <option value="Api">Api</option>
                <option value="Created">Created</option>
            </select>

        </div>
        <button onClick={handleReset} className="clear-button">Clear All</button>
        </div>
    );
};

export default FilterData;
