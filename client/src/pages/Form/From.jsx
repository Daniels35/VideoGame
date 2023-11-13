import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres, getPlatforms } from '../../actions/index';
import Header from '../../components/Header/Header';
import './Form.css';
const Form = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [released, setReleased] = useState('');
  const [rating, setRating] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [isNameValid, setIsNameValid] = useState(null);
  const [isImageValid, setIsImageValid] = useState(null);
  const [isDescriptionValid, setIsDescriptionValid] = useState(null);
  const [isReleasedValid, setIsReleasedValid] = useState(null);
  const [isRatingValid, setIsRatingValid] = useState(null);
  const [isGenresValid, setIsGenresValid] = useState(null);
  const [isPlatformsValid, setIsPlatformsValid] = useState(null);

  const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i'); 
    return !!pattern.test(str);
  }

  const handleRatingChange = (e) => {
    if (e.target.value >= 1 && e.target.value <= 5) {
      setRating(e.target.value);
    }
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    setIsNameValid(name ? !!name : null);
  }, [name]);

  useEffect(() => {
    setIsImageValid(image ? validURL(image) : null);
  }, [image]);

  useEffect(() => {
    setIsDescriptionValid(description ? !!description : null);
  }, [description]);

  useEffect(() => {
    setIsReleasedValid(released ? !!released : null);
  }, [released]);

  useEffect(() => {
    setIsRatingValid(rating ? (rating >= 1 && rating <= 5) : null);
  }, [rating]);

  useEffect(() => {
    setIsGenresValid(selectedGenres.length > 0 ? true : null);
  }, [selectedGenres]);

  useEffect(() => {
    setIsPlatformsValid(selectedPlatforms.length > 0 ? true : null);
  }, [selectedPlatforms]);


  const handleSubmit = (e) => {
    e.preventDefault();
    alert('El ingreso de videojuegos está deshabilitado.');
    if (!isNameValid || !isImageValid || !isDescriptionValid || !isReleasedValid || !isRatingValid || !isGenresValid || !isPlatformsValid) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }
    setName('');
    setImage('');
    setDescription('');
    setReleased('');
    setRating('');
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setIsNameValid(false);
    setIsImageValid(false);
    setIsDescriptionValid(false);
    setIsReleasedValid(false);
    setIsRatingValid(false);
    setIsGenresValid(false);
    setIsPlatformsValid(false);
  };

return (
    <>
    <Header activePage="new" />
    <div className='from-container-1'>
    <form onSubmit={handleSubmit}>
        <div className="form-container"> 
        <h3>Crear VideoJuego Nuevo</h3>
        <input className={isNameValid ? 'valid' : 'error'} type="text" placeholder="Nombre VideoJuego" value={name} onChange={e => setName(e.target.value)} />
        <input className={isImageValid ? 'valid' : 'error'} type="text" placeholder="Link Imagen" value={image} onChange={e => setImage(e.target.value)} />
        <textarea className={isDescriptionValid ? 'valid' : 'error'} placeholder="Descripción VideoJuego..." value={description} onChange={e => setDescription(e.target.value)} />

        <select id="platforms" name="platforms" className={isPlatformsValid ? 'valid' : 'error'}>
            {platforms.map((platform, index) => (
            <option key={index} value={platform}>
                {platform}
            </option>
            ))}
        </select>
        <br></br>
        <button
            onClick={(e) => {
            e.preventDefault();
            const platformName = document.getElementById('platforms').value;
            if (!selectedPlatforms.includes(platformName)) {
                setSelectedPlatforms([...selectedPlatforms, platformName]);
            }
            }}
        >
            Add Platform
        </button>
        <p>Plataformas: {selectedPlatforms.join(', ')}</p>
        <input className={isReleasedValid ? 'valid' : 'error'} type="date" value={released} onChange={e => setReleased(e.target.value)} />
        <input className={isRatingValid ? 'valid' : 'error'} type="number" placeholder="Rating" value={rating} onChange={handleRatingChange} />
        
        <select id="genres" name="genres" className={isGenresValid ? 'valid' : 'error'}>
            {genres.map((genre, index) => (
            <option key={index} value={genre.name}>
                {genre.name}
            </option>
            ))}
        </select>
        <br></br>
        <button
            onClick={(e) => {
            e.preventDefault();
            const genreName = document.getElementById('genres').value;
            if (!selectedGenres.includes(genreName)) {
                setSelectedGenres([...selectedGenres, genreName]);
            }
            }}
        >
            Add Genre
        </button>
        <p>Generos: {selectedGenres.join(', ')}</p>
        <button type="submit">Crear Videojuego</button>
      </div>
    </form>
    </div>
    </>
);
        };  

export default Form;
