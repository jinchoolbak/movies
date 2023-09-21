import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  
  useEffect(()=> {
    fetch("https://yts.mx/api/v2/list_movies.json?limit=30")
    .then(response => response.json())
    .then((json) => {
      setLoading(false);
      setMovies(json.data.movies);
    });
  }, []); //빈 배열: 한번만 실행 , []

  return (
    <div className="App">
      <h1>영화 정보 ({movies.length})편</h1>
      <div>{loading ? <p>데이터 수신중..</p> : null}</div>
      <ul className='d-flex f-wrap g1'>
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={movie.url}>
              <img src={movie.medium_cover_image} alt={movie.title_english} />
              <p className='year'>개봉연도 : {movie.year}</p>
              <p className='title'>제목 : {movie.title}</p>
              <p>
                장르 : 
                {movie.genres.map((genre) => (
                  <strong className='genre'>{genre}</strong>
                ))}
              </p>
              <p className='lang'>언어 : {movie.language === "en" ? "영어" : null}</p>
              <p className='rating'>평점 : {movie.ratings} / 10</p>
              <p className='runtime'>상영시간 : {movie.runtime} 분</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
