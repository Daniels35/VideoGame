const API_URL = 'http://localhost:3001';

export function getVideogames() {
  return function (dispatch) {
    return fetch(`${API_URL}/videogames`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_VIDEOGAMES", payload: json });
      });
  };
}

export function searchVideogames(name) {
  return (dispatch) =>
    fetch(`${API_URL}/videogames?name=${name}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "SEARCH_VIDEOGAMES",
          payload: json,
        });
      });
}

export function changeSearchInputValue(value) {
  return {
    type: 'CHANGE_SEARCH_INPUT_VALUE',
    payload: value,
  };
}


export function getVideogameById(id) {
  return (dispatch) =>
    fetch(`${API_URL}/videogames/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_VIDEOGAME_BY_ID",
          payload: json,
        });
      });
}

export function getGenres() {
  return (dispatch) =>
    fetch(`${API_URL}/genres`)
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "GET_GENRES",
          payload: json,
        });
      });
}

export function getPlatforms() {
  return function (dispatch) {
    return fetch(`${API_URL}/platforms`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_PLATFORMS", payload: json });
      });
  };
}


export function createVideogame(obj) {
  console.log("Fecha en la acción de Redux:", obj.released);
  return (dispatch) =>
    fetch(`${API_URL}/videogames`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: "CREATE_VIDEOGAME",
          payload: json,
        });
      });
}

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};

export const setGenreFilter = (genre) => ({
  type: "SET_GENRE_FILTER",
  payload: genre,
});

export const setSortOrder = (order) => ({
  type: "SET_SORT_ORDER",
  payload: order,
});

export const setRatingFilter = (rating) => ({
  type: "SET_RATING_FILTER",
  payload: rating,
});

export const setSourceFilter = (source) => ({
  type: "SET_SOURCE_FILTER",
  payload: source,
});

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS',
  };
}


