'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import DrawCards from '@/components/shares/card';
import Detail from '@/components/shares/detail';
import { SkeletonCard } from '@/components/skeleton/card';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import '@/config/dayjs.config';
import { fade } from '@/lib/config';
import { fetchMovie } from '@/utils/action';

dayjs.locale('th');

interface Props {
  type: string;
}

function ListPage({ type }: Props) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectMovieId, setSelectMovieId] = useState<number>();
  const [mediaType, setMediaType] = useState<string>();

  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 5;
  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (type === 'tv') {
        data = await fetchMovie('tv', page);
      } else if (type === 'movie') {
        data = await fetchMovie('movie', page);
      }
      setTotalPages(data.total_pages);
      setMovies(data.results);
      setLoading(false);
    };
    fetchData();
  }, [type, page]);

  const handleMovieClick = (movieId: number, mediaType: string) => {
    setSelectMovieId(movieId);
    setOpen(true);
    setMediaType(mediaType);
    console.log(movieId + ' ' + mediaType);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setActivePage(pageNumber);
  };

  const startPage = Math.floor((page - 1) / pageLimit) * pageLimit + 1;
  const endPage = startPage + pageLimit - 1;

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {[...Array(20)].map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="font-bol m-5 mb-[30px] text-center text-3xl md:text-4xl lg:text-5xl">
        {type === 'tv' ? 'ทีวีซีรี่ย์' : 'ภาพยนตร์'} ได้รับความนิยม
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
        {movies.map((movie: any, i) => (
          <a key={movie.id} onClick={() => handleMovieClick(movie.id, 'movie')} className="cursor-pointer">
            <DrawCards
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              title={movie?.title || movie?.name}
              date={dayjs(movie?.release_date || movie?.first_air_date).format('DD MMMM BBBB')}
              votes={((movie?.vote_average / 10) * 100).toFixed(0) + ''}
              index={i}
            />
          </a>
        ))}
      </div>

      <div className="mt-5 flex w-full content-center items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>
            {[...Array(Math.min(5, Math.ceil(totalPages / pageLimit)))].map((_, i) => {
              const index = startPage + i;
              return (
                <PaginationItem key={index}>
                  <PaginationLink href="#" isActive={page === index} onClick={() => handlePageChange(index)}>
                    {index}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="border-0 border-none bg-transparent p-2 shadow-none">
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

export default ListPage;
