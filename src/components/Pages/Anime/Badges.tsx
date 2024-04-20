import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const Badges = (anime: IAnime) => {
  return (
    <div className="flex gap-2 items-center flex-wrap justify-stretch text-muted-foreground">
      <span>
        <Badge variant="outline" className="px-2 rounded-lg border-green-500 bg-green-900 text-green-300 w-fit hover:text-green-300 hover:bg-green-800">
          {anime?.attributes?.showType || 'TV'}
        </Badge>{' '}
        Show
      </span>
      <Separator orientation="vertical" className="bg-neutral-400 h-4" />
      <span>
        <Badge variant="outline" className="px-2 rounded-lg border-orange-500 bg-orange-900 text-orange-300 w-fit hover:text-orange-300 hover:bg-orange-800">
          {anime?.attributes?.ratingRank || '0'}
        </Badge>{' '}
        Rating Rank
      </span>
      <Separator orientation="vertical" className="bg-neutral-400 h-4" />
      <span>
        <Badge variant="outline" className="px-2 rounded-lg border-rose-500 bg-rose-900 text-rose-300 w-fit hover:text-rose-300 hover:bg-rose-800">
          {anime?.attributes?.userCount || '0'}
        </Badge>{' '}
        Watchers
      </span>
      <Separator orientation="vertical" className="bg-neutral-400 h-4" />
      <span>
        <Badge variant="outline" className="px-2 rounded-lg border-neutral-500 bg-neutral-900 text-neutral-300 w-fit hover:text-neutral-300 hover:bg-neutral-800">
          {anime?.attributes?.episodeCount || '0'}
        </Badge>{' '}
        Episodes ({anime?.attributes?.episodeLength || '0'} min)
      </span>
    </div>
  )
}

export default Badges
