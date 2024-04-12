import React from 'react'
import './styles/main.scss'
import { Card } from './components/Card/index.jsx'
import Header from './components/Header/index.jsx'
import Home from './components/Pages/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './components/Pages/About.jsx'
import Manga from './components/Pages/Manga.jsx'
import AnimeScreen from './components/Pages/Anime/AnimeScreen.jsx'
import colors from 'tailwindcss/colors'


const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/anime',
    element: <Home />,
  },
  {
    path: '/anime/:id',
    element: <AnimeScreen />,
  },
  {
    path: '/manga',
    element: <Manga />,
  },
  {
    path: '/about',
    element: <About />,
  }
]);

const App = () => {
  return (
    <div className="p-0">
      <Header />
      <div className="container mx-auto my-6">
        <RouterProvider router={BrowserRouter}>
        </RouterProvider>
      </div>
    </div>
  )
}

export default App