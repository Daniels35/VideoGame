import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById } from '../../actions/index'; 
import { useParams } from 'react-router-dom';
import RecommendedGames from '../../components/RecommendedGames/RecommendedGames';
import Header from '../../components/Header/Header';
import './Detail.css';
import StarRating from '../../components/Rating/Rating';

function formatDateToBackendFormat(date) {
  if (!date) {
    return ''; 
  }

  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);
  return `${day}/${month}/${year}`;
}

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogameById(id));
  }, [dispatch, id]);

  const videogame = useSelector(state => state.searchVideogameById);

  const released = formatDateToBackendFormat(videogame.released);

  if (!videogame) {
    return <p>Loading...</p>;
  }

  console.log(id)

  return (
    <> 
      <Header />
      <div className="Detail_container">
        <p>ID: {id}</p>
        <h1 className="Detail_title">{videogame.name}</h1>
        <img className="Detail_image" src={videogame.image} alt={videogame.name} />
        <p className="Detail_platforms">{videogame.platforms}</p>
        <p className="Detail_description">{videogame.description}</p>
        <p className="Detail_released">Fecha de Lanzamiento: {released}</p>
        <StarRating rating={videogame.rating} />
        <p className="Detail_rating">{videogame.rating}</p>
        <p className="Detail_genres">{videogame.genres}</p>
        {videogame && <RecommendedGames />}
      </div>
    </>
  );
}

export default Detail;