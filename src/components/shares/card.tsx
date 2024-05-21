import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import React from 'react';

import DrawImages from '@/utils/image/client';

interface CardProps {
  src: string;
  title: string;
  date: string;
  votes: string;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export default function DrawCards({ src, title, date, votes, index }: CardProps) {
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1, duration: 0.3, ease: 'easeInOut' }}
        viewport={{ amount: 0.5 }}
      >
        <div className="mx-auto h-[331px] w-[150px] overflow-hidden">
          <div className="relative h-48">
            <DrawImages
              alt={title}
              className="h-[225px] w-full rounded-lg object-cover"
              height={225}
              src={src}
              style={{
                aspectRatio: '150/225',
                objectFit: 'cover',
              }}
              width={150}
              quality={75}
            />
            <div className="absolute right-2 top-2 rounded-full bg-gray-900 p-2 text-xs font-medium text-gray-50 dark:bg-gray-50 dark:text-gray-900">
              {votes}%
            </div>
          </div>

          <div className="pt-[40px]">
            <h2 className="text-md mb-2 max-h-[48px] overflow-hidden text-ellipsis font-semibold">{title}</h2>
            <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              {date ? <CalendarDays className="mr-1 h-4 w-4" /> : null}
              <span>{date}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
