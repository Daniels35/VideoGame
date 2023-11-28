import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/VideoGame/home', { state: { username: username } });
  };

  return (
      <div className="Landing_landing-container"> 
        <div className="Landing_content">
          <div className='Landing_content_body'>
            <h1>Bienvenido Gamer</h1>
            <p>Este es un proyecto personal. El frontend se realizó con React y Redux para mantener los estados, y se implementó el efecto de los logos de las plataformas con tsParticles. El backend se desarrolló con Node y la base de datos PostgreSQL. Para obtener los juegos, se conecta con la API de videojuegos llamada <a href="https://rawg.io/apidocs" target='_blank'>RAWG</a>. Se guarda en la base de datos para no hacer muchas solicitudes a la API. Se utilizaron varias dependencias, entre ellas Express, Morgan, Sequelize, etc.
              Para ver el repositorio y el código en GitHub puede <a href="https://github.com/Daniels35/VideoGame" target='_blank'>hacer clic aquí</a>.</p>
              <p>El frontend se desplego en github pages y el backend se desplego en Google cloud, creando instancias para la base de datos (Postgresql), así como el manejo de cloud functions para la interacion.</p>
          </div>
          <form className="Landing_form" onSubmit={handleSubmit}>
            <button className="Landing_button Landing_button_styles" type="submit">Ingresar</button>
          </form>
        </div>
      </div>
  );
};

export default Landing;
