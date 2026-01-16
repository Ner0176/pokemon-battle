import { useState, useRef, useEffect, useMemo } from "react";
import { useGetPokemonDetails, useGetPokemonList } from "../../api";
import { PokemonPreview, TeamsPreview } from "./team-builder.content";
import { showToast } from "../base";
import { useTranslation } from "react-i18next";
import { TeamSection } from "./team";
import Skeleton from "react-loading-skeleton";
import { formatPokemonInfo, getIdFromUrl } from "./team-builder.utils";
import { useSearchParams } from "react-router-dom";
import { usePokemonTeams } from "../../stores";
import { CustomInput } from "../base";

export const TeamBuilder = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const selectedTeamId = searchParams.get("id");

  const storedTeams = usePokemonTeams();

  const observerRef = useRef(null);

  const [search, setSearch] = useState("");
  const [pkmTeam, setPkmTeam] = useState([]);
  const [teamName, setTeamName] = useState("");
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
    let newPkmTeam = [];

    if (selectedTeamId) {
      const paramsTeam = storedTeams.find((team) => team.id === selectedTeamId);
      if (paramsTeam) {
        setTeamName(paramsTeam.name);
        newPkmTeam = paramsTeam.team;
      }
    } else setTeamName("");

    setPkmTeam(newPkmTeam);
  }, [selectedTeamId, storedTeams]);

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
          text: t("TeamBuilder.Errors.TeamFull"),
        });
        return;
      }

      setPkmTeam((prev) => [...prev, formatPokemonInfo(pkmDetails)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkmDetails]);

  const loadedPkm = useMemo(() => {
    const searchTerm = search.toLowerCase();
    let allPokemon = pkmList?.pages.flatMap((page) => page.results) ?? [];

    if (search) {
      allPokemon = allPokemon.filter((pkm) => pkm.name.includes(searchTerm));
    }

    return allPokemon;
  }, [search, pkmList]);

  const addPokemon = (id) => {
    const alreadyIn = pkmTeam.find((pkm) => pkm.id === id);
    if (alreadyIn) {
      showToast({ type: "error", text: t("TeamBuilder.Errors.AlreadyInTeam") });
      return;
    }
    setSelectedId(id);
  };

  return (
    <div className="grid grid-cols-2 gap-10 h-full">
      <div className="flex flex-row gap-5 min-h-0 h-full">
        {storedTeams.length > 0 && (
          <TeamsPreview
            pokemonTeams={storedTeams}
            selectedTeamId={selectedTeamId}
          />
        )}
        <div className="flex flex-col w-full h-full">
          <div className="w-full border border-neutral-200 rounded-xl">
            <CustomInput
              value={search}
              handleChange={(value) => setSearch(value)}
              placeholder={t("TeamBuilder.SearchPokemon")}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full h-full overflow-y-auto">
            {loadedPkm.map(({ name, url }, idx) => {
              const pkmId = +getIdFromUrl(url);
              return (
                <div
                  key={name}
                  onClick={() => addPokemon(pkmId)}
                  style={{ marginTop: idx < 2 && 12 }}
                >
                  <PokemonPreview details={{ id: pkmId, name: name }} />
                </div>
              );
            })}
            {(isPkmListLoading || isFetchingNextPage) &&
              [...Array(20)].map((_, idx) => (
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
      <TeamSection
        pkmTeam={pkmTeam}
        teamName={teamName}
        setPkmTeam={setPkmTeam}
        setTeamName={setTeamName}
        selectedTeamId={selectedTeamId}
      />
    </div>
  );
};
