import Autoplay from 'embla-carousel-autoplay';
import React, { useEffect, useState } from 'react';

import DrawPoster from '@/components/shares/poster';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import '@/config/dayjs.config';
import { fetchTrending } from '@/utils/action';

function CarouselPoster() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data;

      data = await fetchTrending('day');

      setMovies(data.results);
      setLoading(false);
    };
    fetchData();
  });

  return (
    <>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="">
          {movies.map((movie: any, i) => (
            <CarouselItem className="basis-1/1">
              <DrawPoster
                src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
                title={movie?.title || movie?.name}
                backdrop_path={movie?.backdrop_path || movie?.poster_path}
                index={i}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default CarouselPoster;
