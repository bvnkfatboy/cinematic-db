import { motion } from 'framer-motion';

import DrawImages from '@/utils/image/client';

interface CardProps {
  src: string;
  title: string;
  index: number;
  backdrop_path: string;
}

export default function DrawPoster({ src, title, index, backdrop_path }: CardProps) {
  return (
    <>
      <motion.div className="rounded-xl">
        <div className="mx-auto w-full max-w-[1200px]  rounded-xl px-4 py-5">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              alt="Carousel Movie Poster"
              className="h-[400px] w-full object-cover"
              height={400}
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              style={{
                aspectRatio: '1200 / 400',
                objectFit: 'cover',
              }}
              width={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
