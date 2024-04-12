import React, { useEffect } from 'react'
import Search from '../Search/index.jsx'
import { Moon, Sun } from 'lucide-react'

const menuItems = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Anime',
    url: '/anime'
  },
  {
    name: 'Manga',
    url: '/manga'
  },
  {
    name: 'About',
    url: '/about'
  }
]

const Header = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    let body = document.querySelector('body')
    if (theme === 'dark') {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900/90 shadow-sm p-4 backdrop-blur-md sticky top-0 z-10 shadow-neutral-200 dark:shadow-neutral-800">
      <div className="container mx-auto flex gap-10 justify-between items-center">
        <div className='flex gap-10'>
        <h1 className="font-extrabold text-xl tracking-widest">KITSU</h1>
        <nav className="flex space-x-4">
          {menuItems.map((item) => (
            <a key={item.url} href={
              item.url
            } className="text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-100">
              {item.name}
            </a>
          ))}
        </nav>
        </div>
        <div className='flex gap-2'>
          <button onClick={()=>{
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          className='flex items-center bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all'
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={1.25}/> : <Moon size={20} strokeWidth={1.25} />}
          </button>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default Header