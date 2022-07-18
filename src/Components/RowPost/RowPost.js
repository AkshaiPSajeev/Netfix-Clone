import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import axios  from '../../axios'
import './RowPost.css'
import  {API_KEY, imageUrl} from '../../constants/constants'
import YouTube from 'react-youtube'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [movieUrl,setMovieUrl]=useState('')
  useEffect(() => {
   axios.get(props.url).then(response=>{
    console.log(response.data);
    setMovies(response.data.results)
    
   })
  
   
  }, [])
  const opts= {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie=(id)=>{
  
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
     
      console.log(response.data.results);
      if(response.data.results.length!==0){
      
        setMovieUrl(response.data.results[0])
        console.log(movieUrl);
    }else{
        alert('Trailor not available')
    }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>

       
       
        <div className='posters'>
           {movies.map((obj)=>{
            return(<img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${imageUrl + obj.backdrop_path}`}/>)
             
           

           })}
        </div>
        {movieUrl && <YouTube videoId={movieUrl.key} opts={opts}/>}
       
    </div>
  )
}

export default RowPost