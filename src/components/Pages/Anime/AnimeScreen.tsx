import React from 'react'
import { useParams } from 'react-router-dom'
import ky from '../../../config/ky.config.js'
import { Skeleton } from '@/components/ui/skeleton'
import Badges from './Badges'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils.js'

const AnimeScreen = () => {
  const [anime, setAnime] = React.useState<IAnime | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const { id } = useParams()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  React.useEffect(() => {
    setLoading(true)
    ky.get(`anime/${id}`)
      .json()
      .then((response:any) => setAnime(response.data))
      .finally(() => setLoading(false))
  }, [id])

  React.useEffect(() => {
    const body = document.querySelector('body')
    body?.style.setProperty('background-image', `url(${anime?.attributes?.coverImage?.original || anime?.attributes?.coverImage?.large})`)

    return () => {
      body?.style.setProperty('background-image', 'none')
    }
  }, [anime])

  if (loading) {
    return (
      <div>
        <div className="flex flex-col md:flex-row gap-5 items-center p-5 md:p-0 md:h-[80vh]">
          <Skeleton className="w-full md:w-[384px] h-[600px] rounded-xl" />
          <div className="flex flex-col gap-2 p-0 md:p-10 flex-grow">
            <Skeleton className="font-bold text-2xl w-full md:w-96 h-10" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-3/4 h-4" />
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
          <h1 className="font-bold text-2xl flex items-center">
          {anime?.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}
          <span className='text-base text-muted-foreground'>
           &nbsp;&nbsp;({anime?.attributes.ageRatingGuide})
          </span>
          &nbsp;
          <Button variant='secondary' size='icon' className='w-7 h-7 rounded-sm bg-neutral-300 hover:bg-neutral-300 dark:bg-neutral-800' onClick={copyToClipboard}>
            {copied ? <Check size={14} className={cn(
              'text-muted-foreground dark:text-green-500 text-green-700'
            )}/> 
            :
            <Copy size={14} className={cn(
              ''
            )}/>}
          </Button>
          </h1>
          <p>{anime?.attributes.synopsis}</p>
          <Badges {...anime} />
        </div>
      </div>
    </div>
  )
}

export default AnimeScreen
