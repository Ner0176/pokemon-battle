import {
  useClearDraft,
  useGetDraft,
  usePokemonTeams,
  useSaveDraft,
} from "../../stores";
import {
  DraftModal,
  PokemonPreview,
  TeamsPreview,
} from "./team-builder.content";
import { TeamSection } from "./team";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomSelect, showToast } from "../base";
import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  useGetAllTypes,
  useGetPokemonByType,
  useGetPokemonDetails,
  useGetPokemonList,
} from "../../api";
import { formatPokemonInfo, getIdFromUrl } from "./team-builder.utils";
import { useWindowWidth } from "../../hooks";

export const TeamBuilder = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const width = useWindowWidth();

  const [searchParams] = useSearchParams();
  const selectedTeamId = searchParams.get("id");

  const saveDraft = useSaveDraft();
  const storedDraft = useGetDraft();
  const clearDraft = useClearDraft();
  const storedTeams = usePokemonTeams();

  const [search, setSearch] = useState("");
  const [pkmTeam, setPkmTeam] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const observerRef = useRef(null);
  const stateRef = useRef({ pkmTeam, teamName, selectedTeamId });

  const { data: allTypes } = useGetAllTypes();
  const { data: pkmDetails } = useGetPokemonDetails(selectedId);
  const { data: pkmListByType, isLoading: isPkmListByTypeLoading } =
    useGetPokemonByType(typeFilter);
  const {
    hasNextPage,
    data: pkmList,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isPkmListLoading,
  } = useGetPokemonList();

  useEffect(() => {
    stateRef.current = { pkmTeam, teamName, selectedTeamId };
  }, [pkmTeam, teamName, selectedTeamId]);

  useEffect(() => {
    return () => {
      const currentTeam = stateRef.current.pkmTeam;
      const currentName = stateRef.current.teamName;
      const currentId = stateRef.current.selectedTeamId;

      if (!currentTeam.length) return;

      if (currentId) {
        const findTeam = storedTeams.find((team) => team.id === currentId);
        const dbTeam = findTeam ? findTeam.team : [];

        const areSame = JSON.stringify(dbTeam) === JSON.stringify(currentTeam);

        if (!areSame) saveDraft({ team: currentTeam, name: currentName });
      } else if (currentTeam.length > 0 || currentName.length > 0) {
        saveDraft({ team: currentTeam, name: currentName });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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

      setSelectedId(null);
      setPkmTeam((prev) => [...prev, formatPokemonInfo(pkmDetails)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkmDetails]);

  const loadedPkm = useMemo(() => {
    const searchTerm = search.toLowerCase();
    let allPokemon =
      (typeFilter
        ? pkmListByType?.pokemon.flatMap(({ pokemon }) => pokemon)
        : pkmList?.pages.flatMap((page) => page.results)) ?? [];

    if (search) {
      allPokemon = allPokemon.filter((pkm) => pkm.name.includes(searchTerm));
    }

    return allPokemon;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pkmList, pkmListByType]);

  const addPokemon = (id) => {
    const alreadyIn = pkmTeam.find((pkm) => pkm.id === id);
    if (alreadyIn) {
      showToast({ type: "error", text: t("TeamBuilder.Errors.AlreadyInTeam") });
      return;
    }
    setSelectedId(id);
  };

  return (
    <div className="grid grid-cols-2 gap-6 xl:gap-10 h-full">
      <div className="flex flex-row gap-5 min-h-0 h-full">
        {storedTeams.length > 0 && (
          <TeamsPreview
            pokemonTeams={storedTeams}
            selectedTeamId={selectedTeamId}
          />
        )}
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row items-center gap-3 w-full">
            <CustomInput
              value={search}
              handleChange={(value) => setSearch(value)}
              placeholder={t("TeamBuilder.SearchPokemon")}
            />
            <CustomSelect
              value={typeFilter}
              defaultValue={t("TeamBuilder.SelectType")}
              options={allTypes?.results.map(({ name }) => (
                <option key={name} value={name}>
                  {t(`TeamBuilder.Types.${name}`)}
                </option>
              ))}
              handleChange={(value) => setTypeFilter(value)}
              customStyles={{ width: "fit-content", minWidth: 150 }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-3 w-full h-full overflow-y-auto">
            {loadedPkm.map(({ name, url }, idx) => {
              const pkmId = +getIdFromUrl(url);
              const addMarginTop = idx === 0 || (idx === 1 && width >= 1024);
              return (
                <div
                  key={name}
                  onClick={() => addPokemon(pkmId)}
                  style={{ marginTop: addMarginTop && 12 }}
                >
                  <PokemonPreview details={{ id: pkmId, name: name }} />
                </div>
              );
            })}
            {(isPkmListLoading ||
              isFetchingNextPage ||
              isPkmListByTypeLoading) &&
              [...Array(20)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="w-full h-20"
                  style={{ borderRadius: 12 }}
                />
              ))}
            <div ref={observerRef} className="h-4 w-full"></div>
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
      {!!storedDraft && (
        <DraftModal
          draft={storedDraft}
          handleClose={clearDraft}
          onLoad={({ team, name }) => {
            setPkmTeam(team);
            setTeamName(name);
          }}
        />
      )}
    </div>
  );
};
