import React from 'react'
import { useParams } from 'react-router-dom'

const AnimeScreen = () => {
  let { id } = useParams();
  console.log(id)
  return (
    <div>AnimeScreen</div>
  )
}

export default AnimeScreen