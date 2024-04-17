import React from "react";
import ky from "../../config/ky.config.js";
import { Card } from "../Card/index.jsx";
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
      <h3 className="font-bold text-xl my-6 ml-4">Anime</h3>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-96" />;
          })
        ) : (
          <React.Fragment>
            {data?.map((anime) => {
              return <Card key={anime.id} anime={anime} />;
            })}
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Home;
