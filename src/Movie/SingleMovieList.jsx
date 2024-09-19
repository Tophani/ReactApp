import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function SingleMovieList() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [MovieData, setMovieData] = useState();
  const [relatedMovies, setRelatedMovies] = useState([]);

  // API call to fetch the selected movie details
  const fetchMovieData = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=5728e352&i=${id}`);
      const data = response.data;

      if (data.Response !== 'True') {
        navigate(-1);
        alert("Invalid Movie");
      } else {
        setMovieData(data);
        fetchRelatedMovies(data.Genre.split(',')[0]); // Fetch related movies based on genre
      }
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  // API call to fetch related movies based on genre
  const fetchRelatedMovies = async (genre) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=5728e352&s=${genre}`);
      setRelatedMovies(response.data.Search);
    } catch (error) {
      console.error(error);
      alert("Network error");
    }
  };

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
    window.location.reload(); // Reload page to fetch new movie data
  };

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  return (
    <div className='singleMovieBody'>
      {/* Top Section */}
      <div className='topTab-single'>
        <div style={{ width: '100%', height: '300px', position: 'absolute', backgroundColor: 'black', opacity: 0.8, zIndex: 0, left: 0 }} />
        {/* Left Section */}
        <div style={{ zIndex: 1 }} className='topLeft-single'>
          <div className='top-topLeft-single button'>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{MovieData?.Title}</h1>
            <span>{MovieData?.Released}</span>
          </div>
          <div className='bottom-topLeft-single mt-3'>
            <h3>Overview</h3>
            <p>{MovieData?.Plot}</p>
          </div>
        </div>
        {/* Right Section */}
        <div style={{ zIndex: 2 }} className='topRight-single'>
          <img src={MovieData?.Poster} alt={MovieData?.Title} />
          <p className='movieFloater'>{(MovieData?.imdbRating / 10) * 100}</p>
        </div>
      </div>

      <div className='movieBody'>
        {/* Top Billed Cast */}
        <div>
          <h3 style={{ fontWeight: 400 }}>Top Billed Cast</h3>
          <br />
          <ul>
            {MovieData?.Actors?.split(',')?.map((actor, index) => (
              <li key={index}>
                <img src={MovieData.Poster} className='authorImg' style={{ height: 200, borderRadius: '15px' }} alt={actor} />
                <div className='movieNameContainer'>
                  <h4>{actor}</h4>
                  <span>Actor</span>
                  {/* <p className='movieFloater'>90</p> */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Movies */}
        <div>
          <h3>Related Movies</h3>
          <br />
          <ul>
            {relatedMovies.map((movie) => (
              <li onClick={() => handleNavigate(movie.imdbID)} key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <div className='movieNameContainer'>
                  <h4>{movie.Title.length > 10 ? `${movie.Title.slice(0, 10)}...` : movie.Title}</h4>
                  <span>Year: {movie.Year}</span>
                </div>
                {/* <p className='movieFloater'>90</p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
