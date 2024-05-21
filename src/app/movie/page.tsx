import React from 'react';

import MainLayout from '@/components/layout/main';
import ListPage from '@/components/list_page';

function MoviePage() {
  return (
    <>
      <MainLayout>
        <ListPage type="movie" />
      </MainLayout>
    </>
  );
}

export default MoviePage;
