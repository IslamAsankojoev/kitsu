import React from "react";
import ky from "../../config/ky.config.js";
import { AnimeCard } from "../AnimeCard";
import { Skeleton } from "../../../components/ui/skeleton.tsx";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    ky.get("anime")
      .json()
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h3 className="font-bold text-xl ml-4 mb-4">Anime</h3>
      <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-5">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-96" />;
          })
        ) : (
          <React.Fragment>
            {data?.map((anime) => {
              return <AnimeCard key={anime.id}{...anime} />;
            })}
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Home;
