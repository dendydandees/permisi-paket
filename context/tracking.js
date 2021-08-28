import { useContext, createContext, useReducer } from 'react';

const TrackingContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRACKING':
      return action.payload;
    case 'GET_ERROR':
      return action.payload;
    default:
      return state;
  }
};

export const TrackingProvider = ({ children }) => {
  const [tracking, setTracking] = useReducer(reducer, {});
  const [error, setError] = useReducer(reducer, {});

  return (
    <TrackingContext.Provider
      value={{ tracking, setTracking, error, setError }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => useContext(TrackingContext);
