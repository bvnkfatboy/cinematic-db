'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import DrawCards from '@/components/shares/card';
import Detail from '@/components/shares/detail';
import { SkeletonCard } from '@/components/skeleton/card';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
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
import { fetchMovie, fetchSearch } from '@/utils/action';

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
  const [inputValue, setInputValue] = useState('');
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

  const searchHandle = useCallback(
    async (searchValue: string) => {
      setLoading(true);
      let data;
      if (type === 'tv') {
        data = await fetchSearch('tv', searchValue);
      } else if (type === 'movie') {
        data = await fetchSearch('movie', searchValue);
      }
      setMovies(data.results);
      setLoading(false);
    },
    [type],
  );

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const timer = setTimeout(async () => {
      await searchHandle(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

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
      <div className="flex justify-center">
        <div className="relative w-full max-w-[500px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <Input
            className="block w-full rounded-lg bg-[#f5f5f5] p-4 pl-10  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Search..."
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
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
