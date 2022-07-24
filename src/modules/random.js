export const setRandom = (randomData) => (dispatch) => {
    try {
      dispatch({ type: "UPDATE_RANDOM", payload: randomData });
    } catch (err) {
      console.error(err);
    }
  };

  const initialState = [];

export const random = (random = initialState, action) => {
  switch (action.type) {
    case "UPDATE_RANDOM":
      return [action.payload];
    default:
      return random;
  }
};