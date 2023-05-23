import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function usePagination(defaultPage: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(() => {
    const pageNumFromUrl = parseInt(searchParams.get('page') ?? '');
    return Number.isNaN(pageNumFromUrl) ? defaultPage : pageNumFromUrl;
  });

  // Update Browser URL with page Params on Page Change
  useEffect(() => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  function onNext(totalPages: number) {
    setPage((prev) => {
      const next = prev + 1;
      if (next >= totalPages - 1) {
        return totalPages - 1;
      }
      return next;
    });
  }

  function onPrev() {
    setPage((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return 0;
      }
      return next;
    });
  }

  function onPageSelect(newPage: number) {
    setPage(newPage);
  }

  return { page, onNext, onPrev, onPageSelect };
}
