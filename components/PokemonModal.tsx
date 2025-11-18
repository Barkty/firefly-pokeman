'use client';

import { Chip } from '@heroui/react';
import Image from 'next/image';
import { createElement, useState } from 'react';
import { Leaf, Bug, Flame, Waves, Wind, Earth, Angry, Snowflake, Ghost, CloudLightning, HeartPulseIcon, ShoppingBag, X } from 'lucide-react';
import { PokemonSpecies } from '@/types/pokemon';
import { capitalizeFirstLetter, getTypeColor } from '@/lib/utils';

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonSpecies | null;
  isLoading: boolean;
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const tabs = [
    { id: 'about', label: 'About', icon: null },
    { id: 'stats', label: 'Stats', icon: <HeartPulseIcon /> },
    { id: 'evolution', label: 'Evolution', icon: null },
  ];

  const [chip, setChip] = useState<'about' | 'stats' | 'evolution'>('about');

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chipColors = ["primary", "secondary", "success", "warning", "danger", "info"];

  if (!pokemon) return null;
  const pokemonDetails = pokemon as PokemonSpecies;

  return (
    <div className='bg-[#FFFEFE] absolute top-4 right-4 p-6 h-full rounded-lg w-full max-w-md'>
      <X size={15} onClick={onClose}/>
      <div className="pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-[152px] h-[152px] mb-2 bg-gradient-to-b from-blue-50 to-transparent rounded-xl">
              <Image
                src={pokemon?.imageUrl as string}
                alt={pokemon?.name as string}
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
              {capitalizeFirstLetter(pokemon?.name as string)}
            </h3>

            <div className="flex w-full gap-2 flex-wrap justify-center">
              {pokemon.types.map((type) => (
                <div key={type?.name} className={`flex items-center justify-between gap-1 px-2 py-1 border border-[${getTypeColor(type?.name)}] rounded-full`}>
                  {icons[type?.name as keyof typeof icons] ? createElement(icons[type?.name as keyof typeof icons], { className: "w-4 h-4", color: getTypeColor(type?.name) }) : null }
                  <p style={{ fontSize: "12px", color: getTypeColor(type?.name) }}>{capitalizeFirstLetter(type?.name)}</p>
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
              className={`flex items-center gap-2 px-2 py-2 rounded-full font-normal cursor-pointer transition-all ${
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
            {(pokemonDetails?.evolution_chain && pokemonDetails.evolution_chain.length > 0) ? (
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