import { useState, useRef, useEffect, useMemo } from "react";
import { useGetPokemonDetails, useGetPokemonList } from "../../api";
import { PokemonPreview, SelectedPokemon } from "./team-builder.content";
import { capitalize } from "../../utils";

export const TeamBuilder = () => {
  const observerRef = useRef(null);

  const [pkmTeam, setPkmTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const { data: pkmDetails } = useGetPokemonDetails(selectedId);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPokemonList();

  useEffect(() => {
    const element = observerRef.current;
    if (!element || isLoading || isFetchingNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  useEffect(() => {
    if (pkmDetails) {
      if (pkmTeam.length > 5) {
        alert("No se pueden seleccionar más de 6 pokémon");
        return;
      }

      const pokemon = {
        id: pkmDetails.id,
        name: capitalize(pkmDetails.name),
        types: pkmDetails.types.map(({ type }) => type.name),
        stats: pkmDetails.stats.map(({ base_stat, stat }) => ({
          name: stat.name,
          score: base_stat,
        })),
      };
      setPkmTeam((prev) => [...prev, pokemon]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkmDetails]);

  const loadedPkm = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  const addPkmToTeam = (id) => {
    const alreadyIn = pkmTeam.find((pkm) => pkm.id === id);
    if (alreadyIn) {
      alert("This pokemon is already in the team");
      return;
    }
    setSelectedId(id);
  };

  return (
    <div className="w-full h-screen border">
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="flex flex-col gap-3 w-full min-h-0 h-full">
          <div className="w-full border border-neutral-200 rounded-xl">
            <input
              placeholder="Buscar pokémon..."
              className="w-full py-2 px-4 rounded-2xl focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-3 w-full h-full overflow-y-auto">
            {loadedPkm.map((item, idx) => {
              return (
                <div key={item.name} onClick={() => addPkmToTeam(idx + 1)}>
                  <PokemonPreview details={{ id: idx + 1, name: item.name }} />
                </div>
              );
            })}
            {isLoading && <></>}
            <div ref={observerRef} className="h-4">
              Cargando más...
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="grid grid-cols-2 gap-3 w-full">
            {pkmTeam.map((item) => (
              <SelectedPokemon key={item.name} pokemon={item} />
            ))}
            {[...Array(6 - pkmTeam.length)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-xl w-full h-20"
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
