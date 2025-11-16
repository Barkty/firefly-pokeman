import { PokemonListResponse } from "@/types/pokemon";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      pokemons: [],
      favourites: [],
      setPokemons: (pokemon: PokemonListResponse) => set({ pokemons: pokemon.data }),
      setFavourites: (pokemon: PokemonListResponse) => set({ favourites: pokemon.data }),
    }),
    {
      name: "firefly-storage", // unique name
      storage: createJSONStorage(() => {
        // Return a safe storage implementation
        if (typeof window === 'undefined') {
          // Return a no-op storage for server-side
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      partialize: (state: any) => ({ 
        pokemons: state.pokemons, // Only persist the pokemons data
      }),
    }
  )
);

export default useStore;