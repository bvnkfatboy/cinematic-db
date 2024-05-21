import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  quality?: number;
}

export default function DrawImages({ src, alt, width, height, className, style, quality }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt || ''}
      width={width || 100}
      height={height || 100}
      className={className}
      style={style}
      quality={quality}
      loading="lazy"
      layout="responsive"
    />
  );
}
