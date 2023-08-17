import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';


const Landing = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home', { state: { username: username } });
  };

  return (
      <div className="Landing_landing-container"> 
        <div className="Landing_content">
          <h1>Bienvenido Gamer</h1>
          <h3>Ingresa tu nombre</h3>
          <form className="Landing_form" onSubmit={handleSubmit}>
            <input
              className="Landing_input"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Nombre de usuario"
            />
            <button className="Landing_button" type="submit">Ingresar</button>
          </form>
        </div>
      </div>
  );
};

export default Landing;
