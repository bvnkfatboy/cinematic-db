import React, { ReactNode } from 'react';
import { Suspense } from 'react';

import Navbar from './navbar';

interface Props {
  children?: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <div className="container mx-auto px-4 py-12 md:px-6">{children}</div>
      </Suspense>
    </>
  );
}

export default MainLayout;
