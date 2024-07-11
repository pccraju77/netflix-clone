import React, { useState, useEffect } from "react";
import "./rowpost.css";
import axios from "../../axios";
import { API_KEY,imageUrl } from "../../constants/constants";
import YouTube from "react-youtube";
function RowPost(props) {
  const [movies, setMovies] = useState([]);
 const [urlid , setUrlid] = useState('');
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
const handleMovie = (id) =>{
console.log(id)
axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then (response => {
 if(response.data.results.length !==0){
  setUrlid(response.data.results[0])
 }else{
  console.log('Array empty')
 }
})
}
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            className={props.isSmall ? "smallposter" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
            onClick={() => handleMovie(obj.id)}
          />
        ))}
      </div>
      {
        urlid &&
        <YouTube videoId={urlid.key} opts={opts}  />
        
        }
    </div>
  )
}

export default RowPost;
