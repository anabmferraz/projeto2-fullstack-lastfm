import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
  user: null,
  recentTrack: null,
  topArtists: [],
  hasSearched: false,
};

function dataReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_DATA":
      return {
        ...state,
        user: action.payload.user,
        recentTrack: action.payload.recentTrack,
        topArtists: action.payload.topArtists,
        loading: false,
        error: null,
        hasSearched: true,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const setLoading = (loading) =>
    dispatch({ type: "SET_LOADING", payload: loading });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });
  const setData = (user, recentTrack, topArtists) =>
    dispatch({ type: "SET_DATA", payload: { user, recentTrack, topArtists } });
  const reset = () => dispatch({ type: "RESET" });

  return (
    <dataContext.Provider
      value={{ ...state, setLoading, setError, setData, reset }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);
