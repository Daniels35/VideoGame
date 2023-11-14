import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogames } from '../../actions/index';
import { Link } from 'react-router-dom';
import FilterData from '../../components/FilterData/FilterData';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import Header from '../../components/Header/Header';
import './Home.css';
import StarRating from '../../components/Rating/Rating';
import Loading from '../../components/Loading/Loading';


const applyFilters = (videogames, filterBy, orderBy, ratingFilter, sourceFilter) => {
  let filteredVideogames = [...videogames];

  if (filterBy !== 'All') {
    filteredVideogames = filteredVideogames.filter(videogame => videogame.genres.includes(filterBy));
  }

  if (ratingFilter !== 'All') {
    const lowerLimit = parseInt(ratingFilter);
    const upperLimit = lowerLimit + 1;
    filteredVideogames = filteredVideogames.filter(videogame => videogame.rating >= lowerLimit && videogame.rating < upperLimit);
  }

  if (orderBy !== 'Select') {
    filteredVideogames.sort((a, b) => {
      if (orderBy === 'asc_name') {
        return a.name.localeCompare(b.name);
      } else if (orderBy === 'desc_name') {
        return b.name.localeCompare(a.name);
      }
    });
  }

  if (sourceFilter !== 'All') {
    filteredVideogames = filteredVideogames.filter(videogame => videogame.source === sourceFilter);
  }
  

  return filteredVideogames;
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const allVideogames = useSelector(state => state.videogames);
  const searchResults = useSelector(state => state.searchVideogameByName);
  const filterBy = useSelector(state => state.filterBy);
  const orderBy = useSelector(state => state.orderBy);
  const ratingFilter = useSelector(state => state.ratingFilter);
  const sourceFilter = useSelector(state => state.sourceFilter);
  const [isLoading, setIsLoading] = useState(true);


  let filteredGames = applyFilters(allVideogames, filterBy, orderBy, ratingFilter, sourceFilter);
  let filteredSearchResults = applyFilters(searchResults, filterBy, orderBy, ratingFilter, sourceFilter);

  let displayGames = searchResults.length > 0 ? filteredSearchResults : filteredGames;

  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = displayGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Whenever a search or filter is applied, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults, filterBy, orderBy, ratingFilter]);

  const handleClickAndScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Header activePage="home" />
      <div className={currentGames.length > 0 ? "filter-container-home" : "notFilter-container-home"}>
      <SearchBar />
      <FilterData />
      </div>
      <div className={currentGames.length > 0 ? "games-container" : "games-containernoGrid"}>
        {currentGames.length > 0 ? (
          currentGames.map((videogame, index) => (
            <Link to={`/game/${videogame.id}`} key={index} onClick={handleClickAndScroll} className="game-card">
              <img src={videogame.image} alt={videogame.name} className="game-image" />
              <h2>{videogame.name}</h2>
              <p className='games-genres'>{videogame.genres}</p>
              <StarRating rating={videogame.rating} />
            </Link>
          ))
          ) : (
            <div className='container-home-gamesLoading'>
            <Loading isLoading={isLoading} />
            <p>Cargando Juegos...</p>
          </div>
        )}
        </div>
      <br></br>
      <Pagination
        gamesLength={displayGames.length}
        gamesPerPage={gamesPerPage}
        paginate={paginate}
        currentPage={currentPage}
        windowWidth={windowWidth}
      />
    </>
  );  
};

export default Home;
