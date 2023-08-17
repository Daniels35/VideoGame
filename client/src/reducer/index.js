const initialState = {
    videogames: [],
    genres: [],
    platforms: [],
    createVideogame: null,
    searchVideogameById: [],
    searchVideogameByName: [],
    searchInputValue: "",
    orderBy: "Select",
    filterBy: "All",
    sourceFilter: "All",
    ratingFilter: "All",
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
            };
  
        case "SEARCH_VIDEOGAMES":
            return {
                ...state,
                searchVideogameByName: action.payload,
            };

         case 'CHANGE_SEARCH_INPUT_VALUE':
              return {
               ...state,
               searchInputValue: action.payload,
              };
              
  
        case "GET_VIDEOGAME_BY_ID":
            return {
                ...state,
                searchVideogameById: action.payload,
            };
  
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
            };
  
        case "GET_PLATFORMS": 
            return {
                ...state,
                platforms: action.payload,
            };
  
        case "CREATE_VIDEOGAME":
            return {
                ...state,
                createVideogame: action.payload,
            };    
  
        case "RESET":
            return {
                ...state,
                filteredVideogames: [],
                orderBy: "Select",
                filterBy: "All",
                ratingFilter: "All",
                sourceFilter: "All",
            };
        
            case 'CLEAR_SEARCH_RESULTS':
                return {
                  ...state,
                  searchVideogameByName: [],
                };
              

        case "SET_GENRE_FILTER":
            return {
                ...state,
                filterBy: action.payload,
            };
  
        case "SET_SORT_ORDER":
            return {
                ...state,
                orderBy: action.payload,
            };

        case "SET_SOURCE_FILTER":
             return {
               ...state,
               sourceFilter: action.payload,
              };

        case "SET_RATING_FILTER":
            return {
                ...state,
                ratingFilter: action.payload,
            };
  
        default:
            return state;
    }
  };
  