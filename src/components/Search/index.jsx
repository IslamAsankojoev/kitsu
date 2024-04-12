import React, { useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ky from '../../config/ky.config.js'
import debounce from 'lodash.debounce'
import { Frown, Loader } from 'lucide-react'

const Search = () => {
  const [data, setData] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 150,
  })
  const Ref = React.useRef(null)

  const handleSearchChange = React.useCallback(
    debounce((value) => {
      setSearch(value)
    }, 150),
    []
  )

  React.useEffect(()=>{
    if (!search) {
      setData([])
      setOpen(false)
      return
    }
    setLoading(true)
    setOpen(true)
    ky.get(`anime?filter[text]=${search}`).json().then((response) => {
      setData(response.data)
      setLoading(false)
    })
  }, [search])

  React.useEffect(()=>{
    function handleClickOutside(event) {
      if (Ref.current && !Ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <div className='flex justify-center relative' ref={parent}>
        <input
          type='text'
          placeholder='Search'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            handleSearchChange(e.target.value)
          }}
          className='rounded-md bg-neutral-200 dark:bg-neutral-800 px-4 py-1 focus:outline-none w-72'
        />
        {open && (
          <div 
          className="flex absolute w-96 h-[500px] overflow-scroll bg-neutral-300/95 dark:bg-neutral-950/95 backdrop-blur-md rounded-xl top-12 right-0 p-5 flex-col gap-2 no-scrollbar shadow-lg dark:shadow-none transition-all z-10"
          ref={Ref}>
            {!!data.length ? data.map((anime) => (
              <a href="#" key={anime.id} className='rounded-md flex gap-3 items-center bg-neutral-100/70 dark:bg-neutral-900/90 p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'>
                <img src={anime.attributes.posterImage.small} alt="" className='h-16 w-auto rounded-sm'/>
                <div className='flex-col gap-3'>
                  <p className='font-bold text-base leading-4 mb-1'>{anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp}</p>
                  <p className='line-clamp-2 text-neutral-500 dark:text-neutral-400 text-sm leading-4'>{anime.attributes.description}</p>
                </div>
              </a>
            )) : (
              <p className='text-neutral-200 flex gap-2 items-center justify-center my-10'><Frown /> not found anything</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
