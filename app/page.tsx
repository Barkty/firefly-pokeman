/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import Image from "next/image";
import { Funnel, ScanSearch, X } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePaginatedPokemons } from "@/hooks/usePaginatedPokemons";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonModal } from "@/components/PokemonModal";
import { PokemonSkeleton } from "@/components/Skeleton";
import { FilterCard } from "@/components/FilterCard";
import { Loader } from "@/components/PageLoader";
import useStore from "@/hooks/useStore";
import { clientApi } from "@/lib/client-api";
import { _notifyError, _notifySuccess } from "@/lib/utils";
import { IFavourite } from "@/types/favourite";
import { PokemonSpecies } from "@/types/pokemon";
import { useDebounce } from "@/hooks/useDebounce";
import ModalComponent from "@/components/Modal";
import { useWidthResize } from "@/hooks/useWidth";

const EndContent = ({ 
  hasValue, 
  onClear,
  isSearching,
}: { 
  hasValue: boolean; 
  onClear: () => void;
  isSearching: boolean;
}) => (
  <div className='flex items-center gap-2'>
    {isSearching && (
      <div className="animate-spin">
        <Spinner size="sm" className="text-red-500" />
      </div>
    )}
    {hasValue && (
      <button
        onClick={onClear}
        className="w-[25px] h-[25px] flex items-center justify-center hover:bg-red-50 hover:scale-110 rounded-md transition-all duration-200 ease-out"
        aria-label="Clear search"
      >
        <X size={15} className="text-gray-500" />
      </button>
    )}
    <div className='w-[30px] h-[30px] flex items-center justify-center bg-[red] rounded-md hover:bg-[#ff4d4d] transition-all duration-200 hover:scale-105'>
      <ScanSearch size={15} className="text-white" />
    </div>
  </div>
);

