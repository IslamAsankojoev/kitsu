import React from 'react'
import { Star, Film } from 'lucide-react'
import colors from 'tailwindcss/colors'

export const Card = ({anime}) => {
  return (
    <a href='#' className='rounded-xl bg-neutral-900/90 hover:bg-neutral-800/80 transition-all overflow-hidden block border border-neutral-700 hover:border-neutral-600 '>
      <div className='relative'>
        <img src={anime.attributes.posterImage.large} alt="" className='w-full h-72 object-cover object-top'/>
        <div className='flex items-center p-2 absolute top-0 left-0'>
          <Star className='text-yellow-300' size={16} fill={colors.yellow[300]} />
          <span className='text-neutral-100 text-sm font-bold ml-1'>{anime.attributes.averageRating}</span>
        </div>
      
      </div>
      <div className="p-4">
      <h4 className='font-bold'>{anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}</h4>
      <p className='line-clamp-3 text-neutral-400'>{anime.attributes.description}</p>
      <div className="flex items-center mt-2">
          <Film className='text-neutral-200' size={16}/>
          <span className='text-neutral-200 text-sm ml-1'>{anime.attributes.episodeCount} - episodes </span>
        </div>
      </div>
    </a>
  )
}