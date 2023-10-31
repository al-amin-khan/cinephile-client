import axios from 'axios';
import { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import './App.css'
import Header from './components/Header/Header';
import Trailer from './components/Trailer/Trailer';
import Reviews from './components/Reviews/Reviews';


function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get('/api/v1/movies/list');
      setMovies(response.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home movies= {movies} />} />
          <Route path='/trailer/:ytTrailerId' element={<Trailer/>}/>
          <Route path='/reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
