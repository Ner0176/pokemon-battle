import { useState, useRef, useEffect, useMemo } from "react";
import { useGetPokemonDetails, useGetPokemonList } from "../../api";
import { PokemonPreview, SelectedPokemon } from "./team-builder.content";
import { capitalize } from "../../utils";
import { showToast } from "../base";
import { useTranslation } from "react-i18next";

export const TeamBuilder = () => {
  const { t } = useTranslation();

  const observerRef = useRef(null);

  const [action, setAction] = useState("");
  const [pkmTeam, setPkmTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const { data: pkmDetails } = useGetPokemonDetails(selectedId);
  const {
    hasNextPage,
    data: pkmList,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isPkmListLoading,
  } = useGetPokemonList();

  useEffect(() => {
    const element = observerRef.current;
    if (!element || isPkmListLoading || isFetchingNextPage || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPkmListLoading]);

  useEffect(() => {
    if (pkmDetails) {
      if (pkmTeam.length > 5) {
        showToast({
          type: "error",
          text: t("TeamBuilder.TeamFull"),
        });
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
    return pkmList?.pages.flatMap((page) => page.results) ?? [];
  }, [pkmList]);

  const addPokemon = (id) => {
    const alreadyIn = pkmTeam.find((pkm) => pkm.id === id);
    if (alreadyIn) {
      showToast("This pokemon is already in the team");
      return;
    }
    setSelectedId(id);
  };

  const handleClick = (id) => {
    if (action === "delete") {
      setPkmTeam((prev) => {
        return prev.filter((pkm) => pkm.id !== id);
      });
    } else if (action === "random-order") {
      setPkmTeam((prev) => {
        return [...prev].sort(() => Math.random() - 0.5);
      });
    }
  };

  const handleSort = () => {
    setPkmTeam((prev) => {
      return [...prev].sort(() => Math.random() - 0.5);
    });
  };

  const handleSortByAttack = () => {
    setPkmTeam((prev) => {
      return [...prev].sort((a, b) => {
        const attackA = a.stats.find((s) => s.name === "attack")?.score || 0;
        const attackB = b.stats.find((s) => s.name === "attack")?.score || 0;
        return attackB - attackA;
      });
    });
  };

  return (
    <div className="w-full h-screen border px-10 py-6">
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
                <div key={item.name} onClick={() => addPokemon(idx + 1)}>
                  <PokemonPreview details={{ id: idx + 1, name: item.name }} />
                </div>
              );
            })}
            {isPkmListLoading && <></>}
            <div ref={observerRef} className="h-4">
              Cargando más...
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <div className="flex flex-row gap-2 justify-between w-full">
            <span className="text-xl">Equipo 1</span>
            <div className="flex flex-row items-center gap-3">
              <button
                onClick={handleSort}
                className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
              >
                Ordenar aleatorio
              </button>
              <button
                onClick={handleSortByAttack}
                className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
              >
                Ordenar por ataque
              </button>
              <button
                onClick={() =>
                  setAction((prev) => {
                    return prev === "delete" ? "" : "delete";
                  })
                }
                className="bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl cursor-pointer shadow-sm hover:shadow-md"
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            {pkmTeam.map((item) => (
              <div key={item.name} onClick={() => handleClick(item.id)}>
                <SelectedPokemon action={action} pokemon={item} />
              </div>
            ))}
            {[...Array(6 - pkmTeam.length)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="border-2 border-neutral-200  rounded-xl w-full h-20"
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
