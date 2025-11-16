import { axiosInstance } from './axios';
import { 
  PokemonListResponse, 
  PokemonSpecies, 
  EvolutionChain 
} from '@/types/pokemon';

export const api = {
  // Get Pokemon list
  async getPokemonList(limit: number = 150, offset: number = 0): Promise<PokemonListResponse> {
    try {
      const { data } = await axiosInstance.get<PokemonListResponse>('/pokemons', {
        params: { limit, offset },
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch Pokemon list');
    }
  },

  // Get Pokemon details
  async getPokemon(nameOrId: string | number): Promise<PokemonSpecies> {
    try {
      const { data } = await axiosInstance.get<PokemonSpecies>(`/pokemons/${nameOrId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch Pokemon details');
    }
  },

  // Favorites
  async getFavorites(): Promise<{ favorites: number[] }> {
    try {
      const { data } = await axiosInstance.get<{ favorites: number[] }>('/favorites');
      return data;
    } catch (error) {
      throw new Error('Failed to fetch favorites');
    }
  },

  async addFavorite(pokemonId: number): Promise<{ favorites: number[] }> {
    try {
      const { data } = await axiosInstance.post<{ favorites: number[] }>('/favorites', {
        pokemonId,
      });
      return data;
    } catch (error) {
      throw new Error('Failed to add favorite');
    }
  },

  async removeFavorite(pokemonId: number): Promise<{ favorites: number[] }> {
    try {
      const { data } = await axiosInstance.delete<{ favorites: number[] }>(`/favorites/${pokemonId}`);
      return data;
    } catch (error) {
      throw new Error('Failed to remove favorite');
    }
  },
};