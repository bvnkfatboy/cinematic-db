import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SkeletonDetail from '@/components/skeleton/detail';

import { DataService } from '@/config/dataService';
import '@/config/dayjs.config';
import { fetchDetail } from '@/utils/action';
import DrawImages from '@/utils/image/client';

interface DetailProps {
  movieId: number;
  mediaType: string;
}

interface Genre {
  id: number;
  name: string;
}
interface Episode {
  runtime: number;
  overview: string;
}
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  runtime: number;
  name: string;
  genres: Genre[];
  last_episode_to_air: Episode;
  first_air_date: string;
  production_companies: any[];
}

dayjs.locale('th');

export default function ({ movieId, mediaType }: DetailProps) {
  const [movie, setMovie] = useState({} as Movie);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetail(mediaType, movieId);
      const movie = await setMovie(data);
      setLoading(false);
      return movie;
    };
    fetchData();
  }, [movieId, mediaType]);

  if (loading) {
    return <SkeletonDetail />;
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div
        className=" rounded-lg  bg-cover bg-no-repeat p-2 md:p-8 lg:p-12"
        style={{
          backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.7),

              rgba(0, 0, 0, 0.7)

              ),

              url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}')`,
        }}
      >
        <div className="mx-auto max-w-7xl ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 lg:gap-12">
            <div className="col-span-1 hidden md:block">
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
                alt={movie?.title || movie?.name}
                className="h-auto w-full rounded-lg shadow-lg"
                height={600}
                width={400}
              />
            </div>
            <div className="col-span-2">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{movie?.title || movie?.name}</h1>
              <div className="my-2 flex items-center space-x-2">
                <span className="text-sm text-white">
                  {dayjs(movie?.release_date || movie?.first_air_date).format('DD MMMM BBBB')}
                </span>
                <span className="text-sm text-white">
                  ({movie?.runtime || movie?.last_episode_to_air?.runtime} min)
                </span>
              </div>
              <div className="my-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">
                    {((movie?.vote_average / 10) * 100).toFixed(0) + '%'} User Score
                  </span>
                </div>
              </div>

              {/* <p className="my-4 text-white">{movie.genres?.map((genre) => genre.name || '').join(', ')}</p> */}
              <h2 className="my-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">Overview</h2>
              <p className="text-white">{movie?.overview || movie?.last_episode_to_air?.overview}</p>

              <div className="my-4 mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {movie?.production_companies?.map((company) => (
                  <div key={company.id} className="flex items-center space-x-2 underline">
                    {company?.logo_path ? (
                      <>
                        <DrawImages
                          alt={movie.title || movie.name}
                          className=" max-w-24 bg-white p-1 shadow-lg "
                          src={`https://image.tmdb.org/t/p/original/${company?.logo_path}`}
                          quality={75}
                        />
                        <span className="text-white">{company.name}</span>
                      </>
                    ) : (
                      <span className="text-white">{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
