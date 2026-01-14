import { useState, useRef, useEffect, useMemo } from "react";
import { useGetPokemonDetails, useGetPokemonList } from "../../api";
import { PokemonPreview } from "./team-builder.content";
import { capitalize } from "../../utils";
import { Container, showToast } from "../base";
import { useTranslation } from "react-i18next";
import { TeamSection } from "./team";
import Skeleton from "react-loading-skeleton";
import { getIdFromUrl } from "./team-builder.utils";
import { useSearchParams } from "react-router-dom";
import { usePokemonTeams } from "../stores";

const BASE_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const TeamBuilder = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsTeamId = searchParams.get("id");

  const pokemonTeams = usePokemonTeams();

  const observerRef = useRef(null);

  const [limit, _] = useState(40);
  const [pkmTeam, setPkmTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const { data: pkmDetails } = useGetPokemonDetails(selectedId);
  const {
    hasNextPage,
    data: pkmList,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isPkmListLoading,
  } = useGetPokemonList(limit);

  useEffect(() => {
    if (paramsTeamId) {
      const team = pokemonTeams.find((team) => team.id === paramsTeamId);
      setPkmTeam(team.team);
    } else {
      setPkmTeam([]);
    }
  }, [paramsTeamId, pokemonTeams]);

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
        staticSprite: `${BASE_SPRITE_URL}/${pkmDetails.id}.png`,
        movingSprite: `${BASE_SPRITE_URL}/other/showdown/${pkmDetails.id}.gif`,
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

  return (
    <Container>
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="flex flex-row gap-5 min-h-0 h-full">
          <div className="flex flex-col gap-3">
            {pokemonTeams.map((item) => {
              return (
                <div
                  onClick={() => {
                    setSearchParams((params) => {
                      params.set("id", item.id);
                      return params;
                    });
                  }}
                  style={{
                    borderColor:
                      item.id === paramsTeamId ? "purple" : undefined,
                  }}
                  className="flex flex-col items-center justify-center size-20 bg-white border border-neutral-200 rounded-lg cursor-pointer"
                >
                  <img className="size-10" src={item.team[0].staticSprite} />
                  <span className="text-sm">{item.name}</span>
                </div>
              );
            })}
            <div
              onClick={() => {
                setSearchParams((params) => {
                  params.delete("id");
                  return params;
                });
              }}
              className="flex items-center justify-center size-20 bg-white border border-neutral-200 rounded-lg cursor-pointer"
            >
              +
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full h-full">
            <div className="w-full border border-neutral-200 rounded-xl">
              <input
                placeholder="Buscar pokémon..."
                className="w-full py-2 px-4 rounded-2xl focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col gap-3 w-full h-full overflow-y-auto">
              {loadedPkm.map(({ name, url }) => {
                const pkmId = getIdFromUrl(url);
                return (
                  <div key={name} onClick={() => addPokemon(pkmId)}>
                    <PokemonPreview details={{ id: pkmId, name: name }} />
                  </div>
                );
              })}
              {(isPkmListLoading || isFetchingNextPage) &&
                [...Array(5)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-full h-20"
                    style={{ borderRadius: 12 }}
                  />
                ))}
              <div ref={observerRef} className="h-4 w-full">
                Loading...
              </div>
            </div>
          </div>
        </div>
        <TeamSection pkmTeam={pkmTeam} setPkmTeam={setPkmTeam} />
      </div>
    </Container>
  );
};
