/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFavourite } from "@/types/favourite";
import { PokemonListResponse, PokemonSpecies } from "@/types/pokemon";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      pokemons: [],
      pokemon: {},
      favourites: [],
      modals: {},
      openModal: false,
      setPokemons: (pokemon: PokemonListResponse) => set({ pokemons: pokemon.data }),
      setPokemon: (pokemon: PokemonSpecies) => 
      set((state: any) => ({ 
        pokemon: { 
          ...state.pokemon, 
          [pokemon.name]: pokemon 
        } 
      })),
      setOpenModal: (modalId: string, value: boolean) =>
        set((state: any) => ({
          modals: { ...state.modals, [modalId]: value },
        })),
      setFavourites: (pokemon: IFavourite[]) => set({ favourites: pokemon }),
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
      partialize: (state: any) => ({ 
        pokemons: state.pokemons, // Only persist the pokemons data
      }),
    }
  )
);

export default useStore;