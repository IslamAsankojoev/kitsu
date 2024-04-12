import React from 'react'
import { useParams } from 'react-router-dom'
import ky from '../../../config/ky.config.js'

const AnimeScreen = () => {
  let { id } = useParams();
  const [anime, setAnime] = React.useState(null);
  
  React.useEffect(() => {
    ky.get(`anime/${id}`).json().then((response) => setAnime(response.data));
  }, [id]);

  if(!anime){
    return null
  }

  return (
    <div>
      <div className="flex flex-row gap-5 my-16">
        <img src={anime.attributes.posterImage.large} alt="" className='w-96 h-auto rounded-xl' />
        <div className='flex flex-col gap-2 p-10'>
          <h1 className='font-bold text-2xl'>{anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}</h1>
          <p className='text-white'>{anime.attributes.description}</p>
        </div>
      </div>
    </div>
  )
}

export default AnimeScreen