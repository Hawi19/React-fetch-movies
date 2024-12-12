import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=db0f1fba5c66c440c202f6308c6846f0&query=${searchTerm}`);
      if (!res.ok) {
        throw new Error('Error fetching data');
      }
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a search term.'); 
    }
    fetchMovies();
  };

  return (
    <div >
      <div className="search-box"  >
      <h1>Movie Search <span>App</span> </h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleInput} 
        />
        <button type="submit">Search</button>
      </form>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}

      
      <div className="movie-cards" >
        {movies.map((movie) => (
          <div className="col-md-3 mb-2" key={movie.id}>
            <div className="card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                />
              ) : (
                <div className="card-img-top bg-secondary" style={{ height: '200px'}}></div>
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App; 