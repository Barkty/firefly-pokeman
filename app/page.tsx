'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { ScanSearch, Funnel } from 'lucide-react';
import { PokemonCard } from '@/components/PokemonCard';
import { PokemonModal } from '@/components/PokemonModal';
import { Pokemon } from '@/types/pokemon';
import { clientApi } from '@/lib/client-api';
import { IFavourite } from '@/types/favourite';
import Image from 'next/image';
import { FilterCard } from '@/components/FilterCard';
import { _notifyError, _notifySuccess } from '@/lib/utils';
import { PokemonSkeleton } from '@/components/Skeleton';
import useStore from '@/hooks/useStore';
import { Loader } from '@/components/PageLoader';

export default function Home() {
  const [isOpen, setModalOpen] = useState(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<IFavourite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { setPokemons, pokemons, favourites, setFavourites } = useStore(store => store);

  useEffect(() => {
    if (pokemons?.length > 0 || favorites?.length > 0) {
      setPokemonList(pokemons);
      if (favourites.length > 0) {
        setFavorites(favourites);
      }
      setLoading(false);
      return;
    }
    loadInitialData();
  }, [pokemons, favourites]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Load Pokemon list
      const listData = await clientApi.getPokemonList(150);
      setPokemonList(listData.data);
      setPokemons(listData.data);

      // Load favorites
      const favoritesData = await clientApi.getFavorites();
      setFavorites(favoritesData.data || []);
      setFavourites(favoritesData.data || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      _notifyError(`Failed to load pokemons: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (fav: IFavourite) => {
    const favorite = favorites.find(fk => fk.name === fav.name);
    
    try {
      if (favorite) {
        await clientApi.removeFavorite(favorite.name as string);
        setFavorites(favorites.filter(fk => fk.name !== fav.name));
      } else {
        await clientApi.addFavorite(fav);
        setFavorites([...favorites, fav]);
      }
      _notifySuccess(`Favourites updated successfully!`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      _notifyError(`Failed to update favourites: ${error.response.data.error}.`);
    }
  };

  const filteredPokemon = useMemo(() => {
    let filtered = pokemonList;
  
    if (searchQuery) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(pokemon => favorites.some(fk => fk.name === pokemon.name));
    }

    return filtered;
  }, [pokemonList, searchQuery, showFavoritesOnly, favorites]);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
        {/* <PageLoader /> */}
      </div>
    );
  }

  const EndContent = () => (
    <div className='w-[30px] h-[30px] flex items-center justify-center bg-[red] rounded-md'>
      <ScanSearch size={15}/>
    </div>
  )

  return (
    <main className={`min-h-[100vh] bg-[#F6F8FC] flex items-start ${isOpen ? 'p-3 md:p-3 justify-evenly' : 'p-8 md:p-8 justify-between'}`}>
      <div className={`${isOpen ? 'max-w-2/3 justify-start -px-3 items-start' : 'max-w-6xl justify-center px-8 items-center'} mx-auto mt-6 flex flex-col`}>
        {/* Header */}
        <div className="m-8">
          <Image src={'/logo.svg'} alt='Pokemon' width={200} height={200} />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 w-full">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className='flex rounded-md justify-between items-center h-[65px] w-full px-3 shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]'>
                <input
                  placeholder="Search Pokémon by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex outline-none h-full w-full placeholder:[#AAAAAA] text-gray-700 text-md font-normal"
                />
                <EndContent/>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={showFavoritesOnly ? "solid" : "bordered"}
                  onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  startContent={<Funnel className="w-4 h-4" />}
                  size="lg"
                  className='flex gap-2 bg-[red] border-[red] hover:bg-[#ff4d4d] hover:border-[#ff4d4d] text-white w-[150px] h-[65px] rounded-md justify-center items-center'
                >
                  Favorites
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Results Count */}
        <FilterCard />
        {(filteredPokemon.length === 0 || loading) && (
          <div className={`grid grid-cols-2 ${isOpen ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-x-scroll' : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'} gap-4`}>
            {[...Array(8)].map((_, index) => (
              <PokemonSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Pokemon Grid */}
        {filteredPokemon.length > 0 ? (
          <div className={`grid grid-cols-2 ${isOpen ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-x-scroll' : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'} gap-4`}>
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                isFavorite={favorites.some(fk => fk.name === pokemon.name)}
                onToggleFavorite={() => handleToggleFavorite({ name: pokemon.name, imageUrl: pokemon.imageUrl })}
                onClick={() => handlePokemonClick(pokemon)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No Pokémon found matching your search.
              </p>
            </CardBody>
          </Card>
        )}
      </div>
      {isOpen && (
        // <div className='w-[400px] max-h-screen'>
          <div className='w-[400px] h-screen sticky top-0 right-0 rounded-lg mt-40 shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)]'>
            <PokemonModal pokemon={selectedPokemon} isOpen={isOpen} onClose={() => setModalOpen(!isOpen)} />
          </div>
        // </div>
      )}
    </main>
  );
}