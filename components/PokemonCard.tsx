'use client';

import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import { PokemonSpecies } from '@/types/pokemon';
import { formatPokemonId, capitalizeFirstLetter, getTypeColor } from '@/lib/utils';
import { Heart, Leaf, Bug, Flame, Waves, Wind, Earth, Angry, Snowflake, Ghost, CloudLightning } from 'lucide-react';
import { createElement, useRef } from 'react';
import { useScroll, motion } from 'framer-motion';

interface PokemonCardProps {
  pokemon: PokemonSpecies;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

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

export function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }: PokemonCardProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    })

  return (
    <Card
        ref={ref}
        isPressable
        onPress={onClick}
        className="relative p-6 bg-[#FFFFFF] rounded-md hover:scale-105 transition-transform cursor-pointer shadow-[0px_16px_21px_-5px_rgba(163,171,254,0.25)] w-[250px] h-[300px]"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${pokemon.name}`}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
            }
        }}
    >
        <motion.div style={{ pathLength: scrollYProgress }}>
            <CardBody>
                {/* Favorite Toggle Button */}
                <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(pokemon.id);
                    }}
                    className="absolute top-3 right-3 z-10"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onToggleFavorite(pokemon.id);
                        }
                    }}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        aria-hidden="true"
                    />
                </div>

                {/* Pokémon Image */}
                <div className="flex flex-col items-center">
                    <div className="relative w-[152px] h-[152px] mb-2 bg-gradient-to-b from-blue-50 to-transparent rounded-xl">
                        <Image
                            src={pokemon.imageUrl || '/pokemon.webp'}
                            alt={`${pokemon.name} image`}
                            className="object-contain"
                            width={152}
                            height={152}
                            style={{
                                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))'
                            }}
                        />
                    </div>

                    {/* Pokémon Info */}
                    <div className="w-full h-[72px] flex items-center flex-col justify-between">
                        <h3 className="text-xl font-semibold mb-2 text-[grey]">
                            {capitalizeFirstLetter(pokemon.name)}
                        </h3>

                        {/* Types */}
                        <div className="flex w-full gap-2 flex-wrap justify-center" aria-label="Pokémon types">
                            {pokemon.types.map((type) => (
                                <div
                                    key={type?.name}
                                    className={`flex items-center justify-between gap-1 px-2 py-1 border border-[${getTypeColor(type?.name)}] rounded-full`}
                                    aria-label={`Type: ${capitalizeFirstLetter(type?.name)}`}
                                >
                                    {icons[type?.name as keyof typeof icons]
                                    ? createElement(icons[type?.name as keyof typeof icons], {
                                        className: 'w-4 h-4',
                                        color: getTypeColor(type?.name),
                                        'aria-hidden': true
                                        })
                                    : null}
                                    <p style={{ fontSize: '12px', color: getTypeColor(type?.name) }}>
                                    {capitalizeFirstLetter(type?.name)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <span className="text-sm text-gray-500 mb-1" aria-label={`Pokémon ID: ${formatPokemonId(pokemon.id)}`}>
                            {formatPokemonId(pokemon.id)}
                        </span>
                    </div>
                </div>
            </CardBody>
        </motion.div>
    </Card>
  );
}