import React from 'react'
import { useParams } from 'react-router-dom'
import ky from '../../../config/ky.config.js'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const AnimeScreen = () => {
  let { id } = useParams()
  const [anime, setAnime] = React.useState<IAnime | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    ky.get(`anime/${id}`)
      .json()
      .then((response:any) => setAnime(response.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div>
        <div className="flex flex-col md:flex-row gap-5 items-center p-5 md:p-0 md:h-[80vh]">
          <Skeleton className="w-full md:w-[384px] h-[600px] rounded-xl" />
          <div className="flex flex-col gap-2 p-0 md:p-10 flex-grow">
            <Skeleton className="font-bold text-2xl w-full md:w-96 h-10" />
            <Skeleton className="w-full h-52" />
          </div>
        </div>
      </div>
    )
  }

  if (!anime) {
    return <h1 className="text-white text-center">Anime not found</h1>
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 items-center p-5 md:p-0 md:h-[80vh]">
        <img src={anime?.attributes.posterImage.large} alt="" className="w-full md:w-96 h-auto rounded-xl" width={384} height={500} />
        <div className="flex flex-col gap-4 p-0 md:p-10">
          <h1 className="font-bold text-2xl">
          {anime?.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}
          <span className='text-base text-muted-foreground'>
           &nbsp;&nbsp;({anime?.attributes.ageRatingGuide})
          </span>
          </h1>
          <p>{anime?.attributes.synopsis}</p>
          <div className='flex gap-2 items-center flex-wrap justify-stretch'>
          <span>
          <Badge variant='outline' className='px-2 rounded-lg border-green-500 bg-green-900 text-green-300 w-fit hover:text-green-300 hover:bg-green-800'>
            {anime?.attributes?.showType || 'TV'}
          </Badge>
          </span>
          <Separator orientation='vertical' className='bg-neutral-400 h-4' />
          <span>
          <Badge variant='outline' className='px-2 rounded-lg border-orange-500 bg-orange-900 text-orange-300 w-fit hover:text-orange-300 hover:bg-orange-800'>
            {anime?.attributes?.ratingRank || '0'}
          </Badge> Rating Rank
          </span>
          <Separator orientation='vertical' className='bg-neutral-400 h-4' />
          <span>
          <Badge variant='outline' className='px-2 rounded-lg border-rose-500 bg-rose-900 text-rose-300 w-fit hover:text-rose-300 hover:bg-rose-800'>
            {anime?.attributes?.userCount || '0'}
          </Badge> Watchers
          </span>
          <Separator orientation='vertical' className='bg-neutral-400 h-4' />
          <span>
          <Badge variant='outline' className='px-2 rounded-lg border-neutral-500 bg-neutral-900 text-neutral-300 w-fit hover:text-neutral-300 hover:bg-neutral-800'>
            {anime?.attributes?.episodeCount || '0'}
          </Badge> Episodes ({anime?.attributes?.episodeLength || '0'} min)
          </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeScreen
