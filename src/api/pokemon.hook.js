import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { pokemonApi } from "./pokemon.gateway";

export function useGetPokemonList(limit = 1500) {
  return useInfiniteQuery({
    queryKey: ["pkmList", limit],
    queryFn: ({ pageParam }) => pokemonApi.getList({ limit, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.next) return undefined;
      return lastPageParam + limit;
    },
  });
}

export function useGetPokemonDetails(id) {
  return useQuery({
    enabled: !!id,
    queryKey: ["pkmDetails", id],
    queryFn: () => pokemonApi.getPokemonDetails(id),
  });
}
