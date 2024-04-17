import React from "react";
import ky from "../../config/ky.config.js";
import { Card } from "../Card/index.jsx";

const Home = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    ky.get("anime")
      .json()
      .then((response) => setData(response.data));
  }, []);

  return (
    <>
      <h3 className="font-bold text-xl my-6 ml-4">Anime</h3>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
        {data?.map((anime) => {
          return <Card key={anime.id} anime={anime} />;
        })}
        {data?.map((anime) => {
          return <Card key={anime.id} anime={anime} />;
        })}
        {data?.map((anime) => {
          return <Card key={anime.id} anime={anime} />;
        })}
      </div>
    </>
  );
};

export default Home;
