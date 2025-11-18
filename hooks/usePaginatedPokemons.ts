"use client";

import { useState, useCallback, useRef } from "react";
import { clientApi } from "@/lib/client-api";

export function usePaginatedPokemons() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);
  const searchingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadPage = useCallback(async () => {
    if (!hasMore || loading || loadingRef.current) return [];

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await clientApi.getPokemonList(20, page);
      const list = res.data;

      if (list.length === 0) setHasMore(false);

      setPage(prev => prev + 1);

      return list;
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page, loading, hasMore]);

  const searchPokemon = useCallback(async (searchName: string) => {
    // Cancel previous search if still in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Prevent duplicate searches
    if (searchingRef.current) {
      return [];
    }

    searchingRef.current = true;
    setLoading(true);
    
    try {
      // Search for specific Pokemon by name
      const pokemon = await clientApi.getPokemonList(20, page, searchName);
      return pokemon.data;
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
      searchingRef.current = false;
    }
  }, [page]);

  const reset = useCallback(() => {
    setPage(0);
    setHasMore(true);
    loadingRef.current = false;
    searchingRef.current = false;
  }, []);

  return {
    loadPage,
    searchPokemon,
    reset,
    hasMore,
    loading,
  };
}
