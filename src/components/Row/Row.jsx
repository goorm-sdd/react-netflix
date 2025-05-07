import './Row.css';
import { useMovieData } from '../../hooks/useMovieData';

const baseImageUrl = 'http://image.tmdb.org/t/p/original/';

export default function Row({ title, fetchUrl, isLargeRow, id }) {
  const { data: movies, loading, error } = useMovieData(fetchUrl);

  if (loading) return <p>Loading {title}...</p>;
  if (error)
    return (
      <p>
        Error loading {title}: {error.message}
      </p>
    );

  return (
    <section className="row-container">
      <h2>{title}</h2>
      <div className="slider">
        {/* <div className='slider__arrow slider__arrow-left'>
            <span 
              className='arrow'
              onClick={() => {
                document.getElementById(id).scrollLeft -= window.innerWidth - 80;
              }}
            >
                {"<"}
            </span>
        </div> */}
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`${baseImageUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name || movie.title}
            />
          ))}
        </div>
        {/* <div className='slider__arrow slider__arrow-right'>
            <span 
              className='arrow'
              onClick={() => {
                document.getElementById(id).scrollLeft += window.innerWidth - 80;
              }}
            >
                {">"}
            </span>
        </div> */}
      </div>
    </section>
  );
}
