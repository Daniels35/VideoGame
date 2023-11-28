import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecommendedGames.css'; 
import StarRating from '../../components/Rating/Rating';

function RecommendedGames() {
    // Obtiene todos los juegos del estado
    const videogames = useSelector(state => state.videogames);

    // Crea una copia de los juegos
    const gamesCopy = [...videogames];

    // Selecciona al azar 3 juegos
    const recommendedGames = gamesCopy.sort(() => 0.5 - Math.random()).slice(0, 3);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h2 className='recommendedTitle'>Juegos Recomendados</h2>
            <div className="recommended-games">
                {recommendedGames.map((game, index) => (
                    <Link to={`/VideoGame/game/${game.id}`} key={index} onClick={handleClick}>
                        <img src={game.image} alt={game.name} />
                        <p>{game.name}</p>
                        <p>{game.genres}</p>
                        <StarRating rating={game.rating} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RecommendedGames;
