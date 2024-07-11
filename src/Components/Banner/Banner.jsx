import { useEffect, useState } from 'react'
import{ API_KEY,imageUrl} from '../../constants/constants'
import React  from 'react'
import './banner.css'
import axios from '../../axios'
function Banner() {

  




const [movie, setMovie] = useState()
    useEffect(() => {
     axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data)
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
     })
    }, [])
    
  return (
    <div  style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}} className='banner'>
        <div className="contents">
            <h1 className='title'>{movie ? movie.title : ''}</h1>
            <div className='banner-btn'>
                <button className='button'>Play</button>
                <button className='button'>My LIst</button>

            </div>
            <h1 className='describtion'>{movie ? movie.overview : ''}</h1>
        </div>
      <div className="fade_bottom">

      </div>
    </div>
  )
}

export default Banner
