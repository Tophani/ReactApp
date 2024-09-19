import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';

const List = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let result = await axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=5728e352&s=action", config);
      if (result.data.Search) {
        setPopular(result.data.Search);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopData = async () => {
    setLoading(true);
    try {
      let result = await axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=5728e352&s=comedy", config);
      if (result.data.Search) {
        setTopRated(result.data.Search);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTopData();
  }, []);

  return (
    <div>
      <div className="topBar">
        <div className="search-area">
          <input type="text" className="search-input" placeholder="Search movies..." />
          <span className="White">X</span>
        </div>
      </div>

      <div className="main-content">
        <h1 className="White">Popular</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="movie-container">
          {popular &&
            popular.map((movie) => (
              <div className="card-wrapper" key={movie.imdbID}>
                {/* Link wraps around the poster and title to navigate to SingleMovie page */}
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : ''} alt={movie.Title} />
                </Link>
                <div className="rating">
                  <span>64</span>
                </div>
                <h5>{movie.Title}</h5>
                <span>Year: {movie.Year}</span>
              </div>
            ))}
        </div>

        <h1 className="White mt-5">Top Rated</h1>
        <div className="movie-container">
          {topRated &&
            topRated.map((movie) => (
              <div className="card-wrapper" key={movie.imdbID}>
                {/* Link for top-rated movies */}
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : ''} alt={movie.Title} />
                </Link>
                <div className="rating">
                  <span>64</span>
                </div>
                <h5>{movie.Title}</h5>
                <span>Year: {movie.Year}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default List;
