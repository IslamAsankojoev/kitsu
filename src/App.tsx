import React from 'react'
import './styles/main.scss'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Manga from './components/Pages/Manga';
import AnimeScreen from './components/Pages/Anime/AnimeScreen';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <div className='flex flex-col'>
      <Header />
      <div className="container mx-auto my-5 flex-grow justify-between">
      <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="manga" element={<Manga />} />
          <Route path="anime" element={<Home />} />
          <Route path="anime/:id" element={<AnimeScreen />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </React.Fragment>
  )
}

export default App