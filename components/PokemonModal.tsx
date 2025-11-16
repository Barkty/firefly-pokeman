/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Chip, Spinner } from '@heroui/react';
import Image from 'next/image';
import { createElement, useEffect, useState } from 'react';
import { Leaf, Bug, Flame, Waves, Wind, Earth, Angry, Snowflake, Ghost, CloudLightning, HeartPulseIcon, ShoppingBag } from 'lucide-react';
import { Pokemon, PokemonSpecies } from '@/types/pokemon';
import { _notifyError, capitalizeFirstLetter, getTypeColor } from '@/lib/utils';
import { clientApi } from '@/lib/client-api';

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
}

export function PokemonModal({ pokemon }: PokemonModalProps) {
  const tabs = [
    { id: 'about', label: 'About', icon: null },
    { id: 'stats', label: 'Stats', icon: <HeartPulseIcon /> },
    { id: 'evolution', label: 'Evolution', icon: null },
  ];
  const [pokemonDetails, setPokemonDetails] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(false);
  const [chip, setChip] = useState<'about' | 'stats' | 'evolution'>('about');

  const fetchEvolutionChain = async () => {
    if (!pokemon) return;
    
    setLoading(true);
    try {
        const species: PokemonSpecies = await clientApi.getPokemon(pokemon.name);
        setPokemonDetails(species);
    } catch (error: any) {
        _notifyError(`Failed to fetch evolution chain: ${error.response?.data?.error || error.message}`);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (pokemon) {
      fetchEvolutionChain();
    }
  }, [pokemon]);

  const icons = {
    "water": Waves,
    "grass": Leaf,
    "bug": Bug,
    "fire": Flame,
    "flying": Wind,
    "ground": Earth,
    "fighting": Angry,
    "ice": Snowflake,
    "ghost": Ghost,
    "electric": CloudLightning,
    "dragon": Flame,
    // Add more type-icon mappings as needed
  };
  const chipColors = ["primary", "secondary", "success", "warning", "danger", "info"];

  if (!pokemonDetails || !pokemon) return null;
  console.log('Pokemon Details:', pokemonDetails);
  return (
    <div className='bg-[#FFFEFE] absolute top-4 right-4 p-6 h-full rounded-lg w-full max-w-md'>
      <div className="pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-[152px] h-[152px] mb-2 bg-gradient-to-b from-blue-50 to-transparent rounded-xl">
              <Image
                  src={pokemonDetails?.imageUrl as string}
                  alt={pokemonDetails?.name as string}
                  className="object-contain"
                  width={182}
                  height={182}
                  style={{
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))'
                  }}
              />
          </div>

          <div className='w-full h-[72px] flex items-center flex-col justify-between'>
            <h3 className="text-xl font-semibold mb-2 text-[grey]">
              {capitalizeFirstLetter(pokemonDetails?.name as string)}
            </h3>

            <div className="flex w-full gap-2 flex-wrap justify-center">
              {pokemon.types.map((type) => (
                <div key={type} className={`flex items-center justify-between gap-1 px-2 py-1 border border-[${getTypeColor(type)}] rounded-full`}>
                  {icons[type as keyof typeof icons] ? createElement(icons[type as keyof typeof icons], { className: "w-4 h-4", color: getTypeColor(type) }) : null }
                  <p style={{ fontSize: "12px", color: getTypeColor(type) }}>{capitalizeFirstLetter(type)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-1 justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setChip(tab.id as 'about' | 'stats' | 'evolution')}
              className={`flex items-center gap-2 px-2 py-2 rounded-full font-normal transition-all ${
                chip === tab.id
                  ? 'bg-white text-blue-600 border-2 border-blue-600 shadow-sm'
                  : 'bg-gray-200 text-gray-600 border-2 border-transparent hover:bg-gray-300'
              }`}
            >
              <span className="text-md">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        {chip === 'about' && (
          <div>
            {/* <div className='space-y-6'>
              <p className="text-gray-600 font-semibold text-md">Story</p>

            </div> */}
            {/* <div className='space-y-6'>
              <p className="text-gray-600 font-semibold text-md">Weakness</p>
              <div className='w-full flex justify-evenly items-center mb-6'>
                <Chip
                  size='md'
                  variant="solid"
                  color={chip !== "about" ? "warning" : "default"}
                  onClick={() => setChip("about")}
                  classNames={{
                    base: "bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                    content: "drop-shadow-xs shadow-black text-white",
                  }}
                >
                  About
                </Chip>
              </div>
            </div> */}
            <div className='space-y-6 flex'>
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <ShoppingBag size={20} />
                  <p className="text-gray-600 font-semibold text-md">Weight</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Physical Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Height</p>
                <p className="text-lg font-semibold">{pokemon?.height ? pokemon?.height / 10 : 0} m</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-lg font-semibold">{pokemon?.weight ? pokemon.weight / 10 : 0} kg</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemonDetails?.abilities.map((ability) => (
                <Chip
                  key={ability.name}
                  variant="flat"
                  color={ability.is_hidden ? "warning" : "default"}
                >
                  {capitalizeFirstLetter(ability.name.replace('-', ' '))}
                  {ability.is_hidden && ' (Hidden)'}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Evolution Chain</h3>
            {loading ? (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            ) : (pokemonDetails?.evolution_chain && pokemonDetails.evolution_chain.length > 0) ? (
              <div className="flex items-center gap-2 flex-wrap">
                {pokemonDetails?.evolution_chain.map(({ name }, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Chip variant="flat" color="primary">
                      {name}
                    </Chip>
                    {index < pokemonDetails?.evolution_chain.length - 1 && (
                      <span className="text-gray-400">→</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No evolution data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}