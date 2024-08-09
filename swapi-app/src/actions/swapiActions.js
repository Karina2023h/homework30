export const fetchSwapiData = (type, id) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_SWAPI_REQUEST" });
    try {
      const response = await fetch(`https://swapi.py4e.com/api/${type}/${id}/`);
      const data = await response.json();
      dispatch({ type: "FETCH_SWAPI_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_SWAPI_FAILURE", payload: error.message });
    }
  };
};

export const clearSwapiData = () => {
  return {
    type: "CLEAR_SWAPI_DATA",
  };
};