export default function Home() {
  const { 
    pokemons, 
    setPokemons, 
    favourites, 
    setFavourites, 
    pokemon: cachedPokemons, 
    setPokemon 
  } = useStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonSpecies | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [searchResults, setSearchResults] = useState<PokemonSpecies[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { modals, setOpenModal } = useStore((state) => state);
  const isOpen = modals["pokemonDetailModal"] || false;

  const { width } = useWidthResize();
  const mountedRef = useRef(true);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { loadPage, searchPokemon, hasMore, loading } = usePaginatedPokemons();

  const appendNextPage = async () => {
    try {
      const list = await loadPage();
      if (list.length > 0) {
        setPokemons({ data: [...pokemons, ...list] });
      }
    } catch (e: any) {
      _notifyError(e?.response.data.message)
    }
  };

  // Load initial data once
  useEffect(() => {
    const initializeData = async () => {
      if (pokemons?.length === 0) {
        await appendNextPage();
      }
      
      if (favourites?.length === 0) {
        const fav = await clientApi.getFavorites();
        setFavourites(fav.data || []);
      }
      
      // Delay to show initial animations
      setTimeout(() => setIsInitialLoad(false), 100);
    };

    initializeData();
  }, []);

  // Handle search with API fallback
  useEffect(() => {
    const handleSearch = async () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (!debouncedSearchQuery) {
        setSearchResults([]);
        return;
      }

      const localResults = pokemons.filter((x: PokemonSpecies) =>
        x.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );

      if (localResults.length > 0) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const apiResults = await searchPokemon(debouncedSearchQuery);
        if (!mountedRef.current) return;

        setSearchResults(apiResults as any[]);
        
        if (apiResults.length > 0) {
          const newPokemons = apiResults.filter(
            (newPoke) => !pokemons.some((existing: PokemonSpecies) => existing.name === newPoke.name)
          );
          if (newPokemons.length > 0) {
            setPokemons({ data: [...pokemons, ...newPokemons] });
          }
        }
      } catch (error) {
        if (mountedRef.current) {
          console.error("Search error:", error);
        }
      } finally {
        if (mountedRef.current) {
          setIsSearching(false);
        }
      }
    };

    handleSearch();
  }, [debouncedSearchQuery, pokemons, searchPokemon, setPokemons]);

  const filteredPokemon = useMemo(() => {
    let result: PokemonSpecies[] = pokemons;

    if (debouncedSearchQuery) {
      result = result.filter((x) =>
        x.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );

      if (result.length === 0 && searchResults.length > 0) {
        result = searchResults;
      }
    }

    if (showFavoritesOnly) {
      result = result.filter((x) =>
        favourites.some((f: IFavourite) => f.name === x.name)
      );
    }

    return result;
  }, [pokemons, debouncedSearchQuery, showFavoritesOnly, favourites, searchResults]);

  const loaderRef = useInfiniteScroll(() => appendNextPage());

  const handleToggleFavorite = async (fav: IFavourite) => {
    const exists = favourites.some((f: IFavourite) => f.name === fav.name);
    try {

      if (exists) {
        await clientApi.removeFavorite(fav.name);
        const updated = favourites.filter((x: IFavourite) => x.name !== fav.name);
        setFavourites(updated);
      } else {
        await clientApi.addFavorite(fav);
        const updated = [...favourites, fav];
        setFavourites(updated);
      }

      _notifySuccess("Favourites updated!");
    } catch (e) {
      _notifyError(`${exists ? 'Remove' : 'Add'} favourite failed`);
    }
  };

  const handlePokemonClick = async (pokemon: PokemonSpecies) => {
    if (width < 768)
      setOpenModal("pokemonDetailModal", true);
    
    const cached = cachedPokemons[pokemon.name];
    
    if (cached) {
      setSelectedPokemon(cached);
      return;
    }
    
    setLoadingPokemon(true);
    setSelectedPokemon(pokemon);
    
    try {
      const detailedPokemon = await clientApi.getPokemon(pokemon.name);
      
      setPokemon(detailedPokemon);
      setSelectedPokemon(detailedPokemon);
    } catch (error) {
      _notifyError("Fetch Pokemon details failed");
    } finally {
      setLoadingPokemon(false);
    }
  };

  if (loading && pokemons.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader extraClass="w-full bg-[red] h-[100vh]" />
      </div>
    );
  }

  return (
    <main className={`min-h-[100vh] bg-[#F6F8FC] flex items-start ${isOpen ? 'p-1 sm:p-1 md:p-3 justify-evenly' : 'p-1 sm:p-1 md:p-3 lg:p-8 justify-between'} transition-all duration-300`}>
      <div className={`sm:w-[90%] ${isOpen ? 'lg:max-w-2/3 justify-start -px-3 items-start' : 'lg:max-w-6xl justify-center px-8 items-center'} mx-auto mt-6 flex flex-col transition-all duration-300`}>
        
        {/* Header - Fade in from top */}
        <div className={`sm:m-3 md:m-8 transition-all duration-700 ${isInitialLoad ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <Image 
            src={'/logo.svg'} 
            alt='Pokemon' 
            width={200} 
            height={200}
            className="hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Search Card - Fade in and slide up */}
        <div className={`mb-6 w-full transition-all duration-700 delay-100 ${isInitialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardBody className="sm:p-1 md:p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Box with focus animation */}
                <div className='flex rounded-md justify-between items-center h-[65px] w-full px-3 shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)] transition-all duration-300 focus-within:shadow-[0px_16px_24px_-3px_rgba(163,171,254,0.35)] focus-within:scale-[1.01]'>
                  <input
                    placeholder="Search Pokémon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex outline-none h-full w-full placeholder:[#AAAAAA] text-gray-700 text-md font-normal"
                  />
                  <EndContent 
                    isSearching={isSearching} 
                    hasValue={searchQuery.length > 0} 
                    onClear={() => setSearchQuery('')} 
                  />
                </div>

                {/* Favorites Button with pulse effect when active */}
                <div className="flex gap-2">
                  <Button
                    variant={showFavoritesOnly ? "solid" : "bordered"}
                    onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    startContent={<Funnel className="w-4 h-4" />}
                    size="lg"
                    className={`flex gap-2 bg-[red] border-[red] hover:bg-[#ff4d4d] hover:border-[#ff4d4d] text-white w-[150px] h-[65px] rounded-md justify-center items-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${showFavoritesOnly ? 'animate-pulse' : ''}`}
                  >
                    Favorites
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Filter Card - Fade in */}
        <div className={`w-full transition-all duration-700 delay-200 ${isInitialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <FilterCard />
        </div>

        {/* Search results indicator */}
        {debouncedSearchQuery && (
          <div className="mb-4 text-sm text-gray-600 animate-fade-in">
            {isSearching ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" />
                Search for ...
              </span>
            ) : (
              <span>
                Found {filteredPokemon.length} Pokémon matching &quot;{debouncedSearchQuery}&quot;
              </span>
            )}
          </div>
        )}

        {/* Pokémon Grid - Stagger animation */}
        <div className={`grid sm:grid-cols-1 ${isOpen ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-x-scroll' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-4 w-full`}>
          {filteredPokemon.map((pk, index) => (
            <div
              key={`${pk.name}_${index}`}
              className={`transition-all duration-500 ${isInitialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
              style={{ 
                transitionDelay: `${Math.min(index * 50, 1000)}ms`,
              }}
            >
              <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                <PokemonCard
                  pokemon={pk}
                  isFavorite={favourites.some((f: IFavourite) => f.name === pk.name)}
                  onToggleFavorite={() =>
                    handleToggleFavorite({
                      name: pk.name,
                      imageUrl: pk.imageUrl,
                    })
                  }
                  onClick={() => handlePokemonClick(pk)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Infinite scroll loader */}
        {hasMore && <div ref={loaderRef} className="h-10"/> }
        {(hasMore || loading) && (
          <div className={`grid sm:grid-cols-1 ${isOpen ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-x-scroll' : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'} gap-4 w-full mt-4`}>
            {[...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className="animate-pulse-slow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PokemonSkeleton />
              </div>
            ))}
          </div>
        )}

        {/* No results - Fade in */}
        {filteredPokemon.length === 0 && !loading && !isSearching && (
          <div className="w-full animate-fade-in">
            <Card>
              <CardBody className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-6xl animate-bounce">🔍</div>
                  <p className="text-gray-600">
                    {debouncedSearchQuery 
                      ? `No Pokémon found matching "${debouncedSearchQuery}"`
                      : showFavoritesOnly
                      ? "No favorites yet. Start adding some!"
                      : "No Pokémon found."
                    }
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {/* Modal with slide-in animation */}
      {(isOpen && selectedPokemon && width < 768) && (
        <div className="animate-slide-in-right">
          <ModalComponent modalId={"pokemonDetailModal"}>
            <div className='w-full min-h-[70vh] max-h-[90vh] overflow-y-auto rounded-lg mt-40 shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]'>
              <PokemonModal
                pokemon={selectedPokemon}
                isOpen={isOpen}
                onClose={() => {
                  setOpenModal("pokemonDetailModal", false);
                  setSelectedPokemon(null);
                }}
                isLoading={loadingPokemon}
              />
            </div>
          </ModalComponent>
        </div>
      )}

      {/* Modal with slide-in animation */}
      {isOpen && selectedPokemon && (
        // <div className="animate-slide-in-right">
          <div className='w-[400px] h-screen sticky top-0 right-0 rounded-lg mt-40 shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)] animate-slide-in-right'>
            <PokemonModal
              pokemon={selectedPokemon}
              isOpen={isOpen}
              onClose={() => {
                setOpenModal("pokemonDetailModal", false);
                setSelectedPokemon(null);
              }}
              isLoading={loadingPokemon}
            />
          </div>
        // </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}