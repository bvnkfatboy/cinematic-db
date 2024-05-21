'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import CarouselCard from '@/components/carousel_card';
import CarouselPoster from '@/components/carousel_poster';
import MainLayout from '@/components/layout/main';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { fade } from '@/lib/config';

export default function Home() {
  return (
    <MainLayout>
      <div>
        <CarouselPoster />
      </div>
      <Tabs defaultValue="day">
        <div className="flex flex-row">
          <h1 className="mb-8 text-4xl font-bold">Trending</h1>
          <TabsList className="ml-5 grid w-full max-w-[300px] grid-cols-2 rounded-full">
            <TabsTrigger value="day" className="rounded-full">
              วันนี้
            </TabsTrigger>
            <TabsTrigger value="week" className="rounded-full">
              สัปดาห์นี้
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="day">
          <motion.div {...fade}>
            <CarouselCard category="Trending" param="day" />
          </motion.div>
        </TabsContent>
        <TabsContent value="week">
          <motion.div {...fade}>
            <CarouselCard category="Trending" param="week" />
          </motion.div>
        </TabsContent>
      </Tabs>

      <Tabs defaultValue="tv">
        <div className="flex flex-row">
          <h1 className="mb-8 text-4xl font-bold">What's Popular</h1>
          <TabsList className="ml-5 grid w-full max-w-[300px] grid-cols-2 rounded-full">
            <TabsTrigger value="tv" className="rounded-full">
              ในทีวี
            </TabsTrigger>
            <TabsTrigger value="movie" className="rounded-full">
              ในโรงภาพยนตร์
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tv">
          <motion.div {...fade}>
            <CarouselCard category="Popular" param="tv" />
          </motion.div>
        </TabsContent>
        <TabsContent value="movie">
          <motion.div {...fade}>
            <CarouselCard category="Popular" param="movie" />
          </motion.div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
