import React from 'react'
import ky from '../../config/ky.config.js'
import debounce from 'lodash.debounce'
import { Frown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Skeleton } from '../../../components/ui/skeleton.tsx'
import clsx from 'clsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

const Search = ({ className }) => {
  const [data, setData] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const Ref = React.useRef(null)

  const handleSearchChange = React.useCallback(
    debounce((value) => {
      setSearch(value)
    }, 150),
    [],
  )

  const handleLinkClick = (id) => {
    setOpen(false)
    setValue('')
    navigate(`/anime/${id}`)
  }

  React.useEffect(() => {
    if (!search) {
      setData([])
      setOpen(false)
      return
    }
    setOpen(true)
    setLoading(true)
    ky.get(`anime?filter[text]=${search}`)
      .json()
      .then((response) => setData(response.data))
      .finally(() => setLoading(false))
  }, [search])

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (Ref.current && !Ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className={clsx('relative overflow-visible', className)}>
      <Popover open={open}>
        <PopoverTrigger>
          <Input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              handleSearchChange(e.target.value)
            }}
            className="rounded-md bg-neutral-200 dark:bg-neutral-800 px-4 py-1 focus:outline-none w-72 h-[39px] "
          />
        </PopoverTrigger>
        <PopoverContent
          ref={Ref}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onFocusOutside={(e) => {
            e.preventDefault()
          }}
        >
          <div className="relative flex flex-col gap-2">
            {loading && Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-20 w-full" />)}
            {!!data.length ? (
              data.map((anime) => (
                <div
                  onClick={() => {
                    handleLinkClick(anime.id)
                  }}
                  key={anime.id}
                  className="cursor-pointer rounded-md flex gap-3 items-center bg-neutral-100/70 dark:bg-neutral-900/90 p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 overflow-hidden"
                >
                  <img src={anime.attributes.posterImage.small} alt="" className="h-16 w-auto rounded-sm" />
                  <div className="flex-col gap-3">
                    <p className="font-normal text-base leading-4 mb-1">{anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}</p>
                    <p className="line-clamp-2 text-neutral-500 dark:text-neutral-400 text-sm leading-4">{anime.attributes.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="flex gap-2 items-center justify-center my-10">
                <Frown /> not found anything
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Search
