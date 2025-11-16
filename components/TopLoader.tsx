"use client";

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loader = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadingBarRef = useRef<any>(null);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching || isMutating) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }

    return () => loadingBarRef.current?.complete();
  }, [isFetching, isMutating]);

  return <LoadingBar ref={loadingBarRef} height={3} color="#0052D5" />;
};

export default Loader;
