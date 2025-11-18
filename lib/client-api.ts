/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { 
  PokemonListResponse, 
  PokemonSpecies, 
} from '@/types/pokemon';
import { IFavourite } from '@/types/favourite';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const clientApi = {
  // Get Pokemon list
  async getPokemonList(limit: number = 10, offset: number = 0, name?: string): Promise<PokemonListResponse> {
    const { data } = await apiClient.get<PokemonListResponse>('/pokemons', {
      params: { limit, offset, name },
    });
    return data;
  },

  // Get Pokemon details
  async getPokemon(nameOrId: string): Promise<PokemonSpecies> {
    const { data } = await apiClient.get(`/pokemons/${nameOrId}`);
    return data?.data;
  },

  // Get Pokemon species
  async getPokemonTypes(type: string, ability?: string): Promise<PokemonSpecies> {
    const { data } = await apiClient.get<PokemonSpecies>(`/pokemons/type`, {
      params: { type, ability },
    });
    return data;
  },

  // Favorites
  async getFavorites(): Promise<{ data: IFavourite[] }> {
    const { data } = await apiClient.get<{ data: IFavourite[] }>('/favourites');
    return data;
  },

  async addFavorite(pokemonId: IFavourite): Promise<IFavourite> {
    try {
      const { data } = await apiClient.post<IFavourite>('/favourites', pokemonId);
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  async removeFavorite(pokemonId: string): Promise<void> {
    try {
      const { data } = await apiClient.delete(`/favourites/${pokemonId}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  },
};