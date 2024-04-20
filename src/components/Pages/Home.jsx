import React from "react";
import ky from "../../config/ky.config.js";
import { AnimeCard } from "../AnimeCard";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import PaginationComp from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { transformPaginationSearchParams } from '@/lib/utils'

const Home = () => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if(!params.has("limit")) params.set("limit", 20);
    if(!params.has("offset")) params.set("offset", 0);

    setSearchParams(params)

    setLoading(true);
    try{
      ky.get("anime", { searchParams: transformPaginationSearchParams(params) })
      .json()
      .then((response) => {
        setData(response.data)
        setTotal(response.meta.count)
      })
      .finally(() => setLoading(false));
    } catch (error) {
      console.error(error)
    }
  }, [searchParams]);

  return (
    <>
      <h3 className="font-bold text-xl ml-4 mb-4">Anime</h3>
      <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-[440px]" />;
          })
        ) : (
          <React.Fragment>
            {data?.map((anime) => {
              return <AnimeCard key={anime.id}{...anime} />;
            })}
          </React.Fragment>
        )}
      </div>
      <PaginationComp total={total} limit={Number(searchParams.get('limit'))} offset={Number(searchParams.get('offset'))} />
    </>
  );
};

export default Home;
