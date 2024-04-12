import React from 'react'
import Search from '../Search/index.jsx'

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
  return (
    <div className="bg-neutral-200 dark:bg-neutral-900/90 shadow-sm p-4 backdrop-blur-md sticky top-0 z-10 shadow-neutral-800">
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
        <div>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default Header