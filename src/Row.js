import React, { useState, useEffect } from 'react'
// import request from './request';
import axios from './axios'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    // https://www.youtube.com/watch?v=cmax1C1p660
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(error => console.log(error))
        }
    };
    console.log(movies);
    const a = 1;
    console.log(a);
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {/* row_poster */}
                {movies.map(movie => (
                    <img key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
                <div>
                    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                </div>
            </div>
        </div>
    )
}
export default Row
