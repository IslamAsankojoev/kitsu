import React from 'react'
import './styles/main.scss'
import { Card } from './components/Card/index.jsx'
import Header from './components/Header/index.jsx';
import Home from './components/Pages/Home.jsx';
import About from './components/Pages/About.jsx';
import Manga from './components/Pages/Manga.jsx';
import AnimeScreen from './components/Pages/Anime/AnimeScreen.jsx';
import colors from 'tailwindcss/colors'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="p-0">
      <Header />
      <div className="container mx-auto my-6">
      <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="manga" element={<Manga />} />
          <Route path="anime" element={<Home />} />
          <Route path="anime/:id" element={<AnimeScreen />} />
      </Routes>
      </div>
    </div>
  )
}

export default App