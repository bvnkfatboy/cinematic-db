import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import DrawCards from '@/components/shares/card';
import Detail from '@/components/shares/detail';
import { SkeletonCard } from '@/components/skeleton/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

import '@/config/dayjs.config';
import { fade } from '@/lib/config';
import { fetchPopular, fetchTrending } from '@/utils/action';

dayjs.locale('th');

interface Props {
  category: string;
  param: string;
}
function CarouselCard({ category, param }: Props) {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectMovieId, setSelectMovieId] = useState<number>();
  const [mediaType, setMediaType] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (category === 'Trending') {
        data = await fetchTrending(param);
      } else if (category === 'Popular') {
        data = await fetchPopular(param);
      }
      setMovies(data.results);
      setLoading(false);
    };
    fetchData();
  }, [category, param]);

  const handleMovieClick = (movieId: number, mediaType: string) => {
    setSelectMovieId(movieId);
    setOpen(true);
    setMediaType(mediaType || param);
    // console.log(movieId + ' ' + mediaType || param);
  };

  if (loading) {
    return (
      <>
        <Carousel>
          <CarouselContent className="">
            {[...Array(10)].map((_, i) => (
              <CarouselItem className="basis-1/1" key={i}>
                <SkeletonCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </>
    );
  }
  return (
    <>
      <Carousel>
        <CarouselContent className="">
          {movies.map((movie: any, i) => (
            <a key={movie.id} onClick={() => handleMovieClick(movie.id, movie.media_type)} className="cursor-pointer">
              <CarouselItem className="basis-1/1">
                <DrawCards
                  src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
                  title={movie?.title || movie?.name}
                  date={dayjs(movie?.release_date || movie?.first_air_date).format('DD MMMM BBBB')}
                  votes={((movie?.vote_average / 10) * 100).toFixed(0) + ''}
                  index={i}
                />
              </CarouselItem>
            </a>
          ))}
        </CarouselContent>
      </Carousel>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="border-none bg-transparent p-2">
          <motion.div {...fade}>
            <div className="mt-3">
              <Detail movieId={selectMovieId as number} mediaType={mediaType as string} />
            </div>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CarouselCard;
