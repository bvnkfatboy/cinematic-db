import React from 'react';

import MainLayout from '@/components/layout/main';
import ListPage from '@/components/list_page';

function TvPage() {
  return (
    <>
      <MainLayout>
        <ListPage type="tv" />
      </MainLayout>
    </>
  );
}

export default TvPage;
